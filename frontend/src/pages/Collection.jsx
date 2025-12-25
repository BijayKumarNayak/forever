import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const { search, showSearch, products } = useContext(ShopContext);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };
  console.log(subCategory);
  const applyFilter = () => {
    let productCopy = products.slice();
    // console.log(productCopy)
    if (showSearch) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy);
   
  };
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));

        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10 ">
      {/* filter options */}

      <div className="min-w-60">
        <p
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        {/*Category Filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* Sub category Filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="px-2 text-sm border border-gray-300 "
          >
            <option value="revlavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              image={item.image}
              price={item.price}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
