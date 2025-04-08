import { 
  WeatherResponse, 
  CurrentWeather, 
  HourlyForecastItem, 
  DailyForecastItem,
  AIInsights,
  ClimateIndicators,
  TemperatureTrend,
  ForecastAccuracy
} from "@shared/schema";

// Re-export types from schema
export type {
  WeatherResponse,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  AIInsights,
  ClimateIndicators,
  TemperatureTrend,
  ForecastAccuracy
};

// Weather icon mapping
export type WeatherIconType = 
  | "sunny" 
  | "partlyCloudy" 
  | "cloudy" 
  | "rain" 
  | "thunderstorm" 
  | "snow" 
  | "mist"
  | "night";

export interface WeatherIconProps {
  type: WeatherIconType;
  className?: string;
}
