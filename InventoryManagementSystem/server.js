const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Inventory Management System API is Running");
});

// Product routes
app.use("/api/products", productRoutes);

// Error handling middleware (keep this after routes)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
