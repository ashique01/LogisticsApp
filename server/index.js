const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({ origin: "https://logisticsapp2025.netlify.app" })); 
app.use(express.json()); 

// Routes
app.use("/api/orders", orderRoutes);
app.use('/api/auth', authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚚 Logistics API is running.");
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start server only after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
