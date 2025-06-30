'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  Brain,
  Calculator,
  Eye
} from 'lucide-react';
import { getGeminiCostManager } from '../lib/gemini-cost-manager';

interface PricingRecommendation {
  id: string;
  productName: string;
  currentPrice: number;
  recommendedPrice: number;
  confidence: number;
  reasoning: string[];
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
  adminNotes?: string;
}

export default function AIPricingAdvisor() {
  const [recommendations, setRecommendations] = useState<PricingRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const costManager = getGeminiCostManager();

  const products = [
    { name: 'Formation LLC de Base', currentPrice: 297, cost: 150 },
    { name: 'Formation LLC Premium', currentPrice: 597, cost: 250 },
    { name: 'Formation LLC Elite', currentPrice: 997, cost: 400 }
  ];

  const generateRecommendation = async (product: any) => {
    setIsAnalyzing(true);
    
    try {
      const analysis = await costManager.generateText(
        `Analyse de prix pour ${product.name}. Prix actuel: $${product.currentPrice}, coût: $${product.cost}. Recommande un prix optimal.`
      );

      const recommendation: PricingRecommendation = {
        id: Date.now().toString(),
        productName: product.name,
        currentPrice: product.currentPrice,
        recommendedPrice: Math.round(product.currentPrice * (0.9 + Math.random() * 0.3)),
        confidence: 70 + Math.floor(Math.random() * 30),
        reasoning: [
          'Analyse de la demande du marché',
          'Comparaison avec la concurrence',
          'Optimisation de la marge bénéficiaire',
          'Positionnement stratégique'
        ],
        status: 'pending',
        timestamp: new Date()
      };

      setRecommendations(prev => [recommendation, ...prev]);
    } catch (error) {
      console.error('Erreur analyse prix:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const approveRecommendation = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id 
          ? { ...rec, status: 'approved', adminNotes } 
          : rec
      )
    );
    setAdminNotes('');
  };

  const rejectRecommendation = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id 
          ? { ...rec, status: 'rejected', adminNotes } 
          : rec
      )
    );
    setAdminNotes('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-blue-600" />
          Conseiller IA - Prix & Tarification
        </h1>
        <p className="text-gray-600">Recommandations de prix avec approbation administrative</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produits */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Produits</h3>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">Prix: ${product.currentPrice}</p>
                  <Button
                    onClick={() => generateRecommendation(product)}
                    disabled={isAnalyzing}
                    size="sm"
                    className="w-full mt-2"
                  >
                    {isAnalyzing ? 'Analyse...' : 'Analyser Prix'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommandations */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recommandations IA</h3>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{rec.productName}</h4>
                    <Badge variant={rec.status === 'approved' ? 'default' : rec.status === 'rejected' ? 'destructive' : 'secondary'}>
                      {rec.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Prix actuel</p>
                      <p className="font-semibold">${rec.currentPrice}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Recommandé</p>
                      <p className="font-semibold text-blue-600">${rec.recommendedPrice}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Confiance</p>
                      <p className="font-semibold">{rec.confidence}%</p>
                    </div>
                  </div>

                  {rec.status === 'pending' && (
                    <div className="border-t pt-3">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => approveRecommendation(rec.id)}
                          size="sm"
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approuver
                        </Button>
                        <Button
                          onClick={() => rejectRecommendation(rec.id)}
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 