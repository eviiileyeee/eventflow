import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/1734760408581.jpeg";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext/ThemeContext';

const FooterSection = ({ title, children, darkMode }) => (
  <div className="mb-8 md:mb-0">
    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ to, children, darkMode }) => (
  <Link 
    to={to}
    className={`block mb-2 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}
  >
    <div className="flex items-center">
      <ChevronRight className="h-4 w-4 mr-1" />
      {children}
    </div>
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useTheme();
  
  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gradient-to-b from-[#f4f0ff] to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection title="About FlowEvent" darkMode={darkMode}>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="FlowEvent Logo" 
                className="h-10 mb-3"
              />
              <p className="text-sm">
                FlowEvent is a community of passionate developers 
                building the future of technology together through collaboration 
                and innovation.
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </FooterSection>

          <FooterSection title="Quick Links" darkMode={darkMode}>
            <div className="space-y-2">
              <FooterLink to="/about" darkMode={darkMode}>About Us</FooterLink>
              <FooterLink to="/events" darkMode={darkMode}>Events</FooterLink>
              <FooterLink to="/projects" darkMode={darkMode}>Projects</FooterLink>
              <FooterLink to="/team" darkMode={darkMode}>Our Team</FooterLink>
              <FooterLink to="/blog" darkMode={darkMode}>Blog</FooterLink>
              <FooterLink to="/careers" darkMode={darkMode}>Careers</FooterLink>
            </div>
          </FooterSection>

          <FooterSection title="Resources" darkMode={darkMode}>
            <div className="space-y-2">
              <FooterLink to="/docs" darkMode={darkMode}>Documentation</FooterLink>
              <FooterLink to="/tutorials" darkMode={darkMode}>Tutorials</FooterLink>
              <FooterLink to="/workshops" darkMode={darkMode}>Workshops</FooterLink>
              <FooterLink to="/faqs" darkMode={darkMode}>FAQs</FooterLink>
              <FooterLink to="/contact" darkMode={darkMode}>Contact</FooterLink>
              <FooterLink to="/community" darkMode={darkMode}>Community</FooterLink>
            </div>
          </FooterSection>

          <FooterSection title="Contact Us" darkMode={darkMode}>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@flowevent.com" 
                   className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                  contact@flowevent.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" 
                   className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Chameli Devi Group of Institutions, Khandwa-Naka Road, Indore (MP)</span>
              </div>
            </div>
          </FooterSection>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-300'} mt-12 pt-8`}>
          <div className="max-w-md mx-auto text-center">
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Subscribe to Our Newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-grow px-4 py-2 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'} rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-300'} mt-12 pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {currentYear} FlowEvent. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <FooterLink to="/privacy" darkMode={darkMode}>Privacy Policy</FooterLink>
              <FooterLink to="/terms" darkMode={darkMode}>Terms of Service</FooterLink>
              <FooterLink to="/cookies" darkMode={darkMode}>Cookie Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
