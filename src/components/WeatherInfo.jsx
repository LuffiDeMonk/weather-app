import { FaThermometerThreeQuarters } from "react-icons/fa";
import { BiWind, BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { IoMdWater } from "react-icons/io";
import { BsSunrise, BsSunset } from "react-icons/bs";

const WeatherInfo = ({ data }) => {
  return (
    <div>
      <div className="text-center text-2xl text-stone-200 my-3">
        {`${data?.weather}`}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full mb-2">
        <div className="flex-1 flex items-center justify-center h-full">
          <img
            src={`${data?.imageURL}`}
            alt=""
            className="h-20 w-20 object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="h-full flex items-center justify-center">
            <p className="text-5xl font-light">
              {`${data?.temperature}`}&#176;
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full flex justify-center items-center text-md">
            <ul className="h-full flex flex-col justify-center items-center sm:items-start">
              <li className="inline-flex items-center space-x-1">
                <FaThermometerThreeQuarters size={15} />
                <p className="text-md">
                  Feels like: <span>{`${data?.feels_like}`}&#176;</span>
                </p>
              </li>
              <li className="inline-flex items-center space-x-1">
                <BiWind size={15} />
                <p className="text-md">
                  Wind: <span>{`${data?.windSpeed}`} m/s</span>
                </p>
              </li>
              <li className="flex items-center space-x-1">
                <IoMdWater size={14} />
                <p className="text-md">
                  Humidity: <span>{`${data?.humidity}`}%</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center place-items-center">
        <div className="flex items-center justify-center">
          <BsSunrise size={20} />
          <p className="text-md font-semibold">
            Sunrise: <span>{`${data?.sunriseTime}`}</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <BsSunset size={20} />
          <p className="text-md font-semibold">
            Sunset: <span>{`${data?.sunsetTime}`}</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <BiUpArrowAlt size={20} />
          <p className="text-md font-semibold">
            Maximum: <span>{`${data?.max_temp}`}&#176;</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 ">
          <BiDownArrowAlt size={20} />
          <p className="text-md font-semibold">
            Minimum: <span>{`${data?.min_temp}`}&#176;</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
