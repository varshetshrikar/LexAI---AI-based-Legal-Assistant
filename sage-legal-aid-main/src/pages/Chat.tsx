import { useState } from "react";
import { Navbar } from "@/components/legal/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, FileText, Scale } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "legal" | "general";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Namaste! I'm LexAI, your AI legal assistant specializing in Indian law. I can help you with questions about Indian Constitution, civil and criminal law, corporate regulations, family law, property law, and more. I'm well-versed in Indian legal procedures, acts, and court systems. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "legal"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your legal question about Indian law. Based on my analysis of the Indian Constitution, various acts, and legal precedents, here's what I can tell you: [This is a simulated response. In the full implementation, this would connect to GPT-4 API with comprehensive Indian legal knowledge base including IPC, CrPC, CPC, and various Indian acts]",
        sender: "ai",
        timestamp: new Date(),
        type: "legal"
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const suggestions = [
    "What are the grounds for divorce under Hindu Marriage Act?",
    "Explain tenant rights under Model Tenancy Act 2021",
    "How to register a trademark in India under Trade Marks Act?",
    "What is the procedure for filing an FIR under CrPC?",
    "Rights of women under Dowry Prohibition Act",
    "GST registration requirements for small businesses"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Legal AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Get instant answers to your Indian legal questions with AI-powered insights
          </p>
        </div>

        <Card className="h-[600px] flex flex-col shadow-card border-0 bg-card/50 backdrop-blur-sm">
          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-gradient-hero text-primary-foreground"
                        : "bg-secondary border border-border"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "ai" && (
                        <div className="p-1 bg-accent-gold rounded-full">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      {message.sender === "user" && (
                        <div className="p-1 bg-primary-foreground/20 rounded-full">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">
                            {message.sender === "ai" ? "LexAI" : "You"}
                          </span>
                          {message.type === "legal" && (
                            <Badge variant="outline" className="text-xs bg-accent-gold-light text-accent-gold-dark border-accent-gold">
                              <Scale className="h-3 w-3 mr-1" />
                              Legal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <span className="text-xs opacity-60 mt-2 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-accent-gold rounded-full">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Try asking about Indian law:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(suggestion)}
                    className="text-left p-2 text-sm bg-accent-gold-light hover:bg-accent-gold text-accent-gold-dark rounded-lg transition-smooth"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Indian legal question..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-background"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} variant="hero">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <Sparkles className="h-3 w-3 inline mr-1" />
              AI responses are based on Indian legal framework and are for informational purposes only. Please consult with a qualified Indian lawyer for legal advice.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}