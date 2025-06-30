'use client';

import { Button } from './ui/button';
import { Card } from './ui/card';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à Créer Votre Entreprise LLC ?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Rejoignez des milliers d'entrepreneurs qui ont choisi ProsperaLink 
            pour leur formation d'entreprise. Commencez votre voyage vers le succès dès aujourd'hui.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Formation en 24h</h3>
              <p className="opacity-90">
                Votre entreprise LLC sera formée et opérationnelle en moins de 24 heures
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Garantie 30 jours</h3>
              <p className="opacity-90">
                Si vous n'êtes pas satisfait, nous vous remboursons intégralement
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
              <p className="opacity-90">
                Notre équipe et notre IA sont disponibles 24h/24 pour vous accompagner
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Commencer Maintenant
            </Button>
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
              Consultation Gratuite
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-white/80 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">5000+</div>
              <div>Entreprises Formées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24h</div>
              <div>Temps de Formation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">99%</div>
              <div>Taux de Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div>Support Disponible</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="text-center text-white/70">
            <p className="mb-4">Paiement sécurisé par</p>
            <div className="flex justify-center items-center space-x-6">
              <div className="bg-white/10 px-4 py-2 rounded">Visa</div>
              <div className="bg-white/10 px-4 py-2 rounded">Mastercard</div>
              <div className="bg-white/10 px-4 py-2 rounded">PayPal</div>
              <div className="bg-white/10 px-4 py-2 rounded">Stripe</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 