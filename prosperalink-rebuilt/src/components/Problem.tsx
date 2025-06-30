import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, DollarSign, FileText } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      icon: Clock,
      title: "Processus long et complexe",
      description: "La formation d'entreprise traditionnelle prend des semaines voire des mois avec des procédures administratives interminables."
    },
    {
      icon: DollarSign,
      title: "Coûts cachés élevés",
      description: "Frais de dossier, honoraires d'avocat, services additionnels... Le prix final dépasse souvent largement les estimations initiales."
    },
    {
      icon: FileText,
      title: "Documentation complexe",
      description: "Formulaires gouvernementaux, documents légaux, conformité fiscale... Un labyrinthe administratif difficile à naviguer."
    },
    {
      icon: AlertTriangle,
      title: "Risques d'erreurs",
      description: "Une simple erreur dans les documents peut retarder le processus de plusieurs semaines ou même invalider la formation."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Les défis de la formation d'entreprise traditionnelle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Créer une entreprise aux États-Unis ne devrait pas être un parcours du combattant. 
            Pourtant, de nombreux entrepreneurs se heurtent à ces obstacles quotidiens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <problem.icon className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {problem.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-red-900 mb-4">
              Ces problèmes vous semblent familiers ?
            </h3>
            <p className="text-red-700 mb-6">
              Vous n'êtes pas seul. Des milliers d'entrepreneurs font face aux mêmes défis chaque année. 
              Mais il existe une solution plus simple, plus rapide et plus économique.
            </p>
            <div className="text-sm text-red-600">
              <strong>Saviez-vous ?</strong> 73% des entrepreneurs abandonnent leur projet de formation d'entreprise 
              à cause de la complexité administrative.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 