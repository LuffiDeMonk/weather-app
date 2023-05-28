import Search from "./Search";
import Location from "./Date&Location";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";
import { useState, useEffect } from "react";
import {
  fetchWeather,
  fetchWeatherByLocationInfo,
} from "./utils/useWeatherData";
import Loader from "./Loader";

const Home = () => {
  const [term, setTerm] = useState("");
  const [unit, setUnit] = useState("metric");
  const [isMount, setIsMount] = useState(true);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const formatCoordinates = (position) => {
    setLongitude(position?.coords.longitude);
    setLatitude(position?.coords.latitude);
  };

  navigator.geolocation.getCurrentPosition(formatCoordinates);

  const { data, isSuccess, forecastDataByTerm } = fetchWeather(term, unit);
  const {
    dataByLocation,
    forecastData,
    isLoading: locationSuccess,
  } = fetchWeatherByLocationInfo(latitude, longitude, unit);

  console.log("Search Loading", isSuccess);
  console.log("Location Loading", locationSuccess);

  useEffect(() => {
    if (term) {
      setIsMount(false);
    }
  }, [term]);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className="font-Poppins w-full sm:max-w-screen-md py-4 px-5 mx-auto bg-gradient-to-br from-teal-300 via-blue-400  to-blue-700 shadow-gray-600 shadow-lg rounded-lg text-white">
        {true && (
          <>
            <Search setTerm={setTerm} setUnit={setUnit} />
            <Location data={isMount ? dataByLocation : data} />
            <WeatherInfo data={isMount ? dataByLocation : data} />
            <Forecast
              Details="Hourly Forecast"
              forecast={
                isMount
                  ? forecastData?.formattedHourly
                  : forecastDataByTerm?.formattedHourly
              }
            />
            <Forecast
              Details="Daily Forecast"
              forecast={
                isMount
                  ? forecastData?.formattedDaily
                  : forecastDataByTerm?.formattedDaily
              }
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
