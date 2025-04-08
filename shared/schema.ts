import { pgTable, text, serial, integer, boolean, real, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the existing users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  data: jsonb("data").notNull(), // Store the raw weather data
  insights: jsonb("insights"), // Store the AI-generated insights
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;

// Weather data types for client-server communication
export const weatherQuerySchema = z.object({
  location: z.string().default("hanoi"),
  lat: z.number().optional(),
  lon: z.number().optional(),
});

export type WeatherQuery = z.infer<typeof weatherQuerySchema>;

// Current weather data schema
export const currentWeatherSchema = z.object({
  temperature: z.number(),
  feelsLike: z.number(),
  description: z.string(),
  icon: z.string(),
  humidity: z.number(),
  wind: z.number(),
  pressure: z.number(),
  visibility: z.number(),
  sunrise: z.string(),
  sunset: z.string(),
  daytimePercent: z.number(),
  airQuality: z.number().optional(), // Air Quality Index (0-500)
  airQualityDesc: z.string().optional(), // Description (Good, Moderate, Unhealthy, etc.)
  uvIndex: z.number().optional(), // UV Index (0-11+)
  uvDesc: z.string().optional(), // UV Description (Low, Moderate, High, etc.)
  dustLevel: z.number().optional(), // Dust level in μg/m³
  dustDesc: z.string().optional(), // Dust level description
});

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;

// Hourly forecast schema
export const hourlyForecastItemSchema = z.object({
  time: z.string(),
  temperature: z.number(),
  icon: z.string(),
  rainChance: z.number(),
});

export const hourlyForecastSchema = z.array(hourlyForecastItemSchema);
export type HourlyForecastItem = z.infer<typeof hourlyForecastItemSchema>;

// Weekly forecast schema
export const dailyForecastItemSchema = z.object({
  name: z.string(),
  icon: z.string(),
  maxTemp: z.number(),
  minTemp: z.number(),
  rainChance: z.number().optional(),
});

export const dailyForecastSchema = z.array(dailyForecastItemSchema);
export type DailyForecastItem = z.infer<typeof dailyForecastItemSchema>;

// AI insights schema
export const aiInsightsSchema = z.object({
  current: z.string(),
  patterns: z.string(),
  climateChange: z.string(),
});

export type AIInsights = z.infer<typeof aiInsightsSchema>;

// Climate indicators schema
export const climateIndicatorsSchema = z.object({
  temperatureAnomaly: z.number(),
  precipitationChange: z.number(),
  extremeEvents: z.number(),
});

export type ClimateIndicators = z.infer<typeof climateIndicatorsSchema>;

// Temperature trends for chart
export const temperatureTrendSchema = z.object({
  date: z.string(),
  temperature: z.number(),
  historicalAverage: z.number().optional(),
});

export const temperatureTrendsSchema = z.array(temperatureTrendSchema);
export type TemperatureTrend = z.infer<typeof temperatureTrendSchema>;

// Forecast accuracy
export const forecastAccuracySchema = z.object({
  day1: z.number(),
  day3: z.number(),
  day7: z.number(),
  overallRating: z.enum(["low", "medium", "high", "unknown"]),
});

export type ForecastAccuracy = z.infer<typeof forecastAccuracySchema>;

// Combined weather response
export const weatherResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    coordinates: z.string(),
    localTime: z.string(),
    lastUpdated: z.string(),
  }),
  current: currentWeatherSchema,
  hourlyForecast: hourlyForecastSchema,
  dailyForecast: dailyForecastSchema,
  aiInsights: aiInsightsSchema,
  climateIndicators: climateIndicatorsSchema,
  temperatureTrends: temperatureTrendsSchema,
  forecastAccuracy: forecastAccuracySchema,
});

export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
