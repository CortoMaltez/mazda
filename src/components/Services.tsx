import * as React from 'react';

export default function Services() {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nos services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">LLC Formation</h3>
            <p className="text-gray-600">Création de société dans l'État optimal</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">Banking US</h3>
            <p className="text-gray-600">Ouverture de compte bancaire américain</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">Compliance</h3>
            <p className="text-gray-600">Gestion automatisée de la conformité</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">Growth Tools</h3>
            <p className="text-gray-600">Outils SaaS, analytics, support</p>
          </div>
        </div>
      </div>
    </section>
  );
} 