'use client';

import { useState } from 'react';

interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  priority: 'low' | 'medium' | 'high';
  category: 'compliance' | 'business' | 'support' | 'optimization';
  estimatedTime: string;
}

interface NextStepsWidgetProps {
  actions: SuggestedAction[];
}

export default function NextStepsWidget({ actions }: NextStepsWidgetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedAction, setExpandedAction] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Toutes', icon: '📋' },
    { id: 'compliance', name: 'Conformité', icon: '⚖️' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'support', name: 'Support', icon: '🆘' },
    { id: 'optimization', name: 'Optimisation', icon: '📈' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return '⚖️';
      case 'business': return '💼';
      case 'support': return '🆘';
      case 'optimization': return '📈';
      default: return '📋';
    }
  };

  const filteredActions = selectedCategory === 'all' 
    ? actions 
    : actions.filter(action => action.category === selectedCategory);

  const sortedActions = filteredActions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (actions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          Prochaines Étapes
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">✅</div>
          <p>Toutes les tâches sont à jour !</p>
          <p className="text-sm">L'IA vous suggérera de nouvelles actions selon votre activité</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🎯</span>
          Prochaines Étapes
          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {actions.length}
          </span>
        </h3>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Actions suggérées */}
      <div className="space-y-3">
        {sortedActions.map((action) => (
          <div
            key={action.id}
            className={`border-l-4 bg-gray-50 rounded-r-lg p-4 transition-all duration-200 hover:shadow-md ${getPriorityColor(action.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <span className="text-2xl">{getCategoryIcon(action.category)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{action.title}</h4>
                    <span className="text-sm">{getPriorityIcon(action.priority)}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {action.estimatedTime}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {expandedAction === action.id ? action.description : 
                     action.description.length > 100 ? 
                     `${action.description.substring(0, 100)}...` : 
                     action.description}
                  </p>

                  {action.description.length > 100 && (
                    <button
                      onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                    >
                      {expandedAction === action.id ? 'Voir moins' : 'Lire plus'}
                    </button>
                  )}

                  <div className="mt-3 flex items-center space-x-2">
                    <a
                      href={action.actionUrl}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Commencer
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      Plus tard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">
              {actions.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600">Urgentes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {actions.filter(a => a.priority === 'medium').length}
            </div>
            <div className="text-xs text-gray-600">Importantes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {actions.filter(a => a.priority === 'low').length}
            </div>
            <div className="text-xs text-gray-600">Optionnelles</div>
          </div>
        </div>
      </div>
    </div>
  );
} 