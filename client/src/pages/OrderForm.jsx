import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import {
  PackagePlus,
  Send,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  Loader,
  Truck,
  Weight,
  Box,
  CreditCard,
  Phone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function OrderForm() {
  const { user, token } = useAuth();

  const [trackingId, setTrackingId] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [packageType, setPackageType] = useState("Parcel");
  const [weight, setWeight] = useState(1);
  const [paymentType, setPaymentType] = useState("COD");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateTrackingId = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BDX${date}-${random}`;
  };

  useEffect(() => {
    setTrackingId(generateTrackingId());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsLoading(true);

    if (
      !trackingId ||
      !user?.name ||
      !user?.address ||
      !receiverName ||
      !receiverAddress ||
      !receiverPhone ||
      !weight
    ) {
      setMessage(
        "Please fill all required fields and ensure you are logged in."
      );
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.post(
        "/orders",
        {
          trackingId,
          receiverName,
          receiverAddress,
          receiverPhone,
          packageType,
          weight,
          paymentType: paymentType === "COD (Cash on Delivery)" ? "COD" : "Prepaid",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Order created successfully! You can now track it.");
      setMessageType("success");
      setTrackingId(generateTrackingId());
      setReceiverName("");
      setReceiverAddress("");
      setReceiverPhone("");
      setWeight(1);
      setPackageType("Parcel");
      setPaymentType("COD");
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || err.message || "Error creating order.";
      setMessage(backendMessage);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-6 font-sans text-gray-900">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl w-full">
        <div className="flex flex-col items-center mb-8">
          <PackagePlus className="h-24 w-24 text-blue-600 mb-4 animate-bounce-once" />
          <h1 className="text-4xl font-extrabold text-blue-800 mb-1 text-center">
            Create a New Shipment Order
          </h1>
          <p className="text-gray-600 text-center max-w-md">
            Fill out the details below to initiate your shipment quickly and securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tracking ID */}
          <InputField
            icon={<Truck />}
            placeholder="Tracking ID will be auto-generated"
            value={trackingId}
            onChange={() => {}}
            label="Tracking ID"
            disabled
          />

          {/* Sender Details */}
          <Section title="Sender Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={<User />}
                placeholder="Sender's Full Name"
                value={user?.name || ""}
                label="Sender Name"
                disabled
              />
              <InputField
                icon={<MapPin />}
                placeholder="Sender's Full Address"
                value={user?.address || ""}
                label="Sender Address"
                disabled
              />
            </div>
          </Section>

          {/* Receiver Details */}
          <Section title="Receiver Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                icon={<User />}
                placeholder="Receiver's Full Name or Company"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                label="Receiver Name"
                required
              />
              <InputField
                icon={<MapPin />}
                placeholder="Receiver's Full Address"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                label="Receiver Address"
                required
              />
              <InputField
                icon={<Phone />}
                placeholder="Receiver's Phone Number"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                label="Receiver Phone"
                required
                type="tel"
              />
            </div>
          </Section>

          {/* Package & Payment Details */}
          <Section title="Package & Payment Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                icon={<Box />}
                label="Package Type"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                options={["Parcel", "Document", "Fragile", "Pallet"]}
              />
              <InputField
                icon={<Weight />}
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Weight in Kilograms (e.g., 5.5)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                label="Weight (kg)"
                required
              />
            </div>

            <div className="mt-6 max-w-xs">
              <SelectField
                icon={<CreditCard />}
                label="Payment Type"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                options={["COD (Cash on Delivery)", "Prepaid (Online Payment)"]}
              />
            </div>
          </Section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto flex justify-center items-center gap-3 px-10 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-full shadow-lg
                       hover:from-teal-700 hover:to-teal-600 transition transform hover:-translate-y-1 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5" /> Submitting...
              </>
            ) : (
              <>
                Submit Order
                <Send className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <div
            className={`mt-8 px-6 py-3 rounded-lg flex items-center justify-center gap-3 shadow-md text-sm animate-fade-in
            ${
              messageType === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
            <p className="font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Section Wrapper Component
const Section = ({ title, children }) => (
  <fieldset className="border border-gray-300 rounded-xl p-6">
    <legend className="text-lg font-semibold text-gray-700 px-3">{title}</legend>
    {children}
  </fieldset>
);

// Input Field Component
const InputField = ({ icon, label, ...props }) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-700 text-sm font-semibold mb-1"
      >
        {label}
      </label>
    )}
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition duration-200 text-gray-900"
    />
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6">
      {icon}
    </div>
  </div>
);

// Select Field Component
const SelectField = ({ icon, label, value, onChange, options }) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={label.toLowerCase().replace(/\s/g, "-")}
        className="block text-gray-700 text-sm font-semibold mb-1"
      >
        {label}
      </label>
    )}
    <select
      id={label.toLowerCase().replace(/\s/g, "-")}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 appearance-none bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition duration-200 cursor-pointer text-gray-900"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6">
      {icon}
    </div>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
      <svg
        className="fill-current h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);
