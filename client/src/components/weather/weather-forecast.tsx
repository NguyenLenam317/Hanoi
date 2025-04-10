import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, getWeatherIcon } from "@/lib/utils";

export function WeatherForecast() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  if (isLoading) return <WeatherForecastSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Weather Forecast</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading forecast data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format the hourly data into groups of 24 hours (1 day)
  const formatHourlyForecast = () => {
    const hourlyData = data?.hourly;
    if (!hourlyData) return [];

    const hoursForecast = [];
    const hoursPerDay = 24;
    const maxDays = 3; // Show forecast for 3 days

    for (let day = 0; day < maxDays; day++) {
      const startIndex = day * hoursPerDay;
      const endIndex = startIndex + hoursPerDay;
      
      if (startIndex >= hourlyData.time.length) break;
      
      const dayHours = [];
      for (let i = startIndex; i < endIndex && i < hourlyData.time.length; i++) {
        const hourTime = new Date(hourlyData.time[i]);
        
        // Only include hours from 6am to 11pm (more relevant hours)
        const hour = hourTime.getHours();
        if (hour >= 6 && hour <= 23 && hour % 3 === 0) { // Every 3 hours
          dayHours.push({
            time: hourTime,
            temp: hourlyData.temperature_2m[i],
            weatherCode: hourlyData.weather_code[i],
            precipitation: hourlyData.precipitation[i],
            precipitationProbability: hourlyData.precipitation_probability[i],
          });
        }
      }
      
      hoursForecast.push({
        date: new Date(hourlyData.time[startIndex]),
        hours: dayHours
      });
    }
    
    return hoursForecast;
  };

  // Format daily forecast data
  const formatDailyForecast = () => {
    const dailyData = data?.daily;
    if (!dailyData) return [];

    return dailyData.time.map((time, index) => ({
      date: new Date(time),
      maxTemp: dailyData.temperature_2m_max[index],
      minTemp: dailyData.temperature_2m_min[index],
      weatherCode: dailyData.weather_code[index],
      precipitation: dailyData.precipitation_sum[index],
      precipitationProbability: dailyData.precipitation_probability_max[index],
      sunrise: new Date(dailyData.sunrise[index]),
      sunset: new Date(dailyData.sunset[index]),
    }));
  };

  const hourlyForecast = formatHourlyForecast();
  const dailyForecast = formatDailyForecast();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>Hanoi, Vietnam • 7-day forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
            <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hourly" className="w-full">
            {hourlyForecast.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {formatDate(day.date)}
                </h3>
                <div className="overflow-x-auto pb-2">
                  <div className="flex space-x-3 min-w-max">
                    {day.hours.map((hour, hourIndex) => (
                      <div 
                        key={hourIndex} 
                        className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2 min-w-20"
                      >
                        <span className="text-xs font-medium mb-1">
                          {hour.time.getHours()}:00
                        </span>
                        <span className="material-icons text-primary-500 text-xl mb-1">
                          {getWeatherIcon(hour.weatherCode)}
                        </span>
                        <span className="text-sm font-semibold">
                          {Math.round(hour.temp)}°C
                        </span>
                        {hour.precipitationProbability > 0 && (
                          <div className="flex items-center mt-1">
                            <span className="material-icons text-blue-500 text-xs mr-0.5">water_drop</span>
                            <span className="text-xs">{hour.precipitationProbability}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="daily" className="w-full">
            <div className="space-y-2">
              {dailyForecast.map((day, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    <span className="material-icons text-primary-500 text-2xl mr-3">
                      {getWeatherIcon(day.weatherCode)}
                    </span>
                    <div>
                      <p className="font-medium">
                        {index === 0 ? "Today" : formatDate(day.date)}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="material-icons text-xs mr-1">wb_sunny</span>
                        <span>{day.sunrise.getHours()}:{String(day.sunrise.getMinutes()).padStart(2, '0')}</span>
                        <span className="mx-1">-</span>
                        <span className="material-icons text-xs mr-1">wb_twilight</span>
                        <span>{day.sunset.getHours()}:{String(day.sunset.getMinutes()).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {day.precipitationProbability > 0 && (
                      <div className="flex items-center mr-4">
                        <span className="material-icons text-blue-500 text-sm mr-1">water_drop</span>
                        <span className="text-sm">{day.precipitationProbability}%</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium mr-2">
                        {Math.round(day.minTemp)}°
                      </span>
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                        {Math.round(day.maxTemp)}°
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function WeatherForecastSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>Loading forecast data...</CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-48 mb-4" />
        
        {[1, 2, 3].map((day) => (
          <div key={day} className="mb-6">
            <Skeleton className="h-4 w-32 mb-2" />
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5, 6].map((hour) => (
                <div 
                  key={hour} 
                  className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2 min-w-20"
                >
                  <Skeleton className="h-3 w-8 mb-1" />
                  <Skeleton className="h-6 w-6 rounded-full mb-1" />
                  <Skeleton className="h-4 w-10" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}