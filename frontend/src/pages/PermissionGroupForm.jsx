import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Plus, X } from 'lucide-react'

function PermissionGroupForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    groupName: '',
    userType: 'Employee',
    type: 'Dynamic',
    isRbpOnly: false,
    includeCriteria: [],
    excludeCriteria: []
  })
  const [newIncludeCriteria, setNewIncludeCriteria] = useState({ category: '', value: '' })
  const [newExcludeCriteria, setNewExcludeCriteria] = useState({ category: '', value: '' })
  const [loading, setLoading] = useState(false)

  const criteriaCategories = [
    'department',
    'location',
    'country',
    'jobTitle',
    'division',
    'gender',
    'userType'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/permission-groups', formData)
      alert('Permission group created successfully!')
      navigate(`/permission-groups/${response.data.group.groupId}`)
    } catch (error) {
      console.error('Error creating group:', error)
      alert('Failed to create permission group')
      setLoading(false)
    }
  }

  const addIncludeCriteria = () => {
    if (newIncludeCriteria.category && newIncludeCriteria.value) {
      setFormData({
        ...formData,
        includeCriteria: [...formData.includeCriteria, newIncludeCriteria]
      })
      setNewIncludeCriteria({ category: '', value: '' })
    }
  }

  const addExcludeCriteria = () => {
    if (newExcludeCriteria.category && newExcludeCriteria.value) {
      setFormData({
        ...formData,
        excludeCriteria: [...formData.excludeCriteria, newExcludeCriteria]
      })
      setNewExcludeCriteria({ category: '', value: '' })
    }
  }

  const removeIncludeCriteria = (index) => {
    setFormData({
      ...formData,
      includeCriteria: formData.includeCriteria.filter((_, i) => i !== index)
    })
  }

  const removeExcludeCriteria = (index) => {
    setFormData({
      ...formData,
      excludeCriteria: formData.excludeCriteria.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Create Permission Group" />
      
      <main className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Permission Group</CardTitle>
            <CardDescription>Define a new permission group with dynamic or static membership</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Name *</label>
                  <Input
                    required
                    placeholder="e.g., Sales Team"
                    value={formData.groupName}
                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">User Type *</label>
                  <select
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={formData.userType}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type *</label>
                  <select
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Dynamic">Dynamic</option>
                    <option value="Static">Static</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Dynamic: Members calculated from criteria. Static: Members added manually.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">RBP Only</label>
                  <div className="flex items-center gap-2 h-9">
                    <input
                      type="checkbox"
                      checked={formData.isRbpOnly}
                      onChange={(e) => setFormData({ ...formData, isRbpOnly: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-muted-foreground">Role-Based Permissions Only</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Include Criteria</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Users matching these criteria will be included in the group
                  </p>
                  
                  <div className="flex gap-2 mb-3">
                    <select
                      className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={newIncludeCriteria.category}
                      onChange={(e) => setNewIncludeCriteria({ ...newIncludeCriteria, category: e.target.value })}
                    >
                      <option value="">Select category...</option>
                      {criteriaCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="Value"
                      value={newIncludeCriteria.value}
                      onChange={(e) => setNewIncludeCriteria({ ...newIncludeCriteria, value: e.target.value })}
                    />
                    <Button type="button" onClick={addIncludeCriteria}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.includeCriteria.length > 0 && (
                    <div className="space-y-2">
                      {formData.includeCriteria.map((criteria, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <Badge variant="default">{criteria.category}</Badge>
                          <span className="flex-1">{criteria.value}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIncludeCriteria(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Exclude Criteria</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Users matching these criteria will be excluded from the group
                  </p>
                  
                  <div className="flex gap-2 mb-3">
                    <select
                      className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={newExcludeCriteria.category}
                      onChange={(e) => setNewExcludeCriteria({ ...newExcludeCriteria, category: e.target.value })}
                    >
                      <option value="">Select category...</option>
                      {criteriaCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="Value"
                      value={newExcludeCriteria.value}
                      onChange={(e) => setNewExcludeCriteria({ ...newExcludeCriteria, value: e.target.value })}
                    />
                    <Button type="button" onClick={addExcludeCriteria}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.excludeCriteria.length > 0 && (
                    <div className="space-y-2">
                      {formData.excludeCriteria.map((criteria, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <Badge variant="destructive">{criteria.category}</Badge>
                          <span className="flex-1">{criteria.value}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExcludeCriteria(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Permission Group'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/permission-groups')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default PermissionGroupForm