import { Role } from "../models/roles.models.js";
import { extractRoleData } from "../utils/parseRaw.js";

// POST /api/roles/import — store parsed role data
export const importRoles = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const raw = req.file.buffer.toString("utf8");
    const data = extractRoleData(raw);
    
    if (!data?.roles) {
      return res.status(400).json({ message: "No role data found in file" });
    }

    const mappedRoles = data.roles.map(role => ({
      role_id: role.role_id,
      name: role.name,
      userType: role.userType,
      description: role.description,
      status: role.status || 'active',
      rbpOnly: role.rbpOnly || false,
      lastModified: role.lastModified ? new Date(role.lastModified) : new Date(),
      actions: role.actions || [],
      permissions: role.permissions || {}
    }));

    await Role.deleteMany({});
    await Role.insertMany(mappedRoles);

    res.status(201).json({
      message: "Roles imported successfully",
      count: mappedRoles.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Failed to import data" });
  }
};

// GET /api/roles — fetch all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

// GET /api/roles/:id — fetch single role
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ role_id: req.params.id });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch role" });
  }
};
