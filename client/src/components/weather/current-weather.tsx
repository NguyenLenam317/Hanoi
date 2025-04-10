import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatTime, getWeatherIcon } from "@/lib/utils";

export function CurrentWeather() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  if (isLoading) return <CurrentWeatherSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Current Weather</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading weather data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentData = data?.current;
  const date = currentData?.time ? new Date(currentData.time) : new Date();

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-2 bg-primary-500"></div>
      <CardHeader className="pb-2">
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>
          Hanoi, Vietnam • Updated: {formatTime(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          <span className="material-icons text-6xl text-primary-500 mb-2">
            {getWeatherIcon(currentData?.weather_code || 0)}
          </span>
          <div className="text-4xl font-bold mb-1">{Math.round(currentData?.temperature_2m || 0)}°C</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Feels like {Math.round(currentData?.apparent_temperature || 0)}°C
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <span className="material-icons text-blue-500 mr-1 text-base">water_drop</span>
              <span className="text-sm font-medium">Humidity</span>
            </div>
            <div className="text-lg font-semibold">{currentData?.relative_humidity_2m || 0}%</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <span className="material-icons text-blue-500 mr-1 text-base">grain</span>
              <span className="text-sm font-medium">Precipitation</span>
            </div>
            <div className="text-lg font-semibold">{currentData?.precipitation || 0} mm</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <span className="material-icons text-blue-500 mr-1 text-base">air</span>
              <span className="text-sm font-medium">Wind</span>
            </div>
            <div className="text-lg font-semibold">{Math.round(currentData?.wind_speed_10m || 0)} km/h</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <span className="material-icons text-blue-500 mr-1 text-base">compress</span>
              <span className="text-sm font-medium">Pressure</span>
            </div>
            <div className="text-lg font-semibold">{Math.round(currentData?.pressure_msl || 0)} hPa</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CurrentWeatherSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>Loading weather data...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          <Skeleton className="h-12 w-12 rounded-full mb-4" />
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}