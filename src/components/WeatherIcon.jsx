import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  WiCloud,
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiRain,
  WiLightning,
  WiSnow,
  WiFog,
} from "react-icons/wi";

const wetherIcons = {
  "01": <WiDaySunny size={48} />,
  "02": <WiDayCloudy size={48} />,
  "03": <WiCloud size={48} />,
  "04": <WiCloudy size={48} />,
  "09": <WiRain size={48} />,
  10: <WiRain size={48} />,
  11: <WiLightning size={48} />,
  13: <WiSnow size={48} />,
  50: <WiFog size={48} />,
};

const WeatherIcon = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );

      console.log(response);

      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (!latitude) return;

    getWeather();
  }, [latitude]);

  useEffect(() => {
    if (!weatherData) return;

    console.log(weatherData.weather[0].icon.substring(0, 2));
  }, [weatherData]);

  if (!weatherData)
    return (
      <div className="w-[128px] h-12 font-semibold flex items-center">
        Loading...
      </div>
    );

  return (
    <div className="text-xs flex items-center">
      {wetherIcons[weatherData.weather[0].icon.substring(0, 2)]}
      {/* {weatherData.weather[0].icon.substring(0, 2) === "01" && (
        <WiDaySunny size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "02" && (
        <WiDayCloudy size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "03" && (
        <WiCloud size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "04" && (
        <WiCloudy size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "09" && (
        <WiRain size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "10" && (
        <WiRain size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "11" && (
        <WiLightning size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "13" && (
        <WiSnow size={48} />
      )}
      {weatherData.weather[0].icon.substring(0, 2) === "50" && (
        <WiFog size={48} />
      )} */}
      <div className="w-20">
        <div className="font-bold">{weatherData?.name}</div>
        <div className="font-semibold">
          {weatherData?.main.temp.toFixed(1)}℃
        </div>
      </div>
    </div>
  );
};

export default WeatherIcon;
