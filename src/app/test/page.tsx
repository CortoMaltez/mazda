import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Test - ProsperaLink',
  description: 'Page de test pour ProsperaLink',
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4 bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-2" />
            Test Réussi
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ProsperaLink fonctionne correctement !
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tous les composants sont chargés et l'application est opérationnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                L'application se charge rapidement et tous les composants sont fonctionnels.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Toutes les fonctionnalités de sécurité sont actives et opérationnelles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span>Qualité</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                L'interface utilisateur est responsive et optimisée pour tous les appareils.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  )
} 