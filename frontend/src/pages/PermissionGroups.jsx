import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Plus, Search, Edit, Trash2, Users } from 'lucide-react'

function PermissionGroups() {
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })

  useEffect(() => {
    fetchGroups()
  }, [pagination.page, search, statusFilter])

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/groups/");

      // If backend sends a plain array:
      if (Array.isArray(response.data)) {
        setGroups(response.data);
        setPagination({ page: 1, pages: 1, total: response.data.length });
      } else {
        setGroups(response.data.groups || []);
        setPagination(response.data.pagination || { page: 1, pages: 1, total: 0 });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error)
      setGroups([])
      setPagination({ page: 1, pages: 1, total: 0 })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this group?')) return

    try {
      await axios.delete(`http://localhost:5000/api/permission-groups/${groupId}`)
      fetchGroups()
    } catch (error) {
      console.error('Error deleting group:', error)
      alert('Failed to delete group')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Admin Centre" />

      <main className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Permission Groups</CardTitle>
                <CardDescription>Create and manage permission groups with dynamic membership</CardDescription>
              </div>
              <Button onClick={() => navigate('/permission-groups/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Group
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPagination(prev => ({ ...prev, page: 1 }))
                  }}
                  className="pl-8"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading groups...</div>
            ) : groups.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No permission groups found. Create one to get started.</p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>RBP Only</TableHead>
                      <TableHead>Active Members</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groups.map((group) => (
                      <TableRow key={group.groupId}>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-medium"
                            onClick={() => navigate(`/permission-groups/${group.groupId}`)}
                          >
                            {group.groupName}
                          </Button>
                        </TableCell>
                        <TableCell>{group.userType}</TableCell>
                        <TableCell>
                          <Badge variant={group.type === 'Dynamic' ? 'default' : 'secondary'}>
                            {group.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={group.status === 'active' ? 'default' : 'destructive'}>
                            {group.status?.toUpperCase() || 'ACTIVE'}
                          </Badge>
                        </TableCell>
                        <TableCell>{group.isRbpOnly ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/permission-groups/${group.groupId}/members`)}
                          >
                            {group.activeMembershipCount}
                          </Button>
                        </TableCell>
                        <TableCell>{new Date(group.lastModified).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/permission-groups/${group.groupId}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(group.groupId)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {groups.length} of {pagination.total} groups (Page {pagination.page} of {pagination.pages})
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === 1 || loading}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page >= pagination.pages || loading}
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
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

export default PermissionGroups
