# Frontend Architecture - Complete Explanation

## Overview

The frontend is a **React 18** application built with **Vite** as the build tool, using **shadcn/ui** components styled with **Tailwind CSS**. It's a Single Page Application (SPA) with client-side routing.

## Technology Stack

### Core Technologies
- **React 18** - UI library for building components
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### UI & Styling
- **shadcn/ui** - Pre-built accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI primitives (used by shadcn/ui)
- **Lucide React** - Icon library

### Data Visualization
- **Recharts** - Chart library for dashboard

### Utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variants

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   │   ├── avatar.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── table.jsx
│   │   └── Header.jsx      # App header
│   │
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── PermissionGroups.jsx
│   │   ├── PermissionGroupDetail.jsx
│   │   ├── PermissionGroupForm.jsx
│   │   ├── AdminPermissions.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── EmployeePortal.jsx
│   │   └── TestAPI.jsx
│   │
│   ├── lib/                # Utilities
│   │   └── utils.js        # Helper functions
│   │
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies
```

## Entry Point Flow

### 1. index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>INTEGRTR</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
- Simple HTML template
- Contains a `<div id="root">` where React mounts
- Loads `main.jsx` as a module

### 2. main.jsx
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```
- Entry point for React
- Creates React root on `#root` element
- Renders `<App />` component
- Imports global CSS (Tailwind)
- Uses StrictMode for development warnings

### 3. App.jsx
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// ... other imports

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test-api" element={<TestAPI />} />
                <Route path="/permission-groups" element={<PermissionGroups />} />
                {/* ... more routes */}
            </Routes>
        </Router>
    )
}
```
- Main application component
- Sets up React Router
- Defines all routes
- Each route maps URL to a component

## Routing System

### How React Router Works

**Client-Side Routing:**
- No page reloads
- URL changes without server requests
- Components swap based on URL
- Browser history API used

**Route Configuration:**
```javascript
<Route path="/permission-groups" element={<PermissionGroups />} />
```
- `path`: URL pattern
- `element`: Component to render

**Navigation:**
```javascript
const navigate = useNavigate()
navigate('/permission-groups')  // Programmatic navigation
```

**Route Parameters:**
```javascript
<Route path="/permission-groups/:id" element={<PermissionGroupDetail />} />

// In component:
const { id } = useParams()  // Gets :id from URL
```

### All Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Home | Landing page with quick actions |
| `/test-api` | TestAPI | API connection testing |
| `/permission-groups` | PermissionGroups | List all groups |
| `/permission-groups/new` | PermissionGroupForm | Create new group |
| `/permission-groups/:id` | PermissionGroupDetail | View group details |
| `/admin/permissions` | AdminPermissions | Manage roles |
| `/admin/dashboard` | AdminDashboard | Admin dashboard |
| `/employee/:userId` | EmployeePortal | Employee profile |

## Component Architecture

### Component Types

**1. Page Components** (`src/pages/`)
- Full page views
- Handle data fetching
- Manage local state
- Use layout components

**2. Layout Components** (`src/components/`)
- Reusable across pages
- Example: Header

**3. UI Components** (`src/components/ui/`)
- shadcn/ui components
- Highly reusable
- Styled with Tailwind
- Accessible by default

### Component Lifecycle

**Typical Page Component:**
```javascript
function PermissionGroups() {
  // 1. State management
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  
  // 2. Side effects (data fetching)
  useEffect(() => {
    fetchGroups()
  }, [])
  
  // 3. Event handlers
  const fetchGroups = async () => {
    const response = await axios.get('/api/permission-groups')
    setGroups(response.data.groups)
  }
  
  // 4. Render UI
  return (
    <div>
      {loading ? <Loading /> : <Table data={groups} />}
    </div>
  )
}
```

## State Management

### React Hooks Used

**useState** - Local component state
```javascript
const [groups, setGroups] = useState([])
// groups: current value
// setGroups: function to update value
```

**useEffect** - Side effects (API calls, subscriptions)
```javascript
useEffect(() => {
  fetchData()  // Runs after component mounts
}, [])  // Empty array = run once
```

**useNavigate** - Programmatic navigation
```javascript
const navigate = useNavigate()
navigate('/permission-groups')
```

**useParams** - Get URL parameters
```javascript
const { id } = useParams()  // From /groups/:id
```

### State Flow Example

**PermissionGroups.jsx:**
```javascript
// 1. Initial state
const [groups, setGroups] = useState([])  // Empty array

// 2. Fetch data on mount
useEffect(() => {
  fetchGroups()
}, [])

// 3. Update state with API data
const fetchGroups = async () => {
  const response = await axios.get('/api/permission-groups')
  setGroups(response.data.groups)  // Updates state
}

// 4. React re-renders with new data
return <Table data={groups} />
```

## Data Fetching

### Axios Configuration

**Base Setup:**
```javascript
import axios from 'axios'

// Vite proxy handles /api → http://localhost:5000
axios.get('/api/permission-groups')
```

**Proxy Configuration** (vite.config.js):
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

### API Call Pattern

**Standard Pattern:**
```javascript
const fetchData = async () => {
  try {
    setLoading(true)
    const response = await axios.get('/api/endpoint')
    setData(response.data)
    setLoading(false)
  } catch (error) {
    console.error('Error:', error)
    setLoading(false)
  }
}
```

**With Parameters:**
```javascript
axios.get('/api/permission-groups', {
  params: { search, page, limit }
})
// Becomes: /api/permission-groups?search=...&page=1&limit=10
```

**POST Request:**
```javascript
axios.post('/api/permission-groups', {
  groupName: 'Sales Team',
  userType: 'Employee'
})
```

**DELETE Request:**
```javascript
axios.delete(`/api/permission-groups/${groupId}`)
```

## Styling System

### Tailwind CSS

**Utility-First Approach:**
```javascript
<div className="flex items-center gap-4 p-6 bg-white rounded-lg">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

**Common Utilities:**
- Layout: `flex`, `grid`, `container`
- Spacing: `p-4` (padding), `m-4` (margin), `gap-4`
- Colors: `bg-blue-500`, `text-white`
- Typography: `text-xl`, `font-bold`
- Borders: `rounded-lg`, `border`

### shadcn/ui Components

**Pre-built, Accessible Components:**

**Button:**
```javascript
<Button variant="default" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

**Card:**
```javascript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Table:**
```javascript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Theme System

**CSS Variables** (index.css):
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}
```

**Usage:**
```javascript
<div className="bg-background text-foreground">
  <Button className="bg-primary">Click</Button>
</div>
```

## Page Components Explained

### 1. Home.jsx

**Purpose:** Landing page with quick actions

**Key Features:**
- Quick action buttons (grid layout)
- Organizational updates cards
- System status sidebar
- Navigation to other pages

**State:**
```javascript
// No state - static content
```

**UI Structure:**
```
Header
└── Container
    ├── Quick Actions (Card with Buttons)
    ├── Organizational Updates (Cards)
    └── Sidebar (System Status)
```

**Navigation:**
```javascript
<Button onClick={() => navigate('/permission-groups')}>
  Permission Groups
</Button>
```

### 2. PermissionGroups.jsx

**Purpose:** List all permission groups

**Key Features:**
- Table of groups
- Search functionality
- Pagination
- Create/Edit/Delete actions

**State:**
```javascript
const [groups, setGroups] = useState([])
const [loading, setLoading] = useState(true)
const [search, setSearch] = useState('')
const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
```

**Data Flow:**
```
1. Component mounts
2. useEffect triggers fetchGroups()
3. API call: GET /api/permission-groups
4. Update state with response
5. React re-renders table
```

**Search Implementation:**
```javascript
useEffect(() => {
  fetchGroups()  // Re-fetch when search changes
}, [search])

const fetchGroups = async () => {
  const response = await axios.get('/api/permission-groups', {
    params: { search, page, limit: 10 }
  })
  setGroups(response.data.groups)
}
```

**UI Structure:**
```
Header
└── Card
    ├── CardHeader (Title + Create Button + Search)
    └── CardContent
        ├── Table (if data)
        ├── Empty State (if no data)
        └── Pagination
```

### 3. PermissionGroupDetail.jsx

**Purpose:** View single group details

**Key Features:**
- Group information
- Include/Exclude criteria
- Related roles (link/unlink)
- Current members list

**State:**
```javascript
const [group, setGroup] = useState(null)
const [loading, setLoading] = useState(true)
const [availableRoles, setAvailableRoles] = useState([])
const [selectedRole, setSelectedRole] = useState('')
```

**URL Parameter:**
```javascript
const { id } = useParams()  // From /permission-groups/:id
```

**Data Flow:**
```
1. Get ID from URL
2. Fetch group: GET /api/permission-groups/:id
3. Fetch roles: GET /api/roles
4. Display group with populated members and roles
```

**Link Role:**
```javascript
const handleLinkRole = async () => {
  await axios.post(`/api/permission-groups/${id}/link-role`, {
    roleId: selectedRole
  })
  fetchGroupDetails()  // Refresh data
}
```

### 4. PermissionGroupForm.jsx

**Purpose:** Create new permission group

**Key Features:**
- Form with validation
- Add/remove criteria
- Dynamic/Static type selection
- Submit to API

**State:**
```javascript
const [formData, setFormData] = useState({
  groupName: '',
  userType: 'Employee',
  type: 'Dynamic',
  isRbpOnly: false,
  includeCriteria: [],
  excludeCriteria: []
})
```

**Form Handling:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  const response = await axios.post('/api/permission-groups', formData)
  navigate(`/permission-groups/${response.data.group.groupId}`)
}
```

**Criteria Management:**
```javascript
const addIncludeCriteria = () => {
  setFormData({
    ...formData,
    includeCriteria: [...formData.includeCriteria, newCriteria]
  })
}
```

### 5. AdminDashboard.jsx

**Purpose:** Admin overview with statistics

**Key Features:**
- Statistics cards
- Charts (Recharts)
- System health
- Integration data

**State:**
```javascript
const [groups, setGroups] = useState([])
const [stats, setStats] = useState({
  totalGroups: 0,
  totalMembers: 0,
  activeMembers: 0
})
```

**Data Aggregation:**
```javascript
const fetchDashboardData = async () => {
  const groupsRes = await axios.get('/api/permission-groups?limit=100')
  const usersRes = await axios.get('/api/users?limit=1000')
  
  // Calculate stats
  setStats({
    totalGroups: groupsRes.data.groups.length,
    activeMembers: usersRes.data.users.filter(u => u.status === 'active').length
  })
}
```

**Charts:**
```javascript
<ResponsiveContainer width="100%" height={200}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="members" fill="hsl(var(--primary))" />
  </BarChart>
</ResponsiveContainer>
```

### 6. EmployeePortal.jsx

**Purpose:** Employee profile view

**Key Features:**
- Personal information
- Assigned groups
- Roles through groups
- Read-only view

**State:**
```javascript
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
```

**URL Parameter:**
```javascript
const { userId } = useParams()  // From /employee/:userId
```

**Data Flow:**
```
1. Get userId from URL
2. Fetch user: GET /api/users/:userId
3. User data includes populated groups
4. Groups include populated roles
5. Display nested data
```

**Nested Data Display:**
```javascript
{user.groupIds.map(group => (
  <Card key={group._id}>
    <h4>{group.groupName}</h4>
    {group.relatedPermissionRoles.map(role => (
      <Badge key={role._id}>{role.name}</Badge>
    ))}
  </Card>
))}
```

### 7. TestAPI.jsx

**Purpose:** Debug API connections

**Key Features:**
- Test buttons for each endpoint
- Display response/error
- Debug information

**State:**
```javascript
const [result, setResult] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

**Test Function:**
```javascript
const testAPI = async (endpoint) => {
  try {
    const response = await fetch(endpoint)
    const data = await response.json()
    setResult(JSON.stringify(data, null, 2))
  } catch (err) {
    setError(err.message)
  }
}
```

## Common Patterns

### Loading States

```javascript
{loading ? (
  <div>Loading...</div>
) : (
  <Table data={data} />
)}
```

### Empty States

```javascript
{data.length === 0 ? (
  <div>
    <Icon />
    <p>No data found</p>
  </div>
) : (
  <Table data={data} />
)}
```

### Error Handling

```javascript
try {
  await axios.post('/api/endpoint', data)
  alert('Success!')
} catch (error) {
  console.error('Error:', error)
  alert('Failed!')
}
```

### Conditional Rendering

```javascript
{user.status === 'active' ? (
  <Badge variant="success">Active</Badge>
) : (
  <Badge variant="destructive">Inactive</Badge>
)}
```

### List Rendering

```javascript
{groups.map((group) => (
  <TableRow key={group.groupId}>
    <TableCell>{group.groupName}</TableCell>
  </TableRow>
))}
```

## Build & Development

### Development Server

```cmd
npm run dev
```
- Starts Vite dev server
- Hot Module Replacement (HMR)
- Fast refresh
- Port 3000

### Build for Production

```cmd
npm run build
```
- Creates optimized bundle
- Output in `dist/` folder
- Minified and tree-shaken

### Preview Production Build

```cmd
npm run preview
```
- Serves production build locally
- Test before deployment

## Configuration Files

### vite.config.js

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```
- React plugin
- Dev server port
- API proxy configuration

### tailwind.config.js

```javascript
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        // ... more colors
      }
    }
  }
}
```
- Content paths for Tailwind
- Theme customization
- Color system

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
- PostCSS plugins
- Tailwind processing
- Autoprefixer for browser compatibility

## Performance Optimizations

### Code Splitting

React Router automatically splits code by route:
```javascript
// Each page is a separate chunk
<Route path="/permission-groups" element={<PermissionGroups />} />
```

### Lazy Loading

Can be added for larger components:
```javascript
const PermissionGroups = lazy(() => import('./pages/PermissionGroups'))
```

### Memoization

Prevent unnecessary re-renders:
```javascript
const MemoizedTable = React.memo(Table)
```

## Best Practices Used

1. **Component Composition** - Small, reusable components
2. **Single Responsibility** - Each component has one job
3. **Props Drilling Avoided** - Use context or state management if needed
4. **Consistent Naming** - Clear, descriptive names
5. **Error Boundaries** - Catch errors gracefully
6. **Accessibility** - shadcn/ui components are accessible
7. **Responsive Design** - Mobile-first approach
8. **Loading States** - Always show loading indicators
9. **Error Handling** - Try-catch for async operations
10. **Clean Code** - Readable, maintainable code

## Summary

The frontend is a modern React SPA that:
- Uses Vite for fast development
- Implements client-side routing with React Router
- Fetches data from backend API via Axios
- Styles with Tailwind CSS and shadcn/ui
- Manages state with React hooks
- Provides admin and employee interfaces
- Includes debugging tools
- Is fully responsive and accessible

**Key Concepts:**
- Component-based architecture
- Declarative UI (React)
- State management (useState, useEffect)
- Client-side routing (React Router)
- API integration (Axios)
- Utility-first CSS (Tailwind)
- Accessible components (shadcn/ui)
