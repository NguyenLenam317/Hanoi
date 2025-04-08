import { AIInsights } from "@shared/schema";

// Cache for AI insights to avoid redundant API calls
const insightsCache = new Map<string, { data: AIInsights, timestamp: number }>();
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Generates weather analysis and insights using OpenRouter AI
 * @param weatherData Weather data to analyze
 * @returns AI-generated weather insights
 */
export async function getWeatherAnalysis(weatherData: any): Promise<AIInsights> {
  // Generate cache key from date and location
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `${today}_${weatherData.location?.name || 'hanoi'}`;
  
  // Check cache
  const cachedInsights = insightsCache.get(cacheKey);
  if (cachedInsights && (Date.now() - cachedInsights.timestamp) < CACHE_EXPIRY) {
    return cachedInsights.data;
  }
  
  try {
    // Hard-code the API key provided (normally we would use environment variables for this)
    const apiKey = "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";
    
    // Prepare weather data summary for the AI
    const weatherSummary = prepareWeatherSummary(weatherData);
    
    // Create prompt for the AI model - simplified to reduce token usage
    const prompt = `
      As a meteorologist, analyze Hanoi's weather data and provide concise insights on:
      
      1. Current Weather Analysis: Current conditions and impact on daily life.
      
      2. Weather Pattern Insights: Short-term forecast and patterns over next few days.
      
      3. Climate Change Indicators: Compare current data with historical averages and discuss climate trends.
      
      Be concise but informative. Hanoi weather data:
      ${weatherSummary}
    `;
    
    // Make API call to OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.REPLIT_DOMAINS ? process.env.REPLIT_DOMAINS : 'localhost',
        'X-Title': 'WeatherWizard Hanoi'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-opus', // Use a powerful model for detailed weather analysis
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.3, // Low temperature for more factual responses
        max_tokens: 400 // Reduced from 1000 to stay within API limits
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log("OpenRouter API response structure:", Object.keys(data));
    
    // Check if we have an error response
    if (data.error) {
      console.warn("OpenRouter API error:", data.error.message);
      throw new Error(`OpenRouter API error: ${data.error.message}`);
    }
    
    // Check if we have a valid response with choices
    let aiResponse = "";
    if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
      aiResponse = data.choices[0].message.content;
      console.log("Successfully received AI response");
    } else {
      console.warn("Unexpected API response structure:", data);
      throw new Error("Invalid AI response format");
    }
    
    // Parse the sections from AI response
    const insights = parseAIResponse(aiResponse);
    
    // Cache the insights
    insightsCache.set(cacheKey, {
      data: insights,
      timestamp: Date.now()
    });
    
    return insights;
    
  } catch (error) {
    console.error("Error getting AI weather analysis:", error);
    
    // Return fallback insights if AI fails
    return getFallbackInsights(weatherData);
  }
}

/**
 * Prepares a weather summary for the AI model
 */
function prepareWeatherSummary(weatherData: any): string {
  if (!weatherData || !weatherData.current) {
    return "Weather data unavailable";
  }
  
  const { current, hourlyForecast, dailyForecast, climateIndicators } = weatherData;
  
  // Simplified summary to reduce token usage
  return `
    Current: ${current.temperature}°C (feels like ${current.feelsLike}°C), ${current.description}, Humidity ${current.humidity}%, Wind ${current.wind} km/h
    
    Today's Forecast: 
    ${hourlyForecast.slice(0, 3).map((hour: any) => 
      `${hour.time}: ${hour.temperature}°C, rain ${hour.rainChance}%`
    ).join('; ')}
    
    Next 3 Days: 
    ${dailyForecast.slice(0, 3).map((day: any) => 
      `${day.name}: High ${day.maxTemp}°C, Low ${day.minTemp}°C`
    ).join('; ')}
    
    Climate Indicators: Temp +${climateIndicators.temperatureAnomaly}°C, Rain +${climateIndicators.precipitationChange}%, Extreme events +${climateIndicators.extremeEvents}%
  `;
}

/**
 * Parses the AI response into structured sections
 */
function parseAIResponse(aiResponse: string): AIInsights {
  try {
    // Default fallback values
    let currentAnalysis = "Analysis unavailable";
    let patternInsights = "Forecast unavailable";
    let climateChangeIndicators = "Climate data unavailable";
    
    // Extract content between section headers
    const currentMatch = aiResponse.match(/Current Weather Analysis:?([\s\S]*?)(?=Weather Pattern Insights:|$)/i);
    const patternMatch = aiResponse.match(/Weather Pattern Insights:?([\s\S]*?)(?=Climate Change Indicators:|$)/i);
    const climateMatch = aiResponse.match(/Climate Change Indicators:?([\s\S]*?)(?=$)/i);
    
    if (currentMatch && currentMatch[1]) {
      currentAnalysis = currentMatch[1].trim();
    }
    
    if (patternMatch && patternMatch[1]) {
      patternInsights = patternMatch[1].trim();
    }
    
    if (climateMatch && climateMatch[1]) {
      climateChangeIndicators = climateMatch[1].trim();
    }
    
    return {
      current: currentAnalysis,
      patterns: patternInsights,
      climateChange: climateChangeIndicators
    };
    
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return getFallbackInsights({});
  }
}

/**
 * Provides fallback insights when AI analysis fails
 */
function getFallbackInsights(weatherData: any): AIInsights {
  // Simple fallback text based on available weather data
  const temp = weatherData?.current?.temperature || "unknown";
  const condition = weatherData?.current?.description || "unclear conditions";
  
  return {
    current: `Hanoi is currently experiencing ${condition} with a temperature of ${temp}°C. The day is generally warm and humid, typical for this time of year.`,
    patterns: `The forecast shows relatively stable weather for the next few days. Temperatures will remain consistent with today's readings, with some potential for changing conditions later in the week.`,
    climateChange: `Recent temperature readings in Hanoi remain in line with the warming trend observed throughout Southeast Asia. Ongoing monitoring is important to understand long-term climate patterns in the region.`
  };
}
