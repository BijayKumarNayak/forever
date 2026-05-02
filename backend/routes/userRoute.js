import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", authUser, getProfile);
userRouter.put("/update", authUser, updateUserProfile);
export default userRouter;
