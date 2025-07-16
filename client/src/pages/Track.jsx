import React, { useState } from "react";
import axios from "axios";
import {
  Search,
  Package,
  MapPin,
  User,
  ArrowRight,
  XCircle,
  Loader,
  CheckCircle2,
  Truck,
  Clock,
  Weight,
  BadgeDollarSign,
  ScrollText,
  CheckCircle,
  CircleDot
} from "lucide-react";
import axiosInstance from "../axiosInstance";

const STATUS_STEPS = [
  { label: "Order Placed", value: "Pending" },
  { label: "In Transit", value: "In Transit" },
  { label: "Out for Delivery", value: "Out for Delivery" },
  { label: "Delivered", value: "Delivered" },
];

export default function Track() {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    setError("");
    setOrder(null);
    setIsLoading(true);

    try {
      const res = await axiosInstance.get(`/orders/${trackingId}`);
      setOrder(res.data);
    } catch (err) {
      setError("Tracking ID not found.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "In Transit":
        return "text-blue-600";
      case "Out for Delivery":
        return "text-purple-600";
      case "Pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center max-w-3xl w-full transform transition-all duration-500 ease-in-out scale-95">
        <Truck className="h-20 w-20 mx-auto text-blue-600 mb-5 drop-shadow-lg animate-bounce-once" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-3 leading-tight">
          Track Your Shipment
        </h1>
        <p className="text-md text-gray-600 mb-6 max-w-md mx-auto">
          Enter your tracking ID to view shipment details.
        </p>

        {/* Input */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full sm:w-2/3">
            <input
              type="text"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="pl-12 pr-4 py-2.5 border border-gray-300 rounded-full w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <button
            onClick={handleTrack}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin mr-2 h-5 w-5" />
                Tracking...
              </>
            ) : (
              <>
                Track
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg flex items-center justify-center mb-6 text-sm">
            <XCircle className="h-5 w-5 mr-2" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Shipment Details */}
        {order && (
          <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-lg text-left">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <Package className="mr-3 h-6 w-6 text-blue-600" />
              Shipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-base">
              <Detail label="Tracking ID" icon={<CheckCircle2 />} value={order.trackingId} isMono />
              <Detail label="Sender Name" icon={<User />} value={order.senderName} />
              <Detail label="Sender Address" icon={<MapPin />} value={order.senderAddress} />
              <Detail label="Receiver Name" icon={<User />} value={order.receiverName} />
              <Detail label="Receiver Address" icon={<MapPin />} value={order.receiverAddress} />
              <Detail label="Package Type" icon={<Package />} value={order.packageType} />
              <Detail label="Weight" icon={<Weight />} value={`${order.weight} kg`} />
              <Detail label="Payment Type" icon={<BadgeDollarSign />} value={order.paymentType} />
              <Detail label="Delivery Cost" icon={<BadgeDollarSign />} value={`৳${order.deliveryCost}`} />
              <Detail
                label="Status"
                icon={<CheckCircle2 />}
                value={order.status}
                extraClass={getStatusColor(order.status) + " font-bold"}
              />
              <Detail
                label="Created"
                icon={<Clock />}
                value={new Date(order.dateCreated).toLocaleString()}
              />
            </div>

            {/* Status Timeline */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-blue-700 mb-3">Delivery Progress</h3>
              <div className="flex items-center justify-between gap-2 sm:gap-6 px-1 sm:px-4">
                {STATUS_STEPS.map((step, index) => {
                  const currentIndex = STATUS_STEPS.findIndex(s => s.value === order.status);
                  const isCompleted = index <= currentIndex;
                  const isActive = index === currentIndex;

                  return (
                    <div key={step.value} className="flex flex-col items-center w-full text-center relative">
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm
                        ${isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-800' : 'text-gray-500'}`}>
                        {step.label}
                      </span>
                      {index < STATUS_STEPS.length - 1 && (
                        <div className="absolute top-4 right-[-50%] w-full h-1 bg-gray-200 z-0">
                          <div
                            className={`h-full transition-all duration-500 ${index < currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipment History */}
            {order.history?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center">
                  <ScrollText className="mr-2 h-5 w-5" />
                  Shipment History
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {order.history.map((h, idx) => (
                    <li
                      key={idx}
                      className="bg-white border-l-4 border-blue-500 px-4 py-2 rounded shadow-sm"
                    >
                      <div className="flex justify-between">
                        <span><strong>{h.status}</strong> — {h.location}</span>
                        <span className="text-gray-500">{new Date(h.timestamp).toLocaleString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Detail Display Component
const Detail = ({ label, icon, value, extraClass = "", isMono = false }) => (
  <p className={`flex items-center ${extraClass}`}>
    <span className="text-blue-500 mr-2">{icon}</span>
    <strong className="text-gray-700">{label}:</strong>
    <span className={`ml-2 ${isMono ? "font-mono text-blue-700" : "text-gray-800"}`}>{value}</span>
  </p>
);
