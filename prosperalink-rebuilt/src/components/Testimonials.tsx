import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Fondatrice, TechStart LLC",
      content: "ProsperaLink a transformé mon expérience de création d'entreprise. En 24h, j'avais ma LLC formée et mon EIN. Le processus était incroyablement simple et l'équipe était là pour répondre à toutes mes questions.",
      rating: 5,
      location: "Paris, France"
    },
    {
      name: "Jean-Luc Martin",
      role: "CEO, Digital Ventures LLC",
      content: "Après avoir essayé plusieurs services, ProsperaLink est de loin le plus professionnel. Les prix sont transparents, le support est excellent, et j'ai économisé des milliers de dollars par rapport aux avocats traditionnels.",
      rating: 5,
      location: "Montréal, Canada"
    },
    {
      name: "Sophie Chen",
      role: "Fondatrice, Global Solutions LLC",
      content: "En tant qu'entrepreneure internationale, j'avais besoin d'un service qui comprenne mes besoins spécifiques. ProsperaLink a dépassé mes attentes avec leur expertise et leur support multilingue.",
      rating: 5,
      location: "Singapour"
    },
    {
      name: "Pierre Moreau",
      role: "Directeur, Innovation Labs LLC",
      content: "La plateforme en ligne est intuitive et le calculateur de prix m'a permis de planifier mon budget avec précision. Je recommande ProsperaLink à tous les entrepreneurs qui veulent créer une entreprise aux États-Unis.",
      rating: 5,
      location: "Lyon, France"
    },
    {
      name: "Isabella Rodriguez",
      role: "Fondatrice, Creative Agency LLC",
      content: "Le processus était si rapide que je n'en revenais pas ! En une journée, j'avais tous mes documents et je pouvais commencer à faire des affaires. L'équipe ProsperaLink est vraiment exceptionnelle.",
      rating: 5,
      location: "Madrid, Espagne"
    },
    {
      name: "Thomas Weber",
      role: "CEO, European Tech LLC",
      content: "Après des mois de recherche et de comparaison, j'ai choisi ProsperaLink pour sa transparence et son professionnalisme. Je n'ai pas été déçu. Service de qualité et prix compétitifs.",
      rating: 5,
      location: "Berlin, Allemagne"
    }
  ];

  const stats = [
    { number: "500+", label: "Entreprises formées" },
    { number: "99%", label: "Taux de satisfaction" },
    { number: "24h", label: "Délai moyen" },
    { number: "50+", label: "Pays servis" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi des centaines d'entrepreneurs du monde entier 
            ont choisi ProsperaLink pour créer leur entreprise aux États-Unis.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-gray-300" />
                </div>
                <CardDescription className="text-sm">
                  {testimonial.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez nos clients satisfaits
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Commencez votre voyage entrepreneurial avec ProsperaLink et 
              créez votre entreprise aux États-Unis en toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/signup" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Commencer maintenant
              </a>
              <a href="/dashboard/calculator" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Calculer les prix
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 