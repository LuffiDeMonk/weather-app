import { useQuery } from "react-query";
import { DateTime } from "luxon";

import { geography } from "../Api";

const formattedDate = (
  secs,
  zone,
  format = "cccc dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const fetchWeatherByTerm = async (term, unit) => {
  const { data } = await geography.get(`/weather?q=${term}&units=${unit}`);
  return data;
};

const fetchForecast = async (lat, lon, unit) => {
  const response = await geography.get(
    `/forecast?lat=${lat}&lon=${lon}&units=${unit}`
  );

  return response.data.list;
};

const fetchWeatherByLocation = async (lat, lon, unit) => {
  const { data } = await geography.get(
    `/weather?lat=${lat}&lon=${lon}&units=${unit}`
  );
  return data;
};

export const fetchWeather = (term, unit) => {
  const { data, isSuccess } = useQuery(
    ["search-weather", term, unit],
    () => fetchWeatherByTerm(term, unit),
    {
      enabled: !!term,
      refetchOnWindowFocus: false,
      select: (data) => {
        let weatherData = {};
        weatherData.lat = data?.coord.lat;
        weatherData.lon = data?.coord.lon;
        weatherData.datetime = formattedDate(data?.dt, data?.timeZone);
        weatherData.feels_like = data?.main.feels_like.toFixed();
        weatherData.humidity = data?.main.humidity.toFixed();
        weatherData.temperature = data?.main.temp.toFixed();
        weatherData.max_temp = data?.main.temp_max.toFixed();
        weatherData.min_temp = data?.main.temp_min.toFixed();
        weatherData.country = data?.sys.country;
        weatherData.sunriseTime = formattedDate(
          data?.sys.sunrise,
          data?.timeZone,
          "hh:mm a"
        );
        weatherData.sunsetTime = formattedDate(
          data?.sys.sunset,
          data?.timeZone,
          "hh:mm a"
        );
        weatherData.weather = data?.weather[0].main;
        weatherData.weatherId = data?.weather[0].id;
        weatherData.imageURL = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;
        weatherData.name = data?.name;
        weatherData.windSpeed = data?.wind.speed.toFixed();
        return weatherData;
      },
    }
  );
  let lat = data?.lat;
  let lon = data?.lon;
  const { data: forecastDataByTerm } = useQuery(
    ["forecast", lat, lon, unit],
    () => fetchForecast(lat, lon, unit),
    {
      enabled: !!lat && !!lon,
      select: (data) => {
        let hourly = data?.slice(1, 6);

        const formattedHourly = hourly?.map((item) => ({
          temperature: item?.main.temp.toFixed(),
          imageIcon: `https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`,
          time: formattedDate(item.dt, data?.timeZone, "hh:mm a"),
        }));
        let daily = [data[11], data[18], data[27], data[34]];
        const formattedDaily = daily?.map((item) => ({
          temperature: item?.main.temp.toFixed(),
          imageIcon: `https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`,
          time: formattedDate(item.dt, data?.timeZone, "ccc"),
        }));

        return { formattedHourly, formattedDaily };
      },
    }
  );
  return { data, isSuccess, forecastDataByTerm };
};

export const fetchWeatherByLocationInfo = (latitude, longitude, unit) => {
  const { data: dataByLocation, isLoading: locationWeatherLoading } = useQuery(
    ["location-weather", latitude, longitude, unit],
    () => fetchWeatherByLocation(latitude, longitude, unit),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        let weatherData = {};
        weatherData.lat = data?.coord.lat;
        weatherData.lon = data?.coord.lon;
        weatherData.datetime = formattedDate(data?.dt, data?.timeZone);
        weatherData.feels_like = data?.main.feels_like.toFixed();
        weatherData.humidity = data?.main.humidity.toFixed();
        weatherData.temperature = data?.main.temp.toFixed();
        weatherData.timeZone = data?.timeZone;
        weatherData.max_temp = data?.main.temp_max.toFixed();
        weatherData.min_temp = data?.main.temp_min.toFixed();
        weatherData.country = data?.sys.country;
        weatherData.sunriseTime = formattedDate(
          data?.sys.sunrise,
          data?.timeZone,
          "hh:mm a"
        );
        weatherData.sunsetTime = formattedDate(
          data?.sys.sunset,
          data?.timeZone,
          "hh:mm a"
        );
        weatherData.weather = data?.weather[0].main;
        weatherData.weatherId = data?.weather[0].id;
        weatherData.imageURL = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;
        weatherData.name = data?.name;
        weatherData.windSpeed = data?.wind.speed.toFixed();
        return weatherData;
      },
    }
  );
  let lat = dataByLocation?.lat;
  let lon = dataByLocation?.lon;
  const { data: forecastData, isSuccess: locationLoading } = useQuery(
    ["forecast", lat, lon, unit],
    () => fetchForecast(lat, lon, unit),
    {
      enabled: !!lat && !!lon,
      select: (data) => {
        let hourly = data?.slice(1, 6);

        const formattedHourly = hourly?.map((item) => ({
          temperature: item?.main.temp.toFixed(),
          imageIcon: `https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`,
          time: formattedDate(item.dt, dataByLocation?.timeZone, "hh:mm a"),
        }));
        let daily = [data[11], data[18], data[27], data[34]];
        const formattedDaily = daily?.map((item) => ({
          temperature: item?.main.temp.toFixed(),
          imageIcon: `https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`,
          time: formattedDate(item.dt, dataByLocation?.timeZone, "ccc"),
        }));

        return { formattedHourly, formattedDaily };
      },
    }
  );
  return {
    dataByLocation,
    locationLoading,
    forecastData,
  };
};
