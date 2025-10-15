# Data Source Information

## Database Collections

The application uses **MongoDB** with the following collections:

### 1. **PermissionGroup** Collection
- **API Endpoint**: `/api/permission-groups`
- **Model**: `backend/models/permissionGroup.models.js`
- **Purpose**: Main permission groups with dynamic/static membership
- **Fields**:
  - `groupId` (Number) - Unique group identifier
  - `groupName` (String) - Name of the group
  - `userType` (String) - Type of users (Employee, Contractor, etc.)
  - `type` (String) - Dynamic or Static
  - `isRbpOnly` (Boolean) - Role-Based Permissions only
  - `activeMembershipCount` (Number) - Count of active members
  - `members` (Array) - References to User documents
  - `includeCriteria` (Array) - Rules for including users
  - `excludeCriteria` (Array) - Rules for excluding users
  - `relatedPermissionRoles` (Array) - References to Role documents
  - `lastModified` (Date) - Last update timestamp

### 2. **User** Collection
- **API Endpoint**: `/api/users`
- **Model**: `backend/models/user.models.js`
- **Purpose**: Employee/user data
- **Fields**:
  - `userId` (String) - Unique user identifier
  - `name` (String) - Full name
  - `email` (String) - Email address
  - `department` (String) - Department name
  - `jobTitle` (String) - Job title
  - `location` (String) - Office location
  - `country` (String) - Country
  - `userType` (String) - Employee, Contractor, etc.
  - `groupIds` (Array) - References to PermissionGroup documents
  - `status` (String) - active or inactive

### 3. **Role** Collection
- **API Endpoint**: `/api/roles`
- **Model**: `backend/models/roles.models.js`
- **Purpose**: Permission roles
- **Fields**:
  - `role_id` (Number) - Unique role identifier
  - `name` (String) - Role name
  - `userType` (String) - Type of users
  - `description` (String) - Role description
  - `status` (String) - active or inactive
  - `permissions` (Object) - Permission details
  - `lastModified` (Date) - Last update timestamp

### 4. **Group** Collection (Legacy)
- **API Endpoint**: `/api/groups`
- **Model**: `backend/models/groups.models.js`
- **Purpose**: Legacy groups from old import system
- **Note**: This is separate from PermissionGroup and used for backward compatibility

## Data Flow

### Creating Permission Groups
1. User fills form at `/permission-groups/new`
2. POST request to `/api/permission-groups`
3. Controller creates new PermissionGroup document
4. If Dynamic type, calculates members based on criteria
5. Saves to MongoDB

### Viewing Permission Groups
1. User visits `/permission-groups`
2. GET request to `/api/permission-groups`
3. Controller fetches from PermissionGroup collection
4. Returns groups with pagination

### Viewing Group Details
1. User clicks group name
2. GET request to `/api/permission-groups/:id`
3. Controller fetches group and populates:
   - `members` (User documents)
   - `relatedPermissionRoles` (Role documents)
4. Returns complete group data

### Employee Portal
1. User visits `/employee/:userId`
2. GET request to `/api/users/:userId`
3. Controller fetches user and populates:
   - `groupIds` (PermissionGroup documents)
   - For each group, populates `relatedPermissionRoles`
4. Returns user with all groups and roles

## Sample Data (After Seed)

### Users
```javascript
[
  {
    userId: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    jobTitle: "Software Engineer",
    location: "New York",
    country: "USA",
    status: "active"
  },
  {
    userId: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "HR",
    jobTitle: "HR Manager",
    location: "London",
    country: "UK",
    status: "active"
  },
  {
    userId: "EMP003",
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    department: "Engineering",
    jobTitle: "Senior Developer",
    location: "San Francisco",
    country: "USA",
    status: "active"
  },
  {
    userId: "demo-user",
    name: "Demo Employee",
    email: "demo@company.com",
    department: "Sales",
    jobTitle: "Sales Representative",
    location: "Berlin",
    country: "Germany",
    status: "active"
  }
]
```

### Permission Groups
```javascript
[
  {
    groupId: 1,
    groupName: "Engineering Team",
    userType: "Employee",
    type: "Dynamic",
    isRbpOnly: false,
    activeMembershipCount: 2,
    includeCriteria: [
      { category: "department", value: "Engineering" }
    ],
    members: [/* EMP001, EMP003 */]
  },
  {
    groupId: 2,
    groupName: "HR Administrators",
    userType: "Employee",
    type: "Static",
    isRbpOnly: true,
    activeMembershipCount: 1,
    includeCriteria: [
      { category: "department", value: "HR" }
    ],
    members: [/* EMP002 */]
  },
  {
    groupId: 3,
    groupName: "All Employees",
    userType: "Employee",
    type: "Dynamic",
    isRbpOnly: false,
    activeMembershipCount: 4,
    members: [/* All users */]
  }
]
```

### Roles
```javascript
[
  {
    role_id: 1,
    name: "HR Administrator",
    userType: "Employee",
    description: "Full access to HR functions",
    status: "active"
  },
  {
    role_id: 2,
    name: "Manager",
    userType: "Employee",
    description: "Team management access",
    status: "active"
  },
  {
    role_id: 3,
    name: "Employee Self-Service",
    userType: "Employee",
    description: "Basic employee access",
    status: "active"
  }
]
```

## How to Verify Data

### Check MongoDB directly
```bash
# Connect to MongoDB
mongosh

# Switch to database
use integrtr

# View collections
show collections

# Count documents
db.permissiongroups.countDocuments()
db.users.countDocuments()
db.roles.countDocuments()

# View all permission groups
db.permissiongroups.find().pretty()

# View all users
db.users.find().pretty()

# View all roles
db.roles.find().pretty()
```

### Check via API
```bash
# Get all permission groups
curl http://localhost:5000/api/permission-groups

# Get all users
curl http://localhost:5000/api/users

# Get all roles
curl http://localhost:5000/api/roles

# Get specific user
curl http://localhost:5000/api/users/demo-user

# Get specific group
curl http://localhost:5000/api/permission-groups/1
```

## Seeding Data

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This will:
1. Clear existing data in PermissionGroup, User, and Role collections
2. Create 4 sample users
3. Create 3 permission groups
4. Create 3 roles
5. Link users to groups
6. Link roles to groups

## Data Relationships

```
User
  └─ groupIds[] ──→ PermissionGroup
                      └─ relatedPermissionRoles[] ──→ Role

PermissionGroup
  ├─ members[] ──→ User
  └─ relatedPermissionRoles[] ──→ Role
```

## Important Notes

1. **Dynamic Groups**: Members are calculated automatically based on `includeCriteria` and `excludeCriteria`
2. **Static Groups**: Members must be added manually
3. **User Status**: Only users with `status: "active"` are included in dynamic groups
4. **Case Sensitivity**: Criteria matching is case-sensitive
5. **Criteria Categories**: Must match User model field names (department, location, country, jobTitle, etc.)

## Troubleshooting

### No data showing?
```bash
cd backend
npm run seed
```

### Wrong data showing?
- Check which API endpoint is being called
- `/api/groups` = Legacy groups (old)
- `/api/permission-groups` = New permission groups (correct)

### Members not calculating?
- Check that users exist with matching criteria
- Verify criteria category names match User model fields
- Ensure users have `status: "active"`
