const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Restrict CORS to frontend origin
app.use("/uploads", express.static("uploads")); // Serve static files from uploads directory

const JWT_SECRET = "your_secret_key";

mongoose.connect(
  "mongodb+srv://vidhyavarshu2:DsoG5HzsyCQbBAYw@myfirstcluster.8lv43ld.mongodb.net/my_project_db?retryWrites=true&w=majority&appName=MyFirstCluster",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the process if the connection fails
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["Farmer", "Customer", "Middleware"], required: true },
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  image: String,
});
const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Pending" },
});
const Order = mongoose.model("Order", orderSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!["Farmer", "Customer", "Middleware"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();
  res.json({ message: "User registered successfully!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, role: user.role });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  const { name, quantity, price } = req.body;
  const newProduct = new Product({
    name,
    quantity,
    price,
    image: `uploads/${req.file.filename}`,
  });
  await newProduct.save();
  res.json({ message: "Product uploaded successfully!" });
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post("/order", async (req, res) => {
  const { productId, customerName, phoneNumber, address, quantity, totalPrice, paymentMethod } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newOrder = new Order({
      productId,
      customerName,
      phoneNumber,
      address,
      quantity,
      totalPrice,
      paymentMethod,
      status: "Pending",
    });
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