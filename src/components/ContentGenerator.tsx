'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Image, 
  Video, 
  Share2, 
  Download, 
  Copy,
  Sparkles,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Brain,
  Zap,
  Globe,
  Hash,
  AtSign,
  Link as LinkIcon
} from 'lucide-react';
// Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: any;
  platforms: string[];
  templates: string[];
}

interface GeneratedContent {
  id: string;
  type: string;
  platform: string;
  title: string;
  content: string;
  hashtags: string[];
  imagePrompt?: string;
  videoPrompt?: string;
  scheduledFor?: Date;
  status: 'draft' | 'ready' | 'published' | 'failed';
  createdAt: Date;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    reach: number;
  };
}

export default function ContentGenerator() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customization, setCustomization] = useState({
    tone: 'professional',
    length: 'medium',
    includeHashtags: true,
    includeCallToAction: true,
    targetAudience: 'entrepreneurs'
  });

  const contentTypes: ContentType[] = [
    {
      id: 'social-post',
      name: 'Publication Réseaux Sociaux',
      description: 'Contenu optimisé pour Facebook, Instagram, LinkedIn',
      icon: Share2,
      platforms: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'],
      templates: [
        'Annonce de service',
        'Témoignage client',
        'Conseil d\'expert',
        'Actualité du secteur',
        'Promotion spéciale'
      ]
    },
    {
      id: 'blog-post',
      name: 'Article de Blog',
      description: 'Contenu long format pour SEO et engagement',
      icon: FileText,
      platforms: ['Blog', 'Medium', 'LinkedIn Articles'],
      templates: [
        'Guide complet',
        'Étude de cas',
        'Tendances du marché',
        'Conseils pratiques',
        'Analyse approfondie'
      ]
    },
    {
      id: 'email-campaign',
      name: 'Campagne Email',
      description: 'Séquences d\'emails automatisées',
      icon: AtSign,
      platforms: ['Email Marketing'],
      templates: [
        'Séquence de bienvenue',
        'Promotion de lancement',
        'Nurturing leads',
        'Abandon de panier',
        'Fidélisation clients'
      ]
    },
    {
      id: 'ad-copy',
      name: 'Copie Publicitaire',
      description: 'Textes pour Google Ads, Facebook Ads',
      icon: Target,
      platforms: ['Google Ads', 'Facebook Ads', 'Instagram Ads'],
      templates: [
        'Annonce de recherche',
        'Annonce display',
        'Annonce vidéo',
        'Carrousel',
        'Stories'
      ]
    }
  ];

  const tones = [
    { value: 'professional', label: 'Professionnel' },
    { value: 'friendly', label: 'Amical' },
    { value: 'authoritative', label: 'Autoritaire' },
    { value: 'casual', label: 'Décontracté' },
    { value: 'enthusiastic', label: 'Enthousiaste' }
  ];

  const lengths = [
    { value: 'short', label: 'Court (50-100 mots)' },
    { value: 'medium', label: 'Moyen (100-200 mots)' },
    { value: 'long', label: 'Long (200-500 mots)' }
  ];

  const targetAudiences = [
    { value: 'entrepreneurs', label: 'Entrepreneurs' },
    { value: 'startups', label: 'Startups' },
    { value: 'investors', label: 'Investisseurs' },
    { value: 'professionals', label: 'Professionnels' },
    { value: 'international', label: 'Public international' }
  ];

  const generateContent = async () => {
    if (!selectedType || !selectedPlatform || !prompt) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simuler la génération de contenu avec IA
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      const contentType = contentTypes.find(t => t.id === selectedType);
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: selectedType,
        platform: selectedPlatform,
        title: `Contenu généré pour ${selectedPlatform}`,
        content: generateContentBasedOnType(selectedType, prompt, customization),
        hashtags: generateHashtags(prompt, selectedPlatform),
        imagePrompt: generateImagePrompt(prompt, selectedType),
        videoPrompt: selectedType === 'ad-copy' ? generateVideoPrompt(prompt) : undefined,
        status: 'ready',
        createdAt: new Date(),
        engagement: {
          likes: Math.floor(Math.random() * 1000),
          shares: Math.floor(Math.random() * 200),
          comments: Math.floor(Math.random() * 100),
          reach: Math.floor(Math.random() * 5000)
        }
      };
      
      setGeneratedContent(prev => [newContent, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      alert('Erreur lors de la génération du contenu');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContentBasedOnType = (type: string, prompt: string, customization: any): string => {
    const baseContent = {
      'social-post': `🚀 ${prompt}\n\n💡 Notre service de formation LLC aux États-Unis vous accompagne à chaque étape.\n\n✅ Formation en 12h\n✅ Support IA 24/7\n✅ Conformité garantie\n\n${customization.includeCallToAction ? '👉 Commencez votre aventure entrepreneuriale dès aujourd\'hui !' : ''}`,
      'blog-post': `# ${prompt}\n\n## Introduction\n\nLa formation d'entreprise aux États-Unis représente une opportunité unique pour les entrepreneurs internationaux. Avec ProsperaLink, nous révolutionnons ce processus en combinant expertise juridique et technologie de pointe.\n\n## Les Avantages de la Formation LLC\n\n- **Formation rapide** : Processus optimisé en 12h\n- **Support intelligent** : IA Gemini disponible 24/7\n- **Conformité garantie** : Surveillance automatique des obligations\n- **Prix transparents** : Coûts réels + profit fixe\n\n## Conclusion\n\n${prompt} n'a jamais été aussi simple. Rejoignez les milliers d'entrepreneurs qui nous font confiance.`,
      'email-campaign': `Objet: ${prompt} - Votre formation LLC aux États-Unis\n\nBonjour,\n\nNous espérons que vous allez bien.\n\n${prompt} est maintenant à votre portée grâce à ProsperaLink.\n\n**Ce que nous vous offrons :**\n• Formation LLC en 12h\n• Support IA 24/7\n• Conformité garantie\n• Prix transparents\n\n${customization.includeCallToAction ? 'Cliquez ici pour commencer : [Lien]' : ''}\n\nCordialement,\nL\'équipe ProsperaLink`,
      'ad-copy': `${prompt}\n\n✅ Formation LLC en 12h\n✅ Support IA 24/7\n✅ Conformité garantie\n\n💡 Service premium pour entrepreneurs internationaux\n\n${customization.includeCallToAction ? '🎯 Commencez maintenant' : ''}`
    };
    
    return baseContent[type as keyof typeof baseContent] || baseContent['social-post'];
  };

  const generateHashtags = (prompt: string, platform: string): string[] => {
    const baseHashtags = ['#ProsperaLink', '#LLC', '#Entrepreneur', '#Business'];
    const platformHashtags = {
      'Facebook': ['#Facebook', '#Business'],
      'Instagram': ['#Instagram', '#Entrepreneur', '#Success'],
      'LinkedIn': ['#LinkedIn', '#Professional', '#Networking'],
      'Twitter': ['#Twitter', '#Business', '#Startup']
    };
    
    return [...baseHashtags, ...(platformHashtags[platform as keyof typeof platformHashtags] || [])];
  };

  const generateImagePrompt = (prompt: string, type: string): string => {
    return `Professional business image showing ${prompt.toLowerCase()}, modern office setting, clean design, suitable for ${type} content`;
  };

  const generateVideoPrompt = (prompt: string): string => {
    return `Short promotional video about ${prompt.toLowerCase()}, professional animation, business theme, 15-30 seconds`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Contenu copié dans le presse-papiers !');
  };

  const publishContent = async (content: GeneratedContent) => {
    try {
      // Simuler la publication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGeneratedContent(prev => prev.map(c => 
        c.id === content.id ? { ...c, status: 'published' as const } : c
      ));
      
      alert('Contenu publié avec succès !');
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
      alert('Erreur lors de la publication');
    }
  };

  const scheduleContent = (content: GeneratedContent, date: Date) => {
    setGeneratedContent(prev => prev.map(c => 
      c.id === content.id ? { ...c, scheduledFor: date } : c
    ));
    alert('Contenu programmé avec succès !');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Générateur de Contenu IA</h1>
              <p className="text-gray-600">Créez du contenu marketing optimisé avec l'IA Gemini</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Brain className="w-4 h-4 mr-2" />
                IA Gemini Active
              </Badge>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Planifier
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">Type de contenu</label>
                  <div className="space-y-2">
                    {contentTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <type.icon className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Selection */}
                {selectedType && (
                  <div>
                    <label className="block text-sm font-medium mb-3">Plateforme</label>
                    <div className="grid grid-cols-2 gap-2">
                      {contentTypes.find(t => t.id === selectedType)?.platforms.map((platform) => (
                        <Button
                          key={platform}
                          variant={selectedPlatform === platform ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPlatform(platform)}
                          className="justify-start"
                        >
                          {platform === 'Facebook' && <Globe className="w-4 h-4 mr-2" />}
                          {platform === 'Instagram' && <Image className="w-4 h-4 mr-2" />}
                          {platform === 'LinkedIn' && <Users className="w-4 h-4 mr-2" />}
                          {platform === 'Twitter' && <Share2 className="w-4 h-4 mr-2" />}
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Template Selection */}
                {selectedType && (
                  <div>
                    <label className="block text-sm font-medium mb-3">Template</label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Sélectionner un template</option>
                      {contentTypes.find(t => t.id === selectedType)?.templates.map((template) => (
                        <option key={template} value={template}>{template}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Customization Options */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ton</label>
                    <select
                      value={customization.tone}
                      onChange={(e) => setCustomization(prev => ({ ...prev, tone: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      {tones.map((tone) => (
                        <option key={tone.value} value={tone.value}>{tone.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Longueur</label>
                    <select
                      value={customization.length}
                      onChange={(e) => setCustomization(prev => ({ ...prev, length: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      {lengths.map((length) => (
                        <option key={length.value} value={length.value}>{length.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Audience cible</label>
                    <select
                      value={customization.targetAudience}
                      onChange={(e) => setCustomization(prev => ({ ...prev, targetAudience: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      {targetAudiences.map((audience) => (
                        <option key={audience.value} value={audience.value}>{audience.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={customization.includeHashtags}
                        onChange={(e) => setCustomization(prev => ({ ...prev, includeHashtags: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm">Inclure des hashtags</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={customization.includeCallToAction}
                        onChange={(e) => setCustomization(prev => ({ ...prev, includeCallToAction: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm">Inclure un appel à l'action</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Generation */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Génération de Contenu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">Description du contenu</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Décrivez le contenu que vous souhaitez générer..."
                    rows={4}
                    className="w-full"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateContent}
                  disabled={isGenerating || !selectedType || !selectedPlatform || !prompt}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Générer avec IA
                    </>
                  )}
                </Button>

                {/* Generated Content */}
                {generatedContent.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contenu Généré</h3>
                    {generatedContent.map((content) => (
                      <Card key={content.id} className="border-l-4 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{content.platform}</Badge>
                              <Badge className={content.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                {content.status === 'ready' ? 'Prêt' : 'Publié'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(content.content)}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copier
                              </Button>
                              {content.status === 'ready' && (
                                <Button
                                  size="sm"
                                  onClick={() => publishContent(content)}
                                >
                                  Publier
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">{content.title}</h4>
                              <div className="bg-gray-50 p-3 rounded-lg text-sm whitespace-pre-wrap">
                                {content.content}
                              </div>
                            </div>

                            {content.hashtags.length > 0 && (
                              <div>
                                <span className="text-sm font-medium">Hashtags:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {content.hashtags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {content.imagePrompt && (
                              <div>
                                <span className="text-sm font-medium">Prompt image:</span>
                                <p className="text-sm text-gray-600 mt-1">{content.imagePrompt}</p>
                              </div>
                            )}

                            {content.engagement && (
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>❤️ {content.engagement.likes}</span>
                                <span>🔄 {content.engagement.shares}</span>
                                <span>💬 {content.engagement.comments}</span>
                                <span>👁️ {content.engagement.reach}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 