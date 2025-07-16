import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Track = lazy(() => import("./pages/Track"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Services = lazy(() => import("./pages/Services"));
const Faq = lazy(() => import("./pages/Faq"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const OrderForm = lazy(() => import("./pages/OrderForm"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/Notfound"));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Track />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <OrderForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />

            {/* Admin Route */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
