# Quick Start Guide

## The Error You're Seeing

`ECONNREFUSED` means the backend server isn't running. The frontend is trying to connect to `http://localhost:5000` but nothing is there.

## Fix: Start the Backend Server

### Option 1: Use the Batch Files (Easiest)

1. **Start Backend** - Double-click `START_BACKEND.bat`
   - This will start the backend server on port 5000
   - Keep this window open

2. **Seed Sample Data** (First time only) - Double-click `SEED_DATA.bat`
   - This creates sample users, groups, and roles
   - Wait for "Seeding completed!" message

3. **Frontend is already running** - Your Vite dev server is working fine

### Option 2: Manual Commands

Open a **new terminal** (keep your frontend terminal running):

```cmd
cd backend
npm run dev
```

Keep this terminal open. The backend will run on http://localhost:5000

### Option 3: Check if MongoDB is Running

If the backend starts but crashes immediately, MongoDB might not be running:

```cmd
# Start MongoDB (if installed)
mongod

# Or check if it's running as a service
net start MongoDB
```

## Verify It's Working

Once the backend starts, you should see:
```
🚀 Server running on port 5000
MongoDB connection established
```

Then refresh your frontend at http://localhost:3000 - the errors should be gone!

## What Each Server Does

- **Backend (port 5000)**: API server that handles data
- **Frontend (port 3000)**: React app that displays the UI
- **MongoDB (port 27017)**: Database that stores the data

All three need to be running for the app to work.

## Still Having Issues?

### MongoDB Not Installed?

You can install MongoDB or use a cloud database:

**Option A: Install MongoDB locally**
- Download from: https://www.mongodb.com/try/download/community
- Or use chocolatey: `choco install mongodb`

**Option B: Use MongoDB Atlas (Free Cloud)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `backend/.env`:
   ```
   MONGO_URL=your-mongodb-atlas-connection-string
   ```

### Port 5000 Already in Use?

Change the port in `backend/.env`:
```
PORT=5001
```

Then update `frontend/vite.config.js` proxy target to match.

## Next Steps

Once everything is running:
1. Visit http://localhost:3000
2. Click "Permission Groups" to see the management interface
3. Click "Employee Portal" to see the employee view
4. Explore the Admin Dashboard

The sample data includes:
- 4 users (demo-user, EMP001, EMP002, EMP003)
- 3 permission groups
- 3 roles
