import { useState } from "react";
import { Navbar } from "@/components/legal/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

interface Consultation {
  id: string;
  lawyerName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: string;
  cost: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: "analyzed" | "processing" | "pending";
  size: string;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  messageCount: number;
  lastMessage: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const consultations: Consultation[] = [
    {
      id: "1",
      lawyerName: "Sarah Johnson",
      date: "2024-08-10",
      time: "10:00 AM",
      status: "upcoming",
      type: "Corporate Law",
      cost: 350
    },
    {
      id: "2",
      lawyerName: "Michael Chen",
      date: "2024-08-05",
      time: "2:00 PM",
      status: "completed",
      type: "Employment Law",
      cost: 275
    }
  ];

  const documents: Document[] = [
    {
      id: "1",
      name: "Employment_Contract_2024.pdf",
      type: "PDF",
      uploadDate: "2024-08-06",
      status: "analyzed",
      size: "2.4 MB"
    },
    {
      id: "2",
      name: "NDA_Agreement.docx",
      type: "DOCX",
      uploadDate: "2024-08-04",
      status: "analyzed",
      size: "1.8 MB"
    }
  ];

  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Contract Law Questions",
      date: "2024-08-06",
      messageCount: 15,
      lastMessage: "Thank you for the clarification on termination clauses."
    },
    {
      id: "2",
      title: "Employment Rights Inquiry",
      date: "2024-08-04",
      messageCount: 8,
      lastMessage: "What are my rights regarding overtime compensation?"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-warning";
      case "completed": return "text-success";
      case "cancelled": return "text-destructive";
      case "analyzed": return "text-success";
      case "processing": return "text-warning";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      case "analyzed": return "outline";
      case "processing": return "secondary";
      case "pending": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your legal consultations, documents, and chat history
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="chats">Chat History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-hero rounded-lg">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Consultations</p>
                    <p className="text-2xl font-bold text-primary">12</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-hero rounded-lg">
                    <FileText className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Documents Analyzed</p>
                    <p className="text-2xl font-bold text-primary">8</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-hero rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Conversations</p>
                    <p className="text-2xl font-bold text-primary">25</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-hero rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-primary">$1,250</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-primary mb-4">Upcoming Consultations</h3>
                <div className="space-y-4">
                  {consultations.filter(c => c.status === "upcoming").map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div>
                        <p className="font-medium text-primary">{consultation.lawyerName}</p>
                        <p className="text-sm text-muted-foreground">{consultation.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{consultation.date}</p>
                        <p className="text-sm text-muted-foreground">{consultation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-primary mb-4">Recent Documents</h3>
                <div className="space-y-4">
                  {documents.slice(0, 3).map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-accent-gold-dark" />
                        <div>
                          <p className="font-medium text-primary text-sm">{document.name}</p>
                          <p className="text-xs text-muted-foreground">{document.uploadDate}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusBadgeVariant(document.status)} className="text-xs">
                        {document.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary">My Consultations</h2>
              <Button variant="hero">Book New Consultation</Button>
            </div>

            <div className="space-y-4">
              {consultations.map((consultation) => (
                <Card key={consultation.id} className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-hero text-primary-foreground">
                          {consultation.lawyerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-primary">{consultation.lawyerName}</h3>
                        <p className="text-sm text-muted-foreground">{consultation.type}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {consultation.date}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {consultation.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusBadgeVariant(consultation.status)} className="mb-2">
                        {consultation.status}
                      </Badge>
                      <p className="text-lg font-semibold text-primary">${consultation.cost}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary">My Documents</h2>
              <Button variant="hero">Upload New Document</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((document) => (
                <Card key={document.id} className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-hero rounded-lg">
                        <FileText className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs bg-accent-gold-light text-accent-gold-dark border-accent-gold">
                          {document.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(document.status)} className="text-xs">
                      {document.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium text-primary mb-2 line-clamp-2">{document.name}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{document.size}</span>
                    <span>{document.uploadDate}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chats" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary">Chat History</h2>
              <Button variant="hero">Start New Chat</Button>
            </div>

            <div className="space-y-4">
              {chatHistory.map((chat) => (
                <Card key={chat.id} className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-smooth cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-hero rounded-lg">
                        <MessageSquare className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{chat.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{chat.lastMessage}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{chat.date}</span>
                          <span>{chat.messageCount} messages</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}