import { Metadata } from "next";
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { PricingSection } from '@/components/PricingSection'
import { Process } from '@/components/Process'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTA } from '@/components/CTA'
import ScrollToTop from "@/components/ScrollToTop";
import TransparentPricingCalculator from '@/components/TransparentPricingCalculator';

export const metadata: Metadata = {
  title: 'ProsperaLink - Votre LLC. Sans la Complexité.',
  description: 'Formez votre LLC aux USA avec sérénité. Prix transparent, support IA 24/7, conformité automatique. Aucun frais caché.',
  keywords: 'LLC USA, formation entreprise, sérénité, prix transparent, support IA, conformité',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Simplifié */}
      <section id="hero" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Votre LLC. <span className="text-blue-600">Sans la Complexité.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Formez votre entreprise aux USA avec sérénité. Prix transparent, 
              support IA 24/7, conformité automatique.
            </p>
            
            {/* 3 chiffres clés */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">997$</div>
                <div className="text-gray-600">par an</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">0$</div>
                <div className="text-gray-600">frais cachés</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                <div className="text-gray-600">tranquillité</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                Commencer maintenant
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
                Voir les prix
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculateur de Prix Transparent */}
      <section id="pricing-calculator" className="py-20">
        <div className="container mx-auto px-4">
          <TransparentPricingCalculator />
        </div>
      </section>

      {/* Problem Section - Simplifié */}
      <section id="problem" className="py-20 bg-gradient-to-br from-red-50 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              L'anxiété de la conformité
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Les entrepreneurs internationaux perdent du temps et de l'argent à gérer 
              la complexité administrative. Nous simplifions tout.
            </p>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-4">Sans ProsperaLink</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <span className="text-red-500">✗</span>
                      <span>Prix cachés et surprises</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-red-500">✗</span>
                      <span>Support limité</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-red-500">✗</span>
                      <span>Conformité manuelle</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">Avec ProsperaLink</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Prix transparents</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Support IA 24/7</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span>Conformité automatique</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - 3 piliers */}
      <section id="solution" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Les 3 piliers de la sérénité
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre approche unique combine transparence, intelligence et automatisation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Transparence Totale</h3>
              <p className="text-gray-600">
                Prix décomposés, aucun frais caché. Vous savez exactement ce que vous payez et pourquoi.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">IA Contextuelle</h3>
              <p className="text-gray-600">
                Assistant intelligent qui anticipe vos besoins et vous guide à chaque étape.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Automatisation Complète</h3>
              <p className="text-gray-600">
                Conformité, rapports, renouvellements - tout est automatisé pour votre tranquillité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <Services />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <Testimonials />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <FAQ />
      </section>

      {/* CTA Section - Consultation gratuite */}
      <section id="cta" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Commencez avec une consultation gratuite
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Notre équipe d'experts vous accompagne gratuitement pour évaluer vos besoins 
              et vous proposer la meilleure solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                Réserver une consultation
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </main>
  );
} 