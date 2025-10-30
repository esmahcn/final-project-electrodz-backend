import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // يمكنك لاحقًا ربطه بالمستخدم الحقيقي
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String,
    },
  ],
  total: { type: Number, default: 0 },
});

export default mongoose.model("Cart", cartSchema);
