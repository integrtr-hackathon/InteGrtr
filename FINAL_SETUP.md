# Final Setup & Verification Guide

## Current Status

✅ Backend configured with proper CORS  
✅ Frontend with shadcn/ui components  
✅ Database seed script ready  
✅ Test page created for debugging  
✅ All routes configured  

## Complete Setup (Start Fresh)

### Step 1: Start MongoDB

```cmd
# Windows
mongod

# Or if installed as service
net start MongoDB
```

Verify MongoDB is running - you should see:
```
[initandlisten] waiting for connections on port 27017
```

### Step 2: Setup & Start Backend

```cmd
# Navigate to backend
cd backend

# Install dependencies (if not done)
npm install

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
MongoDB connection established
```

**Keep this terminal open!**

### Step 3: Setup & Start Frontend

Open a **NEW terminal**:

```cmd
# Navigate to frontend
cd frontend

# Install dependencies (if not done)
npm install

# Start the frontend server
npm run dev
```

**Expected Output:**
```
VITE v5.x.x ready in XXXms
➜  Local:   http://localhost:3000/
```

**Keep this terminal open!**

### Step 4: Verify Everything Works

#### Test 1: Backend Health Check
Open browser: **http://localhost:5000**

Should see:
```
✅ SAP SuccessFactors Scraper API running
```

#### Test 2: API Data Check
Open browser: **http://localhost:5000/api/permission-groups**

Should see JSON with 3 groups:
```json
{
  "groups": [
    {
      "groupId": 1,
      "groupName": "Engineering Team",
      ...
    },
    ...
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "pages": 1
  }
}
```

#### Test 3: Frontend Connection Test
Open browser: **http://localhost:3000/test-api**

Click each button:
- ✅ "Test Permission Groups" → Should show success with data
- ✅ "Test Users" → Should show success with 4 users
- ✅ "Test Roles" → Should show success with 3 roles

If any fail, check the error message.

#### Test 4: Permission Groups Page
Open browser: **http://localhost:3000/permission-groups**

Should see:
- ✅ Table with 3 groups
- ✅ "Engineering Team" (2 members)
- ✅ "HR Administrators" (1 member)
- ✅ "All Employees" (4 members)

#### Test 5: Admin Dashboard
Open browser: **http://localhost:3000/admin/dashboard**

Should see:
- ✅ Total Groups: 3
- ✅ Active Members: 4
- ✅ Charts with data

#### Test 6: Employee Portal
Open browser: **http://localhost:3000/employee/demo-user**

Should see:
- ✅ Name: Demo Employee
- ✅ Department: Sales
- ✅ Assigned Groups: 1 (All Employees)

## Troubleshooting

### Issue: "Loading..." Stuck on Frontend

**Cause:** Backend not running or CORS issue

**Fix:**
1. Check backend terminal is running
2. Restart backend: `Ctrl+C` then `npm run dev`
3. Check browser console (F12) for errors

### Issue: Empty Data / No Groups Showing

**Cause:** Database not seeded

**Fix:**
```cmd
cd backend
npm run seed
```

### Issue: CORS Error in Browser Console

**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
1. Make sure backend has latest code with CORS fix
2. Restart backend server (MUST restart after CORS changes)
3. Clear browser cache (Ctrl+Shift+R)

### Issue: Connection Refused

**Error Message:**
```
ERR_CONNECTION_REFUSED
```

**Fix:**
1. Backend is not running
2. Start backend: `cd backend && npm run dev`
3. Check port 5000 is not used by another app

### Issue: MongoDB Connection Failed

**Error Message:**
```
Failed to connect to MongoDB
```

**Fix:**
1. Start MongoDB: `mongod`
2. Check `.env` file has correct MONGO_URL
3. Default: `MONGO_URL=mongodb://localhost:27017/integrtr`

## Browser Console Debugging

### Open DevTools
Press **F12** or Right-click → Inspect

### Check Console Tab
Look for errors (red text):
- ❌ CORS error → Restart backend
- ❌ Network error → Backend not running
- ❌ 404 error → Wrong endpoint
- ✅ No errors → Good!

### Check Network Tab
1. Refresh page
2. Look for `/api/permission-groups` request
3. Click on it
4. Check:
   - **Status:** Should be `200 OK`
   - **Response:** Should have data
   - **Headers:** Check CORS headers present

## Sample Data Overview

After running `npm run seed`, you'll have:

### Users (4)
- **demo-user** - Demo Employee (Sales, Berlin)
- **EMP001** - John Doe (Engineering, New York)
- **EMP002** - Jane Smith (HR, London)
- **EMP003** - Bob Johnson (Engineering, San Francisco)

### Permission Groups (3)
- **Engineering Team** (Dynamic) - 2 members
- **HR Administrators** (Static, RBP Only) - 1 member
- **All Employees** (Dynamic) - 4 members

### Roles (3)
- **HR Administrator** - Full HR access
- **Manager** - Team management
- **Employee Self-Service** - Basic access

## Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Test API | http://localhost:3000/test-api |
| Permission Groups | http://localhost:3000/permission-groups |
| Create Group | http://localhost:3000/permission-groups/new |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Admin Roles | http://localhost:3000/admin/permissions |
| Employee Portal | http://localhost:3000/employee/demo-user |
| Backend Health | http://localhost:5000 |
| API Groups | http://localhost:5000/api/permission-groups |
| API Users | http://localhost:5000/api/users |
| API Roles | http://localhost:5000/api/roles |

## Features to Test

### 1. View Permission Groups
- Go to Permission Groups page
- See list of 3 groups
- Search functionality
- Pagination (if more than 10 groups)

### 2. View Group Details
- Click on "Engineering Team"
- See group information
- See 2 members listed
- See include criteria: department = Engineering

### 3. Create New Group
- Click "Create New Group"
- Fill in form:
  - Name: "Sales Team"
  - Type: Dynamic
  - Include: department = Sales
- Submit
- Should see new group with 1 member (demo-user)

### 4. Link Roles to Groups
- Open a group detail page
- Select a role from dropdown
- Click "Link Role"
- Role appears in table

### 5. View Employee Profile
- Go to Employee Portal
- Enter different user IDs:
  - demo-user
  - EMP001
  - EMP002
- See their groups and roles

### 6. View Dashboard
- Go to Admin Dashboard
- See statistics
- See charts with data

## Success Checklist

- [ ] MongoDB running
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Database seeded (3 groups, 4 users, 3 roles)
- [ ] Test API page shows success
- [ ] Permission Groups page shows 3 groups
- [ ] Admin Dashboard shows statistics
- [ ] Employee Portal shows user data
- [ ] No errors in browser console
- [ ] Can create new groups
- [ ] Can link roles to groups

## Next Steps

Once everything is working:

1. **Explore the UI**
   - Navigate through all pages
   - Test all features
   - Create new groups

2. **Import Your Data**
   - Use API endpoints to import real data
   - See USER_GUIDE.md for API examples

3. **Customize**
   - Modify UI components
   - Add new features
   - Adjust styling

4. **Deploy**
   - Deploy backend to Heroku/Railway/Render
   - Deploy frontend to Vercel/Netlify
   - Use MongoDB Atlas for database

## Getting Help

If you're still having issues:

1. Check **TROUBLESHOOTING.md** for detailed debugging
2. Check **DATA_SOURCE_INFO.md** for data structure
3. Check **USER_GUIDE.md** for usage instructions
4. Check browser console for specific errors
5. Check backend terminal for error messages

## Quick Commands Reference

```cmd
# Start MongoDB
mongod

# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Test API
curl http://localhost:5000/api/permission-groups

# Check MongoDB
mongosh
use integrtr
db.permissiongroups.find()
```

## Environment Variables

### backend/.env
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/integrtr
```

That's it! Your application should now be fully functional. 🎉
