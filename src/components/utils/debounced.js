import { useEffect, useState } from "react";

export const usedebounced = (value, delay) => {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounce;
};

export const formatPrediction = (data) => {
  let temp = [];
  data?.map((item) => {
    temp.temperature = item?.main.temp;
    temp.imageIcon = `https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`;
  });
  return temp;
};
