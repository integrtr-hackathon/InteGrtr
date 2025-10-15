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
            setGroups(permissionGroups)

            // Fetch users for accurate stats
            const usersRes = await axios.get('/api/users?limit=1000')
            const users = usersRes.data.users || []

            const totalMembers = permissionGroups.reduce((sum, g) => sum + (g.activeMembershipCount || 0), 0)
            const activeUsers = users.filter(u => u.status === 'active').length

            setStats({
                totalGroups: permissionGroups.length,
                totalMembers: totalMembers,
                activeMembers: activeUsers
            })
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
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
                                <span className="text-muted-foreground">Total Members:</span>
                                <strong className="text-2xl">{stats.totalMembers}</strong>
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
            </main>
        </div>
    )
}

export default AdminDashboard
