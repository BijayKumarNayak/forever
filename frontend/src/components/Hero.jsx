import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Hero Left */}
      <div className="flex items-center w-full py-10 justify-content-center sm:w-1/2 sm:py-0 ">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="text-sm font-medium md:text-base ">OUR BEST SELLER</p>
          </div>
          <h1 className="text-3xl leading-relaxed lg:text-5xl sm:py-3">
            Latest Arrival
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold sm:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right */}
      <img src={assets.hero_image_1} alt="" className="w-full sm:w-1/2 font-prata-regular" />
    </div>
  );
};

export default Hero;
