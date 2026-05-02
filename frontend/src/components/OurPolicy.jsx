import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";
const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-xs text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base ">
      <div>
        <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="fw-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassel free exchange policy</p>
      </div>

      <div>
        <img src={assets.profile_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="fw-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 day free return policy</p>
      </div>

      <div>
        <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
        <p className="fw-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
