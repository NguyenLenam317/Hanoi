import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchAirQualityData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonalizedHealthRisk } from "@/components/health-environment/personalized-health-risk";
import { useEffect, useState } from "react";
import { getUserPreferences } from "@/lib/user-preferences";
import { UserSurveyData } from "@/components/survey/user-survey-modal";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/**
 * Health Environment Page
 * Displays personalized health information and environmental data relevant to the user
 */
export default function HealthEnvironmentPage() {
  const [userPreferences, setUserPreferences] = useState<UserSurveyData | null>(null);
  const [aiGeneratedAdvice, setAiGeneratedAdvice] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<boolean>(false);

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

  // Fetch personalized health advice from AI when weather and air quality data are available
  useEffect(() => {
    if (!weatherData || !airQualityData || !userPreferences) return;

    const fetchPersonalizedAdvice = async () => {
      try {
        setIsLoadingAi(true);
        setAiError(false);

        // Create context for AI request
        const context = createUserPreferencesContext(userPreferences);
        
        // Mock AI response for now - this would be replaced with actual AI API call
        // Example response that would be returned by AI
        setAiGeneratedAdvice(`Based on current conditions and your preferences, here are some personalized health recommendations for Hanoi today:

If you have heat sensitivity as indicated in your preferences, consider staying in air-conditioned environments during peak afternoon hours when temperatures are highest.

Given the current air quality index of ${airQualityData?.current?.european_aqi || 'N/A'}, individuals with respiratory sensitivities should consider wearing a mask when outdoors for extended periods.

For your preferred morning activities, the UV index is currently ${weatherData?.daily?.uv_index_max?.[0] || 'N/A'}, so apply appropriate sun protection if you'll be outdoors.

Stay well-hydrated given the current temperature of ${Math.round(weatherData?.current?.temperature_2m || 0)}°C and humidity levels.`);
      } catch (err) {
        console.error('Error fetching AI health advice:', err);
        setAiError(true);
        setAiGeneratedAdvice('Unable to generate personalized health advice at this time. Please check back later.');
      } finally {
        setIsLoadingAi(false);
      }
    };

    fetchPersonalizedAdvice();
  }, [weatherData, airQualityData, userPreferences]);

  // Helper function to create user preferences context string for AI
  function createUserPreferencesContext(preferences: UserSurveyData): string {
    if (!preferences) return '';

    let context = 'User Preferences:\n';
    
    // Add health considerations
    context += 'Health Considerations: ';
    if (preferences.healthConsiderations && preferences.healthConsiderations.length > 0) {
      context += preferences.healthConsiderations.join(', ');
    } else {
      context += 'None specified';
    }
    
    // Add preferred activities
    context += '\nPreferred Activities: ';
    if (preferences.preferredActivities && preferences.preferredActivities.length > 0) {
      context += preferences.preferredActivities.join(', ');
    } else {
      context += 'None specified';
    }
    
    // Add typical activity timing
    context += '\nTypical Activity Timing: ' + (preferences.activityTiming || 'Not specified');
    
    // Add location in Hanoi
    context += `\nLocation in Hanoi: ${preferences.location}\n`;
    
    // Add preferences for alerts
    context += 'Alert Preferences: ';
    if (preferences.alertPreferences && preferences.alertPreferences.length > 0) {
      context += preferences.alertPreferences.join(', ');
    } else {
      context += 'None specified';
    }
    
    return context;
  }

  return (
    <>
      <Navbar />
      <div className="container py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EcoSense Health & Environment</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Personalized health insights based on Hanoi's current environmental conditions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main column with personalized health risk assessment */}
          <div className="md:col-span-2 space-y-6">
            <PersonalizedHealthRisk />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-icons">medical_services</span>
                  <span>Your Health Advisory</span>
                </CardTitle>
                <CardDescription>Personalized recommendations based on current conditions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAi ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                ) : aiError ? (
                  <Alert variant="destructive">
                    <span className="material-icons mr-2">error</span>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Unable to load personalized health recommendations. Please try again later.
                    </AlertDescription>
                  </Alert>
                ) : !userPreferences ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <span className="material-icons text-4xl mb-2">person_search</span>
                    <p>Complete the user survey to receive personalized health recommendations.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aiGeneratedAdvice?.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-sm">{paragraph}</p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with environmental conditions */}
          <div className="space-y-6">
            <EnvironmentalConditions 
              weatherData={weatherData} 
              airQualityData={airQualityData} 
              isLoading={isLoading}
              error={error}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-icons">info</span>
                  <span>Health Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="material-icons text-primary">local_hospital</span>
                    <div>
                      <h4 className="font-medium">Emergency Services</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Medical Emergency: 115<br />
                        Police: 113<br />
                        Fire: 114
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="material-icons text-primary">healing</span>
                    <div>
                      <h4 className="font-medium">Hanoi Hospitals</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Vinmec International Hospital<br />
                        Bach Mai Hospital<br />
                        Saint Paul Hospital
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-icons text-primary">masks</span>
                    <div>
                      <h4 className="font-medium">Air Quality Protection</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        When AQI exceeds 100, consider wearing a N95/KN95 mask when outdoors
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Environmental Conditions Component
interface EnvironmentalConditionsProps {
  weatherData: any;
  airQualityData: any;
  isLoading: boolean;
  error: any;
}

function EnvironmentalConditions({ weatherData, airQualityData, isLoading, error }: EnvironmentalConditionsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-64" /></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Environmental Conditions</CardTitle>
          <CardDescription>Current weather and air quality</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <span className="material-icons mr-2">error</span>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Unable to load environmental data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData || !airQualityData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Environmental Conditions</CardTitle>
          <CardDescription>Current weather and air quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <span className="material-icons text-4xl mb-2">cloud_off</span>
            <p>Environmental data is not available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Function to determine AQI color
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-500";
    if (aqi <= 100) return "text-yellow-500";
    if (aqi <= 150) return "text-orange-500";
    if (aqi <= 200) return "text-red-500";
    if (aqi <= 300) return "text-purple-500";
    return "text-rose-700";
  };

  // Function to determine AQI text
  const getAqiText = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  // Function to determine temperature color
  const getTempColor = (temp: number) => {
    if (temp < 15) return "text-blue-500";
    if (temp < 25) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    if (temp < 35) return "text-orange-500";
    return "text-red-500";
  };

  // Function to determine UV index color and text
  const getUvInfo = (uv: number) => {
    if (uv < 3) return { color: "text-green-500", text: "Low" };
    if (uv < 6) return { color: "text-yellow-500", text: "Moderate" };
    if (uv < 8) return { color: "text-orange-500", text: "High" };
    if (uv < 11) return { color: "text-red-500", text: "Very High" };
    return { color: "text-purple-500", text: "Extreme" };
  };

  // Current values
  const temp = weatherData.current.temperature_2m;
  const humidity = weatherData.current.relative_humidity_2m;
  const aqi = airQualityData.current.european_aqi;
  const pm25 = airQualityData.current.pm2_5;
  const uvIndex = weatherData.daily?.uv_index_max?.[0] || 0;
  const uvInfo = getUvInfo(uvIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="material-icons">monitoring</span>
          Environmental Conditions
        </CardTitle>
        <CardDescription>Current weather and air quality in Hanoi</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="air">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="air" className="flex items-center gap-1">
              <span className="material-icons text-sm">air</span> Air Quality
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-1">
              <span className="material-icons text-sm">thermostat</span> Weather
            </TabsTrigger>
          </TabsList>
          <TabsContent value="air" className="space-y-4 mt-4">
            <div className="flex items-center justify-between bg-primary-50 dark:bg-primary-950/30 p-3 rounded-md">
              <div className="flex items-center">
                <span className="material-icons mr-2">air</span>
                <span>Air Quality Index</span>
              </div>
              <div className="text-xl font-semibold flex items-center">
                <span className={getAqiColor(aqi)}>{aqi}</span>
                <span className="text-sm font-normal ml-2">({getAqiText(aqi)})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">PM2.5</div>
                <div className="text-lg font-medium mt-1">{pm25} μg/m³</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">PM10</div>
                <div className="text-lg font-medium mt-1">{airQualityData.current.pm10} μg/m³</div>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="material-icons text-sm mr-1">info</span>
                <p>AQI is calculated based on pollutants including PM2.5, PM10, ozone, and other factors.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weather" className="space-y-4 mt-4">
            <div className="flex items-center justify-between bg-primary-50 dark:bg-primary-950/30 p-3 rounded-md">
              <div className="flex items-center">
                <span className="material-icons mr-2">thermostat</span>
                <span>Temperature</span>
              </div>
              <div className="text-xl font-semibold flex items-center">
                <span className={getTempColor(temp)}>{temp}°C</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
                <div className="text-lg font-medium mt-1">{humidity}%</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                <div className="text-sm text-gray-500 dark:text-gray-400">UV Index</div>
                <div className="text-lg font-medium mt-1 flex items-center">
                  <span className={uvInfo.color}>{uvIndex}</span>
                  <span className="text-sm font-normal ml-2">({uvInfo.text})</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="material-icons text-sm mr-1">info</span>
                <p>Weather data is updated every hour from Hanoi monitoring stations.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}