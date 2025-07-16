import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Package,
  Weight,
  Truck,
  ArrowRight,
  Calculator,
  Info,
  XCircle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram, // For footer
} from "lucide-react";
import { toast } from "react-toastify";

export default function Pricing() {
  const BASE_COST = 50;
  const EXTRA_WEIGHT_COST = 20;
  const FRAGILE_CHARGE = 30;

  const [weight, setWeight] = useState(1);
  const [packageType, setPackageType] = useState("Standard");
  const [calculatedCost, setCalculatedCost] = useState(BASE_COST);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const calculateCost = (currentWeight, currentPackageType) => {
    const weightCharge =
      currentWeight > 1 ? (currentWeight - 1) * EXTRA_WEIGHT_COST : 0;
    const fragileCharge = currentPackageType === "Fragile" ? FRAGILE_CHARGE : 0;
    return BASE_COST + weightCharge + fragileCharge;
  };

  const handleWeightChange = (e) => {
    const value = parseFloat(e.target.value);

    if (isNaN(value) || value < 0) {
      setWeight(0);
      setMessage("Please enter a valid, non-negative weight.");
      setMessageType("error");
    } else {
      setWeight(value);
      setMessage("");
      setMessageType("");
    }
  };

  useEffect(() => {
    setCalculatedCost(calculateCost(weight, packageType));
  }, [weight, packageType]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-28 md:py-40 overflow-hidden">
        {/* Decorative background overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1587320491873-1f1f23a9d9e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Image for pricing/calculator theme
            alt="Pricing Background"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1920x1080/0A2342/FFFFFF?text=Fallback+Image";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Calculator className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-7 drop-shadow-2xl animate-fade-in-down">
            Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 mb-12 max-w-4xl mx-auto drop-shadow-xl animate-fade-in-up">
            Calculate your shipment cost instantly with our easy-to-use tool. No
            hidden fees, just clear pricing.
          </p>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Estimate Your Shipment Cost
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your package details to get an immediate cost estimate.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-lg p-8 md:p-12 border-b-4 border-blue-600 flex flex-col items-center">
            {message && (
              <div
                className={`mb-6 rounded-lg px-6 py-4 flex items-center text-base shadow-md animate-fade-in w-full
                ${
                  messageType === "success"
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : messageType === "error"
                    ? "bg-red-100 border border-red-400 text-red-700"
                    : "bg-blue-100 border border-blue-400 text-blue-700"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle className="w-6 h-6 mr-3" />
                ) : messageType === "error" ? (
                  <XCircle className="w-6 h-6 mr-3" />
                ) : (
                  <Info className="w-6 h-6 mr-3" />
                )}
                <p className="font-medium">{message}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-lg">
              <div className="relative">
                <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={weight}
                  onChange={handleWeightChange}
                  className="pl-14 pr-4 py-3 border border-gray-300 rounded-full w-full text-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                             shadow-sm transition-all duration-200"
                  placeholder="Weight (kg)"
                  required
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                  kg
                </span>
              </div>

              <div className="relative">
                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="pl-14 pr-4 py-3 border border-gray-300 rounded-full w-full text-lg appearance-none cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                             shadow-sm transition-all duration-200"
                  required
                >
                  <option value="Standard">Standard</option>
                  <option value="Fragile">Fragile</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-2xl font-semibold text-gray-700 mb-2">
                Estimated Cost:
              </p>
              <p className="text-5xl font-extrabold text-teal-600">
                ৳{calculatedCost.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                (Base ৳50 + ৳20/kg over 1kg + ৳30 for Fragile)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Breakdown Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              How Our Pricing Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple and transparent pricing model ensures you always know
              what you're paying for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-blue-500">
              <DollarSign className="h-16 w-16 mx-auto text-blue-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Base Fee: ৳50
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                A flat base charge applies to every shipment, covering initial
                handling and processing.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-teal-500">
              <Weight className="h-16 w-16 mx-auto text-teal-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Weight Charge: ৳20/kg
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                An additional charge of ৳20 applies for each kilogram over the
                first kilogram. The first kg is included in the base fee.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-indigo-500">
              <Package className="h-16 w-16 mx-auto text-indigo-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Fragile Handling: ৳30
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                A special handling fee is added for fragile items to ensure
                extra care during transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) - Start New Order */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-24 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://placehold.co/1920x1080/0A2342/FFFFFF?text=Dots+Pattern"
            alt="Dots Pattern"
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1920x1080/0A2342/FFFFFF?text=Fallback+Image";
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <Truck className="h-24 w-24 mx-auto text-teal-300 mb-8 drop-shadow-xl animate-scale-in" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-7 leading-tight drop-shadow-2xl animate-fade-in-up">
            Ready to Ship?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Get an instant quote and book your next shipment with ease.
          </p>
          <a
            href="/order" // Link to the order page
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
