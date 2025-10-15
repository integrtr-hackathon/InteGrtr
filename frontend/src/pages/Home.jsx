import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Users, Shield, LayoutDashboard, UserCircle, FileText, Settings } from 'lucide-react'

function Home() {
  const navigate = useNavigate()

  const quickActions = [
    { label: 'Permission Groups', path: '/permission-groups', icon: Users, color: 'bg-blue-500' },
    { label: 'Roles', path: '/admin/permissions', icon: Shield, color: 'bg-purple-500' },
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, color: 'bg-green-500' },
    { label: 'Employee Portal', path: '/employee/demo-user', icon: UserCircle, color: 'bg-orange-500' },
    { label: 'Reports', path: '/reports', icon: FileText, color: 'bg-pink-500' },
    { label: 'Settings', path: '/settings', icon: Settings, color: 'bg-gray-500' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Home" />
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access key features and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex-col gap-2"
                        onClick={() => navigate(action.path)}
                      >
                        <div className={`${action.color} p-2 rounded-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium">{action.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organizational Updates</CardTitle>
                <CardDescription>Recent changes and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-center font-medium">My Team</p>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                        <UserCircle className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-center font-medium">Profile</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Status</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="text-sm font-medium">Just now</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <span className="text-sm font-bold">1,234</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Permission Groups</span>
                    <span className="text-sm font-bold">48</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-1/2" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Active Roles</span>
                    <span className="text-sm font-bold">12</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
