import Axios from "axios";
export const API_KEY = "3873ba009d57474a556073cdd2017c60";

export const geography = Axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: API_KEY,
  },
});
