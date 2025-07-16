import React from 'react';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'; // Using lucide-react for icons

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-950 text-blue-100 py-12 shadow-inner font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-blue-700 pb-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center text-white text-2xl font-extrabold tracking-wide mb-4">
              <Truck className="h-8 w-8 mr-2 text-blue-300" />
              LogisticsApp
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your trusted partner in seamless global logistics. We deliver efficiency, reliability, and peace of mind, every step of the way.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-blue-200 hover:text-white transition-colors duration-200 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-blue-200 hover:text-white transition-colors duration-200 text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-blue-200 hover:text-white transition-colors duration-200 text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/faqs" className="text-blue-200 hover:text-white transition-colors duration-200 text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Mail className="h-5 w-5 mr-3 text-blue-300" />
                <a href="mailto:info@logisticsapp.com" className="text-blue-200 hover:text-white transition-colors duration-200">
                  info@logisticsapp.com
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-5 w-5 mr-3 text-blue-300" />
                <a href="tel:+1234567890" className="text-blue-200 hover:text-white transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start text-sm">
                <MapPin className="h-5 w-5 mr-3 text-blue-300 flex-shrink-0 mt-1" />
                <span className="text-blue-200">
                  123 Logistics Way, Suite 400<br />
                  Cargo City, LC 98765<br />
                  Country
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Facebook className="h-7 w-7" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Twitter className="h-7 w-7" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Linkedin className="h-7 w-7" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Instagram className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-blue-300 text-sm pt-4">
          &copy; {new Date().getFullYear()} LogisticsApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
