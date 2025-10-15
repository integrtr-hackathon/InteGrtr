import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Mail, Briefcase, MapPin, Globe, Building, User } from 'lucide-react'

function EmployeePortal() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`)
      setUser(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Employee Portal" />
        <div className="container mx-auto p-6">
          <div className="text-center py-12 text-muted-foreground">Loading profile...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Employee Portal" />
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">User not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Employee Portal" />
      
      <main className="container mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">User ID: {user.userId}</p>
                <Badge variant={user.status === 'active' ? 'success' : 'destructive'} className="mt-2">
                  {user.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Job Title</p>
                  <p className="font-medium">{user.jobTitle || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{user.department || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{user.location || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{user.country || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">User Type</p>
                  <p className="font-medium">{user.userType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Permission Groups</CardTitle>
              <CardDescription>
                {user.groupIds?.length || 0} group{user.groupIds?.length !== 1 ? 's' : ''} assigned
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.groupIds && user.groupIds.length > 0 ? (
                <div className="space-y-3">
                  {user.groupIds.map(group => (
                    <Card key={group._id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-1">{group.groupName}</h4>
                        <p className="text-sm text-muted-foreground mb-2">Group ID: {group.groupId}</p>
                        
                        {group.relatedPermissionRoles && group.relatedPermissionRoles.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm font-medium mb-2">Roles:</p>
                            <div className="flex flex-wrap gap-2">
                              {group.relatedPermissionRoles.map(role => (
                                <Badge key={role._id} variant="secondary">
                                  {role.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  You are not assigned to any permission groups
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Permissions & Access</CardTitle>
            <CardDescription>Overview of your access rights</CardDescription>
          </CardHeader>
          <CardContent>
            {user.groupIds && user.groupIds.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  You have access through the following permission groups:
                </p>
                {user.groupIds.map(group => (
                  <div key={group._id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{group.groupName}</p>
                      {group.relatedPermissionRoles && group.relatedPermissionRoles.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {group.relatedPermissionRoles.length} role(s) assigned
                        </p>
                      )}
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No permissions assigned. Contact your administrator for access.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default EmployeePortal
