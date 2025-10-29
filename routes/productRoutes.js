import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ Add new product
router.post("/", async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    const newProduct = new Product({ name, price, category, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

// ✅ Update product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, image },
      { new: true }
    );
    res.json({ message: "Product updated!", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// ✅ Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;
