'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, Send, X, Bot, User, DollarSign, Zap } from 'lucide-react';
import { getGeminiCostManager, AI_BUDGET_CONFIG } from '../lib/gemini-cost-manager';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  cost?: number;
}

interface AIChatbotProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'prospera';
  maxMessages?: number;
  showCostTracker?: boolean;
}

export default function AIChatbot({
  position = 'bottom-right',
  theme = 'prospera',
  maxMessages = 50,
  showCostTracker = true
}: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [costStats, setCostStats] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fonctions utilitaires
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white border-gray-700';
      case 'light':
        return 'bg-white text-gray-900 border-gray-200';
      default:
        return 'bg-gradient-to-br from-blue-600 to-purple-700 text-white border-blue-500';
    }
  };

  // Gestion sécurisée du costManager
  const costManager = React.useMemo(() => {
    try {
      return getGeminiCostManager();
    } catch (error) {
      console.warn('AIChatbot: Impossible d\'initialiser le gestionnaire de coûts:', error);
      return null;
    }
  }, []);

  // Si le gestionnaire de coûts n'est pas disponible, afficher un message d'erreur discret
  if (!costManager) {
    return (
      <div className={`fixed ${getPositionClasses()} z-50`}>
        <Button
          onClick={() => setHasError(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-gray-500 hover:bg-gray-600 text-white hover:scale-110 transition-all duration-200"
          title="Assistant IA temporairement indisponible"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {hasError && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Assistant IA Indisponible</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setHasError(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">
                  L'assistant IA est temporairement indisponible. Veuillez réessayer plus tard ou contactez notre support.
                </p>
                <Button
                  onClick={() => setHasError(false)}
                  className="w-full"
                >
                  Fermer
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    // Message de bienvenue automatique
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: 'Bonjour ! Je suis l\'assistant IA de ProsperaLink. Je peux vous aider avec la formation d\'entreprises LLC, l\'optimisation fiscale, et bien plus encore. Comment puis-je vous aider aujourd\'hui ?',
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    // Mettre à jour les statistiques de coûts de manière sécurisée
    if (showCostTracker && costManager) {
      try {
        setCostStats(costManager.getCostStats());
      } catch (error) {
        console.warn('Erreur lors de la récupération des statistiques de coûts:', error);
      }
    }
  }, [messages, showCostTracker, costManager]);

  useEffect(() => {
    // Scroll vers le bas quand de nouveaux messages arrivent
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !costManager) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Optimiser le prompt pour réduire les coûts
      const optimizedPrompt = costManager.getOptimizedPrompt(
        `En tant qu'expert en formation d'entreprises LLC aux États-Unis et spécialiste de ProsperaLink, réponds de manière professionnelle et utile à cette question: ${inputValue}. 
        Inclus des informations sur nos services, tarifs, et avantages. Sois concis mais complet.`
      );

      const response = await costManager.generateText(optimizedPrompt);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        // Garder seulement les derniers messages
        return newMessages.slice(-maxMessages);
      });

    } catch (error) {
      console.error('Erreur chatbot:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Désolé, je rencontre des difficultés techniques. Veuillez réessayer dans quelques instants.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Bouton de chat flottant */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full w-14 h-14 shadow-lg ${getThemeClasses()} hover:scale-110 transition-all duration-200`}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Interface de chat */}
      {isOpen && (
        <Card className={`w-96 h-[500px] shadow-2xl ${getThemeClasses()} flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-opacity-20">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">Assistant IA ProsperaLink</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-opacity-70 hover:text-opacity-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Tracker de coûts */}
          {showCostTracker && costStats && (
            <div className="px-4 py-2 bg-opacity-10 border-t border-opacity-20">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3 h-3" />
                  <span>Budget: ${costStats.budgetRemaining?.daily?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{costStats.budgetPercentage?.daily?.toFixed(1) || '0'}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(costStats.budgetPercentage?.daily || 0, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Zone de saisie */}
          <div className="p-4 border-t border-opacity-20">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 