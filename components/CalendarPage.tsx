'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ListIcon, Trophy, Clock } from 'lucide-react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 0 }), // Sunday start
  getDay,
  locales,
});

type EventType = 'practice' | 'game' | 'tournament' | 'meeting' | 'training' | 'match' | 'competition' | 'scrimmage' | 'showcase';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  address: string;
  rsvpCount: number;
  description: string;
}

const eventTypes: EventType[] = ['practice', 'game', 'tournament', 'meeting', 'training', 'match', 'competition', 'scrimmage', 'showcase'];

const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Soccer Practice',
      start: new Date(2024, 6, 1, 14, 0), // July 1, 2024
      end: new Date(2024, 6, 1, 16, 0),
      type: 'practice',
      address: '123 Sports Field, City',
      rsvpCount: 15,
      description: 'Regular soccer practice for junior team',
    },
    {
      id: '2',
      title: 'Basketball Game vs. Eagles',
      start: new Date(2024, 6, 3, 18, 0), // July 3, 2024
      end: new Date(2024, 6, 3, 20, 0),
      type: 'game',
      address: 'City Sports Center, 456 Main St',
      rsvpCount: 22,
      description: 'Home game against the Eagles',
    },
    {
      id: '3',
      title: 'Youth Baseball Training Camp',
      start: new Date(2024, 7, 4, 10, 0), // August 4, 2024
      end: new Date(2024, 7, 4, 12, 0),
      type: 'training',
      address: 'Sunset Park, 321 Diamond Ave',
      rsvpCount: 30,
      description: 'Training camp for youth baseball players aged 10-14',
    },
    {
      id: '4',
      title: 'Youth Swim Team Practice',
      start: new Date(2024, 7, 5, 8, 0), // August 5, 2024
      end: new Date(2024, 7, 5, 10, 0),
      type: 'practice',
      address: 'Aquatic Center, 789 Waterway',
      rsvpCount: 20,
      description: 'Morning practice session for youth swim team',
    },
    {
      id: '5',
      title: 'Youth Basketball Tournament',
      start: new Date(2024, 7, 7, 14, 0), // August 7, 2024
      end: new Date(2024, 7, 7, 18, 0),
      type: 'tournament',
      address: 'City Sports Arena, 456 Main St',
      rsvpCount: 50,
      description: 'Annual basketball tournament for youth teams',
    },
    {
      id: '6',
      title: 'Junior Tennis Match',
      start: new Date(2024, 8, 9, 9, 0), // September 9, 2024
      end: new Date(2024, 8, 9, 11, 0),
      type: 'match',
      address: 'Tennis Club, 123 Court Rd',
      rsvpCount: 12,
      description: 'Junior tennis match for players under 14',
    },
    {
      id: '7',
      title: 'Youth Soccer Championship Game',
      start: new Date(2024, 8, 10, 16, 0), // September 10, 2024
      end: new Date(2024, 8, 10, 18, 0),
      type: 'game',
      address: 'Championship Field, 789 Victory Blvd',
      rsvpCount: 40,
      description: 'Championship game for the youth soccer league',
    },
    {
      id: '8',
      title: 'Youth Track Meet',
      start: new Date(2024, 8, 12, 8, 0), // September 12, 2024
      end: new Date(2024, 8, 12, 12, 0),
      type: 'competition',
      address: 'High School Track, 987 Speed Ln',
      rsvpCount: 60,
      description: 'Youth track and field meet for ages 10-16',
    },
    {
      id: '9',
      title: 'Junior Volleyball Practice',
      start: new Date(2024, 7, 14, 17, 0), // August 14, 2024
      end: new Date(2024, 7, 14, 19, 0),
      type: 'practice',
      address: 'Community Gym, 654 Volley Ct',
      rsvpCount: 18,
      description: 'Regular practice session for junior volleyball team',
    },
    {
      id: '10',
      title: 'Youth Rugby Scrimmage',
      start: new Date(2024, 7, 16, 15, 0), // August 16, 2024
      end: new Date(2024, 7, 16, 17, 0),
      type: 'scrimmage',
      address: 'Rugby Field, 111 Tackle Way',
      rsvpCount: 25,
      description: 'Scrimmage game for youth rugby team',
    },
    {
      id: '11',
      title: 'Youth Gymnastics Showcase',
      start: new Date(2024, 6, 18, 14, 0), // July 18, 2024
      end: new Date(2024, 6, 18, 16, 0),
      type: 'showcase',
      address: 'Gymnastics Center, 222 Balance St',
      rsvpCount: 35,
      description: 'Showcase event for youth gymnastics team',
    },
    {
      id: '12',
      title: 'Youth Football Training Camp',
      start: new Date(2024, 6, 20, 9, 0), // July 20, 2024
      end: new Date(2024, 6, 20, 12, 0),
      type: 'training',
      address: 'Football Stadium, 333 Goal Ln',
      rsvpCount: 45,
      description: 'Training camp for youth football players aged 12-16',
    }
  ];    

  const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [view, setView] = useState<'calendar' | 'list'>('calendar');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
      title: '',
      start: new Date(),
      end: new Date(),
      type: 'practice',
      address: '',
      rsvpCount: 0,
      description: '',
    });
    const [date, setDate] = useState(new Date());
    const [calendarView, setCalendarView] = useState(Views.WEEK);
  
    const handleNavigate = (newDate: Date, newView: Views) => {
      setDate(newDate);
      setCalendarView(newView);
    };
  
    const handleViewChange = (newView: Views) => {
      setCalendarView(newView);
    };
  
    const calendarEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
    }));
  
    const totalEvents = events.length;
    const upcomingEvents = events.filter(event => event.start > new Date()).length;
    const mostCommonEventType = useMemo(() => {
      const typeCounts = events.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      }, {} as Record<EventType, number>);
      return Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0];
    }, [events]);
  
    const handleSelectEvent = (event: Event) => {
      setSelectedEvent(event);
    };
  
    const handleAddEvent = () => {
      if (newEvent.title && newEvent.start && newEvent.end) {
        setEvents([...events, { ...newEvent, id: Date.now().toString() } as Event]);
        setIsAddEventOpen(false);
        setNewEvent({
          title: '',
          start: new Date(),
          end: new Date(),
          type: 'practice',
          address: '',
          rsvpCount: 0,
          description: '',
        });
      }
    };
  
    const handleDeleteEvent = (id: string) => {
      setEvents(events.filter(event => event.id !== id));
      setSelectedEvent(null);
    };
  
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
  
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Common Event</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{mostCommonEventType}</div>
            </CardContent>
          </Card>
        </div>
  
        <div className="flex justify-between items-center">
          <div>
            <Button
              variant={view === 'calendar' ? 'default' : 'outline'}
              onClick={() => setView('calendar')}
              className="mr-2"
            >
              <CalendarIcon className="mr-2 h-4 w-4" /> Calendar View
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              onClick={() => setView('list')}
            >
              <ListIcon className="mr-2 h-4 w-4" /> List View
            </Button>
          </div>
          <Button onClick={() => setIsAddEventOpen(true)}>Add Event</Button>
        </div>
  
        {view === 'calendar' ? (
          <Calendar
            localizer={localizer}
            events={calendarEvents}  // Ensure to use mapped events
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
            date={date}
            view={calendarView}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            views={['week', 'day']}
            defaultView={Views.WEEK}
          />
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <Card key={event.id} className="cursor-pointer" onClick={() => handleSelectEvent(event)}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{format(event.start, 'PPP')} - {format(event.start, 'p')} to {format(event.end, 'p')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Type: {event.type}</p>
                  <p>Address: {event.address}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
  
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
              <DialogDescription>Event Details</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>Date:</strong> {selectedEvent && format(selectedEvent.start, 'PPP')}</p>
              <p><strong>Time:</strong> {selectedEvent && `${format(selectedEvent.start, 'p')} - ${format(selectedEvent.end, 'p')}`}</p>
              <p><strong>Type:</strong> {selectedEvent?.type}</p>
              <p><strong>Address:</strong> {selectedEvent?.address}</p>
              <p><strong>RSVP Count:</strong> {selectedEvent?.rsvpCount}</p>
              <p><strong>Description:</strong> {selectedEvent?.description}</p>
            </div>
            <Button variant="destructive" onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}>Delete Event</Button>
          </DialogContent>
        </Dialog>
  
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="start">Start Date</Label>
                <Input id="start" type="datetime-local" value={newEvent.start?.toISOString().slice(0, 16)} onChange={(e) => setNewEvent({...newEvent, start: new Date(e.target.value)})} />
              </div>
              <div>
                <Label htmlFor="end">End Date</Label>
                <Input id="end" type="datetime-local" value={newEvent.end?.toISOString().slice(0, 16)} onChange={(e) => setNewEvent({...newEvent, end: new Date(e.target.value)})} />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newEvent.type} onValueChange={(value: EventType) => setNewEvent({...newEvent, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={newEvent.address} onChange={(e) => setNewEvent({...newEvent, address: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} />
              </div>
            </div>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogContent>
        </Dialog>
  
        <Card>
          <CardHeader>
            <CardTitle>Calendar Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Consider spacing out practices more evenly throughout the week.</li>
              <li>Try to schedule games on weekends for better attendance.</li>
              <li>Add more team-building events or meetings to improve communication.</li>
              <li>Consider adding off-season training sessions to maintain skills.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default CalendarPage;