# 🚀 START HERE - Quick Setup

## Prerequisites
- Node.js installed
- MongoDB installed

## 3-Step Setup

### 1️⃣ Start MongoDB
```cmd
mongod
```

### 2️⃣ Start Backend
```cmd
cd backend
npm install
npm run seed
npm run dev
```
✅ Should see: `🚀 Server running on port 5000`

### 3️⃣ Start Frontend (New Terminal)
```cmd
cd frontend
npm install
npm run dev
```
✅ Should see: `Local: http://localhost:3000/`

## 🎯 Test It Works

Visit: **http://localhost:3000/test-api**

Click buttons to test API connection.

## 📱 Main Pages

- **Home**: http://localhost:3000
- **Permission Groups**: http://localhost:3000/permission-groups
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Employee Portal**: http://localhost:3000/employee/demo-user

## ❌ Not Working?

### Backend won't start?
- Check MongoDB is running: `mongod`
- Check port 5000 is free

### Frontend shows "Loading..."?
- Restart backend (Ctrl+C, then `npm run dev`)
- Check browser console (F12) for errors

### No data showing?
- Run seed script: `cd backend && npm run seed`

## 📚 Full Documentation

- **FINAL_SETUP.md** - Complete setup guide
- **TROUBLESHOOTING.md** - Fix common issues
- **USER_GUIDE.md** - How to use the app
- **QUICK_ACTIVITIES.md** - Quick reference

## ✅ Success Indicators

Backend terminal:
```
🚀 Server running on port 5000
MongoDB connection established
```

Frontend shows:
- 3 groups in Permission Groups page
- Statistics in Admin Dashboard
- User profile in Employee Portal

## 🆘 Still Stuck?

1. Check **TROUBLESHOOTING.md**
2. Visit http://localhost:3000/test-api
3. Check browser console (F12)
4. Check backend terminal for errors

---

**That's it! You're ready to go! 🎉**
