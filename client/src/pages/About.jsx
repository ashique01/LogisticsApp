import React from 'react';
import {
  Users,
  Lightbulb,
  Target,
  Handshake,
  Award,
  History,
  MapPin,
  Phone,
  Mail,
  Truck,
  ArrowRight,
  Star, // For testimonials or values
  Briefcase, // For professional aspect
  HeartHandshake, // For partnerships
} from 'lucide-react';
import hero from '../assets/hero.jpg'
import cta from '../assets/cta.jpg'
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-28 md:py-40 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-70">
          <img
            src={hero}
            alt="About Us Background"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=About+Us+Background"; }} // Fallback
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Users className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-7 drop-shadow-2xl animate-fade-in-down">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-12 max-w-4xl mx-auto drop-shadow-xl animate-fade-in-up">
            Your trusted partner in seamless global logistics. Discover our journey, mission, and the values that drive us.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Our Core Principles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are driven by a commitment to excellence, innovation, and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Mission */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Target className="h-16 w-16 mx-auto text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                To revolutionize logistics by providing innovative, efficient, and transparent solutions that empower businesses and individuals globally.
              </p>
            </div>
            {/* Vision */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-teal-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Lightbulb className="h-16 w-16 mx-auto text-teal-600 mb-6 group-hover:text-teal-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                To be the leading global logistics partner, recognized for our unwavering commitment to reliability, sustainability, and technological advancement.
              </p>
            </div>
            {/* Values */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-indigo-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Handshake className="h-16 w-16 mx-auto text-indigo-600 mb-6 group-hover:text-indigo-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Values</h3>
              <ul className="text-gray-600 text-base leading-relaxed list-disc list-inside text-left mx-auto max-w-xs">
                <li>Integrity & Trust</li>
                <li>Customer Centricity</li>
                <li>Innovation & Adaptability</li>
                <li>Efficiency & Reliability</li>
                <li>Sustainability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Meet Our Dedicated Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Behind every successful delivery is a team of passionate and experienced professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://placehold.co/150x150/AEC6CF/2A4E8A?text=John+D"
                alt="John Doe"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/AEC6CF/2A4E8A?text=John+D"; }} // Fallback
              />
              <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-blue-600 font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Visionary leader with 20+ years in logistics and supply chain management.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://placehold.co/150x150/F0E68C/8B4513?text=Jane+S"
                alt="Jane Smith"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/F0E68C/8B4513?text=Jane+S"; }} // Fallback
              />
              <h3 className="text-xl font-semibold text-gray-900">Jane Smith</h3>
              <p className="text-blue-600 font-medium mb-2">Chief Operations Officer</p>
              <p className="text-gray-600 text-sm">
                Ensuring seamless operations and optimizing delivery networks worldwide.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://placehold.co/150x150/B0E0E6/4682B4?text=Alex+W"
                alt="Alex Wang"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/B0E0E6/4682B4?text=Alex+W"; }} // Fallback
              />
              <h3 className="text-xl font-semibold text-gray-900">Alex Wang</h3>
              <p className="text-blue-600 font-medium mb-2">Head of Technology</p>
              <p className="text-gray-600 text-sm">
                Driving innovation with cutting-edge software and tracking systems.
              </p>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://placehold.co/150x150/DDA0DD/800080?text=Maria+G"
                alt="Maria Garcia"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/DDA0DD/800080?text=Maria+G"; }} // Fallback
              />
              <h3 className="text-xl font-semibold text-gray-900">Maria Garcia</h3>
              <p className="text-blue-600 font-medium mb-2">Customer Success Lead</p>
              <p className="text-gray-600 text-sm">
                Dedicated to ensuring every client has an exceptional experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History/Milestones Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Our Journey So Far
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A brief look at the key milestones that shaped LogisticsApp into what it is today.
            </p>
          </div>
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-blue-700 h-full border left-1/2 transform -translate-x-1/2"></div>
            {/* Milestone 1 */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
                <History className="mx-auto text-white h-5 w-5" />
              </div>
              <div className="order-1 bg-blue-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-blue-800 text-xl">2015: Founding</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  LogisticsApp was founded with a vision to simplify global shipping.
                </p>
              </div>
            </div>
            {/* Milestone 2 */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-teal-600 shadow-xl w-8 h-8 rounded-full">
                <Award className="mx-auto text-white h-5 w-5" />
              </div>
              <div className="order-1 bg-teal-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-teal-800 text-xl">2017: Global Expansion</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Expanded operations to cover key international trade routes and major continents.
                </p>
              </div>
            </div>
            {/* Milestone 3 */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-indigo-600 shadow-xl w-8 h-8 rounded-full">
                <Briefcase className="mx-auto text-white h-5 w-5" />
              </div>
              <div className="order-1 bg-indigo-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-indigo-800 text-xl">2020: Tech Integration</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Launched advanced AI-powered tracking and route optimization technologies.
                </p>
              </div>
            </div>
            {/* Milestone 4 */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-green-600 shadow-xl w-8 h-8 rounded-full">
                <HeartHandshake className="mx-auto text-white h-5 w-5" />
              </div>
              <div className="order-1 bg-green-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-green-800 text-xl">2023: Strategic Partnerships</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  Formed key alliances to enhance last-mile delivery and warehousing capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) - Contact/Get Started */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-24 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-1 opacity-30">
          <img
            src={cta}
            alt="Dots Pattern"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=Dots+Pattern"; }} // Fallback
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Handshake className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 leading-tight drop-shadow-2xl animate-fade-in-up">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
            We're here to help you achieve your logistics goals. Reach out to us today!
          </p>
          <a
            href="/contact" // Link to a dedicated contact page
            className="inline-flex items-center px-12 py-6 border border-transparent text-2xl font-bold rounded-full shadow-2xl
                       bg-gradient-to-r from-white to-gray-100 text-blue-800 hover:from-gray-100 hover:to-gray-200
                       transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75 animate-bounce-once"
          >
            Contact Our Team
            <ArrowRight className="ml-5 h-8 w-8" />
          </a>
        </div>
      </section>
    </div>
  );
}
