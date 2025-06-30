'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
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
  CheckCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  deliveryTime: string;
  features: string[];
  targetMarket: string;
  status: 'active' | 'inactive' | 'draft';
  demand: 'low' | 'medium' | 'high';
  salesCount: number;
  revenue: number;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Formation LLC de Base',
      description: 'Formation complète d\'entreprise LLC avec support de base',
      price: 297,
      cost: 150,
      deliveryTime: '12h',
      features: ['Constitution LLC', 'EIN', 'Compte bancaire', 'Guide de démarrage'],
      targetMarket: 'Entrepreneurs débutants',
      status: 'active',
      demand: 'high',
      salesCount: 45,
      revenue: 13365
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const addProduct = () => {
    // Logique d'ajout de produit
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default" className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive': return <Badge variant="destructive">Inactif</Badge>;
      case 'draft': return <Badge variant="secondary">Brouillon</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Package className="w-8 h-8 mr-3 text-blue-600" />
          Gestion des Produits
        </h1>
        <p className="text-gray-600">Configuration des produits, prix et délais de livraison</p>
      </div>

      {/* Liste des produits */}
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                {getStatusBadge(product.status)}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setEditingProduct(editingProduct?.id === product.id ? null : product)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => deleteProduct(product.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Informations de base</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Prix:</span>
                    <span className="font-medium">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coût:</span>
                    <span className="font-medium">${product.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison:</span>
                    <span className="font-medium">{product.deliveryTime}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ventes:</span>
                    <span className="font-medium">{product.salesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenus:</span>
                    <span className="font-medium">${product.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Fonctionnalités</h4>
                <div className="space-y-1">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 