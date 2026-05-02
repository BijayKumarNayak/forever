import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="pt-10 text-2xl text-center border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="flex flex-col justify-center gap-10 my-10 mb-20 md:flex-row">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contactus_1}
          alt=""
        />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            756181 Bhadrak Station <br />
            Bhadrak, Odisha, India
          </p>
          <p className="text-gray-500">
            Tel: 123456789 <br /> Email: abc@gmail.com
          </p>
          <p className="text-xl font-semibold text-gray-600">
            Careers at Forever{" "}
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings
          </p>
          <button className="px-8 py-4 text-sm transition-all duration-500 border border-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
