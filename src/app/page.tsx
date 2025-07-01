import { Metadata } from "next";
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { PricingSection } from '@/components/PricingSection'
import { Process } from '@/components/Process'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTA } from '@/components/CTA'
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: 'ProsperaLink - Formation LLC USA en 12h | Support IA 24/7',
  description: 'Formez votre LLC aux USA en 12h maximum. Support IA multilingue 24/7, conformité automatique, prix transparent. Plus de 2500 entreprises créées.',
  keywords: 'LLC USA, formation entreprise, Delaware, Wyoming, support IA, conformité, prix transparent',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="pt-20">
        <Hero />
      </section>

      {/* Formation LLC Section */}
      <section id="formation" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Formation LLC en 12h Maximum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Créez votre entreprise aux USA en moins d'une journée. Processus automatisé, 
              conformité incluse, support IA 24/7 en français, anglais, espagnol et arabe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Remplissez le formulaire</h3>
              <p className="text-gray-600">Informations de base : nom, adresse, type d'activité. Notre IA vous guide.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Documents générés</h3>
              <p className="text-gray-600">Articles of Organization, EIN, Operating Agreement créés automatiquement.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">LLC active</h3>
              <p className="text-gray-600">Votre entreprise est opérationnelle. Accès au dashboard de gestion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <Services />
      </section>

      {/* AI Support Section */}
      <section id="ai-support" className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Support IA 24/7 Multilingue
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Assistant IA disponible en français, anglais, espagnol et arabe. 
              Réponses instantanées, conseils personnalisés, support technique.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇫🇷</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Français</h3>
              <p className="text-gray-600">Support complet en français</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇺🇸</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">English</h3>
              <p className="text-gray-600">Full English support</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇪🇸</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Español</h3>
              <p className="text-gray-600">Soporte completo en español</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇸🇦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">العربية</h3>
              <p className="text-gray-600">دعم كامل باللغة العربية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section id="social" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gestion Réseaux Sociaux
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intégration Facebook, Instagram, LinkedIn. Publication automatique, 
              analytics, gestion des commentaires avec IA.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📘</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Facebook</h3>
              <p className="text-gray-600">Gestion des pages, publications, insights, publicités.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-pink-600 text-xl">📷</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instagram</h3>
              <p className="text-gray-600">Posts, stories, reels, analytics, engagement.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">LinkedIn</h3>
              <p className="text-gray-600">Posts professionnels, networking, B2B.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Conformité Automatique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rapports annuels, déclarations fiscales, renouvellements automatiques. 
              Alertes proactives, documents sécurisés.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Documents Inclus</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Articles of Organization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>EIN (Numéro d'identification fiscale)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Operating Agreement</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Agent agréé (1 an inclus)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Obligations Automatisées</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Rapports annuels</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Déclarations fiscales</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Renouvellements automatiques</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Alertes de conformité</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payments Section */}
      <section id="payments" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Paiements Sécurisés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stripe intégré, paiements en crypto, facturation automatique. 
              Prix transparent : coûts réels + 500$ de profit fixe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cartes Bancaires</h3>
              <p className="text-gray-600">Visa, Mastercard, American Express acceptées.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-600 text-xl">₿</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cryptomonnaies</h3>
              <p className="text-gray-600">Bitcoin, Ethereum, USDC acceptés.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Facturation</h3>
              <p className="text-gray-600">Factures automatiques, abonnements mensuels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gestion Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload sécurisé, stockage cloud, partage contrôlé. 
              Documents signés électroniquement, historique complet.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Fonctionnalités</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Upload illimité de documents</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Stockage sécurisé cloud</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Signature électronique</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Partage contrôlé</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Sécurité</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Chiffrement AES-256</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Accès contrôlé par rôle</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Audit trail complet</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Conformité GDPR</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Analytics Avancés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tableaux de bord en temps réel, rapports personnalisés, 
              prédictions IA, métriques de performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2,500+</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Entreprises Créées</h3>
              <p className="text-gray-600">Plus de 2500 LLC formées</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">12h</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Formation Moyenne</h3>
              <p className="text-gray-600">Temps de création record</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">98%</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Satisfaction Client</h3>
              <p className="text-gray-600">Taux de satisfaction élevé</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">50+</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pays Servis</h3>
              <p className="text-gray-600">Couverture internationale</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <PricingSection />
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculateur de Prix Transparent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculez le coût exact de votre LLC. Prix transparent : 
              coûts réels + 500$ de profit fixe. Aucun frais caché.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Coûts Réels</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Frais d'état</span>
                    <span className="font-semibold">$50 - $150</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Agent agréé</span>
                    <span className="font-semibold">$100 - $200</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EIN gratuit</span>
                    <span className="font-semibold">$0</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Documents</span>
                    <span className="font-semibold">$50 - $100</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Notre Service</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Formation complète</span>
                    <span className="font-semibold">Inclus</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Support IA 24/7</span>
                    <span className="font-semibold">Inclus</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Conformité automatique</span>
                    <span className="font-semibold">Inclus</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Profit fixe</span>
                    <span className="font-semibold text-blue-600">$500</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Prix Total Estimé</h3>
                <p className="text-4xl font-bold text-blue-600">$700 - $950</p>
                <p className="text-gray-600 mt-2">Selon l'état choisi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <Process />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <Testimonials />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <FAQ />
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20">
        <CTA />
      </section>

      <ScrollToTop />
    </main>
  );
} 