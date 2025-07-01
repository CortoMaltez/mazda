'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Facebook, 
  Share2, 
  BarChart3, 
  Users, 
  MessageSquare, 
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

export function MetaIntegrationTest() {
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('Test de publication Meta API')

  const runTest = async (testType: string) => {
    setLoading(true)
    try {
      let response
      let data

      switch (testType) {
        case 'auth':
          // Test d'authentification
          response = await fetch('/api/auth/facebook')
          data = { status: response.status, url: response.url }
          break

        case 'pages':
          // Test de récupération des pages
          response = await fetch('/api/social/facebook/pages')
          data = await response.json()
          break

        case 'publish':
          // Test de publication
          response = await fetch('/api/social/facebook/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pageId: 'test-page-id',
              message: message
            })
          })
          data = await response.json()
          break

        case 'insights':
          // Test d'insights
          response = await fetch('/api/social/facebook/insights?pageId=test-page-id')
          data = await response.json()
          break

        default:
          data = { error: 'Test inconnu' }
      }

      setTestResults(prev => ({
        ...prev,
        [testType]: {
          success: response?.ok || false,
          data,
          timestamp: new Date().toISOString()
        }
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testType]: {
          success: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue',
          timestamp: new Date().toISOString()
        }
      }))
    } finally {
      setLoading(false)
    }
  }

  const getTestStatus = (testType: string) => {
    const result = testResults[testType]
    if (!result) return 'pending'
    return result.success ? 'success' : 'error'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <div className="w-5 h-5 bg-gray-300 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Facebook className="w-5 h-5" />
            <span>Test d'intégration Meta API</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Configuration Meta</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">App ID:</span> 736683922139398
              </div>
              <div>
                <span className="font-medium">Namespace:</span> prosperalink
              </div>
              <div>
                <span className="font-medium">Redirect URI:</span> http://localhost:3000/api/auth/facebook/callback
              </div>
              <div>
                <span className="font-medium">Contact Email:</span> hafsaoui.hassen@gmail.com
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tests disponibles</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => runTest('auth')} 
                disabled={loading}
                variant="outline"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Test Auth
              </Button>
              
              <Button 
                onClick={() => runTest('pages')} 
                disabled={loading}
                variant="outline"
              >
                <Users className="w-4 h-4 mr-2" />
                Test Pages
              </Button>
              
              <Button 
                onClick={() => runTest('publish')} 
                disabled={loading}
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Test Publication
              </Button>
              
              <Button 
                onClick={() => runTest('insights')} 
                disabled={loading}
                variant="outline"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Test Analytics
              </Button>
            </div>

            {/* Message for publish test */}
            <div>
              <label className="block text-sm font-medium mb-2">Message de test</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message pour le test de publication"
                rows={2}
              />
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-4">
            <h3 className="font-semibold">Résultats des tests</h3>
            
            {Object.keys(testResults).length === 0 ? (
              <p className="text-gray-500">Aucun test exécuté</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(testResults).map(([testType, result]: [string, any]) => (
                  <div key={testType} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(getTestStatus(testType))}
                        <span className="font-medium capitalize">{testType}</span>
                        <Badge variant={result.success ? "default" : "destructive"}>
                          {result.success ? 'Succès' : 'Erreur'}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(result.data || result.error, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Actions rapides</h3>
            <div className="flex space-x-3">
              <Button 
                onClick={() => window.open('/api/auth/facebook', '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Connecter Facebook
              </Button>
              
              <Button 
                onClick={() => window.open('https://developers.facebook.com/apps/736683922139398', '_blank')}
                variant="outline"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Dashboard Meta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 