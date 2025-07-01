'use client';

import { useState } from 'react';

interface PersonalizedMessage {
  type: 'greeting' | 'suggestion' | 'alert' | 'insight';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  icon?: string;
}

interface AIInsightsProps {
  messages: PersonalizedMessage[];
}

export default function AIInsights({ messages }: AIInsightsProps) {
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'greeting': return '👋';
      case 'suggestion': return '💡';
      case 'alert': return '⚠️';
      case 'insight': return '🎯';
      default: return 'ℹ️';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'greeting': return 'text-green-600';
      case 'suggestion': return 'text-blue-600';
      case 'alert': return 'text-red-600';
      case 'insight': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          Insights IA
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🤖</div>
          <p>Aucun insight disponible pour le moment</p>
          <p className="text-sm">L'IA analysera votre activité et vous proposera des suggestions personnalisées</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🤖</span>
        Insights IA
        <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {messages.length}
        </span>
      </h3>

      <div className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`border-l-4 p-4 rounded-r-lg transition-all duration-200 ${getPriorityColor(message.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <span className="text-2xl">{message.icon || getTypeIcon(message.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`font-semibold ${getTypeColor(message.type)}`}>
                      {message.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      message.priority === 'high' ? 'bg-red-100 text-red-700' :
                      message.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {message.priority === 'high' ? 'Urgent' :
                       message.priority === 'medium' ? 'Important' : 'Info'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {expandedMessage === index ? message.message : 
                     message.message.length > 120 ? 
                     `${message.message.substring(0, 120)}...` : 
                     message.message}
                  </p>

                  {message.message.length > 120 && (
                    <button
                      onClick={() => setExpandedMessage(expandedMessage === index ? null : index)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                    >
                      {expandedMessage === index ? 'Voir moins' : 'Lire plus'}
                    </button>
                  )}

                  {message.actionUrl && message.actionText && (
                    <div className="mt-3">
                      <a
                        href={message.actionUrl}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {message.actionText}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer avec statistiques */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {messages.filter(m => m.priority === 'high').length} urgent
          </span>
          <span>
            {messages.filter(m => m.priority === 'medium').length} important
          </span>
          <span>
            {messages.filter(m => m.priority === 'low').length} info
          </span>
        </div>
      </div>
    </div>
  );
} 