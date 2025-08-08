import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisivle] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const logout = () => {
    setToken("");
    navigate("/login");
    localStorage.removeItem("token");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 ">
      <img src={assets.logo} alt="" className="w-36" />
      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className={"flex flex-col items-center gap-1 "}>
          <p>HOME</p>
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className={"flex flex-col items-center gap-1 "}>
          <p>ABOUT</p>
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className={"flex flex-col items-center gap-1 "}
        >
          <p>COLLECTION</p>
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className={"flex flex-col items-center gap-1 "}>
          <p>CONTACT</p>
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
              <div className="flex flex-col w-full gap-2 px-4 py-3 text-gray-400 rounded bg-slate-100">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black" onClick={()=>navigate("/orders")}>Orders</p>
                <p className="cursor-pointer hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] text-center w-4 bg-black text-white leading-4 aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisivle(true)}
        />
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white cursor-pointer ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 "
            onClick={() => setVisivle(false)}
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisivle(false)}
            to="/"
            className="py-2 pl-3 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisivle(false)}
            to="/about"
            className="py-2 pl-3 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisivle(false)}
            to="/collection"
            className="py-2 pl-3 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisivle(false)}
            to="/contact"
            className="py-2 pl-3 border"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
