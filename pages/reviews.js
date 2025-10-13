import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Star, ThumbsUp, MessageSquare, Filter } from "lucide-react";

const Reviews = () => {
  // Mock data - in a real app, this would come from an API
  const reviews = [
    {
      id: 1,
      tutor: "Dr. Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      subject: "Advanced Mathematics",
      rating: 5,
      review: "Dr. Johnson is an exceptional tutor! Her explanations are clear and she has a great way of breaking down complex calculus concepts. I've improved significantly since starting sessions with her.",
      date: "2025-10-10",
      helpful: 12,
      sessionCount: 8,
      response: "Thank you for the kind words! I'm glad I could help you with your calculus studies. Keep up the great work!"
    },
    {
      id: 2,
      tutor: "Prof. Michael Chen",
      avatar: "/avatars/michael.jpg",
      subject: "Physics Fundamentals",
      rating: 4,
      review: "Professor Chen is very knowledgeable and patient. The physics concepts that were confusing before are now much clearer. Would definitely recommend to anyone struggling with physics.",
      date: "2025-10-08",
      helpful: 8,
      sessionCount: 6,
      response: null
    },
    {
      id: 3,
      tutor: "Ms. Emily Davis",
      avatar: "/avatars/emily.jpg",
      subject: "English Literature",
      rating: 5,
      review: "Emily's passion for literature is contagious! Her insights into the texts we studied were invaluable. She helped me develop a much deeper understanding of literary analysis.",
      date: "2025-10-05",
      helpful: 15,
      sessionCount: 10,
      response: "I'm thrilled to hear that! Literature has the power to change how we see the world, and it's wonderful to share that passion with students like you."
    }
  ];

  const stats = {
    totalReviews: 24,
    averageRating: 4.7,
    fiveStarReviews: 18,
    responseRate: 85
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Reviews</h1>
            <p className="text-muted-foreground">Share your experience and read feedback from your tutoring sessions</p>
          </div>
          <Button className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Write a Review</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalReviews}</div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{stats.averageRating}</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{stats.fiveStarReviews}</div>
              <p className="text-sm text-muted-foreground">5-Star Reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{stats.responseRate}%</div>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Reviews</h2>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>
                        {review.tutor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{review.tutor}</h3>
                      <p className="text-sm text-muted-foreground">{review.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed">{review.review}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{review.sessionCount} sessions</span>
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {review.helpful} helpful
                      </Button>
                    </div>
                    <Badge variant="outline">Verified Review</Badge>
                  </div>

                  {/* Tutor Response */}
                  {review.response && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback className="text-xs">
                            {review.tutor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{review.tutor}&apos;s response</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.response}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;