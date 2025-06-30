'use client';

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const steps = [
  {
    id: 1,
    title: 'Consultation IA',
    description: 'Analyse intelligente de vos besoins avec notre IA',
    duration: '15 min',
    icon: '🤖',
    details: [
      'Analyse IA de votre situation',
      'Recommandations personnalisées',
      'Simulation de différents scénarios',
      'Plan d\'action optimisé'
    ]
  },
  {
    id: 2,
    title: 'Préparation IA',
    description: 'Génération automatique des documents nécessaires',
    duration: '1-2 jours',
    icon: '📄',
    details: [
      'Génération IA des formulaires',
      'Vérification automatique des documents',
      'Optimisation des informations',
      'Préparation EIN IA'
    ]
  },
  {
    id: 3,
    title: 'Formation IA Accélérée',
    description: 'Processus optimisé par IA pour une formation ultra-rapide',
    duration: '12h',
    icon: '⚡',
    details: [
      'Soumission IA optimisée',
      'Traitement prioritaire',
      'Confirmation instantanée',
      'EIN automatique'
    ]
  },
  {
    id: 4,
    title: 'Configuration IA Complète',
    description: 'Mise en place intelligente de tous les services',
    duration: '2-3 jours',
    icon: '🔧',
    details: [
      'Ouverture bancaire IA',
      'Configuration comptable IA',
      'Conformité prédictive',
      'Portail client IA'
    ]
  },
  {
    id: 5,
    title: 'Support IA Continu',
    description: 'Accompagnement intelligent 24/7 avec IA avancée',
    duration: 'Ongoing',
    icon: '🎯',
    details: [
      'Support IA 24/7',
      'Conseils stratégiques IA',
      'Optimisation continue',
      'Croissance prédictive'
    ]
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Notre Processus IA Révolutionnaire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            L'intelligence artificielle optimise chaque étape pour une expérience unique et ultra-rapide
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              {/* Step Number */}
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4 mx-auto">
                {step.id}
              </div>
              
              {/* Step Content */}
              <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveStep(step.id)}>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {step.duration}
                </span>
              </Card>

              {/* Connector Line */}
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-300 z-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed View */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-6xl mb-4">{steps[activeStep - 1].icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {steps[activeStep - 1].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {steps[activeStep - 1].description}
              </p>
              
              <div className="space-y-3">
                {steps[activeStep - 1].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Commencer avec IA
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Avantages IA de cette étape
              </h4>
              <div className="space-y-4">
                {activeStep === 1 && (
                  <>
                    <p className="text-gray-700">
                      Notre IA analyse des milliers de cas similaires pour vous proposer 
                      la meilleure stratégie personnalisée.
                    </p>
                    <p className="text-gray-700">
                      Simulation en temps réel de différents scénarios pour optimiser 
                      vos choix et maximiser vos avantages.
                    </p>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <p className="text-gray-700">
                      L'IA génère automatiquement tous les documents nécessaires 
                      en optimisant chaque détail pour la rapidité.
                    </p>
                    <p className="text-gray-700">
                      Vérification intelligente pour éliminer les erreurs et 
                      garantir une approbation immédiate.
                    </p>
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <p className="text-gray-700">
                      Notre IA optimise le processus de soumission pour obtenir 
                      une formation en 12h au lieu de 24h.
                    </p>
                    <p className="text-gray-700">
                      Traitement prioritaire automatique grâce à l'optimisation IA 
                      des dossiers.
                    </p>
                  </>
                )}
                {activeStep === 4 && (
                  <>
                    <p className="text-gray-700">
                      Configuration intelligente de tous les services essentiels 
                      pour une opérationnalité immédiate.
                    </p>
                    <p className="text-gray-700">
                      Conformité prédictive qui anticipe vos obligations futures 
                      et vous prépare en avance.
                    </p>
                  </>
                )}
                {activeStep === 5 && (
                  <>
                    <p className="text-gray-700">
                      Support IA 24/7 qui comprend votre situation et vous guide 
                      vers les meilleures décisions.
                    </p>
                    <p className="text-gray-700">
                      Optimisation continue de votre entreprise avec des insights 
                      prédictifs pour la croissance.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Progression IA</span>
            <span className="text-sm font-medium text-blue-600">20%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
} 