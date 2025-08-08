// Route for user login

import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_SECRET);
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if user exists
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    // create token
    const token = createToken(existingUser._id);
    res.json({
      success: true,
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if user already exists
    const existUser = await User.findOne({
      email,
    });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    // validation email and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
        success: false,
      });
    }
    //Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    const user = await newUser.save();
    // create token
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check Admin or not
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    // create token
    const token = jwt.sign({ email }, process.env.jwt_SECRET);
    res.json({
      success: true,
      token,
      user: {
        email,
        name: "Admin",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export { loginUser, registerUser, adminLogin };
