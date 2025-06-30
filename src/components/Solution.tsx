import * as React from 'react';

export default function Solution() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Notre solution : Growth-as-a-Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">LLC Formation</h3>
            <p className="text-gray-600">Création rapide et sécurisée de votre société dans l'État optimal.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Banking & Compliance</h3>
            <p className="text-gray-600">Ouverture de compte bancaire US, gestion automatisée de la conformité et des obligations fiscales.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Outils de croissance</h3>
            <p className="text-gray-600">Accès à des outils SaaS, analytics, et accompagnement pour scaler sur le marché américain.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 