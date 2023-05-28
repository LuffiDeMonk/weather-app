import React from "react";

const Forecast = ({ Details, forecast }) => {
  return (
    <div>
      <p className="mt-2 text-xl font-bold">{Details}</p>
      <hr />
      <div className="pt-4 grid grid-cols-3 sm:grid-cols-5 gap-4 items-center justify-around">
        {forecast?.map((item) => {
          return (
            <>
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-sm font-light">{item.time}</p>
                <div className="w-12 h-12">
                  <img
                    src={item.imageIcon}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-light">{item.temperature}&#176;</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
