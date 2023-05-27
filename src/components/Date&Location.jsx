import React from "react";

const Location = ({ data }) => {
  return (
    <>
      <div className="flex flex-col items-center w-fit mx-auto my-2">
        <h1 className="text-md lg:text-xl font-semibold text-center">
          {data?.format}
        </h1>
      </div>
      <h1 className="text-xl sm:text-3xl font-extrabold text-center mt-6 mb-4">
        {`${data?.name}, ${data?.country}`}
      </h1>
    </>
  );
};

export default Location;
