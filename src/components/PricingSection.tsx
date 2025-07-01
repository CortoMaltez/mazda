'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Shield, Globe, Building2, Users, ArrowRight, Clock, DollarSign } from 'lucide-react';

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<'solo' | 'multi'>('solo');

  const plans = {
    solo: {
      name: "Solo Founder",
      description: "Parfait pour les entrepreneurs individuels",
      setupFee: 899,
      monthlyFee: 29,
      features: [
        "Formation LLC en 12h",
        "Agent agréé inclus",
        "EIN automatique",
        "Conformité de base",
        "Support IA 24/7",
        "Portail client sécurisé",
        "Documents numériques",
        "Rapports annuels"
      ],
      recommended: false,
      badge: "Populaire"
    },
    multi: {
      name: "Multi-Member",
      description: "Idéal pour les équipes et partenariats",
      setupFee: 999,
      monthlyFee: 49,
      features: [
        "Tout du plan Solo",
        "Gestion multi-membres",
        "Conformité avancée",
        "Support prioritaire",
        "Form 5472 inclus",
        "Surveillance automatique",
        "Alertes personnalisées",
        "Consultation dédiée"
      ],
      recommended: true,
      badge: "Recommandé"
    }
  };

  const selectedPlanData = plans[selectedPlan];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <DollarSign className="w-4 h-4 mr-2" />
            Prix transparents
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Modèle Setup + Subscribe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un paiement unique pour la formation + un abonnement mensuel pour la gestion continue. 
            Aucun frais caché, prix transparents.
          </p>
        </div>

        {/* Plan Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl shadow-lg">
            <div className="flex">
              <button
                onClick={() => setSelectedPlan('solo')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedPlan === 'solo'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Solo Founder
              </button>
              <button
                onClick={() => setSelectedPlan('multi')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedPlan === 'multi'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Multi-Member
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {Object.entries(plans).map(([key, plan]) => (
            <Card 
              key={key} 
              className={`relative transition-all duration-300 ${
                selectedPlan === key 
                  ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg'
              }`}
            >
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                  {plan.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Pricing */}
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Frais de setup</div>
                    <div className="text-4xl font-bold text-gray-900">${plan.setupFee}</div>
                    <div className="text-sm text-gray-500">Paiement unique</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">+</div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">Abonnement mensuel</div>
                    <div className="text-4xl font-bold text-blue-600">${plan.monthlyFee}</div>
                    <div className="text-sm text-gray-500">par mois</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Inclus dans votre plan :</h4>
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    selectedPlan === key 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  size="lg"
                >
                  {selectedPlan === key ? 'Commencer maintenant' : 'Choisir ce plan'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi ce modèle ?
            </h3>
            <p className="text-gray-600">
              Nous croyons en la transparence et en l'alignement des intérêts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Prix transparents</h4>
              <p className="text-sm text-gray-600">
                Pas de frais cachés. Vous savez exactement ce que vous payez et pourquoi.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Formation rapide</h4>
              <p className="text-sm text-gray-600">
                Votre LLC en 12h. Pas d'attente, pas de paperasse interminable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Conformité garantie</h4>
              <p className="text-sm text-gray-600">
                Nous gérons votre conformité continue. Vous vous concentrez sur votre business.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 mb-8">
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
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl max-w-2xl mx-auto">
            <h4 className="text-xl font-semibold mb-2">
              Prêt à lancer votre entreprise américaine ?
            </h4>
            <p className="text-lg opacity-90 mb-4">
              Rejoignez des centaines d'entrepreneurs qui ont déjà réussi
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Commencer maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 