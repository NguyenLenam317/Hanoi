import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchAirQualityData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAqiCategory } from "@/lib/utils";

export function HealthRecommendations() {
  const { data: weatherData, isLoading: isLoadingWeather, error: weatherError } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  const { data: airQualityData, isLoading: isLoadingAir, error: airError } = useQuery({
    queryKey: ['/api/air-quality'],
    queryFn: fetchAirQualityData,
  });

  const isLoading = isLoadingWeather || isLoadingAir;
  const error = weatherError || airError;

  if (isLoading) return <HealthRecommendationsSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Health Recommendations</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading health data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentWeather = weatherData?.current;
  const currentAir = airQualityData?.current;
  
  // Get AQI category information
  const aqiInfo = getAqiCategory(currentAir?.european_aqi || 0);

  // Define health risk categories based on conditions
  const healthRisks = [
    {
      id: 'heat',
      active: (currentWeather?.temperature_2m || 0) >= 32,
      severity: (currentWeather?.temperature_2m || 0) >= 35 ? 'high' : 'medium',
      title: 'Heat Exposure',
      description: 'High temperatures can cause heat exhaustion or heat stroke.',
      icon: 'thermostat',
      recommendations: [
        'Stay hydrated by drinking plenty of water',
        'Avoid outdoor activities during peak heat (10am-4pm)',
        'Wear lightweight, light-colored, loose-fitting clothing',
        'Use fans or air conditioning when possible',
        'Take cool showers or baths if feeling overheated'
      ]
    },
    {
      id: 'air',
      active: (currentAir?.european_aqi || 0) > 50,
      severity: (currentAir?.european_aqi || 0) > 100 ? 'high' : 'medium',
      title: 'Air Quality Concerns',
      description: aqiInfo.healthImplications,
      icon: 'air',
      recommendations: [
        'Limit outdoor activities, especially if you have respiratory conditions',
        'Wear a proper mask (N95 or equivalent) when outdoors',
        'Keep windows closed during peak pollution hours',
        'Use air purifiers indoors if available',
        'Stay hydrated to help your body remove inhaled particles'
      ]
    },
    {
      id: 'humidity',
      active: (currentWeather?.relative_humidity_2m || 0) >= 80,
      severity: 'medium',
      title: 'High Humidity',
      description: 'High humidity makes it harder for the body to cool down and can worsen heat-related issues.',
      icon: 'humidity_high',
      recommendations: [
        'Use dehumidifiers indoors if available',
        'Drink extra water to compensate for increased perspiration',
        'Wear moisture-wicking clothing',
        'Take breaks in air-conditioned environments',
        'Be alert for signs of heat exhaustion, which can happen faster in humid conditions'
      ]
    },
    {
      id: 'uv',
      active: (weatherData?.daily?.uv_index_max[0] || 0) >= 7,
      severity: (weatherData?.daily?.uv_index_max[0] || 0) >= 10 ? 'high' : 'medium',
      title: 'UV Radiation',
      description: 'High UV levels can cause skin damage, sunburn, and increase risk of skin cancer.',
      icon: 'wb_sunny',
      recommendations: [
        'Apply broad-spectrum SPF 30+ sunscreen every 2 hours',
        'Wear protective clothing, hats, and sunglasses',
        'Seek shade during peak UV hours (10am-4pm)',
        'Be extra careful around reflective surfaces like water',
        'Remember that UV damage occurs even on cloudy days'
      ]
    },
    {
      id: 'rain',
      active: (currentWeather?.precipitation || 0) > 10,
      severity: (currentWeather?.precipitation || 0) > 25 ? 'high' : 'medium',
      title: 'Heavy Rainfall',
      description: 'Heavy rain can lead to flooding, slippery surfaces, and poor visibility.',
      icon: 'rainy',
      recommendations: [
        'Avoid areas prone to flooding',
        'Drive carefully with reduced speed and increased following distance',
        'Wear waterproof clothing and proper footwear',
        'Be cautious of slippery surfaces to prevent falls',
        'Stay indoors during thunderstorms or extremely heavy downpours'
      ]
    }
  ];

  // Filter active health risks
  const activeRisks = healthRisks.filter(risk => risk.active);

  // General health recommendations based on current season
  const generalRecommendations = [
    'Stay updated on weather forecasts to plan activities accordingly',
    'Maintain a balanced diet rich in fruits and vegetables',
    'Ensure adequate sleep (7-8 hours) for immune system support',
    'Wash hands frequently to prevent common illnesses',
    'Keep emergency contacts and medical information accessible'
  ];

  // Special recommendations for vulnerable groups
  const vulnerableGroupsRecommendations = [
    {
      group: 'Children',
      recommendations: [
        'Ensure children drink water regularly, even if not thirsty',
        'Apply sunscreen more frequently on children\'s sensitive skin',
        'Keep children indoors during poor air quality days',
        'Watch for signs of heat illness, as children may not recognize symptoms',
        'Ensure proper hydration before, during, and after physical activities'
      ]
    },
    {
      group: 'Elderly',
      recommendations: [
        'Check in regularly on elderly individuals, especially those living alone',
        'Ensure air conditioning or fans are working during hot days',
        'Recommend staying indoors during extreme weather conditions',
        'Help with errands during poor air quality days',
        'Ensure medications are stored properly (some require specific temperature ranges)'
      ]
    },
    {
      group: 'People with Pre-existing Conditions',
      recommendations: [
        'Consult healthcare providers about adjusting medication or treatment plans during extreme weather',
        'Keep a longer supply of essential medications during monsoon season',
        'Monitor symptoms more closely during high pollution episodes',
        'Have emergency contact information readily available',
        'Consider wearing medical alert bracelets if conditions could be affected by weather'
      ]
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="material-icons text-red-500 mr-2">favorite</span>
          Health Recommendations
        </CardTitle>
        <CardDescription>Based on current Hanoi weather and air quality conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="warnings" className="w-full">
          <TabsList className="mb-4 grid grid-cols-3">
            <TabsTrigger value="warnings">Active Warnings</TabsTrigger>
            <TabsTrigger value="general">General Health</TabsTrigger>
            <TabsTrigger value="vulnerable">Vulnerable Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="warnings">
            {activeRisks.length > 0 ? (
              <div className="space-y-4">
                {activeRisks.map((risk) => (
                  <Alert key={risk.id} className={
                    risk.severity === 'high' 
                      ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/10' 
                      : 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-900/10'
                  }>
                    <span className={`material-icons mr-2 ${
                      risk.severity === 'high' ? 'text-red-500 dark:text-red-400' : 'text-amber-500 dark:text-amber-400'
                    }`}>{risk.icon}</span>
                    <AlertTitle className={
                      risk.severity === 'high' ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'
                    }>{risk.title}</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2 text-gray-700 dark:text-gray-300">{risk.description}</p>
                      <ul className="text-sm space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
                        {risk.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-md">
                <div className="flex items-start">
                  <span className="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
                  <div>
                    <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">No Active Health Warnings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Current weather and air quality conditions in Hanoi are not associated with significant health risks. 
                      Continue to follow general health guidelines.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="general">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <span className="material-icons text-blue-600 dark:text-blue-400 mr-2">tips_and_updates</span>
                  General Health Recommendations
                </h3>
                <ul className="text-sm space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                  {generalRecommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <span className="material-icons text-blue-600 dark:text-blue-400 mr-2">medical_services</span>
                  Recognize The Symptoms
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Heat Exhaustion:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Heavy sweating</li>
                      <li>Cold, pale, clammy skin</li>
                      <li>Fast, weak pulse</li>
                      <li>Nausea or vomiting</li>
                      <li>Muscle cramps</li>
                      <li>Dizziness</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Air Quality Reactions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Irritation of eyes, nose, throat</li>
                      <li>Coughing or wheezing</li>
                      <li>Shortness of breath</li>
                      <li>Chest tightness</li>
                      <li>Headaches</li>
                      <li>Fatigue</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vulnerable">
            <div className="space-y-4">
              {vulnerableGroupsRecommendations.map((group, index) => (
                <div key={index} className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 p-4 rounded-md">
                  <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                    Special Recommendations for {group.group}
                  </h3>
                  <ul className="text-sm space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                    {group.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function HealthRecommendationsSkeleton() {
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
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-md p-4">
              <div className="flex items-start">
                <Skeleton className="h-6 w-6 rounded-full mr-2" />
                <div className="w-full">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}