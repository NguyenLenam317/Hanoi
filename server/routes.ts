import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchWeatherData } from "./api/openMetro";
import { getWeatherAnalysis } from "./api/openRouter";
import { 
  weatherQuerySchema, 
  WeatherQuery, 
  weatherResponseSchema,
  WeatherResponse
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API router
  const apiRouter = express.Router();

  // Weather Data API endpoint
  apiRouter.get("/weather", async (req: Request, res: Response) => {
    try {
      console.log("Received weather request:", req.query);
      
      // Validate query parameters
      const queryParams: WeatherQuery = {
        location: req.query.location as string || "hanoi",
        lat: req.query.lat ? parseFloat(req.query.lat as string) : undefined,
        lon: req.query.lon ? parseFloat(req.query.lon as string) : undefined,
      };

      const validatedQuery = weatherQuerySchema.parse(queryParams);
      const forceRefresh = req.query.refresh === "true";

      console.log(`Fetching weather data for ${validatedQuery.location}${forceRefresh ? ' (forced refresh)' : ''}`);
      
      // Fetch weather data from Open Metro API
      const weatherData = await fetchWeatherData(validatedQuery, forceRefresh);
      
      // Get AI analysis from OpenRouter
      console.log("Fetching AI insights for weather data");
      const aiInsights = await getWeatherAnalysis(weatherData);
      
      // Combine data and AI insights
      // Make sure we have all required properties before combining
      const combinedResponse: WeatherResponse = {
        location: weatherData.location || {
          name: "Hanoi",
          country: "Vietnam",
          coordinates: "21.0245° N, 105.8412° E",
          localTime: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          lastUpdated: "Just now"
        },
        current: weatherData.current || {
          temperature: 0,
          feelsLike: 0,
          description: "Unknown",
          icon: "cloudy",
          humidity: 0,
          wind: 0,
          pressure: 0,
          visibility: 0,
          sunrise: "Unknown",
          sunset: "Unknown",
          daytimePercent: 0
        },
        hourlyForecast: weatherData.hourlyForecast || [],
        dailyForecast: weatherData.dailyForecast || [],
        climateIndicators: weatherData.climateIndicators || {
          temperatureAnomaly: 0,
          precipitationChange: 0,
          extremeEvents: 0
        },
        temperatureTrends: weatherData.temperatureTrends || [],
        forecastAccuracy: weatherData.forecastAccuracy || {
          day1: 0,
          day3: 0,
          day7: 0,
          overallRating: "unknown"
        },
        aiInsights
      };

      // Validate the response data with the schema
      const validatedResponse = weatherResponseSchema.parse(combinedResponse);
      
      console.log("Successfully processed weather request");
      res.json(validatedResponse);
    } catch (error) {
      console.error("Error processing weather request:", error);
      
      if (error instanceof Error) {
        // More specific error handling
        if (error.message.includes("API key")) {
          res.status(401).json({ 
            error: "API authentication error", 
            message: error.message 
          });
        } else if (error.message.includes("Weather API error")) {
          res.status(502).json({ 
            error: "Weather API error", 
            message: error.message 
          });
        } else {
          res.status(500).json({ 
            error: "Server error", 
            message: error.message 
          });
        }
      } else {
        res.status(500).json({ 
          error: "Unknown error", 
          message: "An unexpected error occurred while fetching weather data" 
        });
      }
    }
  });

  // Register the API router
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
