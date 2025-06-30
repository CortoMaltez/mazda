'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Star, Zap, TrendingUp, Crown, Shield } from 'lucide-react';
import { PRICING_PLANS, PricingPlan } from '@/lib/pricing-plans';

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>('starter');
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (planId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          upsells: [],
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement non reçue');
      }
    } catch (error) {
      console.error('Erreur lors de la création du paiement:', error);
      alert('Erreur lors de la création du paiement. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'freemium':
        return <Shield className="w-6 h-6" />;
      case 'starter':
        return <Zap className="w-6 h-6" />;
      case 'growth':
        return <TrendingUp className="w-6 h-6" />;
      case 'scale':
        return <Star className="w-6 h-6" />;
      case 'enterprise':
        return <Crown className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'freemium':
        return 'bg-gray-100 text-gray-800';
      case 'starter':
        return 'bg-blue-100 text-blue-800';
      case 'growth':
        return 'bg-green-100 text-green-800';
      case 'scale':
        return 'bg-purple-100 text-purple-800';
      case 'enterprise':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plans de Tarification Transparents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Formation LLC en 12h avec IA, 
            sans frais cachés, sans surprise.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Check className="w-4 h-4 mr-1" />
              ROI 660% garanti
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Zap className="w-4 h-4 mr-1" />
              Formation en 12h
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <Shield className="w-4 h-4 mr-1" />
              Support IA 24/7
            </Badge>
          </div>
        </div>

        {/* Plans de tarification */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Plus Populaire
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full ${getPlanColor(plan.id)}`}>
                    {getPlanIcon(plan.id)}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.interval === 'one-time' ? 'Paiement unique' : 'Par mois'}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {plan.description}
                </p>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Profit: ${plan.profit} (Marge: {plan.margin}%)
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Fonctionnalités */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Inclus */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Inclus :</h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.includes.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Temps estimé */}
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Temps estimé :</strong> {plan.estimatedTime}
                  </p>
                </div>

                {/* Bouton d'action */}
                <Button
                  onClick={() => handlePurchase(plan.id)}
                  disabled={isLoading || plan.id === 'freemium'}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </div>
                  ) : plan.id === 'freemium' ? (
                    'Commencer Gratuitement'
                  ) : (
                    'Choisir ce Plan'
                  )}
                </Button>

                {/* Garantie */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  ✅ Garantie 30 jours • Support IA 24/7
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section des garanties */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Garantie 30 Jours
              </h3>
              <p className="text-gray-600">
                Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Formation en 12h
              </h3>
              <p className="text-gray-600">
                Votre LLC sera formée en moins de 12h grâce à notre IA.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ROI 660% Garanti
              </h3>
              <p className="text-gray-600">
                Notre objectif : vous faire gagner 660% sur votre investissement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 