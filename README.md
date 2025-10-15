# INTEGRTR - SAP SuccessFactors Integration Platform

Full-stack application for managing SAP SuccessFactors permission groups, roles, and employee data with Admin and Employee portals.

## Project Structure

```
├── backend/              # Node.js + Express API
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions & data seeding
│   ├── scripts/         # Utility scripts (seed data)
│   └── database/        # MongoDB connection
│
└── frontend/            # React + Vite + shadcn/ui
    ├── src/
    │   ├── components/  # Reusable UI components
    │   │   └── ui/      # shadcn/ui components
    │   ├── pages/       # Page components
    │   └── lib/         # Utilities
    └── public/
```

## Quick Start

### 1. Backend Setup

```cmd
cd backend
npm install
npm run seed
npm run dev
```

Backend runs on http://localhost:5000

### 2. Frontend Setup

```cmd
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3000

### 3. Access the App

- **Home**: http://localhost:3000
- **Permission Groups**: http://localhost:3000/permission-groups
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Employee Portal**: http://localhost:3000/employee/demo-user

## Features

### Admin Portal
- **Permission Groups Management**: Create, edit, delete groups with dynamic/static membership
- **Role Management**: Manage permission roles and link them to groups
- **User Management**: View and manage employee data
- **Admin Dashboard**: View charts, statistics, and system health
- **People Pool Criteria**: Define include/exclude rules (department, location, job title, etc.)

### Employee Portal
- **Profile View**: View personal information
- **Groups & Roles**: See assigned permission groups and roles
- **Access Summary**: View all permissions and access levels

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Multer for file uploads

**Frontend:**
- React 18 + Vite
- shadcn/ui + Tailwind CSS
- React Router
- Recharts for data visualization
- Axios for API calls
- Lucide React icons

## Environment Setup

### Backend `.env` file:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/integrtr
```

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)

## Sample Data

Run `npm run seed` in backend to create:
- 4 sample users (demo-user, EMP001, EMP002, EMP003)
- 3 permission groups (Engineering Team, HR Administrators, All Employees)
- 3 roles (HR Administrator, Manager, Employee Self-Service)

## API Endpoints

### Permission Groups
- `GET /api/permission-groups` - Get all groups (search & pagination)
- `GET /api/permission-groups/:id` - Get single group with members
- `POST /api/permission-groups` - Create new group
- `PUT /api/permission-groups/:id` - Update group
- `DELETE /api/permission-groups/:id` - Delete group
- `POST /api/permission-groups/:id/link-role` - Link role to group
- `DELETE /api/permission-groups/:id/unlink-role/:roleId` - Unlink role

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user with groups and roles
- `POST /api/users` - Create user
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

### Roles
- `GET /api/roles` - Get all roles
- `GET /api/roles/:id` - Get role by ID
- `POST /api/roles/import` - Import roles from file

## Troubleshooting

### Backend won't start?
- Make sure MongoDB is running: `mongod`
- Check `.env` file exists in backend folder
- Verify MONGO_URL is correct

### Frontend shows connection errors?
- Make sure backend is running on port 5000
- Check browser console for specific errors

### Port already in use?
- Change PORT in `backend/.env`
- Update proxy in `frontend/vite.config.js`

## Development

- Frontend proxies API requests to backend automatically
- Dynamic groups recalculate members based on criteria
- All timestamps tracked for audit purposes
- Search and pagination on all list views

## License

ISC
