import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
const Add = ({ token }) => {
  const { id } = useParams();
  // console.log("ID COMMING FROM LIST",id)
  // console.log("BACKEND URL",backendUrl)
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isEdit) {
        // ✅ UPDATE → JSON PAYLOAD
        const payload = {
          name,
          description,
          category,
          subCategory,
          price,
          bestseller,
          sizes,
        };
        response = await axios.patch(
          `${backendUrl}/api/product/update/${id}`,
          payload,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        // ✅ ADD → FormData
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("price", price);
        formData.append("bestseller", bestseller ? "true" : "false");
        formData.append("sizes", JSON.stringify(sizes));
        image1 && formData.append("image1", image1);
        image2 && formData.append("image2", image2);
        image3 && formData.append("image3", image3);
        image4 && formData.append("image4", image4);
        response = await axios.post(`${backendUrl}/api/product/add`, formData, {
          headers: { token },
        });
      }
      if (response.data.success) {
        toast.success(
          isEdit
            ? "Product updated successfully"
            : "Product added successfully",
        );
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (!isEdit) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/${id}`, {
          headers: { token },
        });

        const product = res.data.product;

        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setPrice(product.price);
        setBestseller(product.bestseller);
        setSizes(product.sizes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      {isEdit ? null : (
        <div>
          <p className="mb-2">Upload Image</p>

          <div className="flex gap-2 ">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={
                  image1
                    ? typeof image1 === "string"
                      ? backendUrl + image1
                      : URL.createObjectURL(image1)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={
                  image2
                    ? typeof image2 === "string"
                      ? backendUrl + image2
                      : URL.createObjectURL(image2)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>{" "}
            <label htmlFor="image3">
              <img
                className="w-20"
                src={
                  image3
                    ? typeof image3 === "string"
                      ? backendUrl + image3
                      : URL.createObjectURL(image3)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>{" "}
            <label htmlFor="image4">
              <img
                className="w-20"
                src={
                  image4
                    ? typeof image4 === "string"
                      ? backendUrl + image4
                      : URL.createObjectURL(image4)
                    : assets.upload_area
                }
                alt=""
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
      )}

      <div className="w-full">
        <p className="mb-2 ">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="w-full">
        <p className="mb-2 ">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
        />
      </div>
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2 ">Product category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">KIds</option>
          </select>
        </div>
        <div>
          <p className="mb-2 ">Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((size) => size !== "S")
                  : [...prev, "S"],
              )
            }
            value={sizes}
            className="cursor-pointer"
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((size) => size !== "M")
                  : [...prev, "M"],
              )
            }
            value={sizes}
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((size) => size !== "L")
                  : [...prev, "L"],
              )
            }
            value={sizes}
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((size) => size !== "XL")
                  : [...prev, "XL"],
              )
            }
            value={sizes}
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((size) => size !== "XXL")
                  : [...prev, "XXL"],
              )
            }
            value={sizes}
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 ">
        <input
          type="checkbox"
          id="bestseller"
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-2 rounded-md text-white flex items-center justify-center gap-2
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Adding...
          </>
        ) : isEdit ? (
          "Update Product"
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default Add;
