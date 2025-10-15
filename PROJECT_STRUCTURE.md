# INTEGRTR Project Structure

## Overview
Clean, organized full-stack application with separate backend and frontend.

## Directory Structure

```
integrtr/
│
├── backend/                    # Node.js + Express API
│   ├── controllers/           # Business logic
│   │   ├── group.controller.js
│   │   ├── role.controller.js
│   │   ├── permissionGroup.controller.js
│   │   └── user.controller.js
│   │
│   ├── models/                # MongoDB schemas
│   │   ├── groups.models.js
│   │   ├── roles.models.js
│   │   ├── permissionGroup.models.js
│   │   ├── assignment.models.js
│   │   └── user.models.js
│   │
│   ├── routes/                # API endpoints
│   │   ├── groups.routes.js
│   │   ├── roles.routes.js
│   │   ├── permissionGroup.routes.js
│   │   └── user.routes.js
│   │
│   ├── database/              # Database connection
│   │   └── connection.js
│   │
│   ├── utils/                 # Helper functions
│   │   ├── parseRaw.js       # Data parsing utilities
│   │   └── seedData.js       # Sample data generator
│   │
│   ├── scripts/               # Utility scripts
│   │   └── seed.js           # Database seeding script
│   │
│   ├── .env                   # Environment variables (not in git)
│   ├── .gitignore
│   ├── app.js                 # Main application file
│   └── package.json
│
├── frontend/                   # React + Vite + shadcn/ui
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   │   ├── avatar.jsx
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   └── table.jsx
│   │   │   └── Header.jsx    # App header component
│   │   │
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── PermissionGroups.jsx
│   │   │   ├── PermissionGroupDetail.jsx
│   │   │   ├── AdminPermissions.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── EmployeePortal.jsx
│   │   │
│   │   ├── lib/              # Utilities
│   │   │   └── utils.js      # Helper functions (cn, etc.)
│   │   │
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles (Tailwind)
│   │
│   ├── public/               # Static assets
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   └── postcss.config.js     # PostCSS configuration
│
├── .gitignore                 # Root gitignore
├── README.md                  # Main documentation
├── QUICK_START.md            # Quick start guide
├── PROJECT_STRUCTURE.md      # This file
├── START_BACKEND.bat         # Windows: Start backend
├── START_FRONTEND.bat        # Windows: Start frontend
└── SEED_DATA.bat             # Windows: Seed sample data
```

## Key Files

### Backend
- **app.js**: Main Express application with routes and middleware
- **connection.js**: MongoDB connection setup
- **seedData.js**: Creates sample users, groups, and roles
- **.env**: Environment variables (PORT, MONGO_URL)

### Frontend
- **App.jsx**: Main app with React Router setup
- **index.css**: Tailwind CSS imports and theme variables
- **vite.config.js**: Vite config with proxy to backend
- **tailwind.config.js**: Tailwind theme configuration

## Component Organization

### UI Components (`frontend/src/components/ui/`)
Reusable shadcn/ui components:
- Button, Card, Table, Badge, Avatar, Input
- Fully accessible and customizable
- Styled with Tailwind CSS

### Page Components (`frontend/src/pages/`)
Full page views:
- **Home**: Dashboard with quick actions
- **PermissionGroups**: List and manage groups
- **PermissionGroupDetail**: View group details
- **AdminPermissions**: Manage roles
- **AdminDashboard**: Charts and statistics
- **EmployeePortal**: Employee profile view

## Data Flow

1. **Frontend** makes API calls via Axios
2. **Vite proxy** forwards to backend (localhost:5000)
3. **Express routes** handle requests
4. **Controllers** process business logic
5. **Models** interact with MongoDB
6. **Response** sent back to frontend

## Development Workflow

1. Start MongoDB
2. Run `npm run seed` in backend (first time only)
3. Run `npm run dev` in backend
4. Run `npm run dev` in frontend
5. Access app at http://localhost:3000

## Clean Project Guidelines

- No CSS files (using Tailwind)
- No unused dependencies
- Clear separation of concerns
- Consistent naming conventions
- Proper gitignore for sensitive files
