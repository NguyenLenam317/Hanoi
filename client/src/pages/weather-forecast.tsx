import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchAirQualityData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { getWeatherIcon, getAqiCategory, formatDate } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function WeatherForecastPage() {
  const { data: weatherData, isLoading: isLoadingWeather, error: weatherError } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  const { data: airQualityData, isLoading: isLoadingAir, error: airError } = useQuery({
    queryKey: ['/api/air-quality'],
    queryFn: fetchAirQualityData,
  });

  const isLoading = isLoadingWeather || isLoadingAir;
  const error = weatherError || airError;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto py-6 px-4 space-y-6 flex-grow">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Hanoi Weather Forecast
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Detailed current conditions and forecast for Hanoi, Vietnam.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error</h3>
            <p className="text-red-700 dark:text-red-300 mt-1">Failed to load weather data. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <span className="material-icons text-primary-500 mr-2">thermostat</span>
                      Current Weather
                    </CardTitle>
                    <CardDescription>Hanoi, Vietnam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="text-7xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {Math.round(weatherData?.current.temperature_2m || 0)}°C
                      </div>
                      <div className="flex items-center mb-4">
                        <span className="material-icons text-4xl text-primary-500 mr-2">
                          {getWeatherIcon(weatherData?.current.weather_code || 0)}
                        </span>
                        <span className="text-xl font-medium text-gray-600 dark:text-gray-400">
                          {getWeatherDescription(weatherData?.current.weather_code || 0)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Feels like {Math.round(weatherData?.current.apparent_temperature || 0)}°C
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center">
                          <span className="material-icons text-blue-500 text-lg mr-2">water_drop</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Humidity</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {weatherData?.current.relative_humidity_2m}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-amber-500 text-lg mr-2">air</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Wind</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {Math.round(weatherData?.current.wind_speed_10m || 0)} km/h
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-purple-500 text-lg mr-2">opacity</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Rain Chance</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {weatherData?.current.precipitation_probability || 0}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-yellow-500 text-lg mr-2">wb_sunny</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">UV Index</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {weatherData?.daily.uv_index_max[0] || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 w-full text-xs text-gray-500 dark:text-gray-400 text-center">
                        Last updated: {new Date(weatherData?.current.time || "").toLocaleTimeString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <span className="material-icons text-red-500 mr-2">air</span>
                      Air Quality
                    </CardTitle>
                    <CardDescription>Hanoi, Vietnam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      {renderAirQualityMeter(airQualityData?.current.european_aqi || 0)}
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center">
                          <span className="material-icons text-gray-500 text-lg mr-2">grain</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">PM2.5</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {Math.round(airQualityData?.current.pm2_5 || 0)} µg/m³
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-gray-500 text-lg mr-2">grain</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">PM10</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {Math.round(airQualityData?.current.pm10 || 0)} µg/m³
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-blue-500 text-lg mr-2">air</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Ozone</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {Math.round(airQualityData?.current.ozone || 0)} µg/m³
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="material-icons text-amber-500 text-lg mr-2">air</span>
                          <div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">NO₂</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {Math.round(airQualityData?.current.nitrogen_dioxide || 0)} µg/m³
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 w-full">
                        <div className="font-medium mb-1">Health Advice:</div>
                        <p>{getAirQualityAdvice(airQualityData?.current.european_aqi || 0)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <span className="material-icons text-primary-500 mr-2">calendar_today</span>
                      7-Day Forecast
                    </CardTitle>
                    <CardDescription>Hanoi, Vietnam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weatherData?.daily.time.map((date, index) => (
                        <div key={date} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {index === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="w-10 flex justify-center">
                            <span className="material-icons text-primary-500">
                              {getWeatherIcon(weatherData.daily.weather_code[index])}
                            </span>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {weatherData.daily.precipitation_probability_max[index]}% rain
                            </div>
                          </div>
                          <div className="w-20 text-right">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {Math.round(weatherData.daily.temperature_2m_max[index])}/
                              {Math.round(weatherData.daily.temperature_2m_min[index])}°C
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Hourly Forecast</h2>
              <Tabs defaultValue="temperature" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="temperature" className="flex items-center">
                    <span className="material-icons mr-2">thermostat</span>
                    Temperature
                  </TabsTrigger>
                  <TabsTrigger value="precipitation" className="flex items-center">
                    <span className="material-icons mr-2">water_drop</span>
                    Precipitation
                  </TabsTrigger>
                  <TabsTrigger value="wind" className="flex items-center">
                    <span className="material-icons mr-2">air</span>
                    Wind
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="temperature" className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <div className="flex gap-3 min-w-max">
                          {renderHourlyForecast(weatherData, 'temperature')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="precipitation" className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <div className="flex gap-3 min-w-max">
                          {renderHourlyForecast(weatherData, 'precipitation')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="wind" className="pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <div className="flex gap-3 min-w-max">
                          {renderHourlyForecast(weatherData, 'wind')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

function renderAirQualityMeter(aqi: number) {
  const { category, color } = getAqiCategory(aqi);
  
  let meterColor;
  switch (color) {
    case 'green': meterColor = 'text-green-500'; break;
    case 'yellow': meterColor = 'text-yellow-500'; break;
    case 'orange': meterColor = 'text-orange-500'; break;
    case 'red': meterColor = 'text-red-500'; break;
    case 'purple': meterColor = 'text-purple-500'; break;
    default: meterColor = 'text-gray-500';
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className={`text-6xl font-bold ${meterColor} mb-2`}>
        {aqi}
      </div>
      <div className={`text-xl font-medium ${meterColor} mb-4`}>
        {category}
      </div>
      
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
        <div 
          className={`h-3 rounded-full ${
            aqi <= 20 ? 'bg-green-500' : 
            aqi <= 40 ? 'bg-[linear-gradient(90deg,#22c55e,#eab308)]' : 
            aqi <= 60 ? 'bg-yellow-500' : 
            aqi <= 80 ? 'bg-[linear-gradient(90deg,#eab308,#f97316)]' : 
            aqi <= 100 ? 'bg-orange-500' : 
            aqi <= 150 ? 'bg-[linear-gradient(90deg,#f97316,#ef4444)]' : 
            aqi <= 200 ? 'bg-red-500' : 
            aqi <= 300 ? 'bg-[linear-gradient(90deg,#ef4444,#a855f7)]' : 'bg-purple-500'
          }`} 
          style={{ width: `${Math.min(100, aqi / 3)}%` }}
        ></div>
      </div>
      
      <div className="flex w-full justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Good</span>
        <span>Moderate</span>
        <span>Poor</span>
      </div>
    </div>
  );
}

function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snow Fall',
    73: 'Moderate Snow Fall',
    75: 'Heavy Snow Fall',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail',
  };
  
  return descriptions[code] || 'Unknown';
}

function getAirQualityAdvice(aqi: number): string {
  if (aqi <= 20) {
    return "Air quality is excellent. Enjoy outdoor activities.";
  } else if (aqi <= 40) {
    return "Air quality is good. Ideal for most outdoor activities.";
  } else if (aqi <= 60) {
    return "Air quality is moderate. Sensitive individuals may experience minor respiratory symptoms.";
  } else if (aqi <= 80) {
    return "Air quality is poor. Consider reducing prolonged outdoor activities, especially for sensitive groups.";
  } else if (aqi <= 100) {
    return "Air quality is very poor. Avoid prolonged outdoor exertion. Sensitive groups should stay indoors.";
  } else {
    return "Air quality is extremely poor. Avoid all outdoor activities. Keep windows closed.";
  }
}

function renderHourlyForecast(weatherData: any, type: 'temperature' | 'precipitation' | 'wind') {
  if (!weatherData || !weatherData.hourly) return null;
  
  const now = new Date();
  const hours = [];
  
  // Get the first 24 hours starting from the current hour
  const currentHour = now.getHours();
  const startIndex = weatherData.hourly.time.findIndex((time: string) => 
    new Date(time).getHours() >= currentHour
  );
  
  const endIndex = startIndex + 24;
  
  for (let i = startIndex; i < endIndex && i < weatherData.hourly.time.length; i++) {
    const time = new Date(weatherData.hourly.time[i]);
    hours.push({
      time,
      temperature: Math.round(weatherData.hourly.temperature_2m[i]),
      weatherCode: weatherData.hourly.weather_code[i],
      precipitation: weatherData.hourly.precipitation_probability[i],
      precipitationAmount: weatherData.hourly.precipitation[i],
      windSpeed: weatherData.hourly.wind_speed_10m[i],
      windDirection: weatherData.hourly.wind_direction_10m[i],
    });
  }
  
  return hours.map((hour, index) => {
    return (
      <div 
        key={index} 
        className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3 min-w-20"
      >
        <span className="text-xs font-medium mb-1">
          {hour.time.getHours()}:00
        </span>
        <span className="material-icons text-primary-500 text-xl mb-1">
          {getWeatherIcon(hour.weatherCode)}
        </span>
        
        {type === 'temperature' && (
          <>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {hour.temperature}°C
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {hour.precipitation}% rain
            </div>
          </>
        )}
        
        {type === 'precipitation' && (
          <>
            <div className="font-medium text-blue-500 dark:text-blue-400">
              {hour.precipitation}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {hour.precipitationAmount > 0 ? `${hour.precipitationAmount.toFixed(1)}mm` : '-'}
            </div>
          </>
        )}
        
        {type === 'wind' && (
          <>
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {Math.round(hour.windSpeed)} km/h
            </div>
            <div 
              className="text-xs text-gray-500 dark:text-gray-400 mt-1 material-icons" 
              style={{ transform: `rotate(${hour.windDirection}deg)` }}
            >
              navigation
            </div>
          </>
        )}
      </div>
    );
  });
}