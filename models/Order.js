import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  address: String,
  payment: { type: String, default: "cash" },
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);