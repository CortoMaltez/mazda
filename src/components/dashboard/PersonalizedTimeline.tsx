'use client';

import { useState } from 'react';

interface TimelineItem {
  id: string;
  type: 'deadline' | 'activity' | 'milestone';
  title: string;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'overdue' | 'upcoming';
  priority?: 'low' | 'medium' | 'high';
  company?: string;
  category?: string;
}

interface PersonalizedTimelineProps {
  items: TimelineItem[];
}

export default function PersonalizedTimeline({ items }: PersonalizedTimelineProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30');

  const filters = [
    { id: 'all', name: 'Tout', icon: '📋' },
    { id: 'deadline', name: 'Échéances', icon: '📅' },
    { id: 'activity', name: 'Activité', icon: '📊' },
    { id: 'milestone', name: 'Étapes', icon: '🎯' }
  ];

  const timeRanges = [
    { value: '7', label: '7 jours' },
    { value: '30', label: '30 jours' },
    { value: '90', label: '90 jours' },
    { value: '365', label: '1 an' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'pending': return '⏳';
      case 'overdue': return '⚠️';
      case 'upcoming': return '📅';
      default: return 'ℹ️';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return '📅';
      case 'activity': return '📊';
      case 'milestone': return '🎯';
      default: return '📋';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} jour${Math.abs(diffDays) > 1 ? 's' : ''} en retard`;
    } else if (diffDays === 0) {
      return 'Aujourd\'hui';
    } else if (diffDays === 1) {
      return 'Demain';
    } else if (diffDays <= 7) {
      return `Dans ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const filteredItems = items
    .filter(item => selectedFilter === 'all' || item.type === selectedFilter)
    .filter(item => {
      const daysDiff = Math.ceil((item.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff >= -parseInt(timeRange) && daysDiff <= parseInt(timeRange);
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📅</span>
          Timeline Personnalisée
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📅</div>
          <p>Aucune activité récente</p>
          <p className="text-sm">Vos échéances et activités apparaîtront ici</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">📅</span>
          Timeline Personnalisée
          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {filteredItems.length}
          </span>
        </h3>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{filter.icon}</span>
            {filter.name}
          </button>
        ))}
      </div>

      {/* Période */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm text-gray-600">Période :</span>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-2 py-1"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative pl-8 pb-4 ${getPriorityColor(item.priority)}`}
          >
            {/* Ligne de connexion */}
            {index < filteredItems.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
            )}

            {/* Point de timeline */}
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
              <span className="text-sm">{getTypeIcon(item.type)}</span>
            </div>

            {/* Contenu */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)} {item.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {formatDate(item.date)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-2">{item.description}</p>

              {item.company && (
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span className="mr-1">🏢</span>
                  {item.company}
                </div>
              )}

              {item.category && (
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-1">📂</span>
                  {item.category}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {filteredItems.filter(i => i.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-600">Terminées</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {filteredItems.filter(i => i.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600">En attente</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {filteredItems.filter(i => i.status === 'overdue').length}
            </div>
            <div className="text-xs text-gray-600">En retard</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {filteredItems.filter(i => i.status === 'upcoming').length}
            </div>
            <div className="text-xs text-gray-600">À venir</div>
          </div>
        </div>
      </div>
    </div>
  );
} 