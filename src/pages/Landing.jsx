import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import TodoContainer from "../components/TodoContainer";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Landing() {
  const data = useLocation();
  console.log(data.state.user);

  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());

  // Fetch weather from API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=68eff79fde05151c6c8a3e17591e2e42&units=metric"
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  // Update live time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black p-16">
      <div className="bg-[#EFEFEF] p-10 border rounded-md">
        {/* Header */}
        <Header username={data.state.user} />

        {/* Cards */}
        <div className="flex justify-between gap-7 my-5 flex-wrap">
          <Card
            bgcolor={"#8272DA"}
            title={weather ? `${weather.main.temp}°C` : "Loading..."}
            subtitle={weather ? weather.name : "Fetching..."}
          />
          <Card
            bgcolor={"#FD6663"}
            title={time.toLocaleDateString()}
            subtitle={time.toLocaleTimeString()}
          />
          <Card bgcolor={"#FCA201"} title={"Built Using"} subtitle={"React"} />
        </div>

        {/* Todo Container */}
        <TodoContainer />
      </div>
    </div>
  );
}

export default Landing;
