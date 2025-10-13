import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { MessageSquare, Send, Search, MoreVertical } from "lucide-react";
import { useState } from "react";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState("");

  // Mock data
  const conversations = [
    {
      id: 0,
      tutor: "Dr. Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      lastMessage: "Great progress on your calculus homework! Let's review the derivatives next session.",
      timestamp: "2 hours ago",
      unread: true,
      online: true
    },
    {
      id: 1,
      tutor: "Prof. Michael Chen",
      avatar: "/avatars/michael.jpg",
      lastMessage: "I've prepared some additional practice problems for you.",
      timestamp: "1 day ago",
      unread: false,
      online: false
    },
    {
      id: 2,
      tutor: "Ms. Emily Davis",
      avatar: "/avatars/emily.jpg",
      lastMessage: "Your essay draft looks excellent! Just a few minor suggestions.",
      timestamp: "3 days ago",
      unread: false,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hello! How are you preparing for our next session?",
      timestamp: "Yesterday 3:45 PM",
      isTutor: true
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Dr. Johnson! I've been reviewing the calculus notes you shared. I'm still a bit confused about integration by parts.",
      timestamp: "Yesterday 4:02 PM",
      isTutor: false
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "That's completely normal! Integration by parts can be tricky at first. Let me explain it step by step during our session tomorrow. In the meantime, try working through these practice problems I just sent you.",
      timestamp: "Yesterday 4:05 PM",
      isTutor: true
    },
    {
      id: 4,
      sender: "Dr. Sarah Johnson",
      content: "Great progress on your calculus homework! Let's review the derivatives next session.",
      timestamp: "2 hours ago",
      isTutor: true
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pb-8 h-[calc(100vh-8rem)]">
        <div className="flex h-full gap-6">
          {/* Conversations Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Messages
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>
                              {conversation.tutor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">
                              {conversation.tutor}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread && (
                            <Badge variant="destructive" className="mt-2 text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="flex-1">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={conversations[selectedConversation]?.avatar} />
                      <AvatarFallback>
                        {conversations[selectedConversation]?.tutor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {conversations[selectedConversation]?.tutor}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {conversations[selectedConversation]?.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isTutor ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isTutor
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isTutor ? 'text-muted-foreground' : 'text-primary-foreground/70'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;