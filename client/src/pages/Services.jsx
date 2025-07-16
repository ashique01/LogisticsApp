import React from 'react';
import {
  Truck,
  Package,
  Globe,
  Warehouse,
  MapPin,
  ShieldCheck,
  Plane,
  Box,
  ArrowRight,
  ClipboardList,
  Clock
} from 'lucide-react';

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-28 md:py-40 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1574610582530-0391694f8369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Abstract logistics background
            alt="Services Background"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=Services+Background"; }} // Fallback
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <ClipboardList className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-7 drop-shadow-2xl animate-fade-in-down">
            Our Comprehensive Services
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-12 max-w-4xl mx-auto drop-shadow-xl animate-fade-in-up">
            Delivering excellence through a wide range of logistics solutions tailored to your every need.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From local deliveries to global supply chain management, we cover all your logistics requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service Item 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Truck className="h-16 w-16 mx-auto text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Freight Forwarding</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Seamless transportation of goods via air, sea, and land. We handle all complexities from origin to destination.
              </p>
            </div>
            {/* Service Item 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-teal-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Warehouse className="h-16 w-16 mx-auto text-teal-600 mb-6 group-hover:text-teal-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Warehousing & Distribution</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Modern warehousing solutions with efficient inventory management and timely distribution services.
              </p>
            </div>
            {/* Service Item 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-indigo-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <MapPin className="h-16 w-16 mx-auto text-indigo-600 mb-6 group-hover:text-indigo-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Last-Mile Delivery</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Ensuring your products reach their final destination quickly and reliably, enhancing customer satisfaction.
              </p>
            </div>
            {/* Service Item 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-yellow-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <ShieldCheck className="h-16 w-16 mx-auto text-yellow-600 mb-6 group-hover:text-yellow-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Customs Clearance</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Expert navigation of customs regulations to ensure smooth and compliant international shipments.
              </p>
            </div>
            {/* Service Item 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-purple-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Plane className="h-16 w-16 mx-auto text-purple-600 mb-6 group-hover:text-purple-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Air Cargo Solutions</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Fast and secure air freight services for time-sensitive and high-value cargo, globally.
              </p>
            </div>
            {/* Service Item 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-pink-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Box className="h-16 w-16 mx-auto text-pink-600 mb-6 group-hover:text-pink-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Special Handling</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Specialized logistics for oversized, hazardous, or temperature-controlled goods, handled with utmost care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Services Section (Optional, but good for reinforcing value) */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose LogisticsApp for Your Services?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our commitment to innovation, reliability, and customer satisfaction sets us apart.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-700 text-center">Extensive network ensures your shipments reach any corner of the world.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
              <Clock className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Delivery</h3>
              <p className="text-gray-700 text-center">Punctual and reliable delivery schedules to meet your deadlines.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md">
              <Package className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Handling</h3>
              <p className="text-gray-700 text-center">Your cargo is handled with utmost care and security at all stages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) - Get a Quote */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-24 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=Dots+Pattern"
            alt="Dots Pattern"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=Dots+Pattern"; }} // Fallback
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Truck className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 leading-tight drop-shadow-2xl animate-fade-in-up">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Get a personalized quote and let us handle your logistics with expertise and care.
          </p>
          <a
            href="/order" // Link to the order page
            className="inline-flex items-center px-12 py-6 border border-transparent text-2xl font-bold rounded-full shadow-2xl
                       bg-gradient-to-r from-white to-gray-100 text-blue-800 hover:from-gray-100 hover:to-gray-200
                       transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75 animate-bounce-once"
          >
            Get a Free Quote
            <ArrowRight className="ml-5 h-8 w-8" />
          </a>
        </div>
      </section>
    </div>
  );
}
