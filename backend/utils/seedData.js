import { User } from "../models/user.models.js";
import { PermissionGroup } from "../models/permissionGroup.models.js";
import { Role } from "../models/roles.models.js";

export const seedSampleData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await PermissionGroup.deleteMany({});
    await Role.deleteMany({});

    // Create sample roles
    const roles = await Role.insertMany([
      {
        role_id: 1,
        name: "HR Administrator",
        userType: "Employee",
        description: "Full access to HR functions",
        status: "active",
        lastModified: new Date(),
      },
      {
        role_id: 2,
        name: "Manager",
        userType: "Employee",
        description: "Team management access",
        status: "active",
        lastModified: new Date(),
      },
      {
        role_id: 3,
        name: "Employee Self-Service",
        userType: "Employee",
        description: "Basic employee access",
        status: "active",
        lastModified: new Date(),
      },
    ]);

    // Create sample users
    const users = await User.insertMany([
      {
        userId: "EMP001",
        name: "John Doe",
        email: "john.doe@company.com",
        department: "Engineering",
        jobTitle: "Software Engineer",
        location: "New York",
        country: "USA",
        status: "active",
      },
      {
        userId: "EMP002",
        name: "Jane Smith",
        email: "jane.smith@company.com",
        department: "HR",
        jobTitle: "HR Manager",
        location: "London",
        country: "UK",
        status: "active",
      },
      {
        userId: "EMP003",
        name: "Bob Johnson",
        email: "bob.johnson@company.com",
        department: "Engineering",
        jobTitle: "Senior Developer",
        location: "San Francisco",
        country: "USA",
        status: "active",
      },
      {
        userId: "demo-user",
        name: "Demo Employee",
        email: "demo@company.com",
        department: "Sales",
        jobTitle: "Sales Representative",
        location: "Berlin",
        country: "Germany",
        status: "active",
      },
    ]);

    // Create sample permission groups
    const groups = await PermissionGroup.insertMany([
      {
        groupId: 1,
        groupName: "Engineering Team",
        userType: "Employee",
        type: "Dynamic",
        isRbpOnly: false,
        members: [users[0]._id, users[2]._id],
        activeMembershipCount: 2,
        includeCriteria: [
          { category: "department", value: "Engineering" }
        ],
        relatedPermissionRoles: [roles[2]._id],
        lastModified: new Date(),
      },
      {
        groupId: 2,
        groupName: "HR Administrators",
        userType: "Employee",
        type: "Static",
        isRbpOnly: true,
        members: [users[1]._id],
        activeMembershipCount: 1,
        includeCriteria: [
          { category: "department", value: "HR" }
        ],
        relatedPermissionRoles: [roles[0]._id, roles[1]._id],
        lastModified: new Date(),
      },
      {
        groupId: 3,
        groupName: "All Employees",
        userType: "Employee",
        type: "Dynamic",
        isRbpOnly: false,
        members: users.map(u => u._id),
        activeMembershipCount: users.length,
        includeCriteria: [],
        relatedPermissionRoles: [roles[2]._id],
        lastModified: new Date(),
      },
    ]);

    // Update users with group references
    await User.updateOne(
      { userId: "EMP001" },
      { $set: { groupIds: [groups[0]._id, groups[2]._id] } }
    );
    await User.updateOne(
      { userId: "EMP002" },
      { $set: { groupIds: [groups[1]._id, groups[2]._id] } }
    );
    await User.updateOne(
      { userId: "EMP003" },
      { $set: { groupIds: [groups[0]._id, groups[2]._id] } }
    );
    await User.updateOne(
      { userId: "demo-user" },
      { $set: { groupIds: [groups[2]._id] } }
    );

    console.log("✅ Sample data seeded successfully!");
    console.log(`Created ${users.length} users, ${groups.length} groups, and ${roles.length} roles`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};
