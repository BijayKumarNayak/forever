import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRoute = express.Router();
// Admin Features
orderRoute.post("/list", adminAuth, allOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// Payment Features
orderRoute.post("/place", authUser, placeOrder);
orderRoute.post("/stripe", authUser, placeOrderStripe);
orderRoute.post("/razorpay", authUser, placeOrderRazorpay);

// User Features

orderRoute.post("/userOrders", authUser, userOrders);

// Verify payment
orderRoute.post("/verifyStripe", authUser, verifyStripe);
orderRoute.post("/verifyRazorpay", authUser, verifyRazorpay);
export default orderRoute;
