import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Shield } from 'lucide-react'

function AdminPermissions() {
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles')
      setRoles(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching roles:', error)
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.role_id} onClick={() => setSelectedRole(role)}>
                      <TableCell>{role.role_id}</TableCell>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.userType}</TableCell>
                      <TableCell>
                        <Badge variant={role.status === 'active' ? 'success' : 'destructive'}>
                          {role.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(role.lastModified).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AdminPermissions
