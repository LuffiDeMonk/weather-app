import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: [],
  forecast: [],
};

const WeatherSlice = createSlice({
  name: "Weather",
  initialState,
  reducers: {
    addWeatherData: (state, { payload }) => {
      return { ...state, weather: payload };
    },
    addForecastData: (state, { payload }) => {
      state.forecast = payload;
    },
  },
});

export const { addWeatherData, addForecastData } = WeatherSlice.actions;
export default WeatherSlice;
