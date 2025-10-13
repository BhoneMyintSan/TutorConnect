// components/Sidebar.jsx
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Home,
  Search,
  User,
  Settings,
  BookOpen,
  MessageSquare,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/explore", label: "Explore", icon: Search },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/courses", label: "My Courses", icon: BookOpen },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/reviews", label: "Reviews", icon: Star },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <aside className={`relative h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md hover:shadow-lg"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/tutorconnect-logo.png"
              alt="TutorConnect Logo"
              width={isCollapsed ? 32 : 40}
              height={isCollapsed ? 32 : 40}
              className="rounded-lg transition-all duration-300"
              priority
            />
            {!isCollapsed && (
              <span className="text-lg font-bold text-foreground">TutorConnect</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant={isActive(item.href) ? "secondary" : "ghost"}
              asChild
              className={`w-full justify-start h-10 ${
                isCollapsed ? 'px-2' : 'px-3'
              }`}
            >
              <Link href={item.href} className="flex items-center space-x-3">
                <item.icon className={`h-4 w-4 ${isActive(item.href) ? 'text-primary' : ''}`} />
                {!isCollapsed && (
                  <span className={`text-sm ${isActive(item.href) ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t">
          {!isCollapsed && (
            <div className="text-xs text-muted-foreground text-center">
              <p>© {new Date().getFullYear()} TutorConnect</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
