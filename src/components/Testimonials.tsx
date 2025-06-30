import * as React from 'react';

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ils ont choisi ProsperaLink</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">“Grâce à ProsperaLink, j'ai pu lancer ma LLC et accéder à Stripe en moins d'une semaine.”</p>
            <div className="mt-4 font-semibold text-blue-700">Sarah, Freelance</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">“La gestion de la conformité est automatisée, je peux me concentrer sur mon business.”</p>
            <div className="mt-4 font-semibold text-blue-700">Yassine, E-commerçant</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">“Un accompagnement humain et une plateforme moderne, je recommande à 100%.”</p>
            <div className="mt-4 font-semibold text-blue-700">Julie, SaaS Founder</div>
          </div>
        </div>
      </div>
    </section>
  );
} 