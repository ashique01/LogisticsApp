import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../axiosInstance";
import {
  Truck,
  Eye,
  Trash,
  Loader,
  PlusCircle,
  Sun,
  Moon,
  RefreshCcw,
  Search,
  CheckCircle,
  Package,
  MapPin,
  User,
  Weight,
  BadgeDollarSign,
  Clock,
  Phone,
  XCircle, // Explicitly imported for message banner
  Info, // Explicitly imported for message banner
  ScrollText, // Re-added for tracking history
} from "lucide-react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import debounce from "lodash.debounce"; // Ensure lodash.debounce is installed if not already

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success', 'error', 'info'
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(7); // more per page for admin
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
  });
  const [sortBy, setSortBy] = useState("dateDesc"); // new sorting
  const [selectedOrders, setSelectedOrders] = useState(new Set()); // for bulk actions

  const statusOptions = [
    "Pending",
    "In Transit",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  // Function to get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Using mock data for demonstration as per previous instructions
      const res = await axiosInstance.get("/orders");
      setOrders(res.data);
      setMessage("");
      setMessageType("");
    } catch (err) {
      setMessage(`Failed to load orders: ${err.message || "Unknown error"}`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await axiosInstance.get("/orders/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  // Debounced search to reduce filter runs on fast typing
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Apply filters + sorting
  const applyFilters = useCallback(() => {
    let result = [...orders];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.trackingId.toLowerCase().includes(q) ||
          o.senderName.toLowerCase().includes(q) ||
          o.receiverName.toLowerCase().includes(q) ||
          (o.receiverPhone && o.receiverPhone.toLowerCase().includes(q)) // Check if receiverPhone exists
      );
    }

    // Status filter
    if (filterStatus) {
      result = result.filter((o) => o.status === filterStatus);
    }

    // Sorting
    switch (sortBy) {
      case "dateAsc":
        result.sort(
          (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
        );
        break;
      case "dateDesc":
        result.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );
        break;
      case "costAsc":
        result.sort((a, b) => a.deliveryCost - b.deliveryCost);
        break;
      case "costDesc":
        result.sort((a, b) => b.deliveryCost - a.deliveryCost);
        break;
      default:
        break;
    }

    setFilteredOrders(result);
    setCurrentPage(1);
  }, [orders, searchQuery, filterStatus, sortBy]);

  // Run filter when dependencies change
  useEffect(() => {
    applyFilters();
  }, [orders, searchQuery, filterStatus, sortBy, applyFilters]); // Added applyFilters to dependency array

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Update status with button loading
  const updateStatus = async (trackingId, newStatus) => {
    setUpdatingId(trackingId);
    try {
      await axiosInstance.put(`/orders/${trackingId}/status`, {
        status: newStatus,
        location: "Admin Panel", // Optional location update
      });

      setMessage(`Status of order ${trackingId} updated to ${newStatus}.`);
      setMessageType("success");

      await fetchOrders();
      await fetchStats();
      setSelectedOrders(new Set());
    } catch (err) {
      setMessage(
        `Failed to update status for ${trackingId}: ${
          err.response?.data?.message || err.message
        }`
      );
      setMessageType("error");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    )
      return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/orders/${id}`); // ✅ Use real API
      setMessage(`Order ${id} deleted successfully.`);
      setMessageType("success");
      await fetchOrders(); // ✅ Refresh orders after delete
      await fetchStats();
      setSelectedOrders(new Set());
    } catch (err) {
      setMessage(
        `Failed to delete order ${id}: ${
          err.response?.data?.message || err.message
        }`
      );
      setMessageType("error");
    } finally {
      setDeletingId(null);
    }
  };

  // Bulk delete selected orders
  const deleteSelectedOrders = async () => {
    if (selectedOrders.size === 0) {
      setMessage("No orders selected for deletion.");
      setMessageType("info");
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedOrders.size} selected orders? This action cannot be undone.`
      )
    )
      return;
    setDeletingId("bulk"); // Indicate bulk action loading
    try {
      // Simulate API call for each selected order
      await Promise.all(
        Array.from(selectedOrders).map(
          (id) =>
            new Promise((resolve) =>
              setTimeout(() => {
                // Simulate deletion logic for mock data
                setOrders((prev) => prev.filter((o) => o._id !== id));
                resolve();
              }, 200)
            )
          // In a real application: axiosInstance.delete(`/orders/${id}`)
        )
      );
      setMessage(`${selectedOrders.size} orders deleted successfully.`);
      setMessageType("success");
      await fetchOrders(); // Re-fetch all orders to ensure consistency
      await fetchStats();
      setSelectedOrders(new Set()); // Clear selections
    } catch (err) {
      setMessage(
        `Failed to delete some orders: ${err.message || "Unknown error"}`
      );
      setMessageType("error");
    } finally {
      setDeletingId(null);
    }
  };

  // Bulk update status for selected orders
  const bulkUpdateStatus = async (newStatus) => {
    if (selectedOrders.size === 0) {
      setMessage("No orders selected for status update.");
      setMessageType("info");
      return;
    }
    setUpdatingId("bulk"); // Indicate bulk action loading
    try {
      // Simulate API call for each selected order
      await Promise.all(
        Array.from(selectedOrders).map(
          (id) =>
            new Promise((resolve) =>
              setTimeout(() => {
                // Simulate update logic for mock data
                setOrders((prev) =>
                  prev.map((o) =>
                    o._id === id ? { ...o, status: newStatus } : o
                  )
                );
                resolve();
              }, 200)
            )
          // In a real application: axiosInstance.put(`/orders/${id}/status`, { status: newStatus })
        )
      );
      setMessage(`${selectedOrders.size} orders updated to "${newStatus}".`);
      setMessageType("success");
      await fetchOrders(); // Re-fetch all orders
      await fetchStats();
      setSelectedOrders(new Set()); // Clear selections
    } catch (err) {
      setMessage(
        `Failed to update status for some orders: ${
          err.message || "Unknown error"
        }`
      );
      setMessageType("error");
    } finally {
      setUpdatingId(null);
    }
  };

  // Toggle selection for bulk actions
  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const themeClass = darkMode
    ? "dark bg-gray-950 text-gray-100"
    : "bg-gradient-to-br from-blue-50 to-white text-gray-800";

  // Chart data configuration
  const barChartData = {
    labels: ["Pending", "In Transit", "Delivered", "Cancelled"], // Added Cancelled to chart labels
    datasets: [
      {
        label: "Number of Orders",
        data: [
          stats.pending,
          stats.inTransit,
          stats.delivered,
          orders.filter((o) => o.status === "Cancelled").length,
        ], // Include cancelled orders in data
        backgroundColor: ["#fbbf24", "#3b82f6", "#10b981", "#ef4444"], // Tailwind colors: yellow-400, blue-500, green-500, red-500
        borderColor: ["#f59e0b", "#2563eb", "#059669", "#dc2626"],
        borderWidth: 1,
        borderRadius: 4, // Rounded bars
      },
    ],
  };

  const pieChartData = {
    labels: ["Pending", "In Transit", "Delivered", "Cancelled"], // Added Cancelled to chart labels
    datasets: [
      {
        data: [
          stats.pending,
          stats.inTransit,
          stats.delivered,
          orders.filter((o) => o.status === "Cancelled").length,
        ], // Include cancelled orders in data
        backgroundColor: ["#fbbf24", "#3b82f6", "#10b981", "#ef4444"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"], // White borders for slice separation
        borderWidth: 2,
      },
    ],
  };

  const lineChartData = {
    labels: [
      "Pending",
      "In Transit",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ], // More granular labels for line chart
    datasets: [
      {
        label: "Orders Count",
        data: [
          stats.pending,
          stats.inTransit,
          orders.filter((o) => o.status === "Out for Delivery").length, // Specific count for Out for Delivery
          stats.delivered,
          orders.filter((o) => o.status === "Cancelled").length,
        ],
        borderColor: darkMode ? "#60a5fa" : "#3b82f6", // Blue-400 for dark, Blue-600 for light
        backgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.2)"
          : "rgba(59, 130, 246, 0.2)", // Lighter blue fill
        fill: true,
        tension: 0.4, // Smoother line
        pointBackgroundColor: darkMode ? "#60a5fa" : "#3b82f6",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: darkMode ? "#60a5fa" : "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to fill container
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Move legend to bottom
        labels: {
          color: darkMode ? "#e2e8f0" : "#4a5568", // Adjust legend label color for dark mode
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
        titleColor: darkMode ? "#1a202c" : "#fff",
        bodyColor: darkMode ? "#1a202c" : "#fff",
        borderColor: darkMode ? "#4a5568" : "#e2e8f0",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#cbd5e1" : "#4a5568", // X-axis label color
        },
        grid: {
          color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", // X-axis grid color
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#cbd5e1" : "#4a5568", // Y-axis label color
          stepSize: 10, // Example step size
        },
        grid: {
          color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", // Y-axis grid color
        },
      },
    },
  };

  return (
    <div
      className={`min-h-screen ${themeClass} p-4 sm:p-6 font-sans transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`sticky top-0 z-20 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg mb-6 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 ${
            darkMode ? "border-blue-700" : "border-blue-600"
          }`}
        >
          <h1
            className={`text-3xl sm:text-4xl font-extrabold ${
              darkMode ? "text-blue-300" : "text-blue-800"
            } flex items-center gap-3`}
          >
            <Truck
              className={`h-9 w-9 ${
                darkMode ? "text-teal-400" : "text-teal-600"
              } drop-shadow-md`}
            />
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-200
                         ${
                           darkMode
                             ? "text-yellow-400 hover:bg-gray-700"
                             : "text-gray-600 hover:bg-gray-100"
                         }
                         focus:outline-none focus:ring-2 focus:ring-blue-400`}
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <a
              href="/order"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-lg font-semibold rounded-full shadow-md
                         transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-75"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create New Order
            </a>
            <button
              onClick={() => {
                fetchOrders();
                fetchStats();
                setMessage("Dashboard refreshed.");
                setMessageType("info"); // Set message type for refresh
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-lg font-semibold rounded-full shadow-md
                         transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-75"
              title="Refresh Dashboard"
            >
              <RefreshCcw className="h-5 w-5 mr-2" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader
                className={`h-10 w-10 animate-spin ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
          ) : (
            <>
              <StatCard
                label="Total Orders"
                value={stats.totalOrders}
                darkMode={darkMode}
              />
              <StatCard
                label="Pending"
                value={stats.pending}
                color="yellow"
                darkMode={darkMode}
              />
              <StatCard
                label="In Transit"
                value={stats.inTransit}
                color="blue"
                darkMode={darkMode}
              />
              <StatCard
                label="Delivered"
                value={stats.delivered}
                color="green"
                darkMode={darkMode}
              />
            </>
          )}
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ChartCard title="Order Status (Bar)" darkMode={darkMode}>
            <Bar data={barChartData} options={chartOptions} />
          </ChartCard>
          <ChartCard title="Order Status (Pie)" darkMode={darkMode}>
            <Pie data={pieChartData} options={chartOptions} />
          </ChartCard>
          <ChartCard title="Orders Overview (Line)" darkMode={darkMode}>
            <Line data={lineChartData} options={chartOptions} />
          </ChartCard>
        </div>
        {/* Filters and sorting */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-inner`}
        >
          <div className="relative w-full sm:w-auto flex-grow">
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              className={`pl-12 pr-4 py-3 border rounded-full w-full text-base
                         ${
                           darkMode
                             ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                             : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
                         }
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all duration-200`}
              placeholder="Search by tracking, sender, or receiver"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <select
            className={`border rounded-full px-5 py-3 text-base appearance-none cursor-pointer
                       ${
                         darkMode
                           ? "bg-gray-700 border-gray-600 text-white"
                           : "bg-white border-gray-300"
                       }
                       focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200`}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className={`border rounded-full px-5 py-3 text-base appearance-none cursor-pointer
                       ${
                         darkMode
                           ? "bg-gray-700 border-gray-600 text-white"
                           : "bg-white border-gray-300"
                       }
                       focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200`}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            title="Sort orders"
          >
            <option value="dateDesc">Date: Newest First</option>
            <option value="dateAsc">Date: Oldest First</option>
            <option value="costDesc">Cost: High to Low</option>
            <option value="costAsc">Cost: Low to High</option>
          </select>

          {/* Bulk actions */}
          <div className="ml-auto flex flex-wrap gap-3">
            <button
              disabled={selectedOrders.size === 0 || updatingId === "bulk"}
              onClick={() => bulkUpdateStatus("Delivered")}
              className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold rounded-full shadow-md
                         transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-300"
              title="Mark selected as Delivered"
            >
              {updatingId === "bulk" ? (
                <Loader className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Mark Delivered
            </button>
            <button
              disabled={selectedOrders.size === 0 || deletingId === "bulk"}
              onClick={deleteSelectedOrders}
              className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-full shadow-md
                         transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300"
              title="Delete selected orders"
            >
              {deletingId === "bulk" ? (
                <Loader className="animate-spin mr-2 h-4 w-4" />
              ) : (
                <Trash className="h-4 w-4 mr-2" />
              )}
              Delete Selected
            </button>
          </div>
        </div>

        {/* Message banner */}
        {message && (
          <div
            className={`mb-6 rounded-lg px-6 py-4 flex items-center text-base shadow-md animate-fade-in
            ${
              messageType === "success"
                ? "bg-green-100 border border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300"
                : messageType === "error"
                ? "bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-300"
                : "bg-blue-100 border border-blue-400 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300" // For 'info' or default
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

        {/* Orders Table */}
        <div
          className={`overflow-x-auto ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-2xl border ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader
                className={`h-12 w-12 animate-spin mb-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <p
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Loading Orders...
              </p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <p
                className={`text-xl font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No orders found matching your criteria.
              </p>
              <p
                className={`text-md mt-2 ${
                  darkMode ? "text-gray-500" : "text-gray-700"
                }`}
              >
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <table className="min-w-full text-sm text-left divide-y divide-gray-200 dark:divide-gray-700">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-blue-50 text-blue-800"
                } font-bold uppercase tracking-wider`}
              >
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(
                            new Set(filteredOrders.map((o) => o._id))
                          );
                        } else {
                          setSelectedOrders(new Set());
                        }
                      }}
                      checked={
                        selectedOrders.size > 0 &&
                        filteredOrders.length > 0 &&
                        selectedOrders.size === filteredOrders.length
                      }
                      title="Select all"
                      className={`form-checkbox h-4 w-4 rounded ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-blue-400"
                          : "text-blue-600 border-gray-300"
                      } focus:ring-blue-500`}
                    />
                  </th>
                  <th className="px-6 py-4">Tracking ID</th>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Receiver</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Cost</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`${
                  darkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-800"
                } divide-y divide-gray-200 dark:divide-gray-700`}
              >
                {paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className={`hover:${
                      darkMode ? "bg-gray-700" : "bg-blue-50"
                    } transition-all duration-200 ease-in-out`}
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(order._id)}
                        onChange={() => toggleSelectOrder(order._id)}
                        title="Select order"
                        className={`form-checkbox h-4 w-4 rounded ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-blue-400"
                            : "text-blue-600 border-gray-300"
                        } focus:ring-blue-500`}
                      />
                    </td>
                    <td
                      className={`px-6 py-4 font-mono font-semibold ${
                        darkMode ? "text-blue-400" : "text-blue-700"
                      } truncate max-w-[150px]`}
                    >
                      {order.trackingId}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[150px]">
                      {order.senderName}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[150px]">
                      {order.receiverName}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.trackingId, e.target.value)
                        }
                        disabled={
                          updatingId === order.trackingId ||
                          deletingId === order._id
                        }
                        className={`border rounded-full px-3 py-1.5 text-xs font-medium appearance-none cursor-pointer
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200
                                    ${getStatusBadgeClass(order.status)}
                                    ${
                                      darkMode
                                        ? "bg-gray-700 border-gray-600 text-white"
                                        : "bg-white border-gray-300"
                                    }`}
                      >
                        {statusOptions.map((s, index) => {
                          const currentIndex = statusOptions.indexOf(
                            order.status
                          );
                          const isBeforeCurrent = index < currentIndex;
                          // Allow moving to next logical status or 'Cancelled'
                          const isTooFarAhead =
                            index > currentIndex + 1 && s !== "Cancelled";
                          const isDisabled = isBeforeCurrent || isTooFarAhead;

                          return (
                            <option key={s} value={s} disabled={isDisabled}>
                              {s}
                            </option>
                          );
                        })}
                      </select>
                      {updatingId === order._id && (
                        <Loader
                          className={`inline-block ml-2 h-4 w-4 animate-spin ${
                            darkMode ? "text-blue-400" : "text-blue-500"
                          }`}
                        />
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      ৳{order.deliveryCost}
                    </td>
                    <td
                      className={`px-6 py-4 text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {new Date(order.dateCreated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex justify-center items-center gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className={`p-2 rounded-full transition-colors duration-200
                                   ${
                                     darkMode
                                       ? "text-blue-400 hover:bg-gray-700"
                                       : "text-blue-600 hover:bg-blue-100"
                                   }
                                   focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        disabled={deletingId === order._id}
                        className={`p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
             ${
               darkMode
                 ? "text-red-400 hover:bg-gray-700"
                 : "text-red-500 hover:bg-red-100"
             }
             focus:outline-none focus:ring-2 focus:ring-red-400`}
                        title="Delete Order"
                      >
                        {deletingId === order._id ? (
                          <Loader className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 p-4 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                         ${
                           darkMode
                             ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                             : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                         }
                         focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                           ${
                             currentPage === i + 1
                               ? `${
                                   darkMode
                                     ? "bg-blue-600 text-white"
                                     : "bg-blue-600 text-white shadow-md"
                                 }`
                               : `${
                                   darkMode
                                     ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                     : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                 }`
                           }
                           focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                         ${
                           darkMode
                             ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                             : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                         }
                         focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
            <span
              className={`ml-4 text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}

        {/* Order detail modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 animate-fade-in">
            <div
              className={`rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative transform scale-95 animate-scale-in max-h-[90vh] overflow-y-auto
                           ${
                             darkMode
                               ? "bg-gray-800 text-gray-100"
                               : "bg-white text-gray-800"
                           }`}
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200
                           ${
                             darkMode
                               ? "text-gray-400 hover:bg-gray-700"
                               : "text-gray-500 hover:bg-gray-100"
                           }
                           focus:outline-none focus:ring-2 focus:ring-blue-400`}
                title="Close details"
              >
                <XCircle className="h-7 w-7" />
              </button>
              <h2
                className={`text-3xl font-bold mb-6 flex items-center border-b pb-3
                             ${
                               darkMode
                                 ? "text-blue-300 border-blue-700"
                                 : "text-blue-800 border-blue-100"
                             }`}
              >
                <Package
                  className={`h-8 w-8 mr-3 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                Shipment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-base">
                <Detail
                  label="Tracking ID"
                  icon={<CheckCircle />}
                  value={selectedOrder.trackingId}
                  isMono
                  darkMode={darkMode}
                />
                <Detail
                  label="Status"
                  icon={<CheckCircle />}
                  value={selectedOrder.status}
                  extraClass={getStatusBadgeClass(selectedOrder.status)
                    .replace("bg-", "text-")
                    .replace("-100", "-800")}
                  darkMode={darkMode}
                />
                <Detail
                  label="Sender Name"
                  icon={<User />}
                  value={selectedOrder.senderName}
                  darkMode={darkMode}
                />
                <Detail
                  label="Receiver Name"
                  icon={<User />}
                  value={selectedOrder.receiverName}
                  darkMode={darkMode}
                />
                <Detail
                  label="Sender Address"
                  icon={<MapPin />}
                  value={selectedOrder.senderAddress}
                  darkMode={darkMode}
                />
                <Detail
                  label="Receiver Address"
                  icon={<MapPin />}
                  value={selectedOrder.receiverAddress}
                  darkMode={darkMode}
                />
                <Detail
                  label="Receiver Phone"
                  icon={<Phone />}
                  value={selectedOrder.receiverPhone}
                  darkMode={darkMode}
                />
                <Detail
                  label="Package Type"
                  icon={<Package />}
                  value={selectedOrder.packageType}
                  darkMode={darkMode}
                />
                <Detail
                  label="Weight"
                  icon={<Weight />}
                  value={`${selectedOrder.weight} kg`}
                  darkMode={darkMode}
                />
                <Detail
                  label="Payment Type"
                  icon={<BadgeDollarSign />}
                  value={selectedOrder.paymentType}
                  darkMode={darkMode}
                />
                <Detail
                  label="Delivery Cost"
                  icon={<BadgeDollarSign />}
                  value={`৳${selectedOrder.deliveryCost}`}
                  darkMode={darkMode}
                />
                <Detail
                  label="Created"
                  icon={<Clock />}
                  value={new Date(selectedOrder.dateCreated).toLocaleString()}
                  darkMode={darkMode}
                />
                {selectedOrder.currentLocation && (
                  <Detail
                    label="Current Location"
                    icon={<MapPin />}
                    value={selectedOrder.currentLocation}
                    darkMode={darkMode}
                  />
                )}
                {selectedOrder.estimatedDelivery && (
                  <Detail
                    label="Estimated Delivery"
                    icon={<Clock />}
                    value={selectedOrder.estimatedDelivery}
                    darkMode={darkMode}
                  />
                )}
                {selectedOrder.notes && (
                  <Detail
                    label="Notes"
                    icon={<Info />}
                    value={selectedOrder.notes}
                    darkMode={darkMode}
                  />
                )}
              </div>

              {selectedOrder.history?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-blue-200 dark:border-blue-700">
                  <h3
                    className={`text-xl font-bold mb-4 flex items-center ${
                      darkMode ? "text-blue-300" : "text-blue-800"
                    }`}
                  >
                    <ScrollText
                      className={`mr-2 h-6 w-6 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                    Tracking History
                  </h3>
                  <ol
                    className={`relative border-l-2 ${
                      darkMode ? "border-blue-700" : "border-blue-300"
                    } ml-4 pl-4`}
                  >
                    {selectedOrder.history.map((h, idx) => (
                      <li
                        key={idx}
                        className="mb-6 last:mb-0 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div
                          className={`absolute w-3 h-3 ${
                            darkMode ? "bg-blue-400" : "bg-blue-600"
                          } rounded-full mt-1.5 -left-1.5 border-2 ${
                            darkMode ? "border-gray-800" : "border-white"
                          } shadow-sm`}
                        ></div>
                        <time
                          className={`mb-1 text-sm font-normal leading-none ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {new Date(h.timestamp).toLocaleString()}
                        </time>
                        <h4
                          className={`text-lg font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          {h.status}
                        </h4>
                        <p
                          className={`text-base font-normal ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {h.location}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable detail component for modal
const Detail = ({
  label,
  value,
  icon,
  isMono = false,
  extraClass = "",
  darkMode,
}) => (
  <p className={`flex items-center ${extraClass}`}>
    <span
      className={`${
        darkMode ? "text-blue-400" : "text-blue-500"
      } mr-3 h-5 w-5 flex-shrink-0`}
    >
      {icon}
    </span>
    <strong className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
      {label}:
    </strong>
    <span
      className={`ml-2 ${darkMode ? "text-gray-100" : "text-gray-800"} ${
        isMono
          ? `${
              darkMode ? "font-mono text-blue-300" : "font-mono text-blue-700"
            }`
          : ""
      }`}
    >
      {value}
    </span>
  </p>
);

const StatCard = ({ label, value, color = "blue", darkMode }) => {
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const cardBorder = darkMode ? "border-gray-700" : "border-gray-200";
  const labelColor = darkMode ? "text-gray-400" : "text-gray-500";

  let valueColor;
  switch (color) {
    case "yellow":
      valueColor = darkMode ? "text-yellow-400" : "text-yellow-700";
      break;
    case "blue":
      valueColor = darkMode ? "text-blue-400" : "text-blue-700";
      break;
    case "green":
      valueColor = darkMode ? "text-green-400" : "text-green-700";
      break;
    default:
      valueColor = darkMode ? "text-blue-400" : "text-blue-700";
  }

  return (
    <div
      className={`${cardBg} ${cardBorder} border rounded-lg p-5 shadow-lg text-center transform hover:scale-105 transition-transform duration-300`}
    >
      <p className={`text-sm font-medium ${labelColor} mb-1`}>{label}</p>
      <p className={`text-3xl font-extrabold ${valueColor}`}>{value}</p>
    </div>
  );
};

const ChartCard = ({ title, children, darkMode }) => (
  <div
    className={`${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    } p-6 rounded-xl shadow-lg border flex flex-col items-center justify-center`}
  >
    <h3
      className={`text-xl font-bold mb-4 ${
        darkMode ? "text-blue-300" : "text-blue-800"
      }`}
    >
      {title}
    </h3>
    <div className="w-full h-64 flex items-center justify-center">
      {" "}
      {/* Fixed height for charts */}
      {children}
    </div>
  </div>
);
