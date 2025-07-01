'use client';

import { useState } from 'react';

export default function APIDocsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const endpoints = [
    {
      method: 'GET',
      path: '/api/public?action=company-status&companyId={id}',
      description: 'Récupérer le statut d\'une entreprise',
      parameters: [
        { name: 'companyId', type: 'string', required: true, description: 'ID de l\'entreprise' }
      ],
      response: {
        success: true,
        data: {
          id: 'company_123',
          name: 'Ma Société LLC',
          status: 'active',
          formationDate: '2024-01-15',
          complianceScore: 85
        }
      }
    },
    {
      method: 'GET',
      path: '/api/public?action=pricing-calculate&services=compliance,ai-support',
      description: 'Calculer le prix des services',
      parameters: [
        { name: 'services', type: 'string', required: false, description: 'Services séparés par des virgules' }
      ],
      response: {
        success: true,
        data: {
          totalPrice: 1495,
          currency: 'USD'
        }
      }
    },
    {
      method: 'POST',
      path: '/api/public',
      description: 'Créer une entreprise',
      body: {
        action: 'company-create',
        data: {
          name: 'Ma Nouvelle LLC',
          state: 'DE',
          businessType: 'technology',
          ownerEmail: 'owner@example.com'
        }
      },
      response: {
        success: true,
        data: {
          id: 'company_456',
          name: 'Ma Nouvelle LLC',
          status: 'forming',
          formationDate: '2024-01-20'
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Documentation API
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intégrez ProsperaLink dans vos applications. API REST simple et puissante 
            pour la gestion de LLC et la conformité.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['overview', 'authentication', 'endpoints', 'examples', 'webhooks'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vue d'ensemble</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalités</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Gestion des entreprises</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Calcul de prix</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Vérification de conformité</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Webhooks en temps réel</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Spécifications</h3>
                  <ul className="space-y-3">
                    <li><strong>Base URL:</strong> https://api.prosperalink.com</li>
                    <li><strong>Format:</strong> JSON</li>
                    <li><strong>Authentification:</strong> API Key</li>
                    <li><strong>Rate Limit:</strong> 1000 req/hour</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'authentication' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Authentification</h2>
              <p className="text-gray-600 mb-6">
                Toutes les requêtes API nécessitent une clé API valide dans l'en-tête HTTP.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Exemple d'en-tête :</h3>
                <code className="text-sm">
                  X-API-Key: votre_clé_api_ici
                </code>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important</h3>
                <p className="text-yellow-700">
                  Gardez votre clé API secrète. Ne l'exposez jamais dans le code client 
                  ou dans des dépôts publics.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Endpoints</h2>
              <div className="space-y-8">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                        {endpoint.path}
                      </code>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{endpoint.description}</p>
                    
                    {endpoint.parameters && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Paramètres :</h4>
                        <div className="bg-gray-50 rounded p-3">
                          {endpoint.parameters.map((param, pIndex) => (
                            <div key={pIndex} className="flex items-center space-x-4 text-sm">
                              <span className="font-mono">{param.name}</span>
                              <span className="text-gray-500">{param.type}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                param.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {param.required ? 'Requis' : 'Optionnel'}
                              </span>
                              <span className="text-gray-600">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {endpoint.body && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Body :</h4>
                        <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
                          {JSON.stringify(endpoint.body, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Réponse :</h4>
                      <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
                        {JSON.stringify(endpoint.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Exemples d'utilisation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript/Node.js</h3>
                  <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
{`// Récupérer le statut d'une entreprise
const response = await fetch(
  'https://api.prosperalink.com/api/public?action=company-status&companyId=company_123',
  {
    headers: {
      'X-API-Key': 'votre_clé_api_ici'
    }
  }
);

const data = await response.json();
console.log(data);`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Python</h3>
                  <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
{`import requests

# Calculer le prix des services
response = requests.get(
    'https://api.prosperalink.com/api/public',
    params={
        'action': 'pricing-calculate',
        'services': 'compliance,ai-support'
    },
    headers={
        'X-API-Key': 'votre_clé_api_ici'
    }
)

data = response.json()
print(data)`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">cURL</h3>
                  <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
{`# Créer une entreprise
curl -X POST https://api.prosperalink.com/api/public \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: votre_clé_api_ici" \\
  -d '{
    "action": "company-create",
    "data": {
      "name": "Ma Nouvelle LLC",
      "state": "DE",
      "businessType": "technology",
      "ownerEmail": "owner@example.com"
    }
  }'`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Webhooks</h2>
              <p className="text-gray-600 mb-6">
                Recevez des notifications en temps réel sur les événements importants.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Événements disponibles</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <span className="text-blue-500">•</span>
                      <span>company.formed</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-blue-500">•</span>
                      <span>compliance.deadline</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-blue-500">•</span>
                      <span>document.generated</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-blue-500">•</span>
                      <span>payment.received</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemple de payload</h3>
                  <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
{`{
  "event": "company.formed",
  "timestamp": "2024-01-20T10:30:00Z",
  "data": {
    "companyId": "company_123",
    "name": "Ma Société LLC",
    "formationDate": "2024-01-20"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Prêt à commencer ?
          </h3>
          <p className="text-gray-600 mb-6">
            Obtenez votre clé API et commencez à intégrer ProsperaLink dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Obtenir une clé API
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              Tester l'API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 