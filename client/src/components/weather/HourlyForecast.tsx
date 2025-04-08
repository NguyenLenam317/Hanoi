import React from "react";
import { HourlyForecastItem } from "@/types";
import { WeatherIcon, formatTemperature } from "@/components/ui/theme";

interface HourlyForecastProps {
  data: HourlyForecastItem[];
  isLoading?: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
        <div className="overflow-x-auto">
          <div className="inline-flex space-x-4 min-w-full pb-4 px-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 text-center min-w-[100px] animate-pulse">
                <div className="h-5 bg-gray-200 rounded mb-2 mx-auto w-16"></div>
                <div className="h-8 bg-gray-200 rounded-full mb-2 mx-auto w-8"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 mx-auto w-10"></div>
                <div className="h-4 bg-gray-200 rounded mx-auto w-8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRainTextClass = (rainChance: number) => {
    if (rainChance >= 30) return "text-rain";
    return "text-gray-500";
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="inline-flex space-x-4 min-w-full pb-4 px-1">
          {data.map((hour, index) => (
            <div 
              key={index} 
              className={`${index === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-white'} rounded-xl shadow-sm p-4 text-center transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-md min-w-[100px]`}
            >
              <p className={`${index === 0 ? 'text-primary font-semibold' : 'text-gray-500 font-medium'}`}>{index === 0 ? "Now" : hour.time}</p>
              <div className="my-2">
                <WeatherIcon type={hour.icon} className="text-primary text-2xl" />
              </div>
              <p className="font-bold text-lg">{formatTemperature(hour.temperature)}</p>
              <div className={`flex justify-center items-center text-xs mt-1 ${getRainTextClass(hour.rainChance)}`}>
                <span className="material-icons text-xs mr-1">water_drop</span>
                <span>{hour.rainChance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
