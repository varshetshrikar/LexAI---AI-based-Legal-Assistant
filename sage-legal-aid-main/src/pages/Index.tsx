import { Navbar } from "@/components/legal/Navbar";
import { Hero } from "@/components/legal/Hero";
import { Footer } from "@/components/legal/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
