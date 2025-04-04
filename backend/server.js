const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "drzfhzqwk",
  api_key: "157443889296636",
  api_secret: "8Wj4Ygyw0bdtWEr3gu72DIx13bM"
});


const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "your_secret_key";

mongoose.connect(
  "mongodb+srv://vidhyavarshu2:DsoG5HzsyCQbBAYw@myfirstcluster.8lv43ld.mongodb.net/my_project_db?retryWrites=true&w=majority&appName=MyFirstCluster",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Update userSchema to include a role field
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["Farmer", "Customer", "Middleware"], required: true } // Add role field
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  image: String,
  uploadedBy: String, // 👈 ADD this
  status: { type: String, default: "In warehouse" } // 👈 AND this
});
const Product = mongoose.model("Product", productSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Update /register endpoint to accept role
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body; // Accept role from the request body
  if (!["Farmer", "Customer", "Middleware"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role }); // Save role in the database
  await newUser.save();
  res.json({ message: "User registered successfully!" });
});

// Update /login endpoint to include role in the response
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" }); // Include role in the token
  res.json({ token, role: user.role }); // Send role to the frontend
});

app.post("/upload", upload.single("image"), async (req, res) => {
  const { name, quantity, price, uploadedBy } = req.body;
  const newProduct = new Product({ 
    name, 
    quantity, 
    price, 
    image: `/uploads/${req.file.filename}`,
    uploadedBy,
    status: "In warehouse"
  });
  await newProduct.save();
  res.json({ message: "Product uploaded successfully!" });
});

// Add the /products endpoint here
app.get("/products", async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.json(products); // Send the products to the frontend
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  const orderSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    image: String,
    uploadedBy: String, // 👈 ADD this
    status: { type: String, default: "In warehouse" } // 👈 AND this
  });
  const Order = mongoose.model("Order", orderSchema);

  app.post("/order", async (req, res) => {
    const { productId, customerName, quantity } = req.body;
    try {
      const newOrder = new Order({ productId, customerName, quantity });
      await newOrder.save();
      res.json({ message: "Order placed successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error placing order", error });
    }
  });

  app.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find().populate("productId");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  });
  

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));