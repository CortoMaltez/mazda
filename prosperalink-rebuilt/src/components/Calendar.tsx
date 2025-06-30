'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface Day {
  date: Date;
  dayOfWeek: string;
  dayNumber: number;
  isToday: boolean;
  isPast: boolean;
  timeSlots: TimeSlot[];
}

interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: 'consultation' | 'formation' | 'support' | 'ia-analysis';
  clientName: string;
  clientEmail: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const appointmentTypes = [
  {
    id: 'consultation',
    name: 'Consultation IA Initiale',
    duration: 30,
    description: 'Analyse IA de vos besoins et recommandations',
    price: 0,
    icon: '🤖'
  },
  {
    id: 'formation',
    name: 'Formation LLC IA',
    duration: 60,
    description: 'Processus complet optimisé par IA',
    price: 199,
    icon: '⚡'
  },
  {
    id: 'support',
    name: 'Support IA Technique',
    duration: 45,
    description: 'Assistance IA pour questions spécifiques',
    price: 99,
    icon: '🎯'
  },
  {
    id: 'ia-analysis',
    name: 'Analyse IA Complète',
    duration: 90,
    description: 'Analyse approfondie avec IA avancée',
    price: 149,
    icon: '🔍'
  }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('consultation');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Générer les jours du mois
  const generateDays = (date: Date): Day[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Day[] = [];

    // Ajouter les jours du mois précédent pour compléter la première semaine
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        dayOfWeek: prevDate.toLocaleDateString('fr-FR', { weekday: 'short' }),
        dayNumber: prevDate.getDate(),
        isToday: false,
        isPast: prevDate < new Date(),
        timeSlots: generateTimeSlots(prevDate)
      });
    }

    // Ajouter les jours du mois actuel
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      const today = new Date();
      const isToday = currentDate.toDateString() === today.toDateString();
      
      days.push({
        date: currentDate,
        dayOfWeek: currentDate.toLocaleDateString('fr-FR', { weekday: 'short' }),
        dayNumber: i,
        isToday,
        isPast: currentDate < today,
        timeSlots: generateTimeSlots(currentDate)
      });
    }

    // Ajouter les jours du mois suivant pour compléter la dernière semaine
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        dayOfWeek: nextDate.toLocaleDateString('fr-FR', { weekday: 'short' }),
        dayNumber: nextDate.getDate(),
        isToday: false,
        isPast: nextDate < new Date(),
        timeSlots: generateTimeSlots(nextDate)
      });
    }

    return days;
  };

  const generateTimeSlots = (date: Date): TimeSlot[] => {
    return timeSlots.map(time => ({
      id: `${date.toISOString()}-${time}`,
      time,
      available: Math.random() > 0.3, // 70% de disponibilité pour la démo
      bookedBy: undefined
    }));
  };

  const days = generateDays(currentMonth);

  const handleDateSelect = (day: Day) => {
    if (!day.isPast) {
      setSelectedDate(day.date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      type: selectedType as any,
      clientName: formData.name,
      clientEmail: formData.email,
      notes: formData.notes,
      status: 'pending'
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setSelectedDate(null);
    setSelectedTime(null);
    
    // Ici vous pouvez ajouter l'appel API pour sauvegarder le rendez-vous
    console.log('Nouveau rendez-vous IA:', newAppointment);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Planifier un Rendez-vous IA
        </h2>
        <p className="text-gray-600">
          Choisissez une date et un créneau pour votre consultation ou formation optimisée par IA
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Types de rendez-vous */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Type de Rendez-vous IA</h3>
            <div className="space-y-3">
              {appointmentTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <p className="text-sm text-gray-500">{type.duration} minutes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">
                        {type.price === 0 ? 'Gratuit' : `$${type.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Calendrier */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Navigation du mois */}
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={prevMonth}
                variant="outline"
                className="px-4 py-2"
              >
                ← Précédent
              </Button>
              <h3 className="text-xl font-semibold">
                {currentMonth.toLocaleDateString('fr-FR', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h3>
              <Button
                onClick={nextMonth}
                variant="outline"
                className="px-4 py-2"
              >
                Suivant →
              </Button>
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`p-2 text-center cursor-pointer transition-colors ${
                    day.isPast
                      ? 'text-gray-300 cursor-not-allowed'
                      : day.isToday
                      ? 'bg-blue-100 text-blue-900 font-semibold'
                      : selectedDate?.toDateString() === day.date.toDateString()
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleDateSelect(day)}
                >
                  <div className="text-sm">{day.dayOfWeek}</div>
                  <div className="text-lg font-semibold">{day.dayNumber}</div>
                  {day.timeSlots.filter(slot => slot.available).length > 0 && (
                    <div className="text-xs text-green-600">●</div>
                  )}
                </div>
              ))}
            </div>

            {/* Créneaux horaires */}
            {selectedDate && (
              <div>
                <h4 className="font-semibold mb-4">
                  Créneaux disponibles pour le{' '}
                  {selectedDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {days
                    .find(day => day.date.toDateString() === selectedDate.toDateString())
                    ?.timeSlots.filter(slot => slot.available)
                    .map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        className="py-2"
                        onClick={() => handleTimeSelect(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Formulaire de réservation */}
      {selectedDate && selectedTime && (
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-4">Informations de Contact</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes pour l'IA (optionnel)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Décrivez vos besoins pour que notre IA puisse mieux vous préparer..."
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Confirmer le Rendez-vous IA
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Rendez-vous confirmés */}
      {appointments.length > 0 && (
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-4">Mes Rendez-vous IA</h3>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{appointment.clientName}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.date.toLocaleDateString('fr-FR')} à {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status === 'confirmed' ? 'Confirmé' :
                     appointment.status === 'pending' ? 'En attente' : 'Annulé'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 