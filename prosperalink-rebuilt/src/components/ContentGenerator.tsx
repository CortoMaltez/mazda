'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Image, 
  Video, 
  Share2, 
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Zap,
  DollarSign,
  TrendingUp,
  Copy,
  Download
} from 'lucide-react';
import { getGeminiCostManager } from '../lib/gemini-cost-manager';

interface GeneratedContent {
  id: string;
  type: 'text' | 'image' | 'video';
  platform: string;
  content: string;
  cost: number;
  timestamp: Date;
  status: 'draft' | 'scheduled' | 'published';
}

interface ContentGeneratorProps {
  platforms?: string[];
  maxContent?: number;
  showCostTracker?: boolean;
}

export default function ContentGenerator({
  platforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'],
  maxContent = 10,
  showCostTracker = true
}: ContentGeneratorProps) {
  const [activeTab, setActiveTab] = useState('text');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Facebook']);
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const costManager = getGeminiCostManager();

  const contentTemplates = {
    facebook: {
      post: "Crée un post Facebook engageant pour ProsperaLink sur le thème: {topic}. Inclus un call-to-action et des hashtags pertinents. Maximum 200 mots.",
      story: "Crée un story Instagram captivant pour ProsperaLink sur: {topic}. Style moderne et professionnel.",
      ad: "Crée une publicité Facebook ciblée pour ProsperaLink sur: {topic}. Focus sur la conversion et l'urgence."
    },
    instagram: {
      post: "Crée un post Instagram visuel pour ProsperaLink sur: {topic}. Inclus des emojis et hashtags populaires.",
      story: "Crée un story Instagram avec des questions engageantes sur: {topic}.",
      reel: "Crée un script pour un Reel Instagram sur: {topic}. Style dynamique et viral."
    },
    linkedin: {
      post: "Crée un post LinkedIn professionnel pour ProsperaLink sur: {topic}. Style B2B, focus sur la valeur ajoutée.",
      article: "Crée un article LinkedIn détaillé sur: {topic}. Structure professionnelle avec insights.",
      carousel: "Crée un carousel LinkedIn avec 5 slides sur: {topic}. Chaque slide doit être concise."
    },
    twitter: {
      tweet: "Crée un tweet viral pour ProsperaLink sur: {topic}. Maximum 280 caractères avec hashtags.",
      thread: "Crée un thread Twitter de 5 tweets sur: {topic}. Chaque tweet doit être engageant.",
      poll: "Crée une question de sondage Twitter sur: {topic}. 4 options de réponse."
    }
  };

  const generateContent = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    const newContent: GeneratedContent[] = [];

    try {
      for (const platform of selectedPlatforms) {
        const platformLower = platform.toLowerCase();
        const templates = contentTemplates[platformLower as keyof typeof contentTemplates];
        
        if (templates) {
          for (const [contentType, template] of Object.entries(templates)) {
            const optimizedPrompt = template.replace('{topic}', prompt);
            
            try {
              const generatedText = await costManager.generateText(
                `En tant qu'expert marketing digital spécialisé dans ${platform}, ${optimizedPrompt}`
              );

              const content: GeneratedContent = {
                id: Date.now().toString() + Math.random(),
                type: 'text',
                platform,
                content: generatedText,
                cost: 0.001, // Coût estimé par génération
                timestamp: new Date(),
                status: 'draft'
              };

              newContent.push(content);
              setTotalCost(prev => prev + content.cost);
            } catch (error) {
              console.error(`Erreur génération ${platform} ${contentType}:`, error);
            }
          }
        }
      }

      setGeneratedContent(prev => [...newContent, ...prev].slice(0, maxContent));
    } catch (error) {
      console.error('Erreur génération contenu:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async (contentId: string) => {
    try {
      const content = generatedContent.find(c => c.id === contentId);
      if (!content) return;

      const imagePrompt = `Crée une image professionnelle pour ${content.platform} sur le thème: ${prompt}. Style moderne, couleurs ProsperaLink (bleu et violet), design épuré.`;
      
      const imageUrl = await costManager.generateImage(imagePrompt);
      
      const imageContent: GeneratedContent = {
        id: Date.now().toString() + Math.random(),
        type: 'image',
        platform: content.platform,
        content: imageUrl,
        cost: 0.0025,
        timestamp: new Date(),
        status: 'draft'
      };

      setGeneratedContent(prev => [imageContent, ...prev]);
      setTotalCost(prev => prev + imageContent.cost);
    } catch (error) {
      console.error('Erreur génération image:', error);
    }
  };

  const generateVideo = async (contentId: string) => {
    try {
      const content = generatedContent.find(c => c.id === contentId);
      if (!content) return;

      const videoPrompt = `Crée un script vidéo de 30 secondes pour ${content.platform} sur: ${prompt}. Style dynamique et engageant.`;
      
      const videoUrl = await costManager.generateVideo(videoPrompt, 30);
      
      const videoContent: GeneratedContent = {
        id: Date.now().toString() + Math.random(),
        type: 'video',
        platform: content.platform,
        content: videoUrl,
        cost: 1.5, // 30 secondes * 0.05$
        timestamp: new Date(),
        status: 'draft'
      };

      setGeneratedContent(prev => [videoContent, ...prev]);
      setTotalCost(prev => prev + videoContent.cost);
    } catch (error) {
      console.error('Erreur génération vidéo:', error);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // Feedback visuel
  };

  const scheduleContent = (contentId: string) => {
    setGeneratedContent(prev => 
      prev.map(c => c.id === contentId ? { ...c, status: 'scheduled' } : c)
    );
  };

  const publishContent = (contentId: string) => {
    setGeneratedContent(prev => 
      prev.map(c => c.id === contentId ? { ...c, status: 'published' } : c)
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      default: return <Share2 className="w-4 h-4" />;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Générateur de Contenu IA</h1>
        <p className="text-gray-600">Génération automatique de contenu pour réseaux sociaux avec IA Gemini</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de contrôle */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Configuration
            </h3>

            {/* Sélection des plateformes */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Plateformes</label>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPlatforms(prev => [...prev, platform]);
                        } else {
                          setSelectedPlatforms(prev => prev.filter(p => p !== platform));
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Thème du contenu</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Formation d'entreprises LLC, avantages fiscaux, conseils entrepreneurs..."
                rows={4}
              />
            </div>

            {/* Types de contenu */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Types de contenu</label>
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('text')}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Texte
                </Button>
                <Button
                  variant={activeTab === 'image' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('image')}
                >
                  <Image className="w-4 h-4 mr-1" />
                  Images
                </Button>
                <Button
                  variant={activeTab === 'video' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('video')}
                >
                  <Video className="w-4 h-4 mr-1" />
                  Vidéos
                </Button>
              </div>
            </div>

            {/* Bouton de génération */}
            <Button
              onClick={generateContent}
              disabled={isGenerating || !prompt.trim() || selectedPlatforms.length === 0}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Génération...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Générer du Contenu
                </>
              )}
            </Button>

            {/* Statistiques de coût */}
            {showCostTracker && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Coût total:</span>
                  <span className="font-medium text-red-600">${totalCost.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Contenu généré:</span>
                  <span className="font-medium">{generatedContent.length}</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Zone de contenu généré */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Contenu Généré ({generatedContent.length})
            </h3>

            <div className="space-y-4">
              {generatedContent.map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getPlatformIcon(content.platform)}
                      {getContentTypeIcon(content.type)}
                      <span className="font-medium">{content.platform}</span>
                      <Badge variant="outline">{content.type}</Badge>
                      <Badge 
                        variant={
                          content.status === 'published' ? 'default' : 
                          content.status === 'scheduled' ? 'secondary' : 'outline'
                        }
                      >
                        {content.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        ${content.cost.toFixed(3)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {content.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    {content.type === 'text' ? (
                      <p className="text-sm text-gray-700">{content.content}</p>
                    ) : content.type === 'image' ? (
                      <div className="bg-gray-100 rounded p-4 text-center">
                        <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">Image générée</p>
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded p-4 text-center">
                        <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">Vidéo générée</p>
                      </div>
                    )}
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
                    
                    {content.type === 'text' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateImage(content.id)}
                        >
                          <Image className="w-4 h-4 mr-1" />
                          Image
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateVideo(content.id)}
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Vidéo
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => scheduleContent(content.id)}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Programmer
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => publishContent(content.id)}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Publier
                    </Button>
                  </div>
                </div>
              ))}

              {generatedContent.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun contenu généré</p>
                  <p className="text-sm">Commencez par configurer et générer du contenu</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 