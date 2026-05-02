import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showsearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (size === "") {
      alert("Please select size");
      return;
    }
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
    setCartItems(cartData);
    // console.log("shopcontext", token);
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },

          { headers: { token } }
        );
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message || "Product Added");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCartData = async () => {
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/get",
          {},
          { headers: { token } }
        );
        if (response?.data?.success) {
          console.log(response.data);
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (token) {
      getUserCartData();
    }
  }, [token]);

  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            count += cartItems[item][size];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return count;
  };
  const getCartAmount = () => {
    let amount = 0;
    for (const items in cartItems) {
      const productInfo = products.find((product) => product._id === items);

      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            amount += cartItems[items][size] * productInfo.price;
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    return amount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    // let cartData = structuredClone(cartItems);
    // cartData[itemId][size] = quantity;
    console.log(itemId, size, quantity);
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");

      setProducts(response.data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
     finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    setToken,
    token,
    backendUrl,
    getUserCartData,
    loading,
    setLoading,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
