import { configureStore } from "@reduxjs/toolkit";

import WeatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: WeatherReducer,
});
