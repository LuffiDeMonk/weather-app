import React from "react";
import Loading from "../assets/Loader.png";

const Loader = () => {
  return (
    <div className="w-full h-fit flex items-center justify-center bg-slate-500/60">
      <img src={Loading} alt="" className="bg-transparent w-10 h-10" />
    </div>
  );
};

export default Loader;
