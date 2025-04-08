import React from "react";

// Create an SVG component for weather icons
export const WeatherIcon: React.FC<{ type: string; size?: string; className?: string }> = ({ 
  type, 
  size = "2xl", 
  className = "" 
}) => {
  const getIcon = () => {
    switch (type) {
      case "sunny":
        return "wb_sunny";
      case "partlyCloudy":
        return "partly_cloudy_day";
      case "cloudy":
        return "cloud";
      case "rain":
        return "grain";
      case "thunderstorm":
        return "thunderstorm";
      case "snow":
        return "ac_unit";
      case "mist":
        return "foggy";
      case "night":
        return "nights_stay";
      default:
        return "wb_sunny";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      case "5xl":
        return "text-5xl";
      case "6xl":
        return "text-6xl";
      default:
        return "text-2xl";
    }
  };

  return (
    <span className={`material-icons ${getSizeClass()} ${className}`}>
      {getIcon()}
    </span>
  );
};

// Map weather codes to icon types
export const mapWeatherCodeToIcon = (code: string): string => {
  // The mapping can be adjusted based on the actual codes from the API
  // This is a placeholder mapping
  const codeNum = parseInt(code, 10);
  
  if (codeNum >= 200 && codeNum < 300) return "thunderstorm";
  if (codeNum >= 300 && codeNum < 400) return "rain";
  if (codeNum >= 500 && codeNum < 600) return "rain";
  if (codeNum >= 600 && codeNum < 700) return "snow";
  if (codeNum >= 700 && codeNum < 800) return "mist";
  if (codeNum === 800) return "sunny";
  if (codeNum > 800) return "partlyCloudy";
  
  return "sunny"; // Default
};

// Create a utility to format temperatures
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

// Create a utility to format percentage values
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

// Create a utility to format date/time values
export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

export const formatDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Convert 24-hour formatted time to 12-hour (AM/PM)
export const formatTimeAmPm = (time24h: string): string => {
  const [hours, minutes] = time24h.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};
