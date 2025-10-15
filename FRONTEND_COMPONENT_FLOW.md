# Frontend Component Flow & Data Flow

## Visual Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    index.html                          │  │
│  │              <div id="root"></div>                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    main.jsx                            │  │
│  │         ReactDOM.createRoot().render(<App />)         │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     App.jsx                            │  │
│  │              <Router> + <Routes>                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Page Components                       │  │
│  │  Home | Groups | Dashboard | Employee | etc.          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Router
    ├── Route: / → Home
    │   ├── Header
    │   ├── Card (Quick Actions)
    │   │   └── Button (multiple)
    │   ├── Card (Org Updates)
    │   └── Sidebar
    │
    ├── Route: /permission-groups → PermissionGroups
    │   ├── Header
    │   └── Card
    │       ├── CardHeader
    │       │   ├── CardTitle
    │       │   ├── Button (Create)
    │       │   └── Input (Search)
    │       └── CardContent
    │           ├── Table
    │           │   ├── TableHeader
    │           │   └── TableBody
    │           │       └── TableRow (multiple)
    │           │           └── TableCell (multiple)
    │           └── Pagination
    │
    ├── Route: /permission-groups/:id → PermissionGroupDetail
    │   ├── Header
    │   ├── Card (Group Info)
    │   ├── Card (Include Criteria)
    │   ├── Card (Exclude Criteria)
    │   ├── Card (Related Roles)
    │   │   ├── Select (dropdown)
    │   │   ├── Button (Link)
    │   │   └── Table (roles)
    │   └── Card (Members)
    │       └── Table (members)
    │
    ├── Route: /permission-groups/new → PermissionGroupForm
    │   ├── Header
    │   └── Card
    │       └── Form
    │           ├── Input (Group Name)
    │           ├── Select (User Type)
    │           ├── Select (Type)
    │           ├── Checkbox (RBP Only)
    │           ├── Criteria Section
    │           │   ├── Select (Category)
    │           │   ├── Input (Value)
    │           │   └── Button (Add)
    │           └── Button (Submit)
    │
    ├── Route: /admin/dashboard → AdminDashboard
    │   ├── Header
    │   ├── Card (ISC Charts)
    │   │   └── BarChart
    │   ├── Card (Statistics)
    │   ├── Card (Integration)
    │   │   └── BarChart
    │   ├── Card (System Health)
    │   └── Card (Feedback)
    │
    ├── Route: /employee/:userId → EmployeePortal
    │   ├── Header
    │   ├── Card (Profile Header)
    │   │   └── Avatar
    │   ├── Card (Personal Info)
    │   ├── Card (My Groups)
    │   │   └── Card (per group)
    │   │       └── Badge (per role)
    │   └── Card (Permissions)
    │
    └── Route: /test-api → TestAPI
        └── Card
            ├── Button (multiple tests)
            └── Result Display
```

## Data Flow Diagram

### Example: PermissionGroups Page

```
┌─────────────────────────────────────────────────────────────┐
│                    User Action                               │
│              (Opens /permission-groups)                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  React Router                                │
│         Matches route → Renders PermissionGroups            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              PermissionGroups Component                      │
│                                                              │
│  1. Component Mounts                                         │
│     const [groups, setGroups] = useState([])                │
│     const [loading, setLoading] = useState(true)            │
│                                                              │
│  2. useEffect Triggers                                       │
│     useEffect(() => { fetchGroups() }, [])                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   fetchGroups()                              │
│                                                              │
│  1. setLoading(true)                                         │
│  2. axios.get('/api/permission-groups')                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Vite Dev Server                             │
│         Proxy: /api → http://localhost:5000                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend API                                 │
│    GET http://localhost:5000/api/permission-groups         │
│                                                              │
│    Returns: { groups: [...], pagination: {...} }           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Response Handling                               │
│                                                              │
│  1. setGroups(response.data.groups)                         │
│  2. setPagination(response.data.pagination)                 │
│  3. setLoading(false)                                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  React Re-render                             │
│                                                              │
│  State changed → Component re-renders                        │
│  loading = false → Shows table                              │
│  groups = [...] → Renders rows                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   UI Updates                                 │
│                                                              │
│  Table displays with 3 groups:                              │
│  - Engineering Team                                          │
│  - HR Administrators                                         │
│  - All Employees                                             │
└─────────────────────────────────────────────────────────────┘
```

## State Management Flow

### Local State (useState)

```
Component
    ↓
useState Hook
    ↓
State Variable + Setter Function
    ↓
State Changes → Re-render
    ↓
Updated UI
```

**Example:**
```javascript
// Initial state
const [groups, setGroups] = useState([])  // groups = []

// Update state
setGroups([{id: 1, name: 'Team'}])  // groups = [{...}]

// React automatically re-renders component with new data
```

### Effect Hook (useEffect)

```
Component Mounts
    ↓
useEffect Runs
    ↓
Side Effect (API call, subscription, etc.)
    ↓
State Update
    ↓
Component Re-renders
```

**Example:**
```javascript
useEffect(() => {
  // Runs after component mounts
  fetchData()
}, [])  // Empty deps = run once

useEffect(() => {
  // Runs when 'search' changes
  fetchData()
}, [search])  // Deps array
```

## Event Flow

### User Interaction Example: Delete Group

```
1. User clicks Delete button
   ↓
2. onClick handler triggered
   onClick={() => handleDelete(groupId)}
   ↓
3. Confirmation dialog
   if (!confirm('Are you sure?')) return
   ↓
4. API call
   await axios.delete(`/api/permission-groups/${groupId}`)
   ↓
5. Success response
   ↓
6. Refresh data
   fetchGroups()
   ↓
7. State updates
   setGroups(newGroups)
   ↓
8. UI re-renders
   Table shows updated list
```

## Form Handling Flow

### Example: Create Group Form

```
1. User types in input
   ↓
2. onChange event
   onChange={(e) => setFormData({...formData, name: e.target.value})}
   ↓
3. State updates
   formData.name = "Sales Team"
   ↓
4. Input value reflects state
   value={formData.name}
   ↓
5. User submits form
   ↓
6. onSubmit handler
   e.preventDefault()
   ↓
7. Validation
   if (!formData.name) return
   ↓
8. API call
   await axios.post('/api/permission-groups', formData)
   ↓
9. Success
   ↓
10. Navigate to detail page
    navigate(`/permission-groups/${newId}`)
```

## Navigation Flow

### Client-Side Navigation

```
User clicks link/button
    ↓
navigate('/permission-groups')
    ↓
React Router updates URL
    ↓
No page reload!
    ↓
Router matches new URL to route
    ↓
Renders new component
    ↓
Old component unmounts
New component mounts
    ↓
New component's useEffect runs
    ↓
Fetches data for new page
    ↓
Displays new page
```

**vs Traditional Navigation:**
```
User clicks link
    ↓
Browser requests new page from server
    ↓
Full page reload
    ↓
Server sends HTML
    ↓
Browser renders new page
    ↓
All JavaScript re-executes
```

## Component Lifecycle

### Functional Component with Hooks

```
1. Component Function Called
   ↓
2. useState initializes state
   ↓
3. Component returns JSX
   ↓
4. React renders to DOM
   ↓
5. useEffect runs (after render)
   ↓
6. State updates (from API, user input, etc.)
   ↓
7. Component re-renders
   ↓
8. useEffect runs again (if dependencies changed)
   ↓
9. Component unmounts (when navigating away)
   ↓
10. Cleanup functions run (if any)
```

## Styling Flow

### Tailwind CSS Processing

```
1. Write JSX with Tailwind classes
   <div className="flex items-center gap-4">
   ↓
2. Vite processes file
   ↓
3. PostCSS + Tailwind plugin
   ↓
4. Generates CSS for used classes only
   ↓
5. CSS injected into page
   ↓
6. Styles applied to elements
```

### shadcn/ui Component

```
1. Import component
   import { Button } from './components/ui/button'
   ↓
2. Use component
   <Button variant="default">Click</Button>
   ↓
3. Component uses class-variance-authority
   ↓
4. Applies variant-specific classes
   ↓
5. Tailwind processes classes
   ↓
6. Styled button rendered
```

## Build Process

### Development Mode

```
npm run dev
    ↓
Vite starts dev server
    ↓
Watches for file changes
    ↓
Hot Module Replacement (HMR)
    ↓
Changes reflect instantly
    ↓
No full page reload
```

### Production Build

```
npm run build
    ↓
Vite bundles all files
    ↓
Optimizations:
- Minification
- Tree shaking
- Code splitting
- Asset optimization
    ↓
Output to dist/ folder
    ↓
Ready for deployment
```

## API Integration Pattern

### Standard API Call Pattern

```javascript
// 1. Define state
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

// 2. Define fetch function
const fetchData = async () => {
  try {
    setLoading(true)
    setError(null)
    
    const response = await axios.get('/api/endpoint')
    
    setData(response.data)
    setLoading(false)
  } catch (err) {
    setError(err.message)
    setLoading(false)
  }
}

// 3. Call on mount
useEffect(() => {
  fetchData()
}, [])

// 4. Render based on state
return (
  <>
    {loading && <Loading />}
    {error && <Error message={error} />}
    {data && <DataDisplay data={data} />}
  </>
)
```

## Summary

The frontend follows a clear flow:

1. **Entry**: index.html → main.jsx → App.jsx
2. **Routing**: React Router matches URL to component
3. **Component**: Mounts → Fetches data → Renders UI
4. **State**: useState manages data, useEffect handles side effects
5. **API**: Axios calls backend, Vite proxies requests
6. **UI**: shadcn/ui components styled with Tailwind
7. **Updates**: State changes trigger re-renders
8. **Navigation**: Client-side routing, no page reloads

**Key Principles:**
- Declarative UI (describe what, not how)
- Component composition (small, reusable pieces)
- Unidirectional data flow (props down, events up)
- State-driven rendering (UI = f(state))
- Side effects in useEffect (API calls, subscriptions)
