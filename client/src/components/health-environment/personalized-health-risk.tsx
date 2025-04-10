import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUserPreferences } from "@/lib/user-preferences";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchAirQualityData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { UserSurveyData } from "@/components/survey/user-survey-modal";

/**
 * Risk level type for health risks
 */
interface HealthRisk {
  level: 'low' | 'moderate' | 'high' | 'severe';
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  borderColor: string;
}

/**
 * Personalized Health Risk Component
 * Displays health risks based on user preferences and current environmental conditions
 */
export function PersonalizedHealthRisk() {
  const [userPreferences, setUserPreferences] = useState<UserSurveyData | null>(null);
  const [healthRisks, setHealthRisks] = useState<HealthRisk[]>([]);
  
  // Fetch weather data
  const { data: weatherData, isLoading: isLoadingWeather, error: weatherError } = useQuery({
    queryKey: ['/api/weather/current'],
    queryFn: fetchWeatherData,
  });

  // Fetch air quality data
  const { data: airQualityData, isLoading: isLoadingAir, error: airError } = useQuery({
    queryKey: ['/api/weather/air-quality'],
    queryFn: fetchAirQualityData,
  });

  // Loading state
  const isLoading = isLoadingWeather || isLoadingAir;
  
  // Error state
  const error = weatherError || airError;

  // Get user preferences on component mount
  useEffect(() => {
    const prefs = getUserPreferences();
    setUserPreferences(prefs);
  }, []);

  // Calculate health risks based on user preferences and current conditions
  useEffect(() => {
    if (!userPreferences || !weatherData || !airQualityData) return;

    const risks: HealthRisk[] = [];
    
    // Current conditions
    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const uvIndex = weatherData.daily?.uv_index_max?.[0] || 0;
    const aqi = airQualityData.current.european_aqi;
    const pm25 = airQualityData.current.pm2_5;

    // Check for respiratory risks based on air quality if user has respiratory sensitivities
    if (userPreferences.healthConsiderations?.respiratorySensitivities) {
      if (aqi > 150 || pm25 > 55) {
        risks.push({
          level: 'severe',
          title: 'High Air Pollution Risk',
          description: 'Current air quality is hazardous for individuals with respiratory sensitivities. Consider staying indoors with air purification.',
          icon: 'air',
          color: 'border-red-500',
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          iconColor: 'text-red-500',
          textColor: 'text-red-700 dark:text-red-400',
          borderColor: 'border-red-200 dark:border-red-900/50'
        });
      } else if (aqi > 100 || pm25 > 35) {
        risks.push({
          level: 'high',
          title: 'Moderate Air Pollution Risk',
          description: 'Air quality may cause issues for those with respiratory conditions. Consider limiting prolonged outdoor exposure.',
          icon: 'air',
          color: 'border-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-950/30',
          iconColor: 'text-orange-500',
          textColor: 'text-orange-700 dark:text-orange-400',
          borderColor: 'border-orange-200 dark:border-orange-900/50'
        });
      } else if (aqi > 50 || pm25 > 12) {
        risks.push({
          level: 'moderate',
          title: 'Mild Air Quality Concern',
          description: 'Air quality is acceptable but may cause mild discomfort for very sensitive individuals.',
          icon: 'air',
          color: 'border-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
          iconColor: 'text-yellow-500',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          borderColor: 'border-yellow-200 dark:border-yellow-900/50'
        });
      }
    }

    // Check for heat-related risks if user has heat sensitivity
    if (userPreferences.healthConsiderations?.heatSensitivity) {
      if (temp > 35) {
        risks.push({
          level: 'severe',
          title: 'Extreme Heat Alert',
          description: 'Temperatures are dangerously high for those with heat sensitivity. Stay in air-conditioned spaces and keep hydrated.',
          icon: 'thermostat',
          color: 'border-red-500',
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          iconColor: 'text-red-500',
          textColor: 'text-red-700 dark:text-red-400',
          borderColor: 'border-red-200 dark:border-red-900/50'
        });
      } else if (temp > 30 && humidity > 80) {
        risks.push({
          level: 'high',
          title: 'Heat & Humidity Warning',
          description: 'High temperature combined with humidity increases risk of heat-related illness. Take frequent breaks and stay hydrated.',
          icon: 'humidity_high',
          color: 'border-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-950/30',
          iconColor: 'text-orange-500',
          textColor: 'text-orange-700 dark:text-orange-400',
          borderColor: 'border-orange-200 dark:border-orange-900/50'
        });
      } else if (temp > 30) {
        risks.push({
          level: 'moderate',
          title: 'Elevated Temperature Alert',
          description: 'Temperatures are elevated and may cause discomfort. Consider indoor activities during peak heat hours.',
          icon: 'thermostat',
          color: 'border-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
          iconColor: 'text-yellow-500',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          borderColor: 'border-yellow-200 dark:border-yellow-900/50'
        });
      }
    }

    // Check for UV-related risks if user has UV sensitivity
    if (userPreferences.healthConsiderations?.uvSensitivity) {
      if (uvIndex > 10) {
        risks.push({
          level: 'severe',
          title: 'Extreme UV Radiation',
          description: 'UV levels are extremely high and dangerous for sensitive skin. Avoid direct sun exposure and use protective measures.',
          icon: 'wb_sunny',
          color: 'border-red-500',
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          iconColor: 'text-red-500',
          textColor: 'text-red-700 dark:text-red-400',
          borderColor: 'border-red-200 dark:border-red-900/50'
        });
      } else if (uvIndex > 7) {
        risks.push({
          level: 'high',
          title: 'High UV Exposure Risk',
          description: 'UV index is high. Wear protective clothing, sunglasses, and apply SPF 30+ sunscreen.',
          icon: 'wb_sunny',
          color: 'border-orange-500',
          bgColor: 'bg-orange-50 dark:bg-orange-950/30',
          iconColor: 'text-orange-500',
          textColor: 'text-orange-700 dark:text-orange-400',
          borderColor: 'border-orange-200 dark:border-orange-900/50'
        });
      } else if (uvIndex > 5) {
        risks.push({
          level: 'moderate',
          title: 'Moderate UV Levels',
          description: 'UV levels are moderate. Apply SPF 15+ sunscreen and consider wearing a hat during peak sun hours.',
          icon: 'wb_sunny',
          color: 'border-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
          iconColor: 'text-yellow-500',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          borderColor: 'border-yellow-200 dark:border-yellow-900/50'
        });
      }
    }

    // Activity timing based risks
    if (userPreferences.activityTiming && weatherData.hourly) {
      // Check if user prefers morning activities
      if (userPreferences.activityTiming === 'morning') {
        const morningHours = weatherData.hourly.time.slice(6, 10); // 6am to 10am
        const morningTemps = weatherData.hourly.temperature_2m.slice(6, 10);
        const morningPrecip = weatherData.hourly.precipitation_probability?.slice(6, 10);
        
        // Check if morning has high rain probability
        if (morningPrecip && morningPrecip.some(prob => prob > 70)) {
          risks.push({
            level: 'moderate',
            title: 'Morning Activity Disruption',
            description: 'High chance of rain during your preferred morning activity time. Consider indoor alternatives or postponing.',
            icon: 'water_drop',
            color: 'border-blue-500',
            bgColor: 'bg-blue-50 dark:bg-blue-950/30',
            iconColor: 'text-blue-500',
            textColor: 'text-blue-700 dark:text-blue-400',
            borderColor: 'border-blue-200 dark:border-blue-900/50'
          });
        }
      }
      
      // Check if user prefers afternoon activities
      if (userPreferences.activityTiming === 'afternoon') {
        const afternoonHours = weatherData.hourly.time.slice(12, 17); // 12pm to 5pm
        const afternoonTemps = weatherData.hourly.temperature_2m.slice(12, 17);
        
        // Check if afternoon has extreme heat
        if (afternoonTemps.some(temp => temp > 33)) {
          risks.push({
            level: 'moderate',
            title: 'Afternoon Heat Caution',
            description: 'High temperatures during your preferred afternoon activity time. Consider earlier or later activities or choose shaded locations.',
            icon: 'thermostat',
            color: 'border-yellow-500',
            bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
            iconColor: 'text-yellow-500',
            textColor: 'text-yellow-700 dark:text-yellow-400',
            borderColor: 'border-yellow-200 dark:border-yellow-900/50'
          });
        }
      }
    }

    // Outdoor activity preferences
    if (userPreferences.outdoorActivities) {
      // For those who enjoy running
      if (userPreferences.outdoorActivities.running && (aqi > 100 || temp > 32)) {
        risks.push({
          level: 'moderate',
          title: 'Running Conditions Alert',
          description: 'Current conditions may be challenging for running. Consider reducing intensity or choosing a different activity today.',
          icon: 'directions_run',
          color: 'border-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
          iconColor: 'text-yellow-500',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          borderColor: 'border-yellow-200 dark:border-yellow-900/50'
        });
      }
      
      // For those who enjoy gardening
      if (userPreferences.outdoorActivities.gardening && weatherData.hourly) {
        const hasThunderstorm = weatherData.hourly.weather_code?.some(code => code >= 95 && code <= 99);
        if (hasThunderstorm) {
          risks.push({
            level: 'high',
            title: 'Gardening Safety Alert',
            description: 'Thunderstorms are forecasted today. Avoid gardening during storm activity for safety.',
            icon: 'thunderstorm',
            color: 'border-orange-500',
            bgColor: 'bg-orange-50 dark:bg-orange-950/30',
            iconColor: 'text-orange-500',
            textColor: 'text-orange-700 dark:text-orange-400',
            borderColor: 'border-orange-200 dark:border-orange-900/50'
          });
        }
      }
    }

    // If no risks were found but user has preferences, add a low risk general message
    if (risks.length === 0 && (
      userPreferences.healthConsiderations?.respiratorySensitivities ||
      userPreferences.healthConsiderations?.heatSensitivity ||
      userPreferences.healthConsiderations?.uvSensitivity
    )) {
      risks.push({
        level: 'low',
        title: 'Favorable Conditions',
        description: 'Current environmental conditions are favorable for your health considerations and activities.',
        icon: 'check_circle',
        color: 'border-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950/30',
        iconColor: 'text-green-500',
        textColor: 'text-green-700 dark:text-green-400',
        borderColor: 'border-green-200 dark:border-green-900/50'
      });
    }

    // Sort risks by severity
    const riskOrder = { 'severe': 0, 'high': 1, 'moderate': 2, 'low': 3 };
    risks.sort((a, b) => riskOrder[a.level] - riskOrder[b.level]);
    
    setHealthRisks(risks);
  }, [userPreferences, weatherData, airQualityData]);

  // Show loading state
  if (isLoading) {
    return <HealthRiskSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Health Risk Assessment</CardTitle>
          <CardDescription>Based on your health preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <span className="material-icons mr-2">error</span>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Unable to load health risk data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Show when no user preferences are available
  if (!userPreferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Health Risk Assessment</CardTitle>
          <CardDescription>Complete the survey to see personalized health risks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <span className="material-icons text-4xl mb-2">person_search</span>
            <p>No personalization data available. Please complete the user survey to receive personalized health risk assessments.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No risks to display
  if (healthRisks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Health Risk Assessment</CardTitle>
          <CardDescription>Based on your health preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
            <span className="material-icons text-green-500 mr-2">check_circle</span>
            <AlertTitle className="text-green-700 dark:text-green-400">All Clear</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Current conditions don't present any significant health risks based on your preferences.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Show health risks
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="material-icons">health_and_safety</span>
          <span>Your Health Risk Assessment</span>
        </CardTitle>
        <CardDescription>Personalized based on your health preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthRisks.map((risk, index) => (
          <Alert 
            key={index} 
            className={`${risk.bgColor} border ${risk.borderColor}`}
          >
            <span className={`material-icons ${risk.iconColor} mr-2`}>{risk.icon}</span>
            <AlertTitle className={risk.textColor}>{risk.title}</AlertTitle>
            <AlertDescription className={risk.textColor}>
              {risk.description}
            </AlertDescription>
          </Alert>
        ))}
        
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p className="flex items-center">
            <span className="material-icons text-sm mr-1">info</span>
            This assessment is based on your health preferences and current environmental conditions. 
            Update your preferences in settings for more tailored recommendations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton component for loading state
function HealthRiskSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
        <CardDescription><Skeleton className="h-4 w-64" /></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 mt-6" />
      </CardContent>
    </Card>
  );
}