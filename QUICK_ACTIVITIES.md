# Quick Activities Guide

Fast reference for common tasks in INTEGRTR.

## 🚀 Getting Started (First Time)

```cmd
# Terminal 1 - Start Backend
cd backend
npm install
npm run seed
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm install
npm run dev

# Open Browser
http://localhost:3000
```

---

## 👨‍💼 Admin Activities

### 1️⃣ View All Permission Groups
```
Home → Click "Permission Groups" button
```
- See all groups in a table
- Search by name
- Click group name to view details

### 2️⃣ Create New Permission Group
```
Permission Groups → Click "Create New Group"
```
Fill in:
- Group Name: "Sales Team"
- User Type: "Employee"
- Type: "Dynamic" or "Static"
- Include Criteria: Department = Sales
- Click Save

**API Alternative:**
```bash
curl -X POST http://localhost:5000/api/permission-groups \
  -H "Content-Type: application/json" \
  -d '{"groupName":"Sales Team","userType":"Employee","type":"Dynamic"}'
```

### 3️⃣ View Group Details
```
Permission Groups → Click any group name
```
You'll see:
- ✅ Group info (ID, type, members count)
- ✅ Include/Exclude criteria
- ✅ Linked roles
- ✅ Current members list

### 4️⃣ Link Role to Group
```
Group Details → Scroll to "Related Permission Roles"
→ Select role from dropdown → Click "Link Role"
```

**API Alternative:**
```bash
curl -X POST http://localhost:5000/api/permission-groups/1/link-role \
  -H "Content-Type: application/json" \
  -d '{"roleId":"ROLE_ID_HERE"}'
```

### 5️⃣ View All Roles
```
Home → Click "Roles" button
```
- See all permission roles
- View role details
- Check status (Active/Inactive)

### 6️⃣ View Dashboard
```
Home → Click "Admin Dashboard" button
```
See:
- 📊 Charts (ISC, Integration)
- 📈 Statistics (Groups, Members)
- 💚 System Health
- 💬 Feedback

### 7️⃣ Search Groups
```
Permission Groups → Type in search box
```
- Results filter automatically
- Case-insensitive search

### 8️⃣ Edit Group
```
Permission Groups → Click Edit button (pencil icon)
```
- Update group name
- Modify criteria
- Change type
- Save changes

### 9️⃣ Delete Group
```
Permission Groups → Click Delete button (trash icon)
→ Confirm deletion
```

**API Alternative:**
```bash
curl -X DELETE http://localhost:5000/api/permission-groups/1
```

---

## 👤 Employee Activities

### 1️⃣ View Your Profile
```
Home → Click "Employee Portal" button
```
You'll see:
- 👤 Personal info (name, email, job title)
- 📍 Location and department
- 👥 Assigned permission groups
- 🔐 Roles and access rights

### 2️⃣ Check Your Groups
```
Employee Portal → Scroll to "My Permission Groups"
```
- See all groups you belong to
- View roles in each group
- Check access summary

### 3️⃣ View Different Employee
```
Change URL: http://localhost:3000/employee/EMP001
```
Available demo users:
- `demo-user` - Demo Employee (Sales)
- `EMP001` - John Doe (Engineering)
- `EMP002` - Jane Smith (HR Manager)
- `EMP003` - Bob Johnson (Engineering)

---

## 🔌 API Activities

### Get All Groups
```bash
curl http://localhost:5000/api/permission-groups
```

### Get All Groups (with search)
```bash
curl "http://localhost:5000/api/permission-groups?search=team&page=1&limit=10"
```

### Get Single Group
```bash
curl http://localhost:5000/api/permission-groups/1
```

### Create Group
```bash
curl -X POST http://localhost:5000/api/permission-groups \
  -H "Content-Type: application/json" \
  -d '{
    "groupName": "Marketing Team",
    "userType": "Employee",
    "type": "Dynamic",
    "includeCriteria": [{"category":"department","value":"Marketing"}]
  }'
```

### Update Group
```bash
curl -X PUT http://localhost:5000/api/permission-groups/1 \
  -H "Content-Type: application/json" \
  -d '{"groupName":"Updated Name"}'
```

### Delete Group
```bash
curl -X DELETE http://localhost:5000/api/permission-groups/1
```

### Get All Users
```bash
curl http://localhost:5000/api/users
```

### Get Single User
```bash
curl http://localhost:5000/api/users/demo-user
```

### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"EMP005",
    "name":"New Employee",
    "email":"new@company.com",
    "department":"IT",
    "status":"active"
  }'
```

### Get All Roles
```bash
curl http://localhost:5000/api/roles
```

---

## 🎯 Common Workflows

### Workflow: Onboard New Employee

1. **Create User**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"userId":"EMP010","name":"New Hire","email":"hire@company.com","department":"Sales"}'
```

2. **Create/Update Group** (if needed)
```bash
curl -X POST http://localhost:5000/api/permission-groups \
  -H "Content-Type: application/json" \
  -d '{"groupName":"Sales Team","type":"Dynamic","includeCriteria":[{"category":"department","value":"Sales"}]}'
```

3. **Verify in Portal**
```
http://localhost:3000/employee/EMP010
```

### Workflow: Create Department Access

1. **Create Dynamic Group**
```
Permission Groups → Create New Group
- Name: "Engineering Access"
- Type: Dynamic
- Include: department = Engineering
```

2. **Link Roles**
```
Group Details → Link "Employee Self-Service" role
Group Details → Link "Developer Tools" role
```

3. **Verify Members**
```
Group Details → Check "Current Members" table
```

### Workflow: Audit User Access

1. **Open Employee Portal**
```
http://localhost:3000/employee/EMP001
```

2. **Check Groups**
```
Scroll to "My Permission Groups"
```

3. **Review Roles**
```
See roles in each group (badges)
```

4. **Check Access Summary**
```
Scroll to "My Permissions & Access"
```

---

## 📋 Quick Reference

### URLs
| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Permission Groups | http://localhost:3000/permission-groups |
| Group Detail | http://localhost:3000/permission-groups/1 |
| Roles | http://localhost:3000/admin/permissions |
| Dashboard | http://localhost:3000/admin/dashboard |
| Employee Portal | http://localhost:3000/employee/demo-user |

### API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/permission-groups | GET | List groups |
| /api/permission-groups | POST | Create group |
| /api/permission-groups/:id | GET | Get group |
| /api/permission-groups/:id | PUT | Update group |
| /api/permission-groups/:id | DELETE | Delete group |
| /api/permission-groups/:id/link-role | POST | Link role |
| /api/users | GET | List users |
| /api/users/:userId | GET | Get user |
| /api/roles | GET | List roles |

### Sample Data (after seed)
| User ID | Name | Department | Groups |
|---------|------|------------|--------|
| demo-user | Demo Employee | Sales | All Employees |
| EMP001 | John Doe | Engineering | Engineering Team, All Employees |
| EMP002 | Jane Smith | HR | HR Administrators, All Employees |
| EMP003 | Bob Johnson | Engineering | Engineering Team, All Employees |

---

## 💡 Tips

- **Dynamic Groups**: Members auto-calculated from criteria
- **Static Groups**: Members added manually
- **Search**: Case-insensitive, searches names and IDs
- **Pagination**: 10 items per page by default
- **Refresh**: Press F5 if changes don't appear

---

## 🆘 Quick Fixes

**No data showing?**
```cmd
cd backend
npm run seed
```

**Backend not running?**
```cmd
cd backend
npm run dev
```

**Frontend not running?**
```cmd
cd frontend
npm run dev
```

**MongoDB not connected?**
```cmd
mongod
# or
net start MongoDB
```

**Port already in use?**
- Backend: Change PORT in `backend/.env`
- Frontend: Vite will suggest another port

---

## 🎓 Learn More

- **Full Guide**: See USER_GUIDE.md
- **Installation**: See INSTALLATION.md
- **API Docs**: See README.md
- **Structure**: See PROJECT_STRUCTURE.md
