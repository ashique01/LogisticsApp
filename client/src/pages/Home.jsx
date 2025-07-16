import React from "react";
import {
  Package,
  Globe,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Truck,
  MapPin,
  ShieldCheck,
  Users,
  Box,
  Plane,
  Warehouse,
  Handshake,
  Star,
  MessageSquare,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"; // Added more icons for richer detail
import hero from '../assets/hero.jpg'
import about from '../assets/about.jpg'
import cta from '../assets/cta.jpg'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-28 md:py-40 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-70">
          <img
            src={hero}
            alt="Logistics Background Pattern"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1920x1080/0A2342/FFFFFF?text=Logistics+Pattern";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-7 drop-shadow-2xl animate-fade-in-down">
            Your World, Delivered. <br className="hidden md:inline" />
            Seamless Logistics Solutions.
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-12 max-w-4xl mx-auto drop-shadow-xl animate-fade-in-up">
            Empowering businesses and individuals with cutting-edge logistics
            technology, ensuring your goods move swiftly, securely, and smartly
            across the globe.
          </p>
          <a
            href="/order" // Link to the order page
            className="inline-flex items-center px-10 py-5 border border-transparent text-xl font-bold rounded-full shadow-2xl
                       bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:from-teal-500 hover:to-teal-700
                       transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-75 animate-bounce-once"
          >
            Get Your Free Quote
            <ArrowRight className="ml-4 h-7 w-7" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Why Choose LogisticsApp?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing unparalleled service and innovative
              solutions that drive your success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Package className="h-16 w-16 mx-auto text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Reliable Delivery
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Your cargo is our priority. We ensure safe, secure, and on-time
                delivery across all destinations, minimizing risks.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Globe className="h-16 w-16 mx-auto text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Global Network
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Leverage our vast global network for seamless international
                shipping, customs clearance, and last-mile delivery.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <Clock className="h-16 w-16 mx-auto text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Real-time Tracking
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Stay informed with precise, real-time updates on your shipment's
                journey, accessible 24/7 from any device.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-600 transform hover:scale-105 transition-transform duration-300 ease-in-out group">
              <DollarSign className="h-16 w-16 mx-auto text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Cost-Effective Solutions
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Optimize your logistics budget with our competitive pricing and
                tailored solutions designed for maximum value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              About LogisticsApp
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At LogisticsApp, we are revolutionizing the way goods are moved.
              Founded on the principles of efficiency, transparency, and
              reliability, our mission is to simplify complex supply chains and
              empower businesses of all sizes. We leverage cutting-edge
              technology to provide seamless, end-to-end logistics solutions
              that meet the dynamic demands of today's global marketplace.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our dedicated team of logistics experts works tirelessly to ensure
              every shipment is handled with precision and care, from pickup to
              final delivery. We believe in building long-term partnerships
              based on trust and mutual success.
            </p>
            <a
              href="/about" // Link to a dedicated about page if it exists
              className="mt-8 inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-md
                         bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                         focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
            >
              Learn More About Us
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={about}
              alt="Logistics Team"
              className="rounded-2xl shadow-xl border-4 border-blue-200 transform rotate-3 hover:rotate-0 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/D1E0F5/2A4E8A?text=Our+Team";
              }} // Fallback
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From small parcels to large cargo, we offer a full spectrum of
              logistics services tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-b-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
              <Truck className="h-14 w-14 text-teal-600 mb-5" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Freight Forwarding
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Expert handling of your cargo across air, sea, and land. We
                optimize routes and manage documentation for smooth transit.
              </p>
            </div>
            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-b-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
              <Warehouse className="h-14 w-14 text-teal-600 mb-5" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Warehousing & Distribution
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Secure storage solutions and efficient distribution services,
                ensuring your products reach their destination on time.
              </p>
            </div>
            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-b-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
              <MapPin className="h-14 w-14 text-teal-600 mb-5" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Last-Mile Delivery
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fast and reliable delivery directly to your customers'
                doorsteps, enhancing satisfaction and brand loyalty.
              </p>
            </div>
            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-b-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
              <ShieldCheck className="h-14 w-14 text-teal-600 mb-5" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Customs Clearance
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Navigate complex customs regulations with ease. Our experts
                ensure compliance and minimize delays for international
                shipments.
              </p>
            </div>
            {/* Service 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-b-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
              <Plane className="h-14 w-14 text-teal-600 mb-5" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Air Cargo Services
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Expedited air freight services for time-sensitive shipments,
                offering speed and global reach.
              </p>
            </div>
            {/* Service 6 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-b-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
              <Box className="h-14 w-14 text-teal-600 mb-5" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Special Cargo Handling
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Specialized solutions for oversized, hazardous, or
                temperature-controlled goods, handled with utmost care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear directly from businesses and individuals who trust
              LogisticsApp with their valuable shipments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-indigo-600">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 mb-4" />
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "LogisticsApp has transformed our supply chain. Their real-time
                tracking and efficient delivery services are simply unmatched.
                Highly recommended!"
              </p>
              <div className="font-semibold text-gray-900">
                - Jane Doe, CEO of TechCorp
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-indigo-600">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 mb-4" />
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "We've been using LogisticsApp for international shipments for
                years. Their global network and customs expertise make
                everything so easy."
              </p>
              <div className="font-semibold text-gray-900">
                - John Smith, Founder of Global Imports
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-indigo-600">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 mb-4" />
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "The customer support is fantastic! Any query is handled quickly
                and professionally. It's a pleasure working with them."
              </p>
              <div className="font-semibold text-gray-900">
                - Emily White, E-commerce Manager
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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1920x1080/0A2342/FFFFFF?text=Dots+Pattern";
            }} // Fallback
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Handshake className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 leading-tight drop-shadow-2xl animate-fade-in-up">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Join thousands of satisfied customers who trust LogisticsApp for
            their shipping needs. Get a personalized quote and experience the
            difference today!
          </p>
          <a
            href="/order" // Link to the order page
            className="inline-flex items-center px-12 py-6 border border-transparent text-2xl font-bold rounded-full shadow-2xl
                       bg-gradient-to-r from-white to-gray-100 text-blue-800 hover:from-gray-100 hover:to-gray-200
                       transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75 animate-bounce-once"
          >
            Start Your Shipment
            <ArrowRight className="ml-5 h-8 w-8" />
          </a>
        </div>
      </section>
    </div>
  );
}
