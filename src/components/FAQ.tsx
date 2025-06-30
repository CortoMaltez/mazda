import * as React from 'react';

export default function FAQ() {
  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">FAQ</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Est-ce que je peux créer une LLC sans être résident américain ?</h3>
            <p className="text-gray-600">Oui, ProsperaLink accompagne les non-résidents dans la création de leur société aux USA.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Quels sont les délais pour ouvrir un compte bancaire US ?</h3>
            <p className="text-gray-600">En général, l'ouverture prend entre 3 et 7 jours ouvrés après la création de la LLC.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Proposez-vous un accompagnement fiscal ?</h3>
            <p className="text-gray-600">Oui, nous proposons des modules d'optimisation fiscale et de gestion de la conformité.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 