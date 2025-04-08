import React from "react";
import { Card } from "@/components/ui/card";
import { CurrentWeather as CurrentWeatherType } from "@/types";
import { WeatherIcon, formatTemperature, formatTimeAmPm } from "@/components/ui/theme";

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  isLoading?: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="mb-8 bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-8 bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center">
          <div className="mr-4">
            <WeatherIcon type={data.icon} size="6xl" className="text-primary" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{formatTemperature(data.temperature)}</h2>
            <p className="text-lg text-gray-600">{data.description}</p>
            <p className="text-sm text-gray-500">Feels like {formatTemperature(data.feelsLike)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Humidity</span>
            <div className="flex items-center mt-1">
              <span className="material-icons text-primary mr-2">water_drop</span>
              <span className="font-medium">{data.humidity}%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Wind</span>
            <div className="flex items-center mt-1">
              <span className="material-icons text-primary mr-2">air</span>
              <span className="font-medium">{data.wind} km/h</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Pressure</span>
            <div className="flex items-center mt-1">
              <span className="material-icons text-primary mr-2">speed</span>
              <span className="font-medium">{data.pressure} hPa</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Visibility</span>
            <div className="flex items-center mt-1">
              <span className="material-icons text-primary mr-2">visibility</span>
              <span className="font-medium">{data.visibility} km</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Sunrise</span>
            <span className="font-medium">{data.sunrise}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Sunset</span>
            <span className="font-medium">{data.sunset}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-2 bg-warning rounded-full" 
              style={{ width: `${data.daytimePercent}%` }}
            ></div>
            <div className="relative">
              <div 
                className="absolute top-0 h-4 w-4 bg-warning rounded-full -mt-3" 
                style={{ left: `${data.daytimePercent}%`, transform: 'translateX(-50%)' }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
