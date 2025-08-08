import React from "react";

const NewsLetterBox = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };
  return (
    <div className="text-center">
      <p className="text-2xl text-gray-800">Subscribe now & get 20% off</p>
      <p className="mt-3 text-gray-400 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
        ullam?
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full gap-3 pl-3 m-auto my-6 border sm:w-1/2 "
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full outline-none sm:flex-1"
          required
        />
        <button type="submit" className="px-10 py-4 text-xs text-white bg-black ">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
