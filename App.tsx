import { API_KEY } from "@env";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: { description: string }[];
}

export default function App() {
  const [city, setCity] = useState('Stockholm') // by default
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const res = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch(err) {
      console.error(err);
      setWeather(null);
      alert('Kunde inte hämta väder för den staden.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
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