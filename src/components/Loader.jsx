import React from "react";
import Loading from "../assets/Loader.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <img src={Loading} alt="" className="bg-transparent w-10 h-10" />
    </div>
  );
};

export default Loader;
