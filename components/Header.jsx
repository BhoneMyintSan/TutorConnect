// components/Header.jsx
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  // Pages that should show a back button
  const showBackButton = ['/profile', '/dashboard', '/courses', '/messages', '/schedule', '/reviews', '/settings'];

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <Navbar />

      {/* Breadcrumb/Back Navigation for specific pages */}
      {showBackButton.includes(router.pathname) && (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
