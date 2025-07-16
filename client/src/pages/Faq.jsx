import React, { useState } from "react";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";

export default function Faq() {
  // State to manage which FAQ item is open
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I track my shipment?",
      answer:
        "You can easily track your shipment by entering your unique tracking ID in the 'Track Order' section on our homepage. You'll get real-time updates on its status and location.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, bank transfers, and Cash on Delivery (COD) for eligible shipments. Specific options may vary by region and service.",
    },
    {
      question:
        "What is the estimated delivery time for international shipments?",
      answer:
        "Estimated delivery times for international shipments vary depending on the destination, customs procedures, and chosen service. You can get an estimate using our pricing calculator or by contacting our support team.",
    },
    {
      question: "Can I change the delivery address after placing an order?",
      answer:
        "Address changes may be possible depending on the shipment's current status and location. Please contact our customer support immediately with your tracking ID to request an address modification.",
    },
    {
      question: "What if my package is damaged or lost?",
      answer:
        "In the rare event of a damaged or lost package, please contact our support team within 48 hours of expected delivery. We will initiate an investigation and guide you through the compensation process according to our terms and conditions.",
    },
    {
      question: "Do you offer insurance for shipments?",
      answer:
        "Yes, we offer optional shipment insurance for added peace of mind. You can select this option during the order placement process. Please review our insurance policy for full details.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-28 md:py-40 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1590283141513-e4056250e181?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Image for FAQ/support theme
            alt="FAQ Background"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1920x1080/0A2342/FFFFFF?text=FAQ+Background";
            }} // Fallback
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <HelpCircle className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-7 drop-shadow-2xl animate-fade-in-down">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-12 max-w-4xl mx-auto drop-shadow-xl animate-fade-in-up">
            Find quick answers to common questions about our services, tracking,
            and more.
          </p>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Your Questions, Answered
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've compiled a list of frequently asked questions to provide you
              with quick and easy information.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl shadow-lg border-b-4 border-blue-600 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-xl font-semibold text-blue-800">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-6 w-6 text-blue-600 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`px-6 pb-6 text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
                  <p className="pt-2 border-t border-blue-200">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) - Contact Us */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-24 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=Dots+Pattern"
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
          <HelpCircle className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 leading-tight drop-shadow-2xl animate-fade-in-up">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Our dedicated support team is ready to assist you.
          </p>
          <a
            href="/contact" // Link to the contact page
            className="inline-flex items-center px-12 py-6 border border-transparent text-2xl font-bold rounded-full shadow-2xl
                       bg-gradient-to-r from-white to-gray-100 text-blue-800 hover:from-gray-100 hover:to-gray-200
                       transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75 animate-bounce-once"
          >
            Contact Our Support
            <ArrowRight className="ml-5 h-8 w-8" />
          </a>
        </div>
      </section>
    </div>
  );
}
