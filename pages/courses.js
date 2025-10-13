import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BookOpen, Clock, Users, Star, Plus } from "lucide-react";

const Courses = () => {
  // Mock data - in a real app, this would come from an API
  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      tutor: "Dr. Sarah Johnson",
      progress: 75,
      nextSession: "Tomorrow 2:00 PM",
      rating: 4.8,
      subject: "Mathematics"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      tutor: "Prof. Michael Chen",
      progress: 45,
      nextSession: "Friday 10:00 AM",
      rating: 4.9,
      subject: "Physics"
    },
    {
      id: 3,
      title: "English Literature",
      tutor: "Ms. Emily Davis",
      progress: 90,
      nextSession: "Next Week",
      rating: 4.7,
      subject: "English"
    }
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "Chemistry Basics",
      tutor: "Dr. Robert Wilson",
      price: 45,
      rating: 4.6,
      subject: "Chemistry",
      level: "Beginner"
    },
    {
      id: 5,
      title: "Computer Science",
      tutor: "Mr. David Lee",
      price: 55,
      rating: 4.9,
      subject: "Programming",
      level: "Intermediate"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Courses</h1>
            <p className="text-muted-foreground">Track your learning progress and manage your enrolled courses</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Browse Courses</span>
          </Button>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            Enrolled Courses ({enrolledCourses.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        {course.tutor}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{course.subject}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Next Session */}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Next: {course.nextSession}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Continue Learning
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        {course.tutor}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-lg font-bold text-primary">${course.price}/hr</span>
                    </div>

                    <Badge variant="secondary">{course.subject}</Badge>

                    <Button className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;