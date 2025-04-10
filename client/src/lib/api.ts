// Constants for API endpoints
const HANOI_LATITUDE = 21.0245;
const HANOI_LONGITUDE = 105.8412;
const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1";
const OPEN_METEO_ARCHIVE_URL = "https://archive-api.open-meteo.com/v1";
const OPEN_METEO_CLIMATE_URL = "https://climate-api.open-meteo.com/v1";
const OPEN_METEO_AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1";

export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    precipitation_probability: number;
    rain: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    dew_point_2m?: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    rain: number[];
    showers?: number[];
    weather_code: number[];
    cloud_cover: number[];
    cloud_cover_low?: number[];
    cloud_cover_mid?: number[];
    visibility: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m?: number[];
    surface_pressure?: number[];
    pressure_msl?: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
  };
}

export interface AirQualityData {
  hourly: {
    time: string[];
    pm10: number[];
    pm2_5: number[];
    carbon_monoxide: number[];
    nitrogen_dioxide: number[];
    sulphur_dioxide: number[];
    ozone: number[];
    dust?: number[];
    uv_index?: number[];
    european_aqi: number[];
    european_aqi_pm2_5?: number[];
    european_aqi_pm10?: number[];
    european_aqi_nitrogen_dioxide?: number[];
    european_aqi_ozone?: number[];
    european_aqi_sulphur_dioxide?: number[];
  };
  current: {
    time: string;
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    ozone: number;
    european_aqi: number;
  };
}

export interface ClimateHistoricalData {
  yearly: {
    time: number[];
    temperature_2m_mean: number[];
  };
  monthly: {
    time: string[];
    temperature_2m_mean: number[];
    precipitation_sum: number[];
  };
}

export interface SustainabilityTip {
  id: number;
  tip: string;
  season: string;
  createdAt: string;
}

export interface Poll {
  id: number;
  question: string;
  options: string[];
  active: boolean;
  createdAt: string;
}

export interface PollResults {
  pollId: number;
  options: string[];
  votes: number[];
  totalVotes: number;
}

// Function to fetch weather data from the server
export async function fetchWeatherData(): Promise<WeatherData> {
  const response = await fetch('/api/weather/current');
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}

// Function to fetch air quality data from the server
export async function fetchAirQualityData(): Promise<AirQualityData> {
  const response = await fetch('/api/weather/air-quality');
  if (!response.ok) {
    throw new Error('Failed to fetch air quality data');
  }
  return response.json();
}

// Function to fetch historical climate data
export async function fetchClimateData(): Promise<ClimateHistoricalData> {
  const response = await fetch('/api/climate/historical');
  if (!response.ok) {
    throw new Error('Failed to fetch climate data');
  }
  return response.json();
}

// Function to fetch current sustainability tip
export async function fetchSustainabilityTip(): Promise<SustainabilityTip> {
  const response = await fetch('/api/sustainability/tip');
  if (!response.ok) {
    throw new Error('Failed to fetch sustainability tip');
  }
  return response.json();
}

// Function to fetch active polls
export async function fetchActivePolls(): Promise<Poll[]> {
  const response = await fetch('/api/sustainability/polls');
  if (!response.ok) {
    throw new Error('Failed to fetch active polls');
  }
  return response.json();
}

// Function to vote on a poll
export async function votePoll(pollId: number, optionIndex: number): Promise<PollResults> {
  const response = await fetch('/api/sustainability/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pollId, optionIndex }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit vote');
  }
  
  return response.json();
}

// Function to fetch poll results
export async function fetchPollResults(pollId: number): Promise<PollResults> {
  const response = await fetch(`/api/sustainability/poll-results/${pollId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch poll results');
  }
  return response.json();
}

// Function to interact with the AI assistant
export async function askAiAssistant(question: string, userPreferencesContext?: string): Promise<{ answer: string }> {
  const response = await fetch('/api/assistant/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      question,
      userPreferencesContext 
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to get response from AI assistant');
  }
  
  return response.json();
}

// Enhanced AI API functions

export interface EnhancedWeatherInterpretation {
  interpretation: string;
  keyHighlights: string[];
  localImpacts: string;
}

export async function getEnhancedWeatherInterpretation(): Promise<EnhancedWeatherInterpretation> {
  const response = await fetch("/api/ai/weather-interpretation");
  
  if (!response.ok) {
    throw new Error("Failed to get enhanced weather interpretation");
  }
  
  return await response.json();
}

export interface PersonalizedHealthAdvice {
  generalAdvice: string;
  sensitiveGroups: string;
  outdoorActivities: string;
  airQualityImpact: string;
}

export async function getPersonalizedHealthAdvice(): Promise<PersonalizedHealthAdvice> {
  const response = await fetch("/api/ai/health-advice");
  
  if (!response.ok) {
    throw new Error("Failed to get personalized health advice");
  }
  
  return await response.json();
}

export interface ClimateChangeInsights {
  summary: string;
  localImpacts: string[];
  adaptationStrategies: string[];
  dataInterpretation: string;
}

export async function getClimateChangeInsights(): Promise<ClimateChangeInsights> {
  const response = await fetch("/api/ai/climate-insights");
  
  if (!response.ok) {
    throw new Error("Failed to get climate change insights");
  }
  
  return await response.json();
}

export interface TailoredSustainabilityTips {
  tips: string[];
  seasonalContext: string;
  communityInitiatives: string[];
}

export async function getTailoredSustainabilityTips(season: string): Promise<TailoredSustainabilityTips> {
  const response = await fetch(`/api/ai/sustainability-tips/${season}`);
  
  if (!response.ok) {
    throw new Error("Failed to get tailored sustainability tips");
  }
  
  return await response.json();
}

export interface ActivityPreferences {
  outdoorPreference?: number; // 1-5 scale
  activityLevel?: string; // "low", "moderate", "high"
  hasChildren?: boolean;
  hasSeniors?: boolean;
  hasRespiratoryConditions?: boolean;
  userPreferencesContext?: string; // User survey preferences as context
}

export interface EnhancedActivityRecommendations {
  indoorRecommendations: string[];
  outdoorRecommendations: string[];
  precautions: string[];
  bestTimeForOutdoor: string;
}

export async function getEnhancedActivityRecommendations(
  preferences?: ActivityPreferences
): Promise<EnhancedActivityRecommendations> {
  const response = await fetch("/api/ai/activity-recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences || {}),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get enhanced activity recommendations");
  }
  
  return await response.json();
}
