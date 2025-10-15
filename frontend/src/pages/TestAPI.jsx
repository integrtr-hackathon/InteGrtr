import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

function TestAPI() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const testAPI = async (endpoint) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>API Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => testAPI('/api/permission-groups')}>
              Test Permission Groups
            </Button>
            <Button onClick={() => testAPI('/api/users')}>
              Test Users
            </Button>
            <Button onClick={() => testAPI('/api/roles')}>
              Test Roles
            </Button>
            <Button onClick={() => testAPI('http://localhost:5000/api/permission-groups')}>
              Test Direct (5000)
            </Button>
          </div>

          {loading && (
            <div className="p-4 bg-blue-50 rounded">
              Loading...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-50 rounded">
              <strong>Success! Response:</strong>
              <pre className="mt-2 text-xs overflow-auto max-h-96">
                {result}
              </pre>
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded text-sm">
            <strong>Debug Info:</strong>
            <ul className="mt-2 space-y-1">
              <li>Frontend URL: {window.location.origin}</li>
              <li>Expected Backend: http://localhost:5000</li>
              <li>Proxy configured: /api → http://localhost:5000</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TestAPI
