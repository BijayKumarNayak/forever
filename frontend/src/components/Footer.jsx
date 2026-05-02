import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} alt="" className="w-32 mb-5 " />
          <p className="w-full text-gray-600 md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error alias
            autem aut eveniet pariatur architecto mollitia fuga qui nesciunt
            quam.
          </p>
        </div>
        <div>
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-123-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ foreever.com. All right reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
