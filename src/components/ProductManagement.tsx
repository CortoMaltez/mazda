'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Package, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  Eye,
  Copy,
  Users,
  Star,
  TrendingUp,
  AlertTriangle,
  Clock,
  Globe,
  Building2,
  FileText,
  Shield,
  Zap,
  Brain,
  Target,
  Settings
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: 'formation' | 'compliance' | 'support' | 'premium';
  price: number;
  originalPrice?: number;
  currency: string;
  features: string[];
  requirements: string[];
  estimatedTime: string;
  status: 'active' | 'draft' | 'archived' | 'coming_soon';
  popularity: number;
  revenue: number;
  customers: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
  aiFeatures: string[];
  complianceFeatures: string[];
  supportLevel: 'basic' | 'premium' | 'vip';
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  productCount: number;
  totalRevenue: number;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Formation LLC Delaware',
      description: 'Formation complète d\'entreprise LLC dans l\'état du Delaware avec support IA 24/7',
      category: 'formation',
      price: 850,
      originalPrice: 950,
      currency: 'USD',
      features: [
        'Formation en 12h',
        'Support IA Gemini 24/7',
        'Agent agréé inclus',
        'EIN acquisition',
        'Operating Agreement',
        'Portail client premium'
      ],
      requirements: [
        'Passeport valide',
        'Justificatif de domicile',
        'Informations de l\'entreprise'
      ],
      estimatedTime: '12h',
      status: 'active',
      popularity: 95,
      revenue: 425000,
      customers: 500,
      rating: 4.9,
      reviews: 247,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-20'),
      aiFeatures: [
        'Assistant IA personnalisé',
        'Génération automatique de documents',
        'Prédictions de conformité',
        'Support multilingue'
      ],
      complianceFeatures: [
        'Surveillance Form 5472',
        'Rapports annuels automatiques',
        'Alertes de conformité',
        'Gestion des délais'
      ],
      supportLevel: 'premium'
    },
    {
      id: '2',
      name: 'Formation LLC Wyoming',
      description: 'Formation d\'entreprise LLC dans l\'état du Wyoming, solution économique',
      category: 'formation',
      price: 650,
      currency: 'USD',
      features: [
        'Formation en 12h',
        'Support IA basique',
        'Agent agréé inclus',
        'EIN acquisition',
        'Operating Agreement',
        'Portail client standard'
      ],
      requirements: [
        'Passeport valide',
        'Justificatif de domicile',
        'Informations de l\'entreprise'
      ],
      estimatedTime: '12h',
      status: 'active',
      popularity: 78,
      revenue: 195000,
      customers: 300,
      rating: 4.7,
      reviews: 156,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-03-18'),
      aiFeatures: [
        'Assistant IA basique',
        'Génération de documents',
        'Support en anglais'
      ],
      complianceFeatures: [
        'Surveillance Form 5472',
        'Rapports annuels',
        'Alertes de base'
      ],
      supportLevel: 'basic'
    },
    {
      id: '3',
      name: 'Pack Conformité Premium',
      description: 'Gestion complète de la conformité fiscale et légale',
      category: 'compliance',
      price: 299,
      currency: 'USD',
      features: [
        'Surveillance automatique',
        'Form 5472 automatisé',
        'Rapports annuels',
        'Alertes intelligentes',
        'Support expert',
        'Garantie de conformité'
      ],
      requirements: [
        'LLC formée',
        'EIN obtenu',
        'Accès portail'
      ],
      estimatedTime: '24h',
      status: 'active',
      popularity: 65,
      revenue: 89700,
      customers: 300,
      rating: 4.8,
      reviews: 89,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-03-15'),
      aiFeatures: [
        'IA de surveillance',
        'Prédictions de risques',
        'Génération automatique',
        'Analyse intelligente'
      ],
      complianceFeatures: [
        'Surveillance complète',
        'Formulaires automatisés',
        'Rapports détaillés',
        'Garantie légale'
      ],
      supportLevel: 'premium'
    },
    {
      id: '4',
      name: 'Support VIP 24/7',
      description: 'Support premium avec accès direct aux experts',
      category: 'support',
      price: 199,
      currency: 'USD',
      features: [
        'Support téléphonique 24/7',
        'Accès direct aux experts',
        'Réponse en 1h maximum',
        'Consultation personnalisée',
        'Support multilingue',
        'Accès prioritaire'
      ],
      requirements: [
        'Client actif',
        'Abonnement premium'
      ],
      estimatedTime: '1h',
      status: 'active',
      popularity: 45,
      revenue: 39800,
      customers: 200,
      rating: 4.9,
      reviews: 67,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-03-10'),
      aiFeatures: [
        'IA de triage',
        'Routage intelligent',
        'Historique complet',
        'Prédiction des besoins'
      ],
      complianceFeatures: [
        'Support conformité',
        'Accès aux experts',
        'Conseils personnalisés'
      ],
      supportLevel: 'vip'
    }
  ]);

  const [categories, setCategories] = useState<ProductCategory[]>([
    {
      id: 'formation',
      name: 'Formation LLC',
      description: 'Services de formation d\'entreprises',
      icon: Building2,
      productCount: 2,
      totalRevenue: 620000
    },
    {
      id: 'compliance',
      name: 'Conformité',
      description: 'Services de conformité fiscale',
      icon: Shield,
      productCount: 1,
      totalRevenue: 89700
    },
    {
      id: 'support',
      name: 'Support',
      description: 'Services de support client',
      icon: Users,
      productCount: 1,
      totalRevenue: 39800
    },
    {
      id: 'premium',
      name: 'Services Premium',
      description: 'Services premium et VIP',
      icon: Star,
      productCount: 0,
      totalRevenue: 0
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'draft' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'coming_soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'formation': return <Building2 className="w-4 h-4" />;
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'support': return <Users className="w-4 h-4" />;
      case 'premium': return <Star className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = products.filter(product => {
    const statusMatch = filter === 'all' || product.status === filter;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const duplicateProduct = (product: Product) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Copie)`,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      revenue: 0,
      customers: 0,
      reviews: 0
    };
    setProducts(prev => [newProduct, ...prev]);
    alert('Produit dupliqué avec succès !');
  };

  const archiveProduct = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: 'archived' as const } : p
    ));
    alert('Produit archivé avec succès !');
  };

  const getTotalRevenue = () => {
    return products.reduce((sum, product) => sum + product.revenue, 0);
  };

  const getTotalCustomers = () => {
    return products.reduce((sum, product) => sum + product.customers, 0);
  };

  const getAverageRating = () => {
    const totalRating = products.reduce((sum, product) => sum + product.rating, 0);
    return (totalRating / products.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
              <p className="text-gray-600">Gérez votre catalogue de services ProsperaLink</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Package className="w-4 h-4 mr-2" />
                {products.filter(p => p.status === 'active').length} produits actifs
              </Badge>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Produit
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus Totaux</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalRevenue())}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients Totaux</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalCustomers().toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">{getAverageRating()}/5</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Produits Actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <category.icon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Produits:</span>
                    <div className="font-semibold">{category.productCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Revenus:</span>
                    <div className="font-semibold">{formatCurrency(category.totalRevenue)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex space-x-2">
            {(['all', 'active', 'draft', 'archived'] as const).map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'default' : 'outline'}
                onClick={() => setFilter(filterOption)}
                className="capitalize"
              >
                {filterOption === 'all' && 'Tous'}
                {filterOption === 'active' && 'Actifs'}
                {filterOption === 'draft' && 'Brouillons'}
                {filterOption === 'archived' && 'Archivés'}
              </Button>
            ))}
          </div>
          
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:w-80"
          />
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                selectedProduct?.id === product.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status === 'active' ? 'Actif' :
                       product.status === 'draft' ? 'Brouillon' :
                       product.status === 'archived' ? 'Archivé' : 'Bientôt'}
                    </Badge>
                    {getCategoryIcon(product.category)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Price and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div>
                    <span className="text-sm font-medium text-gray-600">Fonctionnalités:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.features.length - 3} autres
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* AI Features */}
                  {product.aiFeatures.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">IA:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.aiFeatures.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                            <Brain className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Revenus:</span>
                      <div className="font-semibold">{formatCurrency(product.revenue)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Clients:</span>
                      <div className="font-semibold">{product.customers}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Popularité:</span>
                      <div className="font-semibold">{product.popularity}%</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        duplicateProduct(product)
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsEditing(true)
                        setSelectedProduct(product)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Details */}
        {selectedProduct && (
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedProduct.name}</CardTitle>
                  <p className="text-gray-600">Détails du produit</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(selectedProduct.status)}>
                    {selectedProduct.status}
                  </Badge>
                  <Badge className={getSupportLevelColor(selectedProduct.supportLevel)}>
                    {selectedProduct.supportLevel.toUpperCase()}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Informations Générales</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Prix:</span>
                        <div className="font-semibold text-xl">{formatCurrency(selectedProduct.price)}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Temps estimé:</span>
                        <div className="font-semibold">{selectedProduct.estimatedTime}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Catégorie:</span>
                        <div className="font-semibold">{selectedProduct.category}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Créé le:</span>
                        <div className="font-semibold">{selectedProduct.createdAt.toLocaleDateString('fr-FR')}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Fonctionnalités</h3>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Prérequis</h3>
                    <div className="space-y-2">
                      {selectedProduct.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analytics and AI */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Analytics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedProduct.revenue)}</div>
                        <div className="text-sm text-gray-600">Revenus</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedProduct.customers}</div>
                        <div className="text-sm text-gray-600">Clients</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{selectedProduct.rating}/5</div>
                        <div className="text-sm text-gray-600">Note</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedProduct.popularity}%</div>
                        <div className="text-sm text-gray-600">Popularité</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Fonctionnalités IA</h3>
                    <div className="space-y-2">
                      {selectedProduct.aiFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Brain className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Conformité</h3>
                    <div className="space-y-2">
                      {selectedProduct.complianceFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 