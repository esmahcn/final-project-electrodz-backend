import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// ✅ Get cart by userId
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// ✅ Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [product], total: product.price });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === product.productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push(product);
      }
      cart.total = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

// ✅ Remove item
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
});

export default router;
