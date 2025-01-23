import React from 'react';
import logo from "../assets/1734760408581.jpeg";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from 'lucide-react';

const FooterSection = ({ title, children }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ href, children }) => (
  <a 
    href={href}
    className="block mb-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
  >
    <div className="flex items-center">
      <ChevronRight className="h-4 w-4 mr-1" />
      {children}
    </div>
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <FooterSection title="About Echelon Dev">
            <div className="mb-4">
              <img 
                src={logo} 
                alt="Echelon Dev Logo" 
                className="h-10 mb-3"
              />
              <p className="text-sm">
                Echelon Dev Society is a community of passionate developers 
                building the future of technology together through collaboration 
                and innovation.
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </FooterSection>

          {/* Quick Links Section */}
          <FooterSection title="Quick Links">
            <div className="space-y-2">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </div>
          </FooterSection>

          {/* Resources Section */}
          <FooterSection title="Resources">
            <div className="space-y-2">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/tutorials">Tutorials</FooterLink>
              <FooterLink href="/workshops">Workshops</FooterLink>
              <FooterLink href="/faqs">FAQs</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
            </div>
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Contact Us">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@echelondev.com" 
                   className="hover:text-blue-400 transition-colors">
                  contact@echelondev.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" 
                   className="hover:text-blue-400 transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Chameli Devi Group of Institutions, khandwa-naka Road, Indore (MP)</span>
              </div>
            </div>
          </FooterSection>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Subscribe to Our Newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 bg-gray-800 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {currentYear} Echelon Dev Society. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;