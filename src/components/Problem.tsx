import * as React from 'react';

export default function Problem() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Les obstacles des entrepreneurs globaux</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Complexité administrative</h3>
            <p className="text-gray-600">Créer une entreprise aux USA est un parcours du combattant pour les non-résidents.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Conformité & fiscalité</h3>
            <p className="text-gray-600">La peur des pénalités et des erreurs fiscales freine la croissance internationale.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Accès aux outils bancaires</h3>
            <p className="text-gray-600">Ouvrir un compte bancaire US ou accéder à Stripe/PayPal est souvent impossible sans accompagnement.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 