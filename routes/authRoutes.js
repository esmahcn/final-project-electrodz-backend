import express from "express";

const router = express.Router();

// ✅ POST /api/login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Example simple check
  if (email === "admin@gmail.com" && password === "123456") {
    // ✅ include role
    return res.json({ 
      success: true, 
      message: "Login successful!",
      email, 
      role: "admin" // add role so frontend can redirect
    });
  } else if (email === "user@gmail.com" && password === "123456") {
    return res.json({
      success: true,
      message: "Login successful!",
      email,
      role: "user"
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid credentials" 
    });
  }
});

export default router;
