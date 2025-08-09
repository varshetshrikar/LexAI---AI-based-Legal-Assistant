import { useState } from "react";
import { Navbar } from "@/components/legal/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  Award,
  Users,
  Briefcase
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  hourlyRate: number;
  avatar: string;
  verified: boolean;
  specialties: string[];
  bio: string;
  availability: string[];
}

export default function Booking() {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: ""
  });
  const { toast } = useToast();

  const lawyers: Lawyer[] = [
    {
      id: "1",
      name: "Adv. Priya Sharma",
      specialty: "Constitutional & Civil Rights Law",
      rating: 4.9,
      reviewCount: 142,
      experience: 15,
      location: "New Delhi",
      hourlyRate: 8000,
      avatar: "/placeholder.svg",
      verified: true,
      specialties: ["Constitutional Law", "PIL", "Human Rights", "Supreme Court Practice"],
      bio: "Senior Advocate practicing in Supreme Court and High Courts. Specializes in Constitutional matters, Public Interest Litigation, and fundamental rights cases. LLM from National Law School.",
      availability: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
    },
    {
      id: "2",
      name: "Adv. Rajesh Kumar",
      specialty: "Corporate & Commercial Law",
      rating: 4.8,
      reviewCount: 97,
      experience: 12,
      location: "Mumbai",
      hourlyRate: 6500,
      avatar: "/placeholder.svg",
      verified: true,
      specialties: ["Company Law", "SEBI Regulations", "Banking Law", "Contract Law"],
      bio: "Expert in corporate compliance, mergers & acquisitions, and commercial disputes. CA-turned-lawyer with deep understanding of Companies Act 2013 and SEBI regulations.",
      availability: ["09:30", "10:30", "13:00", "14:30", "15:30"]
    },
    {
      id: "3",
      name: "Adv. Meera Nair",
      specialty: "Family & Matrimonial Law",
      rating: 4.9,
      reviewCount: 189,
      experience: 18,
      location: "Bangalore",
      hourlyRate: 5500,
      avatar: "/placeholder.svg",
      verified: true,
      specialties: ["Hindu Marriage Act", "Muslim Personal Law", "Child Custody", "Domestic Violence"],
      bio: "Leading family law practitioner with expertise in matrimonial disputes, child custody, domestic violence cases under Protection of Women Act, and personal laws.",
      availability: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00"]
    },
    {
      id: "4",
      name: "Adv. Vikram Singh",
      specialty: "Criminal Law & CrPC",
      rating: 4.7,
      reviewCount: 156,
      experience: 20,
      location: "Delhi",
      hourlyRate: 7500,
      avatar: "/placeholder.svg",
      verified: true,
      specialties: ["IPC", "CrPC", "POCSO Act", "Cyber Crimes", "White Collar Crimes"],
      bio: "Veteran criminal lawyer with extensive experience in IPC, CrPC, cybercrime, and white-collar offenses. Former Additional Public Prosecutor with 20+ years experience.",
      availability: ["09:00", "10:00", "14:00", "15:00", "16:00"]
    }
  ];

  const handleBooking = () => {
    if (!selectedLawyer || !selectedDate || !selectedTime || !bookingForm.name || !bookingForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Booked!",
      description: `Your consultation with ${selectedLawyer.name} has been scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });

    // Reset form
    setSelectedLawyer(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setBookingForm({ name: "", email: "", phone: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Book Legal Consultation
          </h1>
          <p className="text-muted-foreground">
            Connect with verified Indian legal professionals for expert advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lawyers List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-primary">Available Lawyers</h2>
            
            {lawyers.map((lawyer) => (
              <Card 
                key={lawyer.id} 
                className={`p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm cursor-pointer transition-smooth hover:shadow-elegant ${
                  selectedLawyer?.id === lawyer.id ? 'ring-2 ring-accent-gold shadow-gold' : ''
                }`}
                onClick={() => setSelectedLawyer(lawyer)}
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                    <AvatarFallback className="bg-gradient-hero text-primary-foreground">
                      {lawyer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-primary">{lawyer.name}</h3>
                      {lawyer.verified && (
                        <Badge variant="outline" className="bg-success/10 text-success border-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-accent-gold-dark font-medium mb-2">{lawyer.specialty}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-accent-gold fill-current" />
                        <span>{lawyer.rating}</span>
                        <span>({lawyer.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{lawyer.experience} years</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{lawyer.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {lawyer.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-accent-gold-light text-accent-gold-dark border-accent-gold">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-primary">
                        ₹{lawyer.hourlyRate}/hr
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {lawyer.bio}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            {selectedLawyer ? (
              <>
                {/* Selected Lawyer Summary */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Selected Lawyer</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedLawyer.avatar} alt={selectedLawyer.name} />
                      <AvatarFallback className="bg-gradient-hero text-primary-foreground">
                        {selectedLawyer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary">{selectedLawyer.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedLawyer.specialty}</p>
                    </div>
                  </div>
                  <div className="text-center py-3 bg-accent-gold-light rounded-lg">
                    <span className="text-lg font-bold text-accent-gold-dark">
                      ₹{selectedLawyer.hourlyRate}/hour
                    </span>
                  </div>
                </Card>

                {/* Date Selection */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border"
                  />
                </Card>

                {/* Time Selection */}
                {selectedDate && (
                  <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-primary mb-4">Select Time</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedLawyer.availability.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "hero" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="justify-center"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Contact Information */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Case Description</Label>
                      <Textarea
                        id="description"
                        value={bookingForm.description}
                        onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                        placeholder="Briefly describe your legal matter"
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>

                <Button onClick={handleBooking} variant="hero" className="w-full" size="lg">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
              </>
            ) : (
              <Card className="p-8 shadow-card border-0 bg-card/50 backdrop-blur-sm text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Select a Lawyer</h3>
                <p className="text-muted-foreground">
                  Choose a lawyer from the list to start booking your consultation
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}