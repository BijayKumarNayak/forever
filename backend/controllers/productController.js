// Function for adding a product
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      sizes,
      subCategory,
      bestseller,
    } = req.body;
    const parsedBestseller = bestseller === "true" || bestseller === true;
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );
    if (images.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }
    // Upload the images in cloudinary and getiing the secure_url
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (err) {
          console.error("Image upload failed for:", item.path);
          throw err; // or return a fallback value
        }
      })
    );
    console.log("imageUrl", imageUrl);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: parsedBestseller,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };
    console.log("productData", productData);
    // Save the product data in database
    const product = new productModel(productData);
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
// Function for remove a product
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    // Find the product by ID and remove it
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Function for list  product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };
