import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../redux/store";

const Weather = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchWeather("New Delhi")); // Set default city as New Delhi
  }, [dispatch]);

  console.log("Weather Data:", weather);
  console.log("Weather Error:", error);

  if (error) return <div className="p-4 bg-red-200">Error: {error}</div>;
  if (!weather) return <div className="p-4">Loading weather...</div>;

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h3 className="text-lg font-bold">Weather in {weather.location?.name || "New Delhi"}</h3>
      <p>Temperature: {weather.current?.temp_c ?? "N/A"}°C</p>
      <p>Condition: {weather.current?.condition?.text || "N/A"}</p>
    </div>
  );
};

export default Weather;
