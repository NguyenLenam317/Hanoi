import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getClothingRecommendation } from "@/lib/utils";

export function ClothingRecommendations() {
  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  if (isLoading) return <ClothingRecommendationsSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Clothing Recommendations</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentWeather = weatherData?.current;
  const dailyData = weatherData?.daily;

  // Get clothing recommendation based on current conditions
  const recommendation = getClothingRecommendation(
    currentWeather?.temperature_2m || 0,
    currentWeather?.precipitation_probability || 0
  );

  // Get forecast for the next few hours and the day
  const getHourlyForecast = () => {
    if (!weatherData?.hourly) return [];
    
    const now = new Date();
    const currentHour = now.getHours();
    
    const forecast = [];
    const hoursToShow = 5; // Show next 5 time blocks
    
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      const hourTime = new Date(weatherData.hourly.time[i]);
      const hour = hourTime.getHours();
      
      // Only include future hours starting from the next 3-hour block
      if (hourTime > now && hour % 3 === 0) {
        forecast.push({
          time: hourTime,
          temp: weatherData.hourly.temperature_2m[i],
          rain: weatherData.hourly.precipitation_probability[i],
          weatherCode: weatherData.hourly.weather_code[i],
        });
        
        if (forecast.length >= hoursToShow) break;
      }
    }
    
    return forecast;
  };

  // Get clothes icons based on temperature and precipitation
  const getClothesIcons = (temp: number, rain: number) => {
    const icons = [];
    
    // Temperature-based clothing
    if (temp >= 30) {
      icons.push({ icon: "t_shirt", label: "Light clothing" });
      icons.push({ icon: "cap", label: "Hat" });
      if (temp >= 35) {
        icons.push({ icon: "water_bottle", label: "Hydration" });
      }
    } else if (temp >= 25) {
      icons.push({ icon: "t_shirt", label: "Light shirt" });
      icons.push({ icon: "shorts", label: "Light pants/shorts" });
    } else if (temp >= 20) {
      icons.push({ icon: "t_shirt", label: "Medium shirt" });
      icons.push({ icon: "pants", label: "Long pants" });
    } else if (temp >= 15) {
      icons.push({ icon: "cardigan", label: "Light jacket" });
      icons.push({ icon: "pants", label: "Long pants" });
    } else {
      icons.push({ icon: "jacket", label: "Warm jacket" });
      icons.push({ icon: "thermals", label: "Warm layers" });
    }
    
    // Rain-based additions
    if (rain >= 50) {
      icons.push({ icon: "umbrella", label: "Umbrella" });
      icons.push({ icon: "raincoat", label: "Raincoat" });
    } else if (rain >= 30) {
      icons.push({ icon: "umbrella", label: "Umbrella" });
    }
    
    return icons;
  };

  const hourlyForecast = getHourlyForecast();

  // Current clothing icons
  const currentClothes = getClothesIcons(
    currentWeather?.temperature_2m || 0,
    currentWeather?.precipitation_probability || 0
  );
  
  // Get time period description
  const getTimePeriod = (date: Date) => {
    const hour = date.getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="material-icons text-primary-500 mr-2">checkroom</span>
          Clothing Recommendations
        </CardTitle>
        <CardDescription>What to wear in Hanoi today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Current Recommendation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{recommendation}</p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {currentClothes.map((item, index) => (
              <div key={index} className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                <span className="material-icons text-primary-500 text-2xl mb-1">
                  {item.icon}
                </span>
                <span className="text-xs text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Plan Ahead</h3>
          <div className="space-y-2">
            {hourlyForecast.map((hour, index) => {
              const clothesItems = getClothesIcons(hour.temp, hour.rain);
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="material-icons text-primary-500 mr-1 text-base">schedule</span>
                      <span className="text-sm font-medium">
                        {getTimePeriod(hour.time)} ({hour.time.getHours()}:00)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{Math.round(hour.temp)}°C</span>
                      {hour.rain > 0 && (
                        <div className="flex items-center ml-2">
                          <span className="material-icons text-blue-500 text-sm">water_drop</span>
                          <span className="text-xs">{hour.rain}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {clothesItems.slice(0, 3).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <span className="material-icons text-primary-500 text-sm">{item.icon}</span>
                        <span className="text-xs ml-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-md text-sm text-gray-600 dark:text-gray-400">
          <span className="material-icons text-blue-500 dark:text-blue-400 text-base align-text-bottom mr-1">tips_and_updates</span>
          <span className="font-medium">Pro Tip:</span> Weather in Hanoi can change quickly, especially during monsoon season. Consider bringing a small umbrella even on clear days.
        </div>
      </CardContent>
    </Card>
  );
}

function ClothingRecommendationsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Skeleton className="h-6 w-6 rounded-full mr-2" />
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-full mb-3" />
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <Skeleton className="h-5 w-24 mb-2" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
        </div>
        
        <Skeleton className="h-12 rounded-md" />
      </CardContent>
    </Card>
  );
}