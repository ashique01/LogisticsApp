import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Truck,
  MessageSquare,
} from "lucide-react";
import contact from "../assets/contact.jpg";
import shipment from '../assets/shipment.jpg'
export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-28 md:py-40 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src={contact}
            alt="Contact Us Background"
            className="w-full h-full object-cover object-center mix-blend-overlay"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1920x1080/0A2342/FFFFFF?text=Contact+Us+Background";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <MessageSquare className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-7 drop-shadow-2xl animate-fade-in-down">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-12 max-w-4xl mx-auto drop-shadow-xl animate-fade-in-up">
            We're here to help! Reach out to us with any questions, inquiries,
            or support needs.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Contact Details
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We look forward to hearing from you.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-lg p-8 md:p-12 border-b-4 border-blue-600">
            <h3 className="text-3xl font-bold text-blue-800 mb-6 flex items-center justify-center">
              <Mail className="h-8 w-8 mr-4 text-blue-600" />
              Email Us
            </h3>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              For all inquiries, please email us at:
            </p>
            <a
              href="mailto:ashiquemurad@gmail.com"
              className="text-2xl md:text-3xl font-extrabold text-teal-600 hover:text-teal-700 transition-colors duration-300
                         break-words block mb-8" // break-words for long emails on small screens
            >
              ashiquemurad@gmail.com
            </a>
            <p className="text-lg text-gray-700">
              We aim to respond to all emails within 24-48 business hours.
            </p>
          </div>
        </div>
      </section>

     <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 py-24 text-white overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src={shipment}
      alt="Shipment Background"
      className="absolute inset-0 w-full h-full object-cover object-center mix-blend-overlay opacity-30"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/1920x1080/0A2342/FFFFFF?text=Shipment+Background";
      }}
    />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <Truck className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
    <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 leading-tight drop-shadow-2xl animate-fade-in-up">
      Need to Ship Something?
    </h2>
    <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
      Get an instant quote and book your next shipment with ease.
    </p>
    <a
      href="/order"
      className="inline-flex items-center px-12 py-6 border border-transparent text-2xl font-bold rounded-full shadow-2xl
                 bg-gradient-to-r from-white to-gray-100 text-blue-800 hover:from-gray-100 hover:to-gray-200
                 transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105
                 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75 animate-bounce-once"
    >
      Start a New Order
      <ArrowRight className="ml-5 h-8 w-8" />
    </a>
  </div>
</section>

    </div>
  );
}
