'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Shield, Globe, Building2, Users, ArrowRight } from 'lucide-react';
import { PRICING_TIERS, getAllStates, getStatePricing } from '@/lib/pricing-algorithm';

export function PricingSection() {
  const [selectedState, setSelectedState] = useState('Wyoming');
  const [selectedTier, setSelectedTier] = useState<'ESSENTIAL' | 'GROWTH' | 'PREMIUM'>('ESSENTIAL');

  const pricing = getStatePricing(selectedState);
  const currentTier = getPricingTier(selectedState);

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Prix transparents
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Prix basés sur les coûts réels
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre algorithme calcule automatiquement le prix selon les frais de votre état. 
            Aucun coût caché, juste les coûts réels + $500 de profit fixe.
          </p>
        </div>

        {/* State Selector */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Sélectionnez votre état
            </h3>
            <p className="text-gray-600">
              Les prix varient selon les frais gouvernementaux de chaque état
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Object.entries(PRICING_TIERS).map(([key, tier]) => (
              <div key={key} className="text-center">
                <h4 className="font-semibold text-lg mb-2">{tier.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{tier.priceRange}</p>
                <div className="space-y-2">
                  {tier.states.slice(0, 5).map((state) => (
                    <button
                      key={state.state}
                      onClick={() => setSelectedState(state.state)}
                      className={`block w-full text-sm p-2 rounded-lg transition-colors ${
                        selectedState === state.state
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {state.state} - ${state.annualPrice}/an
                    </button>
                  ))}
                  {tier.states.length > 5 && (
                    <p className="text-xs text-gray-500">
                      +{tier.states.length - 5} autres états
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => {
            const isSelected = currentTier.name === tier.name;
            const sampleState = tier.states[0];
            
            return (
              <Card 
                key={key} 
                className={`relative transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                    : 'hover:shadow-lg'
                }`}
              >
                {isSelected && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Recommandé
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {sampleState ? `À partir de $${sampleState.annualPrice}/an` : tier.priceRange}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Cost Breakdown */}
                  {sampleState && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-sm mb-2">Détail des coûts :</h5>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Agent agréé :</span>
                          <span>${sampleState.registeredAgentFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rapport annuel :</span>
                          <span>${sampleState.stateAnnualReportFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frais IRS :</span>
                          <span>${sampleState.irsFilingCost}</span>
                        </div>
                        <div className="flex justify-between font-medium text-gray-900 border-t pt-1">
                          <span>Coûts totaux :</span>
                          <span>${sampleState.totalRecurringCosts}</span>
                        </div>
                        <div className="flex justify-between font-bold text-blue-600">
                          <span>Profit fixe :</span>
                          <span>${sampleState.targetProfit}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button 
                    className={`w-full ${
                      isSelected 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    size="lg"
                  >
                    {isSelected ? 'Commencer maintenant' : 'Voir les détails'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Current Selection Display */}
        {pricing && (
          <div className="mt-12 text-center">
            <div className="bg-blue-50 p-6 rounded-xl max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedState} - {currentTier.name}
              </h4>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                ${pricing.annualPrice}/an
              </p>
              <p className="text-gray-600">
                Coûts réels : ${pricing.totalRecurringCosts} + Profit fixe : ${pricing.targetProfit}
              </p>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Conformité garantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Support international</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span className="text-sm">Formation en 12h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">500+ clients satisfaits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getPricingTier(stateName: string) {
  const pricing = getStatePricing(stateName);
  if (!pricing) return PRICING_TIERS.ESSENTIAL;
  
  if (pricing.annualPrice >= 1000) return PRICING_TIERS.PREMIUM;
  if (pricing.annualPrice >= 800) return PRICING_TIERS.GROWTH;
  return PRICING_TIERS.ESSENTIAL;
} 