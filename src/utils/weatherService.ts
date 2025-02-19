/*
List of API URLS

Current weather in location
`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.NEXT_PUBLIC_API_KEY}`

5 days forecast data
`https://api.openweathermap.org/data/2.5/forecast?q=London&cnt=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`


*/

export async function getWeatherData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=London&cnt=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
