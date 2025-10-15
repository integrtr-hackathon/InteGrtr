import { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

function AdminDashboard() {
    const [groups, setGroups] = useState([])
    const [roles, setRoles] = useState([])
    const [stats, setStats] = useState({
        totalGroups: 0,
        totalUsers: 0,
        totalRoles: 0,
        activeMembers: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            
            // Fetch permission groups
            const groupsRes = await axios.get('http://localhost:5000/api/permission-groups/', {
                params: { limit: 100 }
            })
            const permissionGroups = groupsRes.data.groups || []
            setGroups(permissionGroups)

            // Fetch roles
            const rolesRes = await axios.get('http://localhost:5000/api/roles', {
                params: { limit: 100 }
            })
            const rolesData = rolesRes.data.data || rolesRes.data || []
            setRoles(rolesData)

            // Fetch users
            const usersRes = await axios.get('http://localhost:5000/api/users', {
                params: { limit: 1000 }
            })
            const users = usersRes.data.users || usersRes.data || []

            const totalMembers = permissionGroups.reduce((sum, g) => sum + (g.activeMembershipCount || 0), 0)
            const activeUsers = users.filter(u => u.status === 'active').length

            setStats({
                totalGroups: permissionGroups.length,
                totalRoles: rolesData.length,
                totalUsers: users.length,
                totalMembers: totalMembers,
                activeMembers: activeUsers
            })
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const chartData = groups.slice(0, 6).map(g => ({
        name: g.groupName?.substring(0, 10) || 'N/A',
        members: g.activeMembershipCount || 0
    }))

    const integrationData = [
        { month: 'Oct', count: 45 },
        { month: 'Nov', count: 52 },
        { month: 'Dec', count: 48 },
        { month: 'Jan', count: 61 },
        { month: 'Feb', count: 55 }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header title="Admin Centre" />

            <main className="container mx-auto p-6 space-y-6">
                <h2 className="text-3xl font-bold">Admin Centre Dashboard</h2>

                {loading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading dashboard...</div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>ISC Charts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="members" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>System Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Groups:</span>
                                <strong className="text-2xl">{stats.totalGroups}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Roles:</span>
                                <strong className="text-2xl">{stats.totalRoles}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Users:</span>
                                <strong className="text-2xl">{stats.totalUsers}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Active Members:</span>
                                <strong className="text-2xl">{stats.activeMembers}</strong>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Integration Centre</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={integrationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-950">
                        <CardHeader>
                            <CardTitle>System Health</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-green-500"></div>
                                <span className="text-green-700 dark:text-green-300 font-medium">
                                    All systems operational
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted">
                        <CardHeader>
                            <CardTitle>Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">No recent feedback</p>
                        </CardContent>
                    </Card>
                </div>
                )}
            </main>
        </div>
    )
}

export default AdminDashboard
