const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },

  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  receiverName: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  receiverPhone: { type: String, required: true },

  packageType: { type: String, required: true },
  weight: { type: Number, required: true },

  deliveryCost: { type: Number, required: true },

  paymentType: { type: String, enum: ["COD", "Prepaid"], required: true },

  status: { 
    type: String, 
    enum: ["Pending", "In Transit", "Out for Delivery", "Delivered"], 
    default: "Pending" 
  },

  history: [
    {
      status: String,
      location: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],

  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
