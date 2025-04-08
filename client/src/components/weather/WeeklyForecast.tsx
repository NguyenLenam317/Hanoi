import React from "react";
import { Card } from "@/components/ui/card";
import { DailyForecastItem } from "@/types";
import { WeatherIcon } from "@/components/ui/theme";

interface WeeklyForecastProps {
  data: DailyForecastItem[];
  isLoading?: boolean;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-sm p-4 col-span-1 lg:col-span-2 animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="space-y-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-6"></div>
              <div className="flex space-x-4">
                <div className="h-5 bg-gray-200 rounded w-8"></div>
                <div className="h-5 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow-sm p-4 col-span-1 lg:col-span-2 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-md">
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="space-y-4">
        {data.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-medium">{day.name}</span>
            <div className="flex items-center mx-4">
              <WeatherIcon type={day.icon} className={getIconColorClass(day.icon)} />
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-hot font-medium">{day.maxTemp}°</span>
              <span className="text-cold">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const getIconColorClass = (iconType: string): string => {
  switch (iconType) {
    case "sunny":
      return "text-primary text-xl";
    case "partlyCloudy":
    case "cloudy":
      return "text-warning text-xl";
    case "rain":
    case "thunderstorm":
      return "text-rain text-xl";
    default:
      return "text-gray-400 text-xl";
  }
};

export default WeeklyForecast;
