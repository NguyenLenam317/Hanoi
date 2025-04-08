import React from "react";
import { Card } from "@/components/ui/card";
import { ForecastAccuracy } from "@/types";

interface PredictionAccuracyProps {
  data: ForecastAccuracy;
  isLoading?: boolean;
}

const PredictionAccuracy: React.FC<PredictionAccuracyProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-7 bg-gray-200 rounded w-48"></div>
          <div className="h-6 bg-green-100 rounded-full w-24"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
              <div className="mt-2 mb-1 h-2 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const getRatingBadgeColor = () => {
    switch (data.overallRating) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      case "unknown":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressBarColor = (accuracy: number) => {
    if (accuracy >= 85) return "bg-green-500";
    if (accuracy >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm p-6 mb-8 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Forecast Reliability</h2>
        <div className={`rounded-full px-3 py-1 text-xs font-medium ${getRatingBadgeColor()}`}>
          {data.overallRating.charAt(0).toUpperCase() + data.overallRating.slice(1)} Accuracy
        </div>
      </div>
      <p className="text-gray-700 mb-4">
        {data.overallRating === "unknown" 
          ? "Weather prediction accuracy metrics are currently being calculated. The percentages shown below are estimates based on typical model performance for this region."
          : `Weather prediction models for Hanoi currently show ${data.overallRating} reliability for the next 48 hours, with decreasing confidence beyond that timeframe. The AI analysis has been validated against actual conditions with ${data.day1}% accuracy over the past month.`
        }
      </p>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-gray-500 text-sm">24-Hour Forecast</h3>
          <div className="mt-2 mb-1 h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${getProgressBarColor(data.day1)}`}
              style={{ width: `${data.day1}%` }}
            ></div>
          </div>
          <p className="text-sm font-medium">{data.day1}% Accurate</p>
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">3-Day Forecast</h3>
          <div className="mt-2 mb-1 h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${getProgressBarColor(data.day3)}`}
              style={{ width: `${data.day3}%` }}
            ></div>
          </div>
          <p className="text-sm font-medium">{data.day3}% Accurate</p>
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">7-Day Forecast</h3>
          <div className="mt-2 mb-1 h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${getProgressBarColor(data.day7)}`}
              style={{ width: `${data.day7}%` }}
            ></div>
          </div>
          <p className="text-sm font-medium">{data.day7}% Accurate</p>
        </div>
      </div>
    </Card>
  );
};

export default PredictionAccuracy;
