import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Edit, Trash2 } from 'lucide-react'

function PermissionGroupDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [availableRoles, setAvailableRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    fetchGroupDetails()
    fetchAvailableRoles()
  }, [id])

  const fetchGroupDetails = async () => {
    try {
      const response = await axios.get(`/api/permission-groups/${id}`)
      setGroup(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching group:', error)
      setLoading(false)
    }
  }

  const fetchAvailableRoles = async () => {
    try {
      const response = await axios.get('/api/roles')
      setAvailableRoles(response.data)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const handleLinkRole = async () => {
    if (!selectedRole) return
    
    try {
      await axios.post(`/api/permission-groups/${id}/link-role`, {
        roleId: selectedRole
      })
      fetchGroupDetails()
      setSelectedRole('')
    } catch (error) {
      console.error('Error linking role:', error)
      alert('Failed to link role')
    }
  }

  const handleUnlinkRole = async (roleId) => {
    try {
      await axios.delete(`/api/permission-groups/${id}/unlink-role/${roleId}`)
      fetchGroupDetails()
    } catch (error) {
      console.error('Error unlinking role:', error)
      alert('Failed to unlink role')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Permission Group Details" />
        <div className="container mx-auto p-6">
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Permission Group Details" />
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Group not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Permission Group Details" />
      
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{group.groupName}</h2>
          <Button onClick={() => navigate(`/permission-groups/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Group Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Group ID:</span>
                <span className="font-medium">{group.groupId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User Type:</span>
                <span className="font-medium">{group.userType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant={group.type === 'Dynamic' ? 'default' : 'secondary'}>
                  {group.type}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RBP Only:</span>
                <span className="font-medium">{group.isRbpOnly ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Members:</span>
                <span className="font-medium">{group.activeMembershipCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Modified:</span>
                <span className="font-medium">{new Date(group.lastModified).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Include Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              {group.includeCriteria && group.includeCriteria.length > 0 ? (
                <ul className="space-y-2">
                  {group.includeCriteria.map((criteria, index) => (
                    <li key={index} className="p-2 bg-muted rounded">
                      <strong className="text-primary">{criteria.category}:</strong> {criteria.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">No include criteria defined</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exclude Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              {group.excludeCriteria && group.excludeCriteria.length > 0 ? (
                <ul className="space-y-2">
                  {group.excludeCriteria.map((criteria, index) => (
                    <li key={index} className="p-2 bg-muted rounded">
                      <strong className="text-primary">{criteria.category}:</strong> {criteria.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">No exclude criteria defined</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Related Permission Roles</CardTitle>
            <CardDescription>Link roles to this permission group</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
              >
                <option value="">Select a role to link...</option>
                {availableRoles.map(role => (
                  <option key={role._id} value={role._id}>
                    {role.name} (ID: {role.role_id})
                  </option>
                ))}
              </select>
              <Button onClick={handleLinkRole} disabled={!selectedRole}>
                Link Role
              </Button>
            </div>

            {group.relatedPermissionRoles && group.relatedPermissionRoles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role ID</TableHead>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.relatedPermissionRoles.map(role => (
                    <TableRow key={role._id}>
                      <TableCell>{role.role_id}</TableCell>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUnlinkRole(role._id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground italic text-center py-4">No roles linked to this group</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Members ({group.members?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {group.members && group.members.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Job Title</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.members.map(member => (
                    <TableRow key={member._id}>
                      <TableCell>{member.userId}</TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.department || 'N/A'}</TableCell>
                      <TableCell>{member.jobTitle || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground italic text-center py-4">No members in this group</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default PermissionGroupDetail
