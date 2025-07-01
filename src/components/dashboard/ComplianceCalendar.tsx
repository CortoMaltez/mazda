'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  colorId?: string;
}

export default function ComplianceCalendar() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCalendarEvents();
    }
  }, [session]);

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/google/calendar/events');
      
      if (!response.ok) {
        throw new Error('Impossible de récupérer les événements');
      }

      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventColor = (event: CalendarEvent) => {
    // Déterminer la couleur basée sur le type d'événement
    if (event.summary.toLowerCase().includes('échéance') || 
        event.summary.toLowerCase().includes('due')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (event.summary.toLowerCase().includes('consultation') || 
        event.summary.toLowerCase().includes('meeting')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (event.summary.toLowerCase().includes('complété') || 
        event.summary.toLowerCase().includes('completed')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEventIcon = (event: CalendarEvent) => {
    if (event.summary.toLowerCase().includes('échéance') || 
        event.summary.toLowerCase().includes('due')) {
      return <AlertCircle className="w-4 h-4" />;
    }
    if (event.summary.toLowerCase().includes('consultation') || 
        event.summary.toLowerCase().includes('meeting')) {
      return <Calendar className="w-4 h-4" />;
    }
    if (event.summary.toLowerCase().includes('complété') || 
        event.summary.toLowerCase().includes('completed')) {
      return <CheckCircle className="w-4 h-4" />;
    }
    return <Calendar className="w-4 h-4" />;
  };

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendrier de Conformité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connectez-vous pour voir votre calendrier de conformité.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Calendrier de Conformité
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Synchronisé avec Google Calendar
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchCalendarEvents} variant="outline">
              Réessayer
            </Button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground mb-2">Aucun événement trouvé</p>
            <p className="text-sm text-muted-foreground">
              Vos échéances de conformité apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.slice(0, 10).map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border ${getEventColor(event)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getEventIcon(event)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {event.summary}
                      </h4>
                      {event.description && (
                        <p className="text-xs mt-1 opacity-80">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(event.start.dateTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(event.start.dateTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {event.start.dateTime.includes('T') ? 'Événement' : 'Journée entière'}
                  </Badge>
                </div>
              </div>
            ))}
            
            {events.length > 10 && (
              <div className="text-center pt-4">
                <Button variant="outline" size="sm">
                  Voir tous les événements ({events.length})
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 