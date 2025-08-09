import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Upload, Scale, ArrowRight, CheckCircle, Users, FileText, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const features = [
    { icon: MessageSquare, title: "AI Legal Chatbot", desc: "Get instant answers to Indian legal questions" },
    { icon: FileText, title: "Document Analysis", desc: "Analyze contracts per Indian law" },
    { icon: Users, title: "Expert Indian Lawyers", desc: "Connect with verified Indian advocates" },
    { icon: Zap, title: "Indian Law Expertise", desc: "Specialized in Indian Constitution & Acts" },
  ];

  const benefits = [
    "24/7 AI assistance for Indian law queries",
    "Document analysis per Indian legal framework",
    "Verified Indian advocate consultations",
    "Secure platform with Indian data protection"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <Badge variant="outline" className="mb-6 bg-accent-gold-light text-accent-gold-dark border-accent-gold">
              🚀 AI-Powered Legal Assistant
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6 leading-tight">
              Your Legal
              <span className="block bg-gradient-gold bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant guidance on Indian law, analyze legal documents according to Indian acts, 
              and connect with expert Indian advocates. LexAI makes Indian legal assistance accessible, 
              affordable, and available 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate("/chat")}
              >
                Start Indian Legal Chat
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-accent-gold text-accent-gold-dark hover:bg-accent-gold-light"
                onClick={() => navigate("/upload")}
              >
                Analyze Document
                <Upload className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <Scale className="h-32 w-32 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Scale className="h-24 w-24 text-accent-gold" />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Powerful Legal AI Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for Indian legal assistance in one intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth border-0 bg-card/50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-gradient-hero rounded-lg shadow-gold mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-hero shadow-elegant border-0">
            <h3 className="text-2xl font-display font-bold text-primary-foreground mb-4">
              Ready to Get Legal Help?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust LexAI for their legal needs. Start your journey today.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => navigate("/chat")}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};