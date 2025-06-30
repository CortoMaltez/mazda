'use client';

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const plans = [
  {
    id: 'starter-ia',
    name: 'Starter IA',
    price: 199,
    originalPrice: 299,
    description: 'Formation de base avec IA intelligente',
    features: [
      'Formation LLC en 12h (IA accélérée)',
      'EIN automatique inclus',
      'Support IA basique 24/7',
      'Documents essentiels générés IA',
      'Accès portail client IA',
      'Conformité de base IA'
    ],
    popular: false,
    color: 'blue',
    aiFeatures: ['Analyse IA basique', 'Génération documents', 'Support chatbot']
  },
  {
    id: 'growth-ia',
    name: 'Growth IA',
    price: 399,
    originalPrice: 599,
    description: 'Formation + services IA avancés',
    features: [
      'Tout du Starter IA',
      'Compte bancaire IA inclus',
      'Services comptables 6 mois IA',
      'Conformité prédictive IA',
      'Marketplace d\'accès IA',
      'Support IA premium',
      'Optimisation fiscale IA'
    ],
    popular: true,
    color: 'purple',
    aiFeatures: ['Analyse IA avancée', 'Prédictions conformité', 'Optimisation fiscale', 'Marketplace IA']
  },
  {
    id: 'scale-ia',
    name: 'Scale IA',
    price: 799,
    originalPrice: 999,
    description: 'Solution IA complète pour entrepreneurs sérieux',
    features: [
      'Tout du Growth IA',
      'Services comptables 12 mois IA',
      'Support prioritaire IA 24/7',
      'Consultations IA illimitées',
      'Gestion de risque IA',
      'Stratégie croissance IA',
      'IA dédiée personnalisée',
      'Analytics business IA'
    ],
    popular: false,
    color: 'green',
    aiFeatures: ['IA dédiée', 'Gestion risque IA', 'Stratégie croissance', 'Analytics prédictifs']
  },
  {
    id: 'enterprise-ia',
    name: 'Enterprise IA',
    price: 1499,
    originalPrice: 1999,
    description: 'Solution IA sur mesure pour grandes entreprises',
    features: [
      'Tout du Scale IA',
      'IA dédiée personnalisée',
      'Consultant dédié IA',
      'Services juridiques IA inclus',
      'Accès exclusif événements IA',
      'SLA garanti IA',
      'API IA personnalisée',
      'Support VIP IA'
    ],
    popular: false,
    color: 'gold',
    aiFeatures: ['IA sur mesure', 'API personnalisée', 'Consultant dédié', 'SLA garanti']
  }
];

const addons = [
  {
    id: 'document-analysis-ia',
    name: 'Analyse Documents IA',
    price: 49,
    description: 'Analyse intelligente de tous vos documents',
    features: ['Analyse automatique', 'Détection risques', 'Recommandations IA', 'Rapports détaillés']
  },
  {
    id: 'strategic-ai',
    name: 'Conseils Stratégiques IA',
    price: 99,
    description: 'Conseils stratégiques personnalisés par IA',
    features: ['Stratégie personnalisée', 'Analyse marché IA', 'Recommandations croissance', 'Suivi mensuel']
  },
  {
    id: 'content-generation-ia',
    name: 'Génération Contenu IA',
    price: 79,
    description: 'Génération automatique de contenu business',
    features: ['Contrats IA', 'Plans d\'affaires', 'Marketing content', 'SEO optimisé']
  },
  {
    id: 'tax-optimization-ia',
    name: 'Optimisation Fiscale IA',
    price: 149,
    description: 'Optimisation fiscale intelligente continue',
    features: ['Analyse fiscale IA', 'Optimisation continue', 'Alertes opportunités', 'Planification avancée']
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState('growth-ia');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const selectedAddonsData = addons.filter(a => selectedAddons.includes(a.id));
  
  const planPrice = selectedPlanData?.price || 0;
  const addonsPrice = selectedAddonsData.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = planPrice + addonsPrice;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tarification IA Transparente et Économique
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan IA qui correspond à vos besoins. Prix transparents, 
            IA intégrée, pas de surprises. Optimisez votre investissement avec notre IA.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Paiement unique
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Paiement échelonné
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative p-6 ${
                plan.popular 
                  ? 'ring-2 ring-purple-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Le Plus Populaire
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  {plan.originalPrice > plan.price && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-gray-600 text-sm">/formation</span>
                </div>

                <ul className="space-y-2 mb-6 text-left text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Fonctionnalités IA</h4>
                  <div className="flex flex-wrap gap-1">
                    {plan.aiFeatures.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Plan Sélectionné' : 'Choisir ce Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Services IA Additionnels
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {addons.map((addon) => (
              <Card 
                key={addon.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id)
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:shadow-md'
                }`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <h4 className="text-lg font-semibold text-gray-900 ml-3">{addon.name}</h4>
                    </div>
                    <p className="text-gray-600 mb-3">{addon.description}</p>
                    <ul className="space-y-1">
                      {addon.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-2xl font-bold text-gray-900">${addon.price}</span>
                    <span className="text-sm text-gray-500">/mois</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Résumé de votre Sélection IA
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{selectedPlanData?.name}</span>
                  <span className="font-semibold">${selectedPlanData?.price}</span>
                </div>
                {selectedAddonsData.map((addon) => (
                  <div key={addon.id} className="flex justify-between items-center">
                    <span className="text-gray-700">+ {addon.name}</span>
                    <span className="font-semibold">${addon.price}/mois</span>
                  </div>
                ))}
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-2xl text-blue-600">${totalPrice}</span>
                </div>
                <p className="text-sm text-gray-600">
                  + {selectedAddonsData.length > 0 ? `${selectedAddonsData.length} service(s) IA` : 'Aucun service additionnel'}
                </p>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Prêt à Commencer avec IA ?
              </h4>
              <p className="text-gray-600 mb-6">
                Votre entreprise LLC sera formée en 12h avec l'IA la plus avancée du marché.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Commencer avec IA
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Paiement sécurisé • Garantie 30 jours • Support IA 24/7
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ Pricing */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Questions Fréquentes sur la Tarification IA
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Comment l'IA réduit-elle les coûts ?</h4>
              <p className="text-gray-600">Notre IA optimise chaque processus, réduisant les coûts opérationnels et vous permettant d'offrir des prix plus compétitifs.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Puis-je changer de plan IA plus tard ?</h4>
              <p className="text-gray-600">Oui, vous pouvez toujours passer à un plan IA supérieur et bénéficier de fonctionnalités plus avancées.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Les services IA sont-ils inclus ?</h4>
              <p className="text-gray-600">Oui, chaque plan inclut des fonctionnalités IA de base. Les services IA additionnels sont optionnels.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Y a-t-il des frais cachés avec l'IA ?</h4>
              <p className="text-gray-600">Non, tous nos prix sont transparents. L'IA est intégrée dans nos plans, pas de frais supplémentaires cachés.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 