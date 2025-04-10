import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export function getWeatherIcon(weatherCode: number): string {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  const codeMap: Record<number, string> = {
    0: "wb_sunny", // Clear sky
    1: "wb_sunny", // Mainly clear
    2: "partly_cloudy_day", // Partly cloudy
    3: "cloud", // Overcast
    45: "foggy", // Fog
    48: "foggy", // Depositing rime fog
    51: "grain", // Light drizzle
    53: "grain", // Moderate drizzle
    55: "grain", // Dense drizzle
    56: "ac_unit", // Light freezing drizzle
    57: "ac_unit", // Dense freezing drizzle
    61: "water_drop", // Slight rain
    63: "water_drop", // Moderate rain
    65: "thunderstorm", // Heavy rain
    66: "ac_unit", // Light freezing rain
    67: "ac_unit", // Heavy freezing rain
    71: "cloudy_snowing", // Slight snow fall
    73: "cloudy_snowing", // Moderate snow fall
    75: "cloudy_snowing", // Heavy snow fall
    77: "cloudy_snowing", // Snow grains
    80: "thunderstorm", // Slight rain showers
    81: "thunderstorm", // Moderate rain showers
    82: "thunderstorm", // Violent rain showers
    85: "cloudy_snowing", // Slight snow showers
    86: "cloudy_snowing", // Heavy snow showers
    95: "flash_on", // Thunderstorm
    96: "flash_on", // Thunderstorm with slight hail
    99: "flash_on"  // Thunderstorm with heavy hail
  };

  return codeMap[weatherCode] || "help_outline";
}

export function getAqiCategory(aqi: number): {
  label: string;
  category: string;
  color: string;
  bgColor: string;
  icon: string;
  textColor: string;
  description: string;
  healthImplications: string;
} {
  if (aqi <= 50) {
    return { 
      label: "Good", 
      category: "Good",
      color: "bg-green-500", 
      bgColor: "bg-green-100 dark:bg-green-900/20",
      icon: "check_circle",
      textColor: "text-green-500",
      description: "Air quality is satisfactory and poses little or no health risk.",
      healthImplications: "Air quality is considered satisfactory, and air pollution poses little or no risk."
    };
  } else if (aqi <= 100) {
    return { 
      label: "Moderate", 
      category: "Moderate",
      color: "bg-yellow-400", 
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      icon: "info",
      textColor: "text-yellow-500",
      description: "Air quality is acceptable but may cause minor concern for a small number of unusually sensitive individuals.",
      healthImplications: "Air quality is acceptable; however, some pollutants may be a concern for a small number of people who are unusually sensitive to air pollution."
    };
  } else if (aqi <= 150) {
    return { 
      label: "Unhealthy for Sensitive Groups", 
      category: "Unhealthy for Sensitive Groups",
      color: "bg-orange-500", 
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      icon: "warning",
      textColor: "text-orange-500",
      description: "Members of sensitive groups may experience health effects, but the general public is less likely to be affected.",
      healthImplications: "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
    };
  } else if (aqi <= 200) {
    return { 
      label: "Unhealthy", 
      category: "Unhealthy",
      color: "bg-red-500", 
      bgColor: "bg-red-100 dark:bg-red-900/20",
      icon: "report_problem",
      textColor: "text-red-500",
      description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
      healthImplications: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects."
    };
  } else if (aqi <= 300) {
    return { 
      label: "Very Unhealthy", 
      category: "Very Unhealthy",
      color: "bg-purple-700", 
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      icon: "dangerous",
      textColor: "text-purple-700",
      description: "Health alert: everyone may experience more serious health effects.",
      healthImplications: "Health warnings of emergency conditions. The entire population is more likely to be affected."
    };
  } else {
    return { 
      label: "Hazardous", 
      category: "Hazardous",
      color: "bg-purple-900", 
      bgColor: "bg-purple-100 dark:bg-rose-900/20",
      icon: "emergency",
      textColor: "text-purple-900",
      description: "Health warning of emergency conditions: everyone is more likely to be affected.",
      healthImplications: "Health alert: everyone may experience more serious health effects. Avoid all outdoor activities."
    };
  }
}

export function getCurrentSeason(): string {
  const now = new Date();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  
  // Northern Vietnam has 4 seasons, but with different timing than standard
  if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 11) {
    return "autumn";
  } else {
    return "winter";
  }
}

export function getActivityRecommendation(
  temp: number, 
  rain: number, 
  uv: number, 
  aqi: number
): string {
  // Simple logic for activity recommendations
  if (temp > 35) {
    return "Indoor activities recommended due to extreme heat";
  } else if (temp > 30 && uv > 7) {
    return "Early morning or evening activities recommended to avoid peak heat and UV";
  } else if (rain > 50) {
    return "Indoor activities recommended due to high chance of rain";
  } else if (aqi > 150) {
    return "Indoor activities recommended due to poor air quality";
  } else if (aqi > 100) {
    return "Limit strenuous outdoor activities, especially for sensitive groups";
  } else {
    return "Good conditions for outdoor activities";
  }
}

export function getClothingRecommendation(temp: number, rain: number): string {
  if (temp > 30) {
    return rain > 30 
      ? "Light, breathable clothing with rain protection" 
      : "Light, breathable clothing, sun hat, and sunglasses";
  } else if (temp > 25) {
    return rain > 30 
      ? "Light clothing with rain protection" 
      : "Light clothing, consider a hat for sun protection";
  } else if (temp > 20) {
    return rain > 30 
      ? "Light layers with waterproof outer layer" 
      : "Light layers that can be removed as the day warms";
  } else if (temp > 15) {
    return rain > 30 
      ? "Medium layers with waterproof outer layer" 
      : "Medium layers, light jacket or sweater";
  } else {
    return rain > 30 
      ? "Warm clothing with waterproof outer layer" 
      : "Warm clothing, jacket, and consider gloves in the early morning";
  }
}
