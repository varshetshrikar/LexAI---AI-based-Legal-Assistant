import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Scale, Menu, MessageSquare, Upload, Calendar, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "@/components/auth/AuthModal";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Legal Chat", href: "/chat", icon: MessageSquare },
    { name: "Document Analyzer", href: "/upload", icon: Upload },
    { name: "Book Lawyer", href: "/booking", icon: Calendar },
    { name: "Dashboard", href: "/dashboard", icon: Users },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 group"
            >
              <div className="p-2 bg-gradient-hero rounded-lg shadow-gold transition-smooth group-hover:scale-105">
                <Scale className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-primary">LexAI</span>
                <Badge variant="outline" className="ml-2 text-xs bg-accent-gold-light text-accent-gold-dark border-accent-gold">
                  Beta
                </Badge>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth hover:bg-accent-gold-light hover:text-accent-gold-dark text-muted-foreground hover:shadow-gold"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="hero" size="sm" onClick={() => setIsAuthModalOpen(true)}>
              Sign In
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.href);
                          setIsOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth hover:bg-accent-gold-light hover:text-accent-gold-dark text-left"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                  <hr className="border-border" />
                  <button className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth hover:bg-accent-gold-light hover:text-accent-gold-dark text-left">
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <Button variant="hero" className="mx-4" onClick={() => setIsAuthModalOpen(true)}>
                    Sign In
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};