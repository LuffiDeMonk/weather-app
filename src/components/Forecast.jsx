import React from "react";

const Forecast = ({ Details }) => {
  return (
    <div>
      <p className="mt-2 text-xl font-bold">{Details}</p>
      <hr />
      <div className="pt-4 grid grid-cols-3 sm:grid-cols-5 gap-4 items-center justify-around">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-light">5:00 AM</p>
          <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-light">28&#176;</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-light">5:00 AM</p>
          <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-light">28&#176;</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-light">5:00 AM</p>
          <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-light">28&#176;</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-light text-center">5:00 AM</p>
          <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-light">28&#176;</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-light">5:00 AM</p>
          <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
          <p className="text-sm font-light">28&#176;</p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
