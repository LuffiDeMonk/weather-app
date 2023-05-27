import { useQuery } from "react-query";
import { DateTime } from "luxon";

import { geography } from "../Api";

const formattedDate = (
  secs,
  zone,
  format = "cccc dd LLL yyyy'| Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const fetchWeather = async (term, unit) => {
  const response = await geography.get(`/weather?q=${term}&units=${unit}`);
  return response;
};

const fetchForecast = async (lat, lon, unit) => {
  const response = await geography.get(
    `/forecast?lat=${lat}&lon=${lon}&units=${unit}`
  );

  return response.data.list;
};

const fetchWeatherByLocation = async (lat, lon, unit) => {
  const response = await geography.get(
    `/weather?lat=${lat}&lon=${lon}&units=${unit}`
  );
  return response;
};

export const useWeatherData = (debounceTerm, unit) => {
  const { data: weatherData, isLoading: dataLoading } = useQuery(
    ["weather", debounceTerm, unit],
    () => fetchWeather(debounceTerm, unit),
    {
      enabled: !!debounceTerm,
      select: (data) => {
        let weather = {};
        weather.lat = data.data.coord.lat;
        weather.lon = data.data.coord.lon;
        weather.description = data.data.weather[0].main;
        weather.iconImage = data.data.weather[0].icon;
        weather.temp = data.data.main.temp.toFixed(0);
        weather.feelsLike = data.data.main.feels_like.toFixed(0);
        weather.temp_min = data.data.main.temp_min.toFixed(0);
        weather.temp_max = data.data.main.temp_max.toFixed(0);
        weather.humidity = data.data.main.humidity.toFixed(0);
        weather.windSpeed = data.data.wind.speed.toFixed(0);
        weather.country = data.data.sys.country;
        weather.name = data.data.name;
        weather.format = formattedDate(data.data.dt, data.data.timeZone);
        weather.sunrise = formattedDate(
          data.data.sys.sunrise,
          data.data.timeZone,
          "hh:mm a"
        );
        weather.sunset = formattedDate(
          data.data.sys.sunset,
          data.data.timeZone,
          "hh:mm a"
        );
        return weather;
      },
    }
  );

  let lat = weatherData?.lat;
  let lon = weatherData?.lon;

  const { data: prediction } = useQuery(
    ["forecast", lat, lon, unit],
    () => fetchForecast(lat, lon, unit),
    {
      enabled: !!lat && !!lon,
      select: (data) => {
        let hourly = data?.slice(0, 6);
        let i = [11, 18, 25, 32];
        let daily = i?.map((i) => {
          if (i >= 0 && i < data?.length) {
            return data[i];
          }
        });
        return { hourly, daily };
      },
    }
  );
  return {
    weatherData,
    prediction,
    dataLoading,
  };
};

export const useLocationData = (latitude, longitude, unit) => {
  const { data: locationData, isLoading: locationLoading } = useQuery(
    ["weather-location", latitude, longitude, unit],
    () => fetchWeatherByLocation(latitude, longitude, unit),
    {
      select: (data) => {
        let weather = {};
        weather.lat = data.data.coord.lat;
        weather.lon = data.data.coord.lon;
        weather.description = data.data.weather[0].main;
        weather.iconImage = data.data.weather[0].icon;
        weather.temp = data.data.main.temp.toFixed(0);
        weather.feelsLike = data.data.main.feels_like.toFixed(0);
        weather.temp_min = data.data.main.temp_min.toFixed(0);
        weather.temp_max = data.data.main.temp_max.toFixed(0);
        weather.humidity = data.data.main.humidity.toFixed(0);
        weather.windSpeed = data.data.wind.speed.toFixed(0);
        weather.country = data.data.sys.country;
        weather.name = data.data.name;
        weather.format = formattedDate(data.data.dt, data.data.timeZone);
        weather.sunrise = formattedDate(
          data.data.sys.sunrise,
          data.data.timeZone,
          "hh:mm a"
        );
        weather.sunset = formattedDate(
          data.data.sys.sunset,
          data.data.timeZone,
          "hh:mm a"
        );
        return weather;
      },
    }
  );
  return { locationData, locationLoading };
};
