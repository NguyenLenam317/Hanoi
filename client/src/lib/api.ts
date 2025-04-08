import { apiRequest } from "@/lib/queryClient";
import { 
  WeatherResponse, 
  weatherResponseSchema,
  WeatherQuery,
  weatherQuerySchema
} from "@shared/schema";

/**
 * Fetches weather data for a specific location from Open Metro API
 * @param query Weather query parameters (location, coordinates)
 * @returns Promise with weather data
 */
export const fetchWeatherData = async (query: WeatherQuery): Promise<WeatherResponse> => {
  try {
    // Validate the query
    const validatedQuery = weatherQuerySchema.parse(query);
    
    // Build query string
    const queryParams = new URLSearchParams();
    queryParams.append("location", validatedQuery.location);
    
    if (validatedQuery.lat !== undefined && validatedQuery.lon !== undefined) {
      queryParams.append("lat", validatedQuery.lat.toString());
      queryParams.append("lon", validatedQuery.lon.toString());
    }
    
    console.log(`Fetching weather data for ${validatedQuery.location} from Open Metro API`);
    
    // Fetch weather data from API
    const response = await apiRequest("GET", `/api/weather?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate response data
    return weatherResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

/**
 * Refreshes weather data for a specific location
 * Forces a new fetch from Open Metro API instead of using cached data
 */
export const refreshWeatherData = async (query: WeatherQuery): Promise<WeatherResponse> => {
  try {
    // Validate the query
    const validatedQuery = weatherQuerySchema.parse(query);
    
    // Build query string
    const queryParams = new URLSearchParams();
    queryParams.append("location", validatedQuery.location);
    queryParams.append("refresh", "true");
    
    if (validatedQuery.lat !== undefined && validatedQuery.lon !== undefined) {
      queryParams.append("lat", validatedQuery.lat.toString());
      queryParams.append("lon", validatedQuery.lon.toString());
    }
    
    console.log(`Refreshing weather data for ${validatedQuery.location} from Open Metro API`);
    
    // Fetch fresh weather data from API
    const response = await apiRequest("GET", `/api/weather?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Weather API refresh error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate response data
    return weatherResponseSchema.parse(data);
  } catch (error) {
    console.error("Error refreshing weather data:", error);
    throw error;
  }
};
