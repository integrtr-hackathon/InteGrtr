# INTEGRTR - SAP SuccessFactors Integration Platform

Full-stack application for managing SAP SuccessFactors permission groups, roles, and employee data with Admin and Employee portals.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB

### Setup (3 Steps)

1. **Start MongoDB**
```cmd
mongod
```

2. **Start Backend**
```cmd
cd backend
npm install
npm run seed
npm run dev
```

3. **Start Frontend** (new terminal)
```cmd
cd frontend
npm install
npm run dev
```

### Access the App
- **Home**: http://localhost:3000
- **Test API**: http://localhost:3000/test-api
- **Permission Groups**: http://localhost:3000/permission-groups
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Employee Portal**: http://localhost:3000/employee/demo-user

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **START_HERE.md** | Quick 3-step setup guide |
| **FINAL_SETUP.md** | Complete setup with verification |
| **TROUBLESHOOTING.md** | Fix common issues |
| **USER_GUIDE.md** | How to use all features |
| **QUICK_ACTIVITIES.md** | Quick reference for tasks |
| **DATA_SOURCE_INFO.md** | Database structure & API info |
| **PROJECT_STRUCTURE.md** | Code organization |

## ✨ Features

### Admin Portal
- ✅ Create, edit, delete permission groups
- ✅ Dynamic groups (auto-calculated members)
- ✅ Static groups (manual members)
- ✅ Link roles to groups
- ✅ People Pool criteria (department, location, etc.)
- ✅ Search and pagination
- ✅ Dashboard with charts

### Employee Portal
- ✅ View personal profile
- ✅ See assigned permission groups
- ✅ View roles and access rights
- ✅ Access summary

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- CORS enabled
- Multer for file uploads

**Frontend:**
- React 18 + Vite
- shadcn/ui + Tailwind CSS
- React Router
- Recharts for charts
- Axios for API calls
- Lucide React icons

## 📊 Sample Data

After running `npm run seed`:
- 4 Users (demo-user, EMP001, EMP002, EMP003)
- 3 Permission Groups (Engineering Team, HR Administrators, All Employees)
- 3 Roles (HR Administrator, Manager, Employee Self-Service)

## 🔗 API Endpoints

### Permission Groups
- `GET /api/permission-groups` - List all groups
- `GET /api/permission-groups/:id` - Get group details
- `POST /api/permission-groups` - Create group
- `PUT /api/permission-groups/:id` - Update group
- `DELETE /api/permission-groups/:id` - Delete group
- `POST /api/permission-groups/:id/link-role` - Link role
- `DELETE /api/permission-groups/:id/unlink-role/:roleId` - Unlink role

### Users
- `GET /api/users` - List all users
- `GET /api/users/:userId` - Get user details
- `POST /api/users` - Create user
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

### Roles
- `GET /api/roles` - List all roles
- `GET /api/roles/:id` - Get role details
- `POST /api/roles/import` - Import roles

## 🧪 Testing

Visit **http://localhost:3000/test-api** to test API connections.

## 🐛 Troubleshooting

### Data not showing?
1. Check backend is running: `cd backend && npm run dev`
2. Check MongoDB is running: `mongod`
3. Seed database: `cd backend && npm run seed`
4. Visit test page: http://localhost:3000/test-api

### CORS errors?
1. Restart backend server (CORS changes need restart)
2. Clear browser cache (Ctrl+Shift+R)

### More help?
See **TROUBLESHOOTING.md** for detailed debugging.

## 📁 Project Structure

```
├── backend/              # Node.js + Express API
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── scripts/         # Seed script
│
└── frontend/            # React + Vite
    ├── src/
    │   ├── components/  # Reusable components
    │   │   └── ui/      # shadcn/ui components
    │   ├── pages/       # Page components
    │   └── lib/         # Utilities
    └── public/
```

## 🎯 Key Features Explained

### Dynamic Groups
Members are automatically calculated based on criteria:
- Include: `department = "Engineering"` → Includes all engineering employees
- Exclude: `location = "Remote"` → Excludes remote workers
- Updates automatically when user data changes

### Static Groups
Members are added manually and don't change automatically.

### People Pool Criteria
Available categories:
- department, location, country, jobTitle
- division, gender, userType

## 🚢 Deployment

### Backend
- Deploy to: Heroku, Railway, Render
- Use MongoDB Atlas for database

### Frontend
- Deploy to: Vercel, Netlify, GitHub Pages
- Update API URL in production

## 📝 Environment Variables

### backend/.env
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/integrtr
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

ISC

## 🔗 Links

- **Repository**: https://github.com/integrtr-hackathon/InteGrtr
- **Issues**: Report bugs or request features

---

**Made with ❤️ for SAP SuccessFactors Integration**
