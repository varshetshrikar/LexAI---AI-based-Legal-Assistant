import { Scale, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent-gold rounded-lg">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-display font-bold">LexAI</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              AI-powered legal assistance for India. Get instant guidance on Indian law, 
              analyze documents per Indian legal framework, and connect with expert Indian advocates.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/chat" className="hover:text-accent-gold transition-smooth">Indian Legal Chat AI</a></li>
              <li><a href="/upload" className="hover:text-accent-gold transition-smooth">Document Analysis</a></li>
              <li><a href="/booking" className="hover:text-accent-gold transition-smooth">Advocate Consultation</a></li>
              <li><a href="/dashboard" className="hover:text-accent-gold transition-smooth">Dashboard</a></li>
            </ul>
          </div>

          {/* Legal Areas */}
          <div>
            <h3 className="font-semibold mb-4">Legal Areas</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Constitutional Law</li>
              <li>Corporate & Company Law</li>
              <li>Criminal Law (IPC/CrPC)</li>
              <li>Family & Matrimonial Law</li>
              <li>Property & Real Estate Law</li>
              <li>Labour & Employment Law</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@lexai.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91-9876-543-210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-foreground/60">
              © 2024 LexAI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-accent-gold transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-accent-gold transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-accent-gold transition-smooth">Cookie Policy</a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-primary-foreground/40">
              * LexAI provides AI-powered information about Indian law for educational purposes only. 
              This does not constitute legal advice. Please consult with a qualified Indian advocate for legal matters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};