import { useQuery } from "@tanstack/react-query";
import { fetchAirQualityData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { formatTime, getAqiCategory } from "@/lib/utils";

export function AirQualityCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/air-quality'],
    queryFn: fetchAirQualityData,
  });

  if (isLoading) return <AirQualitySkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Air Quality</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading air quality data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentData = data?.current;
  const date = new Date(currentData?.time || '');
  
  // Get AQI category information
  const aqiInfo = getAqiCategory(currentData?.european_aqi || 0);

  return (
    <Card className="h-full overflow-hidden">
      <div className={`h-2 ${aqiInfo.color}`}></div>
      <CardHeader className="pb-2">
        <CardTitle>Air Quality</CardTitle>
        <CardDescription>
          Hanoi, Vietnam • Updated: {formatTime(date)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className={`text-4xl font-bold mb-1 ${aqiInfo.textColor}`}>
            {currentData?.european_aqi || 'N/A'}
          </div>
          <div className="text-center mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${aqiInfo.bgColor} ${aqiInfo.textColor}`}>
              {aqiInfo.label}
            </span>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {aqiInfo.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* PM2.5 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">PM2.5</span>
              <span className="text-sm">{currentData?.pm2_5} µg/m³</span>
            </div>
            <Progress value={Math.min((currentData?.pm2_5 || 0) / 0.5, 100)} className="h-2" />
          </div>
          
          {/* PM10 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">PM10</span>
              <span className="text-sm">{currentData?.pm10} µg/m³</span>
            </div>
            <Progress value={Math.min((currentData?.pm10 || 0) / 1.5, 100)} className="h-2" />
          </div>
          
          {/* Ozone */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Ozone (O₃)</span>
              <span className="text-sm">{currentData?.ozone} µg/m³</span>
            </div>
            <Progress value={Math.min((currentData?.ozone || 0) / 1.8, 100)} className="h-2" />
          </div>
          
          {/* Nitrogen Dioxide */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Nitrogen Dioxide (NO₂)</span>
              <span className="text-sm">{currentData?.nitrogen_dioxide} µg/m³</span>
            </div>
            <Progress value={Math.min((currentData?.nitrogen_dioxide || 0) / 2, 100)} className="h-2" />
          </div>
          
          {/* Sulphur Dioxide */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Sulphur Dioxide (SO₂)</span>
              <span className="text-sm">{currentData?.sulphur_dioxide} µg/m³</span>
            </div>
            <Progress value={Math.min((currentData?.sulphur_dioxide || 0) / 3, 100)} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AirQualitySkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Air Quality</CardTitle>
        <CardDescription>Loading air quality data...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <Skeleton className="h-8 w-12 mb-2" />
          <Skeleton className="h-6 w-24 mb-2 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}