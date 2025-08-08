// add products to user cart

import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    // console.log(cartData);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added" });
  } catch (error) {
    res.json({
      success: false,
      message: error.messge,
    });
  }
};
//Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    // console.log("cart controller", userId, itemId, size, quantity);
    const userData = await User.findById(userId);

    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated", cartData });
  } catch (error) {
    res.json({
      success: false,
      message: error.messge,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await User.findById(userId);

    const cartData = userData.cartData;

    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.messge,
    });
  }
};

export { addToCart, updateCart, getUserCart };
