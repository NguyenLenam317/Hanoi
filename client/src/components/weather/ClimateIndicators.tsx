import React from "react";
import { Card } from "@/components/ui/card";
import { ClimateIndicators as ClimateIndicatorsType } from "@/types";

interface ClimateIndicatorsProps {
  data: ClimateIndicatorsType;
  isLoading?: boolean;
}

const ClimateIndicators: React.FC<ClimateIndicatorsProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-md p-6 mb-8 animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-80 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full"></div>
              <div className="flex justify-between text-xs mt-1">
                <div className="h-3 bg-gray-200 rounded w-8"></div>
                <div className="h-3 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-blue-50 rounded-lg p-4">
                <div className="h-5 bg-gray-200 rounded w-48 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const getTemperatureProgressStyle = () => {
    // Calculate percentage (assuming max anomaly is 2°C)
    const percentage = (data.temperatureAnomaly / 2) * 100;
    return { width: `${Math.min(percentage, 100)}%` };
  };

  const getPrecipitationProgressStyle = () => {
    // Calculate percentage (assuming max change is 15%)
    const percentage = (data.precipitationChange / 15) * 100;
    return { width: `${Math.min(percentage, 100)}%` };
  };

  const getExtremeEventsProgressStyle = () => {
    // Calculate percentage (assuming max change is 50%)
    const percentage = (data.extremeEvents / 50) * 100;
    return { width: `${Math.min(percentage, 100)}%` };
  };

  return (
    <Card className="bg-white rounded-xl shadow-md p-6 mb-8 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Climate Change Indicators for Hanoi Region</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <span className="material-icons text-primary text-3xl mr-3">thermostat</span>
            <div>
              <h3 className="font-medium">Temperature Anomaly</h3>
              <p className="text-2xl font-bold text-hot mt-1">+{data.temperatureAnomaly}°C</p>
              <p className="text-sm text-gray-600 mt-1">above 1970-2000 baseline</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-hot rounded-full" style={getTemperatureProgressStyle()}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">0°C</span>
            <span className="text-gray-500">+2°C</span>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <span className="material-icons text-primary text-3xl mr-3">water_drop</span>
            <div>
              <h3 className="font-medium">Precipitation Change</h3>
              <p className="text-2xl font-bold text-rain mt-1">+{data.precipitationChange}%</p>
              <p className="text-sm text-gray-600 mt-1">increase in annual rainfall</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-rain rounded-full" style={getPrecipitationProgressStyle()}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">0%</span>
            <span className="text-gray-500">+15%</span>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <span className="material-icons text-primary text-3xl mr-3">storm</span>
            <div>
              <h3 className="font-medium">Extreme Events</h3>
              <p className="text-2xl font-bold text-warning mt-1">+{data.extremeEvents}%</p>
              <p className="text-sm text-gray-600 mt-1">increase in frequency</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-warning rounded-full" style={getExtremeEventsProgressStyle()}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">0%</span>
            <span className="text-gray-500">+50%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Regional Climate Projections (2050)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-secondary mb-2">Temperature Projection</h4>
            <p className="text-gray-700 mb-2">Based on current trends and climate models, Hanoi could experience:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Average temperature increase of 2.3°C by 2050</li>
              <li>Up to 45 more days above 35°C annually</li>
              <li>Reduction in cold days below 15°C</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-secondary mb-2">Precipitation Projection</h4>
            <p className="text-gray-700 mb-2">Climate models indicate the following changes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Intensification of the monsoon season</li>
              <li>15% increase in heavy rainfall events</li>
              <li>Longer dry periods between rain events</li>
              <li>Greater risk of urban flooding</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClimateIndicators;
