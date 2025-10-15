import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Shield, Search } from 'lucide-react'

function AdminPermissions() {
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalResults: 0
    })

    useEffect(() => {
        fetchRoles()
    }, [pagination.currentPage, search])

    const fetchRoles = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://localhost:5000/api/roles', {
                params: {
                    page: pagination.currentPage,
                    limit: 10,
                    search
                }
            })
            setRoles(response.data.data || [])
            setPagination({
                currentPage: response.data.pagination.currentPage,
                totalPages: response.data.pagination.totalPages,
                totalResults: response.data.pagination.totalResults
            })
        } catch (error) {
            console.error('Error fetching roles:', error)
            setRoles([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Header title="Admin Centre" />

            <main className="container mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Manage Permission Roles</CardTitle>
                        <CardDescription>View and manage system permission roles</CardDescription>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search name..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setPagination(prev => ({ ...prev, currentPage: 1 }))
                                    }}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12 text-muted-foreground">Loading roles...</div>
                        ) : roles.length === 0 ? (
                            <div className="text-center py-12">
                                <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">No roles found. Import data to get started.</p>
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Role ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Sub Domain</TableHead>
                                            <TableHead>Last Modified</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {roles.map((role) => (
                                            <TableRow key={role._id} onClick={() => setSelectedRole(role)}>
                                                <TableCell>{role.role_id}</TableCell>
                                                <TableCell className="font-medium">{role.role_name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {role.role_type?.replace('RULE_BASE_ROLE', 'Rule Based') || 'N/A'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={role.status === 'ACTIVE' ? 'default' : 'destructive'}>
                                                        {role.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{role.sub_domain || 'N/A'}</TableCell>
                                                <TableCell>{new Date(role.last_modified).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">View</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {roles.length} of {pagination.totalResults} roles (Page {pagination.currentPage} of {pagination.totalPages})
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={pagination.currentPage === 1}
                                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={pagination.currentPage === pagination.totalPages}
                                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default AdminPermissions
