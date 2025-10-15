import { User } from "../models/user.models.js";
import { PermissionGroup } from "../models/permissionGroup.models.js";

// GET /api/users - Get all users
export const getUsers = async (req, res) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { userId: { $regex: search, $options: 'i' } }
      ];
    }
    if (department) {
      query.department = department;
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .populate('groupIds', 'groupName groupId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// GET /api/users/:userId - Get single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId })
      .populate({
        path: 'groupIds',
        populate: {
          path: 'relatedPermissionRoles',
          select: 'name role_id description'
        }
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// POST /api/users/import - Import users
export const importUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const raw = req.file.buffer.toString("utf8");
    const data = JSON.parse(raw);

    if (!data?.users) {
      return res.status(400).json({ message: "No user data found in file" });
    }

    await User.deleteMany({});
    await User.insertMany(data.users);

    res.status(201).json({
      message: "Users imported successfully",
      count: data.users.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Failed to import users" });
  }
};

// POST /api/users - Create new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// PUT /api/users/:userId - Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE /api/users/:userId - Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
