import { PermissionGroup } from "../models/permissionGroup.models.js";
import { User } from "../models/user.models.js";

// GET /api/permission-groups - Get all permission groups
export const getPermissionGroups = async (req, res) => {
  try {
    const { search, userType, status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (search) {
      query.groupName = { $regex: search, $options: 'i' };
    }
    if (userType) {
      query.userType = userType;
    }
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    
    const groups = await PermissionGroup.find(query)
      .populate('relatedPermissionRoles', 'name role_id')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ lastModified: -1 });

    const total = await PermissionGroup.countDocuments(query);

    res.json({
      groups,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch permission groups" });
  }
};

// GET /api/permission-groups/:id - Get single permission group
export const getPermissionGroupById = async (req, res) => {
  try {
    // Try to find by groupId (numeric) first, then by _id (MongoDB ObjectId)
    let group = await PermissionGroup.findOne({ groupId: parseInt(req.params.id) })
      .populate('members', 'userId name email department jobTitle')
      .populate('relatedPermissionRoles', 'name role_id description');

    // If not found by groupId, try by _id
    if (!group) {
      group = await PermissionGroup.findById(req.params.id)
        .populate('members', 'userId name email department jobTitle')
        .populate('relatedPermissionRoles', 'name role_id description');
    }

    if (!group) {
      return res.status(404).json({ message: "Permission group not found" });
    }

    res.json(group);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch permission group" });
  }
};

// POST /api/permission-groups - Create new permission group
export const createPermissionGroup = async (req, res) => {
  try {
    const { groupName, userType, type, isRbpOnly, includeCriteria, excludeCriteria } = req.body;

    // Generate new groupId
    const lastGroup = await PermissionGroup.findOne().sort({ groupId: -1 });
    const newGroupId = lastGroup ? lastGroup.groupId + 1 : 1;

    const newGroup = new PermissionGroup({
      groupId: newGroupId,
      groupName,
      userType,
      type: type || "Dynamic",
      isRbpOnly: isRbpOnly || false,
      includeCriteria: includeCriteria || [],
      excludeCriteria: excludeCriteria || [],
      lastModified: new Date(),
    });

    // Calculate members based on criteria if Dynamic
    if (type === "Dynamic" && (includeCriteria?.length || excludeCriteria?.length)) {
      await calculateGroupMembers(newGroup);
    }

    await newGroup.save();

    res.status(201).json({
      message: "Permission group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Failed to create permission group" });
  }
};

// PUT /api/permission-groups/:id - Update permission group
export const updatePermissionGroup = async (req, res) => {
  try {
    const { groupName, userType, type, isRbpOnly, includeCriteria, excludeCriteria, members } = req.body;

    // Try to find by groupId (numeric) first, then by _id
    let group = await PermissionGroup.findOne({ groupId: parseInt(req.params.id) });
    
    if (!group) {
      group = await PermissionGroup.findById(req.params.id);
    }

    if (!group) {
      return res.status(404).json({ message: "Permission group not found" });
    }

    if (groupName) group.groupName = groupName;
    if (userType) group.userType = userType;
    if (type) group.type = type;
    if (isRbpOnly !== undefined) group.isRbpOnly = isRbpOnly;
    if (includeCriteria) group.includeCriteria = includeCriteria;
    if (excludeCriteria) group.excludeCriteria = excludeCriteria;
    if (members) group.members = members;

    group.lastModified = new Date();

    // Recalculate members if Dynamic
    if (group.type === "Dynamic") {
      await calculateGroupMembers(group);
    }

    await group.save();

    res.json({
      message: "Permission group updated successfully",
      group,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update permission group" });
  }
};

// DELETE /api/permission-groups/:id - Delete permission group
export const deletePermissionGroup = async (req, res) => {
  try {
    // Try to find by groupId (numeric) first, then by _id
    let group = await PermissionGroup.findOneAndDelete({ groupId: parseInt(req.params.id) });
    
    if (!group) {
      group = await PermissionGroup.findByIdAndDelete(req.params.id);
    }

    if (!group) {
      return res.status(404).json({ message: "Permission group not found" });
    }

    res.json({ message: "Permission group deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete permission group" });
  }
};

// Helper function to calculate group members based on criteria
async function calculateGroupMembers(group) {
  try {
    let query = { status: "active" };

    // Build include query
    if (group.includeCriteria && group.includeCriteria.length > 0) {
      const includeConditions = group.includeCriteria.map(criteria => ({
        [criteria.category.toLowerCase()]: criteria.value
      }));
      query.$and = includeConditions;
    }

    // Build exclude query
    if (group.excludeCriteria && group.excludeCriteria.length > 0) {
      const excludeConditions = group.excludeCriteria.map(criteria => ({
        [criteria.category.toLowerCase()]: { $ne: criteria.value }
      }));
      if (query.$and) {
        query.$and = [...query.$and, ...excludeConditions];
      } else {
        query.$and = excludeConditions;
      }
    }

    const matchingUsers = await User.find(query).select('_id');
    group.members = matchingUsers.map(u => u._id);
    group.activeMembershipCount = matchingUsers.length;
  } catch (error) {
    console.error("Error calculating members:", error);
  }
}

// POST /api/permission-groups/:id/link-role - Link role to group
export const linkRoleToGroup = async (req, res) => {
  try {
    const { roleId } = req.body;
    
    // Try to find by groupId (numeric) first, then by _id
    let group = await PermissionGroup.findOne({ groupId: parseInt(req.params.id) });
    
    if (!group) {
      group = await PermissionGroup.findById(req.params.id);
    }

    if (!group) {
      return res.status(404).json({ message: "Permission group not found" });
    }

    if (!group.relatedPermissionRoles.includes(roleId)) {
      group.relatedPermissionRoles.push(roleId);
      group.lastModified = new Date();
      await group.save();
    }

    res.json({ message: "Role linked successfully", group });
  } catch (error) {
    console.error("Link error:", error);
    res.status(500).json({ message: "Failed to link role" });
  }
};

// DELETE /api/permission-groups/:id/unlink-role/:roleId - Unlink role from group
export const unlinkRoleFromGroup = async (req, res) => {
  try {
    // Try to find by groupId (numeric) first, then by _id
    let group = await PermissionGroup.findOne({ groupId: parseInt(req.params.id) });
    
    if (!group) {
      group = await PermissionGroup.findById(req.params.id);
    }

    if (!group) {
      return res.status(404).json({ message: "Permission group not found" });
    }

    group.relatedPermissionRoles = group.relatedPermissionRoles.filter(
      r => r.toString() !== req.params.roleId
    );
    group.lastModified = new Date();
    await group.save();

    res.json({ message: "Role unlinked successfully", group });
  } catch (error) {
    console.error("Unlink error:", error);
    res.status(500).json({ message: "Failed to unlink role" });
  }
};
