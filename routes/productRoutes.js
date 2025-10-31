import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


// Routes
router.post("/", upload.single("image"), createProduct); // Create product with image
router.put("/:id", upload.single("image"), updateProduct); // Update product and optionally replace image
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
export default router;
