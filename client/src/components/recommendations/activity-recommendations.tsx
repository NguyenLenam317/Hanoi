import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchWeatherData, fetchAirQualityData, getEnhancedActivityRecommendations, ActivityPreferences, EnhancedActivityRecommendations } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getActivityRecommendation } from "@/lib/utils";
import { getUserPreferencesContext } from "@/lib/user-preferences";
import { useState, useEffect } from "react";

export function ActivityRecommendations() {
  const [aiRecommendations, setAiRecommendations] = useState<EnhancedActivityRecommendations | null>(null);
  
  const { data: weatherData, isLoading: isLoadingWeather, error: weatherError } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  const { data: airQualityData, isLoading: isLoadingAir, error: airError } = useQuery({
    queryKey: ['/api/air-quality'],
    queryFn: fetchAirQualityData,
  });
  
  // Get AI-powered personalized recommendations
  const aiRecommendationsMutation = useMutation({
    mutationFn: (preferences: ActivityPreferences) => {
      return getEnhancedActivityRecommendations(preferences);
    },
    onSuccess: (data) => {
      setAiRecommendations(data);
    }
  });
  
  // Use effect to fetch AI recommendations when weather and air quality data are available
  useEffect(() => {
    if (weatherData && airQualityData && !aiRecommendations && !aiRecommendationsMutation.isPending) {
      // Get user preferences context if available
      const userPrefsContext = getUserPreferencesContext();
      
      // Fetch personalized recommendations
      aiRecommendationsMutation.mutate({
        userPreferencesContext: userPrefsContext
      });
    }
  }, [weatherData, airQualityData, aiRecommendations, aiRecommendationsMutation]);
  
  const isLoading = isLoadingWeather || isLoadingAir || aiRecommendationsMutation.isPending;
  const error = weatherError || airError;

  if (isLoading) return <ActivityRecommendationsSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Activity Recommendations</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentWeather = weatherData?.current;
  const currentAir = airQualityData?.current;
  
  // Get recommendation based on current conditions
  const recommendation = getActivityRecommendation(
    currentWeather?.temperature_2m || 0,
    currentWeather?.precipitation_probability || 0,
    weatherData?.daily?.uv_index_max[0] || 0,
    currentAir?.european_aqi || 0
  );
  
  // Determine outdoor activity rating (0-5) based on conditions
  const getActivityRating = () => {
    let score = 5; // Start with perfect score
    
    // Get values with defaults to prevent undefined errors
    const temp = currentWeather?.temperature_2m ?? 25;
    const precipProb = currentWeather?.precipitation_probability ?? 0;
    const windSpeed = currentWeather?.wind_speed_10m ?? 0;
    const uvIndex = weatherData?.daily?.uv_index_max[0] ?? 5;
    const aqiValue = currentAir?.european_aqi ?? 50;
    
    // Temperature factors
    if (temp > 35) score -= 3;
    else if (temp > 30) score -= 1.5;
    else if (temp < 15) score -= 1;
    
    // Rain factors
    if (precipProb > 70) score -= 2.5;
    else if (precipProb > 40) score -= 1.5;
    
    // Wind factors
    if (windSpeed > 40) score -= 2;
    else if (windSpeed > 25) score -= 1;
    
    // UV factors
    if (uvIndex > 10) score -= 1.5;
    else if (uvIndex > 7) score -= 0.5;
    
    // Air quality factors
    if (aqiValue > 150) score -= 3;
    else if (aqiValue > 100) score -= 2;
    else if (aqiValue > 50) score -= 0.5;
    
    return Math.max(0, Math.round(score));
  };
  
  const activityRating = getActivityRating();
  
  // Define activity suggestions based on current conditions
  const getActivitySuggestions = () => {
    const season = (() => {
      const month = new Date().getMonth() + 1;
      if (month >= 3 && month <= 5) return "spring";
      if (month >= 6 && month <= 8) return "summer";
      if (month >= 9 && month <= 11) return "autumn";
      return "winter";
    })();
    
    // Get values with defaults to prevent undefined errors
    const temp = currentWeather?.temperature_2m ?? 25;
    const precipProb = currentWeather?.precipitation_probability ?? 0;
    const aqiValue = currentAir?.european_aqi ?? 50;
    
    const isHot = temp > 30;
    const isRainy = precipProb > 40;
    const isPoorAir = aqiValue > 100;
    
    const suggestions = [];
    
    // Outdoor activities
    if (activityRating >= 3) {
      if (season === "spring") {
        suggestions.push("Visit Hanoi Botanical Garden");
        suggestions.push("Explore Hoan Kiem Lake and surrounding parks");
      } else if (season === "summer" && !isHot) {
        suggestions.push("Morning bicycle tour around West Lake");
        suggestions.push("Early morning or evening walking tours of Old Quarter");
      } else if (season === "autumn") {
        suggestions.push("Day trip to Ba Vi National Park");
        suggestions.push("Explore Perfume Pagoda");
      } else if (season === "winter") {
        suggestions.push("Walking tour of Hanoi's French Quarter");
        suggestions.push("Visit historical sites like Temple of Literature");
      }
    }
    
    // Indoor activities
    if (isHot || isRainy || isPoorAir || activityRating < 3) {
      suggestions.push("Visit Vietnam National Museum");
      suggestions.push("Explore Hanoi's art galleries");
      suggestions.push("Enjoy traditional Vietnamese coffee shops");
      suggestions.push("Take a Vietnamese cooking class");
      suggestions.push("Shopping at indoor markets or malls");
    }
    
    // Evening activities
    suggestions.push("Attend water puppet theater performance");
    suggestions.push("Try local cuisine at indoor restaurants");
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
  };

  // Get star rating display
  const getStarRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="material-icons text-xl">
          {i < rating ? "star" : "star_border"}
        </span>
      );
    }
    return stars;
  };
  
  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500 dark:text-green-400";
    if (rating >= 2) return "text-amber-500 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  const activitySuggestions = getActivitySuggestions();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="material-icons text-primary-500 mr-2">directions_run</span>
          Activity Recommendations
        </CardTitle>
        <CardDescription>
          {aiRecommendations ? "Personalized for your preferences" : "Based on current Hanoi weather conditions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Outdoor Activity Rating</h3>
            <div className="flex items-center">
              <div className={`flex ${getRatingColor(activityRating)}`}>
                {getStarRating(activityRating)}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{recommendation}</p>
        </div>
        
        {aiRecommendations ? (
          <div>
            {/* AI-powered recommendations */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="material-icons text-primary-500 mr-2 text-base">wb_sunny</span>
                Outdoor Activities
              </h3>
              <ul className="space-y-2">
                {Array.isArray(aiRecommendations?.outdoorRecommendations) ? (
                  aiRecommendations.outdoorRecommendations.map((activity, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="material-icons text-primary-500 mr-2 text-base">check_circle</span>
                      <span>{activity}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">No outdoor recommendations available</li>
                )}
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="material-icons text-primary-500 mr-2 text-base">home</span>
                Indoor Activities
              </h3>
              <ul className="space-y-2">
                {Array.isArray(aiRecommendations?.indoorRecommendations) ? (
                  aiRecommendations.indoorRecommendations.map((activity, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="material-icons text-primary-500 mr-2 text-base">check_circle</span>
                      <span>{activity}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">No indoor recommendations available</li>
                )}
              </ul>
            </div>
            
            {Array.isArray(aiRecommendations?.precautions) && aiRecommendations.precautions.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-3 flex items-center text-amber-700 dark:text-amber-400">
                  <span className="material-icons mr-2 text-base">warning</span>
                  Precautions
                </h3>
                <ul className="space-y-2">
                  {aiRecommendations.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="material-icons text-amber-500 mr-2 text-base">info</span>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/10 rounded-md text-sm text-gray-600 dark:text-gray-400">
              <span className="material-icons text-primary-500 dark:text-primary-400 text-base align-text-bottom mr-1">schedule</span>
              <span className="font-medium">Best time for outdoor activities:</span> {aiRecommendations?.bestTimeForOutdoor || "Not available"}
            </div>
          </div>
        ) : (
          <div>
            {/* Fallback static recommendations */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium mb-3">Recommended Activities Today</h3>
              <ul className="space-y-2">
                {activitySuggestions.map((activity, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="material-icons text-primary-500 mr-2 text-base">check_circle</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-md text-sm text-gray-600 dark:text-gray-400">
          <span className="material-icons text-blue-500 dark:text-blue-400 text-base align-text-bottom mr-1">info</span>
          Recommendations based on current temperature of {Math.round(currentWeather?.temperature_2m ?? 0)}°C, {currentWeather?.precipitation_probability ?? 0}% chance of rain, and air quality index of {currentAir?.european_aqi ?? 'N/A'}.
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityRecommendationsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Skeleton className="h-6 w-6 rounded-full mr-2" />
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
        
        <Skeleton className="h-48 w-full rounded-lg" />
        
        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}