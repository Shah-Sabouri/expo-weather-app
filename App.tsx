import { API_KEY } from "@env";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 200,
    marginRight: 10,
    borderRadius: 5,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  city: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 20, marginTop: 5 },
  desc: { fontSize: 16, fontStyle: 'italic', marginTop: 5 },
})