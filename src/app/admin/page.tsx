"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { useState, useEffect } from "react";
import ProgressTracker from "@/components/ProgressTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Building2, 
  DollarSign, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react'

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ConsultantPermission {
  id: string;
  consultantId: string;
  permission: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

export default function AdminPortal() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<ConsultantPermission[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard')

  // État pour le formulaire de permissions
  const [permissionForm, setPermissionForm] = useState({
    consultantId: "",
    permission: "",
    canRead: false,
    canWrite: false,
    canDelete: false,
  });

  // Mock data - à remplacer par des vraies données
  const stats = {
    totalClients: 247,
    activeSubscriptions: 189,
    monthlyRevenue: 156420,
    pendingDocuments: 23,
    socialAccounts: 8
  }

  const recentClients = [
    { id: 1, name: 'Jean Dupont', company: 'TechStart SARL', state: 'Delaware', status: 'active', documents: 3 },
    { id: 2, name: 'Maria Garcia', company: 'GlobalTrade Ltd', state: 'Wyoming', status: 'pending', documents: 1 },
    { id: 3, name: 'Ahmed Hassan', company: 'Digital Solutions', state: 'Texas', status: 'active', documents: 5 },
  ]

  const socialAccounts = [
    { platform: 'Facebook', connected: true, followers: 1250, lastPost: '2h ago' },
    { platform: 'Instagram', connected: true, followers: 890, lastPost: '1d ago' },
    { platform: 'LinkedIn', connected: true, followers: 567, lastPost: '3d ago' },
    { platform: 'Twitter', connected: false, followers: 0, lastPost: 'Never' },
  ]

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchUsers();
      fetchPermissions();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch("/api/admin/permissions");
      const data = await response.json();
      setPermissions(data);
    } catch (error) {
      console.error("Erreur lors du chargement des permissions:", error);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
    }
  };

  const grantPermission = async () => {
    if (!permissionForm.consultantId || !permissionForm.permission) {
      alert("Veuillez sélectionner un consultant et une permission");
      return;
    }

    try {
      const response = await fetch("/api/admin/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultantId: permissionForm.consultantId,
          permission: permissionForm.permission,
          canRead: permissionForm.canRead,
          canWrite: permissionForm.canWrite,
          canDelete: permissionForm.canDelete,
        }),
      });
      
      if (response.ok) {
        fetchPermissions();
        setPermissionForm({
          consultantId: "",
          permission: "",
          canRead: false,
          canWrite: false,
          canDelete: false,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'attribution des permissions:", error);
    }
  };

  const deletePermission = async (permissionId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette permission ?")) {
      try {
        const response = await fetch(`/api/admin/permissions/${permissionId}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          fetchPermissions();
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la permission:", error);
      }
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!isAdmin(session)) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ProsperaLink Admin</h1>
              <p className="text-gray-600">Gestion CRM/ERP & Réseaux sociaux</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                En ligne
              </Badge>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="crm">CRM Clients</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clients totaux</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClients}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% ce mois
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Abonnements actifs</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                  <p className="text-xs text-muted-foreground">
                    {((stats.activeSubscriptions / stats.totalClients) * 100).toFixed(1)}% taux de rétention
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenus mensuels</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% vs mois dernier
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents en attente</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingDocuments}</div>
                  <p className="text-xs text-muted-foreground">
                    Nécessitent votre attention
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clients récents</CardTitle>
                  <CardDescription>Dernières inscriptions et mises à jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentClients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-gray-600">{client.company} - {client.state}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                            {client.status}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Réseaux sociaux</CardTitle>
                  <CardDescription>État des connexions et performances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialAccounts.map((account) => (
                      <div key={account.platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            account.connected ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {account.platform === 'Facebook' && <Facebook className="w-4 h-4 text-blue-600" />}
                            {account.platform === 'Instagram' && <Instagram className="w-4 h-4 text-pink-600" />}
                            {account.platform === 'LinkedIn' && <Linkedin className="w-4 h-4 text-blue-700" />}
                            {account.platform === 'Twitter' && <Twitter className="w-4 h-4 text-blue-400" />}
                          </div>
                          <div>
                            <p className="font-medium">{account.platform}</p>
                            <p className="text-sm text-gray-600">{account.followers} followers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{account.lastPost}</p>
                          <Badge variant={account.connected ? 'default' : 'secondary'}>
                            {account.connected ? 'Connecté' : 'Non connecté'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CRM Tab */}
          <TabsContent value="crm" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des clients</CardTitle>
                    <CardDescription>CRM complet avec suivi des abonnements</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau client
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Rechercher un client..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Client</th>
                        <th className="text-left py-3 px-4">Entreprise</th>
                        <th className="text-left py-3 px-4">État</th>
                        <th className="text-left py-3 px-4">Statut</th>
                        <th className="text-left py-3 px-4">Documents</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentClients.map((client) => (
                        <tr key={client.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-gray-600">ID: {client.id}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{client.company}</td>
                          <td className="py-3 px-4">{client.state}</td>
                          <td className="py-3 px-4">
                            <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                              {client.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{client.documents} docs</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des documents</CardTitle>
                    <CardDescription>Upload et suivi des documents clients</CardDescription>
                  </div>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Document upload zones */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Certificat de formation</h3>
                    <p className="text-sm text-gray-600 mb-4">Upload du certificat LLC</p>
                    <Button variant="outline" size="sm">
                      Sélectionner fichier
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">EIN Letter</h3>
                    <p className="text-sm text-gray-600 mb-4">Lettre d'attribution EIN</p>
                    <Button variant="outline" size="sm">
                      Sélectionner fichier
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Operating Agreement</h3>
                    <p className="text-sm text-gray-600 mb-4">Accord d'exploitation</p>
                    <Button variant="outline" size="sm">
                      Sélectionner fichier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des réseaux sociaux</CardTitle>
                <CardDescription>Connectez et gérez vos comptes sociaux</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {socialAccounts.map((account) => (
                    <Card key={account.platform} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            account.connected ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {account.platform === 'Facebook' && <Facebook className="w-6 h-6 text-blue-600" />}
                            {account.platform === 'Instagram' && <Instagram className="w-6 h-6 text-pink-600" />}
                            {account.platform === 'LinkedIn' && <Linkedin className="w-6 h-6 text-blue-700" />}
                            {account.platform === 'Twitter' && <Twitter className="w-6 h-6 text-blue-400" />}
                          </div>
                          <div>
                            <h3 className="font-semibold">{account.platform}</h3>
                            <p className="text-sm text-gray-600">{account.followers} followers</p>
                          </div>
                        </div>
                        <Badge variant={account.connected ? 'default' : 'secondary'}>
                          {account.connected ? 'Connecté' : 'Non connecté'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Dernier post :</span>
                          <span className="text-gray-600">{account.lastPost}</span>
                        </div>
                        
                        {account.connected ? (
                          <div className="space-y-2">
                            <Button className="w-full" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Gérer le compte
                            </Button>
                            <Button variant="outline" className="w-full" size="sm">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Voir analytics
                            </Button>
                          </div>
                        ) : (
                          <Button className="w-full" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Connecter le compte
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des réseaux sociaux</CardTitle>
                  <CardDescription>Engagement et croissance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Engagement total</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nouveaux followers</span>
                      <span className="font-semibold text-green-600">+156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Posts ce mois</span>
                      <span className="font-semibold">24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus par état</CardTitle>
                  <CardDescription>Performance géographique</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Delaware</span>
                      <span className="font-semibold">$45,230</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wyoming</span>
                      <span className="font-semibold">$38,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Texas</span>
                      <span className="font-semibold">$32,180</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 