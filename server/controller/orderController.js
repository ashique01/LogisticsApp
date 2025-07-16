const Order = require("../models/Order");
const User = require("../models/User"); // import User model
const calculateCost = require("../utils/calculateCost");

const generateTrackingId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BDX${date}-${random}`;
};

exports.createOrder = async (req, res) => {
  const {
    receiverName,
    receiverAddress,
    receiverPhone,  
    packageType,
    weight,
    paymentType,
  } = req.body;

  if (!receiverName || !receiverAddress || !receiverPhone || !packageType || !weight || !paymentType) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const numericWeight = Number(weight);
  if (isNaN(numericWeight) || numericWeight <= 0) {
    return res.status(400).json({ message: "Invalid weight value." });
  }

  try {
    const sender = await User.findById(req.user.id);
    if (!sender)
      return res.status(401).json({ message: "Unauthorized: sender user not found" });

    let trackingId;
    let isUnique = false;
    while (!isUnique) {
      trackingId = generateTrackingId();
      const existing = await Order.findOne({ trackingId });
      if (!existing) isUnique = true;
    }

    const deliveryCost = calculateCost(numericWeight, packageType);

    const order = await Order.create({
      trackingId,
      sender: sender._id,
      receiverName,
      receiverAddress,
      receiverPhone,   
      packageType,
      weight: numericWeight,
      deliveryCost,
      paymentType,
      status: "Pending",
      history: [
        {
          status: "Pending",
          location: sender.address || "Sender Address Unknown",
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error creating order." });
  }
};

exports.getOrderByTrackingId = async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error fetching order." });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ dateCreated: -1 })
      .populate("sender", "name email phone address")
      .lean();  // Make it plain JS object for easy mapping

    const mappedOrders = orders.map(order => ({
      ...order,
      senderName: order.sender?.name || "Unknown",
      senderAddress: order.sender?.address || "Unknown",
    }));

    res.json(mappedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error fetching orders." });
  }
};
exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: "Pending" });
    const inTransit = await Order.countDocuments({ status: "In Transit" });
    const delivered = await Order.countDocuments({ status: "Delivered" });
    res.json({
      totalOrders,
      pending,
      inTransit,
      delivered,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error fetching stats." });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status, location } = req.body;

  const validStatuses = [
    "Pending",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid or missing status." });
  }

  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    order.history.push({
      status,
      location: location || "System",
      timestamp: new Date(),
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Server error updating order status." });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json({ message: "Order deleted successfully." });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Server error deleting order." });
  }
};

// Get all orders for the currently authenticated user
exports.getOrdersForUser = async (req, res) => {
  try {
    const userId = req.user.id;  // Comes from auth middleware
    const orders = await Order.find({ sender: userId }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user's orders:", err);
    res.status(500).json({ message: "Server error fetching user's orders." });
  }
};
