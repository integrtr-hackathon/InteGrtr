# Installation Guide

## Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local or MongoDB Atlas)
- **npm** (comes with Node.js)

## Step-by-Step Installation

### 1. Install Backend Dependencies

```cmd
cd backend
npm install
```

### 2. Configure Backend Environment

Create `backend/.env` file:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/integrtr
```

### 3. Start MongoDB

**Windows:**
```cmd
mongod
```

**Or if installed as service:**
```cmd
net start MongoDB
```

### 4. Seed Sample Data (First Time Only)

```cmd
cd backend
npm run seed
```

This creates:
- 4 sample users
- 3 permission groups
- 3 roles

### 5. Start Backend Server

```cmd
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
MongoDB connection established
```

### 6. Install Frontend Dependencies

Open a **new terminal**:

```cmd
cd frontend
npm install
```

This installs:
- React + Vite
- shadcn/ui components
- Tailwind CSS
- Radix UI primitives
- Lucide icons

### 7. Start Frontend Server

```cmd
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in XXXms
➜  Local:   http://localhost:3000/
```

### 8. Access the Application

Open your browser and go to:
- **Home**: http://localhost:3000
- **Permission Groups**: http://localhost:3000/permission-groups
- **Employee Portal**: http://localhost:3000/employee/demo-user

## Quick Start (Windows)

Use the provided batch files:

1. **Double-click** `START_BACKEND.bat` (keep window open)
2. **Double-click** `START_FRONTEND.bat` (keep window open)
3. Open browser to http://localhost:3000

## Troubleshooting

### "Cannot find module 'tailwindcss'"

Run in frontend directory:
```cmd
npm install
```

### "ECONNREFUSED" errors in browser

Backend isn't running. Start it:
```cmd
cd backend
npm run dev
```

### "Failed to connect to MongoDB"

Make sure MongoDB is running:
```cmd
mongod
```

Or check your MONGO_URL in `backend/.env`

### Port 5000 already in use

Change port in `backend/.env`:
```env
PORT=5001
```

Then update `frontend/vite.config.js` proxy target to match.

### Port 3000 already in use

Vite will automatically suggest another port (like 3001).

## Verify Installation

### Backend Health Check

Visit: http://localhost:5000

You should see:
```
✅ SAP SuccessFactors Scraper API running
```

### Frontend Health Check

Visit: http://localhost:3000

You should see the INTEGRTR home page with quick action buttons.

### API Test

```cmd
curl http://localhost:5000/api/permission-groups
```

Should return JSON with permission groups.

## Next Steps

1. Explore the Permission Groups page
2. View the Employee Portal with demo user
3. Check the Admin Dashboard
4. Import your own data via API endpoints

## Development Mode

Both servers run in development mode with:
- **Backend**: Auto-restart on file changes (nodemon)
- **Frontend**: Hot module replacement (Vite HMR)

## Production Build

### Backend
```cmd
cd backend
npm run start
```

### Frontend
```cmd
cd frontend
npm run build
npm run preview
```

The build output will be in `frontend/dist/`
