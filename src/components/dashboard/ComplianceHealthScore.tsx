'use client';

import { useState, useEffect } from 'react';

interface ComplianceHealthScoreProps {
  score: number;
  issues: string[];
  nextDeadlines: Array<{
    title: string;
    dueDate: Date;
    type: string;
    company: string;
  }>;
}

export default function ComplianceHealthScore({ score, issues, nextDeadlines }: ComplianceHealthScoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    if (score >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return '🟢';
    if (score >= 70) return '🟡';
    if (score >= 50) return '🟠';
    return '🔴';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellente conformité';
    if (score >= 70) return 'Conformité satisfaisante';
    if (score >= 50) return 'Attention requise';
    return 'Action immédiate nécessaire';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Santé de la Conformité</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {isExpanded ? 'Réduire' : 'Voir détails'}
        </button>
      </div>

      {/* Score Principal */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(score)} mb-3`}>
          <span className="text-3xl">{getScoreIcon(score)}</span>
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">{score}%</div>
        <div className="text-lg text-gray-600">{getScoreMessage(score)}</div>
      </div>

      {/* Barre de progression */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Score de conformité</span>
          <span>{score}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              score >= 90 ? 'bg-green-500' :
              score >= 70 ? 'bg-yellow-500' :
              score >= 50 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Détails (expandable) */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Problèmes identifiés */}
          {issues.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                Problèmes identifiés ({issues.length})
              </h4>
              <ul className="space-y-1">
                {issues.slice(0, 3).map((issue, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    {issue}
                  </li>
                ))}
                {issues.length > 3 && (
                  <li className="text-sm text-blue-600">
                    +{issues.length - 3} autres problèmes...
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Prochaines échéances */}
          {nextDeadlines.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <span className="text-blue-500 mr-2">📅</span>
                Prochaines échéances ({nextDeadlines.length})
              </h4>
              <div className="space-y-2">
                {nextDeadlines.slice(0, 3).map((deadline, index) => {
                  const daysUntilDue = Math.ceil((deadline.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysUntilDue <= 7;
                  const isWarning = daysUntilDue <= 30;
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <div className="font-medium text-gray-900">{deadline.title}</div>
                        <div className="text-sm text-gray-600">{deadline.company}</div>
                      </div>
                      <div className={`text-sm font-medium ${
                        isUrgent ? 'text-red-600' :
                        isWarning ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {daysUntilDue < 0 ? 'En retard' : 
                         daysUntilDue === 0 ? 'Aujourd\'hui' :
                         `${daysUntilDue} jour${daysUntilDue > 1 ? 's' : ''}`}
                      </div>
                    </div>
                  );
                })}
                {nextDeadlines.length > 3 && (
                  <div className="text-sm text-blue-600 text-center py-2">
                    +{nextDeadlines.length - 3} autres échéances...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions recommandées */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Actions recommandées</h4>
            <div className="space-y-2">
              {score < 80 && (
                <div className="flex items-center text-sm text-blue-800">
                  <span className="mr-2">🔧</span>
                  Réviser les documents de conformité
                </div>
              )}
              {nextDeadlines.some(d => Math.ceil((d.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 7) && (
                <div className="flex items-center text-sm text-blue-800">
                  <span className="mr-2">⚡</span>
                  Traiter les échéances urgentes
                </div>
              )}
              {issues.length > 0 && (
                <div className="flex items-center text-sm text-blue-800">
                  <span className="mr-2">📋</span>
                  Résoudre les problèmes identifiés
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Gérer la conformité
        </button>
      </div>
    </div>
  );
} 