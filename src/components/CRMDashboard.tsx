'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target, 
  MessageSquare, 
  Calendar,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface Prospect {
  id: string
  name: string
  email: string
  company?: string
  country: string
  source: string
  status: string
  score: number
  lastContact: Date
  estimatedValue: number
}

interface Lead {
  id: string
  prospectId: string
  prospect: Prospect
  status: string
  priority: string
  estimatedValue: number
  conversionProbability: number
  nextAction: string
  nextActionDate: Date
}

export default function CRMDashboard() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Mock data - in production, this would come from the CRM service
  useEffect(() => {
    const mockProspects: Prospect[] = [
      {
        id: '1',
        name: 'Marie Dubois',
        email: 'marie@techstart.fr',
        company: 'TechStart France',
        country: 'France',
        source: 'chatbot',
        status: 'qualified',
        score: 85,
        lastContact: new Date('2024-01-15'),
        estimatedValue: 2500
      },
      {
        id: '2',
        name: 'Carlos Rodriguez',
        email: 'carlos@ecosolutions.es',
        company: 'EcoSolutions',
        country: 'Spain',
        source: 'website',
        status: 'contacted',
        score: 72,
        lastContact: new Date('2024-01-14'),
        estimatedValue: 1800
      },
      {
        id: '3',
        name: 'Sarah Johnson',
        email: 'sarah@digitalmarketing.uk',
        company: 'Digital Marketing Pro',
        country: 'UK',
        source: 'referral',
        status: 'new',
        score: 45,
        lastContact: new Date('2024-01-13'),
        estimatedValue: 3200
      }
    ]

    const mockLeads: Lead[] = [
      {
        id: '1',
        prospectId: '1',
        prospect: mockProspects[0],
        status: 'qualified',
        priority: 'high',
        estimatedValue: 2500,
        conversionProbability: 85,
        nextAction: 'Schedule discovery call',
        nextActionDate: new Date('2024-01-20')
      },
      {
        id: '2',
        prospectId: '2',
        prospect: mockProspects[1],
        status: 'contacted',
        priority: 'medium',
        estimatedValue: 1800,
        conversionProbability: 65,
        nextAction: 'Send proposal',
        nextActionDate: new Date('2024-01-18')
      },
      {
        id: '3',
        prospectId: '3',
        prospect: mockProspects[2],
        status: 'new',
        priority: 'low',
        estimatedValue: 3200,
        conversionProbability: 30,
        nextAction: 'Initial contact',
        nextActionDate: new Date('2024-01-22')
      }
    ]

    setProspects(mockProspects)
    setLeads(mockLeads)
    setFilteredLeads(mockLeads)
  }, [])

  // Filter leads based on search and filters
  useEffect(() => {
    let filtered = leads

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === selectedStatus)
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === selectedPriority)
    }

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.prospect.company?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredLeads(filtered)
  }, [leads, selectedStatus, selectedPriority, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'converted': return 'bg-purple-100 text-purple-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const totalProspects = prospects.length
  const qualifiedProspects = prospects.filter(p => p.status === 'qualified').length
  const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0)
  const conversionRate = totalProspects > 0 ? (qualifiedProspects / totalProspects) * 100 : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
          <p className="text-gray-600">Gérez vos prospects et leads</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau prospect
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProspects}</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects Qualifiés</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualifiedProspects}</div>
            <p className="text-xs text-muted-foreground">
              {conversionRate.toFixed(1)}% de taux de conversion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Totale</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Actifs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground">
              {leads.filter(l => l.priority === 'high').length} prioritaires
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtres et recherche</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher prospects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouveau</SelectItem>
                <SelectItem value="contacted">Contacté</SelectItem>
                <SelectItem value="qualified">Qualifié</SelectItem>
                <SelectItem value="converted">Converti</SelectItem>
                <SelectItem value="lost">Perdu</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Actions du jour
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prospect</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Valeur Estimée</TableHead>
                <TableHead>Prochaine Action</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.prospect.name}</div>
                      <div className="text-sm text-gray-500">{lead.prospect.email}</div>
                      <div className="text-xs text-gray-400">{lead.prospect.company}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(lead.priority)}>
                      {lead.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`font-medium ${getScoreColor(lead.prospect.score)}`}>
                      {lead.prospect.score}/100
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${lead.estimatedValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">
                      {lead.conversionProbability}% de conversion
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{lead.nextAction}</div>
                    <div className="text-xs text-gray-500">
                      {lead.nextActionDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Actions en attente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.filter(l => l.priority === 'high').slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium">{lead.prospect.name}</div>
                    <div className="text-sm text-gray-600">{lead.nextAction}</div>
                  </div>
                  <Button size="sm">Voir</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Récemment qualifiés</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.filter(l => l.status === 'qualified').slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">{lead.prospect.name}</div>
                    <div className="text-sm text-gray-600">${lead.estimatedValue}</div>
                  </div>
                  <Button size="sm">Convertir</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Nécessite attention</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.filter(l => l.prospect.score < 50).slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium">{lead.prospect.name}</div>
                    <div className="text-sm text-gray-600">Score: {lead.prospect.score}</div>
                  </div>
                  <Button size="sm" variant="outline">Requalifier</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 