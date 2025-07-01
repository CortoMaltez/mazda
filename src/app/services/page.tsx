'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  category: 'formation' | 'compliance' | 'support' | 'optimization';
  popular?: boolean;
  recommended?: boolean;
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userProfile, setUserProfile] = useState<any>(null);

  const services: Service[] = [
    {
      id: 'llc-formation',
      name: 'Formation LLC',
      description: 'Création complète de votre LLC aux USA',
      price: 997,
      features: [
        'Articles of Organization',
        'EIN (numéro d\'identification fiscale)',
        'Operating Agreement personnalisé',
        'Agent agréé (1 an)',
        'Support IA 24/7'
      ],
      category: 'formation',
      popular: true
    },
    {
      id: 'compliance-automation',
      name: 'Conformité Automatique',
      description: 'Gestion automatique de toutes les obligations',
      price: 299,
      features: [
        'Rapports annuels automatiques',
        'Déclarations fiscales',
        'Alertes d\'échéances',
        'Documents sécurisés',
        'Dashboard de conformité'
      ],
      category: 'compliance'
    },
    {
      id: 'ai-support',
      name: 'Support IA Premium',
      description: 'Assistant IA contextuel personnalisé',
      price: 199,
      features: [
        'Support multilingue 24/7',
        'Conseils personnalisés',
        'Analyse de documents',
        'Suggestions proactives',
        'Intégration complète'
      ],
      category: 'support'
    },
    {
      id: 'tax-optimization',
      name: 'Optimisation Fiscale',
      description: 'Stratégies fiscales avancées',
      price: 399,
      features: [
        'Analyse de structure fiscale',
        'Stratégies d\'optimisation',
        'Conseils d\'expert',
        'Rapports détaillés',
        'Suivi continu'
      ],
      category: 'optimization'
    },
    {
      id: 'banking-assistance',
      name: 'Assistance Bancaire',
      description: 'Ouverture de compte bancaire US',
      price: 149,
      features: [
        'Accompagnement complet',
        'Choix de la banque',
        'Préparation documents',
        'Suivi du processus',
        'Support post-ouverture'
      ],
      category: 'formation'
    },
    {
      id: 'social-media-management',
      name: 'Gestion Réseaux Sociaux',
      description: 'Gestion complète de vos réseaux sociaux',
      price: 249,
      features: [
        'Gestion Facebook/Instagram',
        'Publications automatiques',
        'Analytics avancés',
        'Gestion des commentaires',
        'Stratégie de contenu'
      ],
      category: 'optimization'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les services', icon: '📋' },
    { id: 'formation', name: 'Formation', icon: '🏢' },
    { id: 'compliance', name: 'Conformité', icon: '⚖️' },
    { id: 'support', name: 'Support', icon: '🆘' },
    { id: 'optimization', name: 'Optimisation', icon: '📈' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const prosperaLink360 = {
    name: 'ProsperaLink 360',
    description: 'Solution complète pour entrepreneurs ambitieux',
    price: 1497,
    originalPrice: 2290,
    savings: 793,
    features: [
      'Formation LLC complète',
      'Conformité automatique',
      'Support IA Premium',
      'Optimisation fiscale',
      'Assistance bancaire',
      'Gestion réseaux sociaux',
      'Dashboard intelligent',
      'Consultation gratuite'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Services Modulaires
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez les services qui correspondent à vos besoins. 
            Chaque module est conçu pour vous apporter sérénité et efficacité.
          </p>
        </div>

        {/* ProsperaLink 360 - Solution complète */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <div className="mb-4">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                RECOMMANDÉ
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{prosperaLink360.name}</h2>
            <p className="text-xl mb-6 opacity-90">{prosperaLink360.description}</p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-4xl font-bold">${prosperaLink360.price}</span>
              <span className="text-xl line-through opacity-75">${prosperaLink360.originalPrice}</span>
              <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                Économisez ${prosperaLink360.savings}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              {prosperaLink360.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
              Choisir ProsperaLink 360
            </button>
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Grille de services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${
                service.popular ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              {service.popular && (
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                  POPULAIRE
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${service.price}
                <span className="text-sm font-normal text-gray-500">/an</span>
              </div>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Choisir ce service
              </button>
            </div>
          ))}
        </div>

        {/* Recommandations IA */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">🤖</span>
            Recommandations IA
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Basé sur votre profil</h4>
              <p className="text-blue-800 mb-4">
                Nous recommandons ProsperaLink 360 pour maximiser votre efficacité 
                et minimiser les risques de conformité.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Voir pourquoi
              </button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Économies réalisées</h4>
              <p className="text-green-800 mb-4">
                Avec ProsperaLink 360, vous économisez ${prosperaLink360.savings} 
                par rapport à l'achat de services séparés.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Calculer mes économies
              </button>
            </div>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Questions fréquentes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Puis-je ajouter des services plus tard ?</h4>
              <p className="text-gray-600">Oui, vous pouvez ajouter ou retirer des services à tout moment selon vos besoins.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Y a-t-il des frais cachés ?</h4>
              <p className="text-gray-600">Non, tous nos prix sont transparents et incluent tous les frais nécessaires.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Puis-je annuler à tout moment ?</h4>
              <p className="text-gray-600">Oui, vous pouvez annuler votre abonnement à tout moment sans frais supplémentaires.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 