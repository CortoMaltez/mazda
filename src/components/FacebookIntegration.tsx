'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Facebook, 
  Share2, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar,
  Plus,
  Settings,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { metaAPI } from '@/lib/meta-api'

interface FacebookPage {
  id: string
  name: string
  access_token: string
  category: string
  tasks: string[]
}

interface FacebookPost {
  id: string
  message?: string
  created_time: string
  permalink_url: string
  reactions?: {
    summary: {
      total_count: number
    }
  }
  comments?: {
    summary: {
      total_count: number
    }
  }
}

interface FacebookInsights {
  page_impressions: number
  page_engaged_users: number
  page_post_engagements: number
  page_followers: number
}

export function FacebookIntegration() {
  const [pages, setPages] = useState<FacebookPage[]>([])
  const [selectedPage, setSelectedPage] = useState<string>('')
  const [posts, setPosts] = useState<FacebookPost[]>([])
  const [insights, setInsights] = useState<FacebookInsights | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')

  // Charger les pages Facebook
  const loadPages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/social/facebook/pages')
      const data = await response.json()
      if (data.pages) {
        setPages(data.pages)
        if (data.pages.length > 0 && !selectedPage) {
          setSelectedPage(data.pages[0].id)
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des pages:', error)
    } finally {
      setLoading(false)
    }
  }

  // Charger les posts d'une page
  const loadPosts = async (pageId: string) => {
    try {
      const response = await fetch(`/api/social/facebook/posts?pageId=${pageId}&limit=10`)
      const data = await response.json()
      if (data.posts) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des posts:', error)
    }
  }

  // Charger les insights d'une page
  const loadInsights = async (pageId: string) => {
    try {
      const response = await fetch(`/api/social/facebook/insights?pageId=${pageId}&period=day`)
      const data = await response.json()
      if (data.insights) {
        setInsights(data.insights)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des insights:', error)
    }
  }

  // Publier un post
  const publishPost = async () => {
    if (!selectedPage || !message) return

    setLoading(true)
    try {
      const postData: any = {
        pageId: selectedPage,
        message,
        link: link || undefined
      }

      if (scheduledTime) {
        postData.scheduledTime = scheduledTime
      }

      const response = await fetch('/api/social/facebook/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      const data = await response.json()
      if (data.success) {
        setMessage('')
        setLink('')
        setScheduledTime('')
        loadPosts(selectedPage)
      }
    } catch (error) {
      console.error('Erreur lors de la publication:', error)
    } finally {
      setLoading(false)
    }
  }

  // Connecter le compte Facebook
  const connectFacebook = () => {
    window.location.href = '/api/auth/facebook'
  }

  useEffect(() => {
    loadPages()
  }, [])

  useEffect(() => {
    if (selectedPage) {
      loadPosts(selectedPage)
      loadInsights(selectedPage)
    }
  }, [selectedPage])

  if (pages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Facebook className="w-5 h-5" />
            <span>Intégration Facebook</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Facebook className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connectez votre compte Facebook</h3>
          <p className="text-gray-600 mb-6">
            Gérez vos pages Facebook, publiez du contenu et suivez vos performances
          </p>
          <Button onClick={connectFacebook} className="bg-blue-600 hover:bg-blue-700">
            <Facebook className="w-4 h-4 mr-2" />
            Se connecter avec Facebook
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion Facebook</h2>
          <p className="text-gray-600">Gérez vos pages et publications Facebook</p>
        </div>
        <Button onClick={loadPages} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      <Tabs defaultValue="publish" className="space-y-6">
        <TabsList>
          <TabsTrigger value="publish">Publier</TabsTrigger>
          <TabsTrigger value="posts">Publications</TabsTrigger>
          <TabsTrigger value="insights">Analytics</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        {/* Publier */}
        <TabsContent value="publish">
          <Card>
            <CardHeader>
              <CardTitle>Nouvelle publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Page</label>
                <Select value={selectedPage} onValueChange={setSelectedPage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Que voulez-vous partager ?"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lien (optionnel)</label>
                <Input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Programmer (optionnel)</label>
                <Input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>

              <Button 
                onClick={publishPost} 
                disabled={loading || !message || !selectedPage}
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {scheduledTime ? 'Programmer' : 'Publier'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publications */}
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Publications récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-gray-600">
                        {new Date(post.created_time).toLocaleDateString()}
                      </p>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-gray-900 mb-3">{post.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{post.reactions?.summary?.total_count || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments?.summary?.total_count || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Analytics de la page</CardTitle>
            </CardHeader>
            <CardContent>
              {insights ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {insights.page_impressions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {insights.page_engaged_users.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Utilisateurs engagés</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {insights.page_post_engagements.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Engagements</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">
                      {insights.page_followers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Abonnés</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Aucune donnée disponible
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages */}
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Pages connectées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{page.name}</h4>
                      <p className="text-sm text-gray-600">{page.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {page.tasks.map((task) => (
                          <Badge key={task} variant="outline" className="text-xs">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 