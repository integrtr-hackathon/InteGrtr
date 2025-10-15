# INTEGRTR User Guide

Complete guide on how to use the application and perform all activities.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Admin Activities](#admin-activities)
3. [Employee Activities](#employee-activities)
4. [API Usage](#api-usage)

---

## Getting Started

### 1. Start the Application

**Terminal 1 - Backend:**
```cmd
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm run dev
```

**Access the app:**
- Open browser: http://localhost:3000

### 2. Load Sample Data (First Time)

```cmd
cd backend
npm run seed
```

This creates:
- 4 sample users (demo-user, EMP001, EMP002, EMP003)
- 3 permission groups
- 3 roles

---

## Admin Activities

### Activity 1: View All Permission Groups

**Steps:**
1. Go to http://localhost:3000
2. Click **"Permission Groups"** button
3. You'll see a table with all groups

**What you can do:**
- Search groups by name
- View group details (click group name)
- Edit groups (click Edit button)
- Delete groups (click Delete button)
- Navigate pages (if more than 10 groups)

**Screenshot locations:**
- Home → Permission Groups
- URL: http://localhost:3000/permission-groups

---

### Activity 2: Create New Permission Group

**Steps:**
1. Go to Permission Groups page
2. Click **"Create New Group"** button
3. Fill in the form:
   - **Group Name**: e.g., "Sales Team"
   - **User Type**: e.g., "Employee"
   - **Type**: Choose "Dynamic" or "Static"
   - **RBP Only**: Yes/No
   - **Include Criteria**: Add rules (e.g., Department = Sales)
   - **Exclude Criteria**: Add exclusion rules (optional)

4. Click **"Save"** or **"Create"**

**API Call (Alternative):**
```bash
curl -X POST http://localhost:5000/api/permission-groups \
  -H "Content-Type: application/json" \
  -d '{
    "groupName": "Sales Team",
    "userType": "Employee",
    "type": "Dynamic",
    "isRbpOnly": false,
    "includeCriteria": [
      {"category": "department", "value": "Sales"}
    ]
  }'
```

---

### Activity 3: View Permission Group Details

**Steps:**
1. Go to Permission Groups page
2. Click on any **group name** (blue link)
3. You'll see:
   - Group information
   - Include/Exclude criteria
   - Related permission roles
   - Current members list

**What you can see:**
- Group ID, Type, RBP status
- Active member count
- Last modified date
- All linked roles
- All members in the group

**URL Pattern:**
- http://localhost:3000/permission-groups/1
- http://localhost:3000/permission-groups/2

---

### Activity 4: Link Roles to Permission Groups

**Steps:**
1. Open a permission group detail page
2. Scroll to **"Related Permission Roles"** section
3. Select a role from the dropdown
4. Click **"Link Role"** button
5. The role will appear in the table below

**To Unlink a Role:**
1. Find the role in the table
2. Click the **trash icon** (🗑️) button
3. Confirm the action

**API Calls:**
```bash
# Link role to group
curl -X POST http://localhost:5000/api/permission-groups/1/link-role \
  -H "Content-Type: application/json" \
  -d '{"roleId": "ROLE_OBJECT_ID_HERE"}'

# Unlink role from group
curl -X DELETE http://localhost:5000/api/permission-groups/1/unlink-role/ROLE_OBJECT_ID_HERE
```

---

### Activity 5: Manage Permission Roles

**Steps:**
1. From home, click **"Roles"** button
2. You'll see all permission roles in a table
3. View role details:
   - Role ID
   - Name
   - User Type
   - Status (Active/Inactive)
   - Last Modified date

**What you can do:**
- View all roles
- Click "View" to see role details
- Filter by status

**URL:**
- http://localhost:3000/admin/permissions

---

### Activity 6: View Admin Dashboard

**Steps:**
1. From home, click **"Admin Dashboard"** button
2. You'll see:
   - **ISC Charts**: Bar chart of group members
   - **System Statistics**: Total groups, members, active members
   - **Integration Centre**: Monthly integration data
   - **System Health**: Current system status
   - **Feedback**: Recent feedback (if any)

**URL:**
- http://localhost:3000/admin/dashboard

---

### Activity 7: Import Data from Files

**Import Users:**
```bash
curl -X POST http://localhost:5000/api/users/import \
  -F "raw=@users.json"
```

**Import Roles:**
```bash
curl -X POST http://localhost:5000/api/roles/import \
  -F "raw=@roles.json"
```

**Import Groups:**
```bash
curl -X POST http://localhost:5000/api/groups/import \
  -F "raw=@groups.txt"
```

**Sample JSON format for users:**
```json
{
  "users": [
    {
      "userId": "EMP005",
      "name": "Alice Johnson",
      "email": "alice@company.com",
      "department": "Marketing",
      "jobTitle": "Marketing Manager",
      "location": "New York",
      "country": "USA",
      "status": "active"
    }
  ]
}
```

---

### Activity 8: Search and Filter

**Search Permission Groups:**
1. Go to Permission Groups page
2. Type in the search box at the top
3. Results filter automatically

**Search Users (via API):**
```bash
curl "http://localhost:5000/api/users?search=john&department=Engineering"
```

**Pagination:**
- Use "Previous" and "Next" buttons
- Shows "Page X of Y"
- 10 items per page by default

---

## Employee Activities

### Activity 9: View Employee Profile

**Steps:**
1. From home, click **"Employee Portal"** button
2. You'll see the demo user profile
3. View:
   - Personal information (name, email, job title, etc.)
   - Assigned permission groups
   - Roles through groups
   - Access summary

**To view different employees:**
- Change URL: http://localhost:3000/employee/EMP001
- Change URL: http://localhost:3000/employee/EMP002
- Change URL: http://localhost:3000/employee/demo-user

**What employees can see:**
- ✅ Their profile information
- ✅ Permission groups they belong to
- ✅ Roles assigned through groups
- ✅ Access rights summary
- ❌ Cannot edit (read-only)

---

### Activity 10: Check Group Membership

**Steps:**
1. Open employee portal
2. Scroll to **"My Permission Groups"** section
3. See all groups you're assigned to
4. Each group shows:
   - Group name
   - Group ID
   - Linked roles (badges)

**API Call:**
```bash
curl http://localhost:5000/api/users/demo-user
```

---

## API Usage

### Activity 11: Get All Permission Groups

**Request:**
```bash
curl http://localhost:5000/api/permission-groups
```

**With search and pagination:**
```bash
curl "http://localhost:5000/api/permission-groups?search=team&page=1&limit=10"
```

**Response:**
```json
{
  "groups": [...],
  "pagination": {
    "total": 3,
    "page": 1,
    "pages": 1
  }
}
```

---

### Activity 12: Get Single Permission Group

**Request:**
```bash
curl http://localhost:5000/api/permission-groups/1
```

**Response includes:**
- Group details
- All members (populated)
- All linked roles (populated)
- Include/exclude criteria

---

### Activity 13: Update Permission Group

**Request:**
```bash
curl -X PUT http://localhost:5000/api/permission-groups/1 \
  -H "Content-Type: application/json" \
  -d '{
    "groupName": "Updated Engineering Team",
    "includeCriteria": [
      {"category": "department", "value": "Engineering"},
      {"category": "location", "value": "New York"}
    ]
  }'
```

---

### Activity 14: Delete Permission Group

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/permission-groups/1
```

---

### Activity 15: Manage Users

**Get all users:**
```bash
curl http://localhost:5000/api/users
```

**Get single user:**
```bash
curl http://localhost:5000/api/users/demo-user
```

**Create user:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "EMP006",
    "name": "New Employee",
    "email": "new@company.com",
    "department": "IT",
    "jobTitle": "Developer",
    "status": "active"
  }'
```

**Update user:**
```bash
curl -X PUT http://localhost:5000/api/users/EMP006 \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Engineering",
    "jobTitle": "Senior Developer"
  }'
```

**Delete user:**
```bash
curl -X DELETE http://localhost:5000/api/users/EMP006
```

---

## Common Workflows

### Workflow 1: Onboard New Employee

1. **Create user** (Activity 15)
2. **Assign to permission groups** (automatically via criteria or manually)
3. **Verify access** in Employee Portal (Activity 9)

### Workflow 2: Create Department-Based Access

1. **Create permission group** (Activity 2)
   - Name: "Engineering Access"
   - Type: Dynamic
   - Include: Department = Engineering

2. **Link roles** (Activity 4)
   - Link "Employee Self-Service" role
   - Link "Developer Tools" role

3. **Verify members** (Activity 3)
   - Check that all engineering employees are included

### Workflow 3: Audit User Access

1. **Open Employee Portal** (Activity 9)
2. **Check assigned groups** (Activity 10)
3. **Review roles** in each group
4. **Verify permissions** match requirements

---

## Tips & Best Practices

### Dynamic vs Static Groups

**Dynamic Groups:**
- Members calculated automatically based on criteria
- Use for department-based, location-based access
- Updates automatically when user attributes change

**Static Groups:**
- Members added manually
- Use for special access, temporary permissions
- Requires manual updates

### People Pool Criteria

Common categories to use:
- `department` - Engineering, HR, Sales, etc.
- `location` - New York, London, Berlin, etc.
- `country` - USA, UK, Germany, etc.
- `jobTitle` - Manager, Developer, etc.
- `userType` - Employee, Contractor, etc.

### Search Tips

- Search is case-insensitive
- Searches in group names, user names, emails
- Use pagination for large datasets
- Filter by specific fields via API

---

## Troubleshooting

### Can't see any data?
Run the seed script:
```cmd
cd backend
npm run seed
```

### Changes not showing?
Refresh the page or check browser console for errors

### API returns empty array?
Check that backend is running and MongoDB is connected

### Permission group has no members?
- Check include/exclude criteria
- Verify users match the criteria
- For Dynamic groups, members calculate automatically

---

## Quick Reference

| Activity | URL | Method |
|----------|-----|--------|
| Home | http://localhost:3000 | GET |
| Permission Groups | http://localhost:3000/permission-groups | GET |
| Group Detail | http://localhost:3000/permission-groups/:id | GET |
| Admin Roles | http://localhost:3000/admin/permissions | GET |
| Admin Dashboard | http://localhost:3000/admin/dashboard | GET |
| Employee Portal | http://localhost:3000/employee/:userId | GET |

| API Endpoint | Method | Purpose |
|--------------|--------|---------|
| /api/permission-groups | GET | List all groups |
| /api/permission-groups | POST | Create group |
| /api/permission-groups/:id | GET | Get group details |
| /api/permission-groups/:id | PUT | Update group |
| /api/permission-groups/:id | DELETE | Delete group |
| /api/users | GET | List all users |
| /api/users/:userId | GET | Get user details |
| /api/roles | GET | List all roles |

---

## Need Help?

- Check the README.md for setup instructions
- Check INSTALLATION.md for dependency issues
- Check PROJECT_STRUCTURE.md for code organization
- Check browser console for frontend errors
- Check terminal for backend errors
