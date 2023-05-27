import React, { useEffect, useState } from "react";
import Search from "./Search";
import Location from "./Date&Location";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";
import { useLocationData, useWeatherData } from "./utils/useWeatherData";
import Loader from "./Loader";

const Home = () => {
  const [term, setTerm] = useState("");
  const [unit, setUnit] = useState("metric");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const formatCoordinates = (position) => {
    setLongitude(position?.coords.longitude);
    setLatitude(position?.coords.latitude);
  };

  navigator.geolocation.getCurrentPosition(formatCoordinates);
  useEffect(() => {
    formatCoordinates();
  }, []);

  const { weatherData, dataLoading } = useWeatherData(term, unit);
  const { locationData, locationLoading } = useLocationData(
    latitude,
    longitude,
    unit
  );

  console.log(dataLoading);
  return (
    <div>
      <div className="font-Poppins w-full sm:max-w-screen-md py-4 px-5 mx-auto bg-gradient-to-br from-teal-300 via-blue-400  to-blue-700 shadow-gray-600 shadow-lg rounded-lg text-white">
        {locationData ? (
          <>
            <Search setTerm={setTerm} setUnit={setUnit} />
            <Location data={weatherData ? weatherData : locationData} />
            <WeatherInfo data={weatherData ? weatherData : locationData} />
            <Forecast Details="Hourly Forecast" />
            <Forecast Details="Daily Forecast" />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;
