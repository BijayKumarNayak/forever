import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="pt-8 text-2xl text-center border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col gap-16 my-10 md:flex-row ">
        <img src={assets.about_img} alt="" className="w-full max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            iure.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            ducimus, quidem quia accusantium repudiandae dignissimos enim iure
            dolores! Natus, ullam!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            illum maxime odio numquam voluptates nemo!
          </p>
        </div>
      </div>
      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col mb-20 text-sm md:flex-row">
        <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 md:py-20">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            vero.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 md:py-20">
          <b>Convenience</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            vero.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 md:py-20">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            vero.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
