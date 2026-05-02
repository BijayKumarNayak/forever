import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// test app config
const app = express();

const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares

app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
