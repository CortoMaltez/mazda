'use client';

import { useState } from 'react';
import { TransparentPricingEngine } from '@/lib/pricing/PricingEngine';

export default function TransparentPricingCalculator() {
  const [selectedState, setSelectedState] = useState('Wyoming');
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const pricingEngine = new TransparentPricingEngine();
  const pricing = pricingEngine.calculatePrice(selectedState);

  const states = [
    { value: 'Wyoming', name: 'Wyoming', description: 'Le plus économique' },
    { value: 'Delaware', name: 'Delaware', description: 'Le plus populaire' },
    { value: 'Nevada', name: 'Nevada', description: 'Protection renforcée' },
    { value: 'Florida', name: 'Florida', description: 'Économique et flexible' },
    { value: 'Texas', name: 'Texas', description: 'Aucun frais annuel' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Calculateur de Prix Transparent
        </h2>
        <p className="text-lg text-gray-600">
          Découvrez exactement ce que vous payez et pourquoi
        </p>
      </div>

      {/* Sélection d'état */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choisissez votre état de formation:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {states.map((state) => (
            <button
              key={state.value}
              onClick={() => setSelectedState(state.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedState === state.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{state.name}</div>
              <div className="text-sm text-gray-600">{state.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prix principal */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            ${pricing.total}
          </div>
          <div className="text-lg text-gray-600 mb-4">
            Prix total pour {selectedState}
          </div>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showBreakdown ? 'Masquer' : 'Voir'} la décomposition
          </button>
        </div>
      </div>

      {/* Décomposition détaillée */}
      {showBreakdown && (
        <div className="space-y-6">
          {/* Frais d'état */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🏛️</span>
              Frais d'État - {selectedState}
            </h3>
            <div className="space-y-3">
              {pricing.transparency.stateFeesBreakdown.map((fee, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{fee.fee}</div>
                    <div className="text-sm text-gray-600">{fee.description}</div>
                  </div>
                  <div className="font-semibold text-gray-900">${fee.amount}</div>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="font-semibold text-gray-900">Total frais d'état</div>
                <div className="font-bold text-lg text-gray-900">${pricing.breakdown.stateFees}</div>
              </div>
            </div>
          </div>

          {/* Nos services */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⚙️</span>
              Nos Services
            </h3>
            <div className="space-y-3">
              {pricing.transparency.ourCosts.map((cost, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{cost.item}</div>
                    <div className="text-sm text-gray-600">{cost.description}</div>
                  </div>
                  <div className="font-semibold text-gray-900 ml-4">${cost.cost}</div>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="font-semibold text-gray-900">Total services</div>
                <div className="font-bold text-lg text-gray-900">
                  ${pricing.breakdown.agentFee + pricing.breakdown.taxFiling}
                </div>
              </div>
            </div>
          </div>

          {/* Marge ProsperaLink */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">💼</span>
              Marge ProsperaLink
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900">Marge opérationnelle</div>
                <div className="text-sm text-gray-600">
                  Couvre nos coûts opérationnels et maintient un service de qualité
                </div>
              </div>
              <div className="font-bold text-lg text-gray-900">${pricing.breakdown.prosperalinkFee}</div>
            </div>
          </div>

          {/* Économies vs concurrents */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">💰</span>
              Économies réalisées
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${pricing.savings.vsLegalZoom}
                </div>
                <div className="text-sm text-gray-600">vs LegalZoom</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${pricing.savings.vsRocketLawyer}
                </div>
                <div className="text-sm text-gray-600">vs RocketLawyer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${pricing.savings.vsIncfile}
                </div>
                <div className="text-sm text-gray-600">vs Incfile</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
          Commencer maintenant - ${pricing.total}
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Aucun frais caché • Garantie 100% • Support IA 24/7
        </p>
      </div>
    </div>
  );
} 