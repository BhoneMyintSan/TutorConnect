import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, MapPin, Video, User, Plus } from "lucide-react";

const Schedule = () => {
  // Mock data - in a real app, this would come from an API
  const upcomingSessions = [
    {
      id: 1,
      title: "Advanced Calculus",
      tutor: "Dr. Sarah Johnson",
      date: "2025-10-15",
      time: "14:00",
      duration: 60,
      type: "online",
      subject: "Mathematics",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Physics Lab Review",
      tutor: "Prof. Michael Chen",
      date: "2025-10-16",
      time: "10:00",
      duration: 90,
      type: "in-person",
      subject: "Physics",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Literature Analysis",
      tutor: "Ms. Emily Davis",
      date: "2025-10-18",
      time: "16:30",
      duration: 45,
      type: "online",
      subject: "English",
      status: "pending"
    }
  ];

  const availabilitySlots = [
    { day: "Monday", slots: ["9:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "3:00 PM"] },
    { day: "Friday", slots: ["11:00 AM", "1:00 PM", "5:00 PM"] }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Schedule</h1>
            <p className="text-muted-foreground">Manage your tutoring sessions and availability</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Book Session</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>
                  Your scheduled tutoring sessions
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          session.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>

                        <div>
                          <h3 className="font-medium">{session.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>{session.tutor}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatDate(session.date)} at {formatTime(session.time)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {session.duration} min
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {session.type === 'online' ? (
                            <Video className="h-4 w-4 mr-1" />
                          ) : (
                            <MapPin className="h-4 w-4 mr-1" />
                          )}
                          <span className="capitalize">{session.type}</span>
                        </div>
                        <Badge
                          variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                          className="mt-2"
                        >
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      No upcoming sessions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Book your first tutoring session to get started
                    </p>
                    <Button>Book a Session</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Availability & Quick Actions */}
          <div className="space-y-6">
            {/* My Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Availability</CardTitle>
                <CardDescription>
                  Days and times you're available for sessions
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {availabilitySlots.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="font-medium text-sm">{day.day}</span>
                      <div className="flex flex-wrap gap-1">
                        {day.slots.map((slot) => (
                          <Badge key={slot} variant="secondary" className="text-xs">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Edit Availability
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Find New Tutor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  View Past Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;