import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatPercentage } from "@/components/ui/theme";
import { Skeleton } from "@/components/ui/skeleton";

interface EnvironmentalMetricsProps {
  data: {
    airQuality: number;
    airQualityDesc: string;
    uvIndex: number;
    uvDesc: string;
    dustLevel: number;
    dustDesc: string;
    feelsLike: number;
  };
  isLoading?: boolean;
}

export const EnvironmentalMetrics: React.FC<EnvironmentalMetricsProps> = ({ data, isLoading = false }) => {
  // Get background color for AQI based on quality
  const getAirQualityColor = (quality: string): string => {
    switch (quality) {
      case 'Good':
        return 'bg-green-500';
      case 'Fair':
        return 'bg-lime-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'Poor':
        return 'bg-orange-500';
      case 'Very Poor':
        return 'bg-red-500';
      case 'Extremely Poor':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get background color for UV based on level
  const getUVColor = (desc: string): string => {
    switch (desc) {
      case 'Low':
        return 'bg-green-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'High':
        return 'bg-orange-500';
      case 'Very High':
        return 'bg-red-500';
      case 'Extreme':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get background color for dust level
  const getDustColor = (desc: string): string => {
    switch (desc) {
      case 'Low':
        return 'bg-green-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'High':
        return 'bg-orange-500';
      case 'Very High':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate percentage for progress bars
  const calculateAirQualityPercentage = (value: number) => {
    // AQI typically ranges from 0-500, but we normalize to 0-100 for the progress bar
    return Math.min(Math.max(value / 5, 0), 100);
  };

  const calculateUVPercentage = (value: number) => {
    // UV index is typically 0-11+, but we'll normalize to 0-100
    return Math.min(Math.max(value * 9, 0), 100);
  };

  const calculateDustPercentage = (value: number) => {
    // PM10 can range widely, but we'll cap it at 150 for the progress bar
    return Math.min(Math.max(value / 1.5, 0), 100);
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-3 w-[150px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Environmental Metrics</CardTitle>
        <CardDescription>Current air quality and environmental conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Air Quality */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Air Quality</h3>
            <Badge variant="outline" className={`${getAirQualityColor(data.airQualityDesc)} text-white`}>
              {data.airQualityDesc}
            </Badge>
          </div>
          <Progress value={calculateAirQualityPercentage(data.airQuality)} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Air Quality Index: {data.airQuality} (EU Scale)
          </p>
        </div>
        
        <Separator />
        
        {/* UV Index */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">UV Index</h3>
            <Badge variant="outline" className={`${getUVColor(data.uvDesc)} text-white`}>
              {data.uvDesc}
            </Badge>
          </div>
          <Progress value={calculateUVPercentage(data.uvIndex)} className="h-2" />
          <p className="text-xs text-muted-foreground">
            UV Index: {data.uvIndex} - {data.uvDesc} exposure risk
          </p>
        </div>
        
        <Separator />
        
        {/* Dust & Dander */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Dust & Particles</h3>
            <Badge variant="outline" className={`${getDustColor(data.dustDesc)} text-white`}>
              {data.dustDesc}
            </Badge>
          </div>
          <Progress value={calculateDustPercentage(data.dustLevel)} className="h-2" />
          <p className="text-xs text-muted-foreground">
            PM10: {data.dustLevel} µg/m³ - {data.dustDesc} particle concentration
          </p>
        </div>
        
        <Separator />
        
        {/* Feels Like */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Feels Like</h3>
            <span className="text-base font-medium">{data.feelsLike}°C</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Perceived temperature based on humidity, wind, and sun radiation
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalMetrics;