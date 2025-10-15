# Troubleshooting - Data Not Showing

## Issue
Frontend is unable to fetch data from backend and not showing on the frontend.

## Steps to Fix

### 1. ✅ Fixed CORS Configuration

**Problem:** Backend CORS was configured to only allow `process.env.FRONTEND_URL` which wasn't set.

**Solution:** Updated `backend/app.js` to allow localhost ports:
```javascript
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
```

### 2. Test API Connection

Visit: **http://localhost:3000/test-api**

This page lets you test the API connection with buttons to:
- Test Permission Groups API
- Test Users API
- Test Roles API
- Test Direct Connection (bypass proxy)

### 3. Restart Both Servers

**IMPORTANT:** You must restart the backend for CORS changes to take effect!

```cmd
# Stop backend (Ctrl+C)
# Then restart:
cd backend
npm run dev

# Frontend should auto-reload, but if not:
cd frontend
npm run dev
```

### 4. Verify Backend is Running

```cmd
curl http://localhost:5000/api/permission-groups
```

Should return JSON with groups array.

### 5. Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors (especially CORS errors)
4. Go to Network tab
5. Refresh page
6. Check if API calls are being made
7. Click on API calls to see response

### 6. Common Issues & Solutions

#### Issue: CORS Error in Console
```
Access to XMLHttpRequest at 'http://localhost:5000/api/permission-groups' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
- Restart backend server (CORS changes require restart)
- Check backend console shows: `🚀 Server running on port 5000`

#### Issue: Network Error / ERR_CONNECTION_REFUSED
```
Error: Network Error
```

**Solution:**
- Backend is not running
- Start backend: `cd backend && npm run dev`
- Check port 5000 is not used by another app

#### Issue: 404 Not Found
```
GET http://localhost:3000/api/permission-groups 404 (Not Found)
```

**Solution:**
- Vite proxy not working
- Try direct URL: http://localhost:5000/api/permission-groups
- Restart frontend server

#### Issue: Empty Array Returned
```json
{"groups":[],"pagination":{"total":0,"page":1,"pages":0}}
```

**Solution:**
- Database is empty
- Run seed script: `cd backend && npm run seed`

#### Issue: MongoDB Connection Error
```
Failed to connect to MongoDB
```

**Solution:**
- Start MongoDB: `mongod`
- Or: `net start MongoDB`
- Check MONGO_URL in `backend/.env`

### 7. Step-by-Step Debugging

**Step 1: Test Backend Directly**
```cmd
curl http://localhost:5000/api/permission-groups
```
✅ Should return JSON with data  
❌ If error, backend issue

**Step 2: Test Frontend Proxy**
1. Go to http://localhost:3000/test-api
2. Click "Test Permission Groups"
3. Should show success with data

**Step 3: Check Browser Network Tab**
1. Open http://localhost:3000/permission-groups
2. Open DevTools (F12) → Network tab
3. Refresh page
4. Look for `/api/permission-groups` request
5. Click on it to see:
   - Status: Should be 200
   - Response: Should have data

**Step 4: Check Console for Errors**
1. DevTools (F12) → Console tab
2. Look for red errors
3. Common errors:
   - CORS error → Restart backend
   - Network error → Backend not running
   - 404 error → Wrong endpoint

### 8. Quick Fix Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB running
- [ ] Database seeded (`npm run seed`)
- [ ] Backend restarted after CORS fix
- [ ] No CORS errors in console
- [ ] API returns data when tested directly
- [ ] Browser cache cleared (Ctrl+Shift+R)

### 9. Test Commands

```cmd
# Test backend health
curl http://localhost:5000/

# Test permission groups
curl http://localhost:5000/api/permission-groups

# Test users
curl http://localhost:5000/api/users

# Test roles
curl http://localhost:5000/api/roles

# Check MongoDB
mongosh
use integrtr
db.permissiongroups.countDocuments()
db.users.countDocuments()
```

### 10. Expected Behavior

**When Working Correctly:**

1. **Permission Groups Page** (http://localhost:3000/permission-groups)
   - Shows table with 3 groups
   - No "Loading..." stuck
   - No errors in console

2. **Admin Dashboard** (http://localhost:3000/admin/dashboard)
   - Shows statistics: 3 groups, 4 users
   - Charts display data
   - No empty states

3. **Employee Portal** (http://localhost:3000/employee/demo-user)
   - Shows user profile
   - Shows assigned groups
   - Shows roles

4. **Browser Console**
   - No red errors
   - Network tab shows 200 status for API calls
   - Response data visible

### 11. If Still Not Working

1. **Clear everything and start fresh:**
```cmd
# Stop both servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm run dev
```

2. **Check ports:**
```cmd
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID <PID> /F
```

3. **Try different browser:**
- Chrome/Edge might cache differently
- Try incognito mode
- Try Firefox

4. **Check firewall:**
- Allow Node.js through firewall
- Allow ports 3000 and 5000

### 12. Success Indicators

✅ Backend console shows:
```
🚀 Server running on port 5000
MongoDB connection established
```

✅ Frontend console shows no errors

✅ Network tab shows:
```
GET /api/permission-groups → 200 OK
Response: {"groups":[...], "pagination":{...}}
```

✅ Page displays data in tables

## Need More Help?

1. Check `DATA_SOURCE_INFO.md` for data structure
2. Check `USER_GUIDE.md` for usage instructions
3. Check browser console for specific errors
4. Check backend terminal for error messages
