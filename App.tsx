import { API_KEY } from "@env";
import { useEffect, useState } from "react";

export default function App() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = "Stockholm";
        const response = await fetch (
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);
}