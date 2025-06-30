"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "Combien de temps faut-il pour former une LLC ?",
      answer: "Avec ProsperaLink, la formation de votre LLC prend généralement 24 heures. Le processus est entièrement en ligne et nos experts traitent votre demande rapidement pour vous permettre de commencer vos activités sans délai."
    },
    {
      question: "Quels sont les coûts exacts ?",
      answer: "Nos tarifs sont transparents et sans surprise. La formation de base coûte $49, le plan Premium avec EIN et compte bancaire $99, et le plan Enterprise avec services comptables $199. Tous les frais gouvernementaux sont inclus."
    },
    {
      question: "Puis-je former une LLC depuis l'étranger ?",
      answer: "Absolument ! ProsperaLink est spécialement conçu pour les entrepreneurs internationaux. Vous pouvez former votre LLC depuis n'importe quel pays. Nous gérons tous les aspects administratifs pour vous."
    },
    {
      question: "Quels documents recevrai-je ?",
      answer: "Vous recevrez tous les documents légaux nécessaires : Articles d'organisation, Accord d'exploitation, Certificat de formation, et EIN si inclus dans votre plan. Tous les documents sont générés automatiquement et vérifiés par nos experts."
    },
    {
      question: "Y a-t-il des frais cachés ?",
      answer: "Non, aucun frais caché. Nos prix sont clairement affichés et incluent tous les frais gouvernementaux et de traitement. Vous ne paierez que le montant indiqué, sans surprise."
    },
    {
      question: "Quel support est disponible ?",
      answer: "Nous offrons un support expert 24/7 en français et en anglais. Notre équipe d'experts est disponible par chat, email et téléphone pour répondre à toutes vos questions et vous accompagner tout au long du processus."
    },
    {
      question: "Puis-je changer d'état après la formation ?",
      answer: "Oui, vous pouvez transférer votre LLC vers un autre état si nécessaire. Nous vous accompagnons dans ce processus et vous aidons à comprendre les implications fiscales et légales."
    },
    {
      question: "Y a-t-il une garantie ?",
      answer: "Oui, nous offrons une garantie de satisfaction à 100%. Si vous n'êtes pas satisfait de nos services, nous vous remboursons intégralement. Votre succès est notre priorité."
    },
    {
      question: "Comment fonctionne le calculateur de prix ?",
      answer: "Notre calculateur de prix vous permet de voir instantanément le coût total en fonction de vos besoins : état de formation, services additionnels, et options spécifiques. C'est un outil transparent pour planifier votre budget."
    },
    {
      question: "Puis-je gérer plusieurs entreprises ?",
      answer: "Oui, notre plateforme vous permet de gérer plusieurs entreprises depuis un seul tableau de bord. Vous pouvez suivre le statut de chaque formation, accéder aux documents, et gérer les renouvellements."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Questions fréquemment posées
          </h2>
          <p className="text-xl text-gray-600">
            Trouvez rapidement les réponses à vos questions sur la formation d'entreprises LLC.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-blue-100 mb-6">
              Notre équipe d'experts est là pour vous aider. Contactez-nous 
              et nous répondrons à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@prosperalink.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100">
                Nous contacter
              </a>
              <a href="/auth/signup" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700">
                Commencer maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 