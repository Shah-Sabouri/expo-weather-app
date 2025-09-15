import { API_KEY } from "@env";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';

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

  return (
    <View>
      <Text>Expo Weather App</Text>
      {weather ? (
        <>
        <Text>{weather.name}</Text>
        <Text>{weather.main.temp}</Text>
        <Text>{weather.weather[0].description}</Text>
        </>
      ) : (
        <Text>Loading weather...</Text>
      )}
    </View>
  );
}