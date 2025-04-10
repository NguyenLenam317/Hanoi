import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchAirQualityData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { getWeatherIcon, getAqiCategory } from "@/lib/utils";

export default function Home() {
  const { data: weatherData, isLoading: isLoadingWeather } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  const { data: airQualityData, isLoading: isLoadingAir } = useQuery({
    queryKey: ['/api/air-quality'],
    queryFn: fetchAirQualityData,
  });

  const isLoading = isLoadingWeather || isLoadingAir;

  return (
    <div className="container mx-auto py-6 px-4">
      <section className="mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            EcoSense
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Your comprehensive resource for weather data, climate information, and living recommendations for Hanoi, Vietnam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))
          ) : (
            <>
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2">thermostat</span>
                    Current Weather
                  </CardTitle>
                  <CardDescription className="text-blue-100">Hanoi, Vietnam</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="text-5xl font-bold text-gray-800 dark:text-gray-200 mr-4">
                      {Math.round(weatherData?.current.temperature_2m || 0)}°C
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Feels like {Math.round(weatherData?.current.apparent_temperature || 0)}°C
                      </span>
                      <span className="material-icons text-4xl text-primary-500">
                        {getWeatherIcon(weatherData?.current.weather_code || 0)}
                      </span>
                    </div>
                  </div>
                  <Link href="/weather-forecast">
                    <Button variant="link" className="p-0 h-auto mt-2">
                      View detailed forecast <span className="material-icons text-sm ml-1">chevron_right</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-red-500 to-pink-400 text-white">
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2">air</span>
                    Air Quality
                  </CardTitle>
                  <CardDescription className="text-red-100">Hanoi, Vietnam</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div 
                      className={`text-4xl font-bold mr-3 ${
                        (airQualityData?.current.european_aqi || 0) <= 40 ? 'text-green-500' :
                        (airQualityData?.current.european_aqi || 0) <= 70 ? 'text-yellow-500' :
                        (airQualityData?.current.european_aqi || 0) <= 100 ? 'text-orange-500' :
                        'text-red-500'
                      }`}
                    >
                      {airQualityData?.current.european_aqi || 0}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {getAqiCategory(airQualityData?.current.european_aqi || 0).category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        PM2.5: {Math.round(airQualityData?.current.pm2_5 || 0)} µg/m³
                      </span>
                    </div>
                  </div>
                  <Link href="/health-environment">
                    <Button variant="link" className="p-0 h-auto mt-2">
                      View health advice <span className="material-icons text-sm ml-1">chevron_right</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-green-500 to-teal-400 text-white">
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2">eco</span>
                    Sustainability
                  </CardTitle>
                  <CardDescription className="text-green-100">Eco-friendly living</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Get personalized tips for sustainable living in Hanoi based on current environmental conditions.
                  </div>
                  <Link href="/sustainability">
                    <Button variant="link" className="p-0 h-auto">
                      Explore sustainability <span className="material-icons text-sm ml-1">chevron_right</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-purple-500 to-indigo-400 text-white">
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2">smart_toy</span>
                    AI Assistant
                  </CardTitle>
                  <CardDescription className="text-purple-100">Get instant answers</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Ask questions about Hanoi's climate, weather patterns, and environmental conditions.
                  </div>
                  <Link href="/chatbot">
                    <Button variant="link" className="p-0 h-auto">
                      Chat with AI <span className="material-icons text-sm ml-1">chevron_right</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Explore Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon="calendar_today" 
            title="Weather Forecast" 
            description="Detailed daily and hourly forecasts, radar maps, and weather alerts specific to Hanoi."
            href="/weather-forecast"
            color="bg-blue-50 dark:bg-blue-900/10"
            iconColor="text-blue-500"
          />
          
          <FeatureCard 
            icon="trending_up" 
            title="Climate Change" 
            description="Explore historical climate data and trends, and see how climate change is affecting Hanoi."
            href="/climate-change"
            color="bg-amber-50 dark:bg-amber-900/10"
            iconColor="text-amber-500"
          />
          
          <FeatureCard 
            icon="health_and_safety" 
            title="Health & Environment" 
            description="Get health recommendations based on current air quality and weather conditions."
            href="/health-environment"
            color="bg-green-50 dark:bg-green-900/10"
            iconColor="text-green-500"
          />
          
          <FeatureCard 
            icon="insights" 
            title="Predictive Analysis" 
            description="Advanced forecasting for extreme weather events and seasonal changes."
            href="/predictive-analysis"
            color="bg-purple-50 dark:bg-purple-900/10"
            iconColor="text-purple-500"
          />
          
          <FeatureCard 
            icon="directions_run" 
            title="Recommendations" 
            description="Personalized clothing and activity recommendations based on current and forecast conditions."
            href="/recommendations"
            color="bg-red-50 dark:bg-red-900/10"
            iconColor="text-red-500"
          />
          
          <FeatureCard 
            icon="forum" 
            title="AI Assistant" 
            description="Chat with our AI assistant to get answers about Hanoi's climate and weather patterns."
            href="/chatbot"
            color="bg-indigo-50 dark:bg-indigo-900/10"
            iconColor="text-indigo-500"
          />
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 dark:from-primary-500/5 dark:to-primary-600/5 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">About This Project</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                EcoSense provides comprehensive, localized information specifically for Hanoi, Vietnam. 
                Using data from reliable weather sources and advanced AI, we deliver accurate forecasts, 
                air quality monitoring, and lifestyle recommendations tailored to Hanoi's unique climate.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our goal is to help residents and visitors make informed decisions about daily activities, 
                health precautions, and sustainable living options based on current and forecast environmental conditions.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Hanoi Coordinates</div>
                <div className="flex items-center text-gray-800 dark:text-gray-200 mb-1">
                  <span className="material-icons text-primary-500 mr-2 text-sm">place</span>
                  <span>Latitude: 21.0245°N</span>
                </div>
                <div className="flex items-center text-gray-800 dark:text-gray-200">
                  <span className="material-icons text-primary-500 mr-2 text-sm">place</span>
                  <span>Longitude: 105.8412°E</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, href, color, iconColor }: { 
  icon: string; 
  title: string; 
  description: string; 
  href: string;
  color: string;
  iconColor: string;
}) {
  return (
    <Link href={href}>
      <div className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors ${color}`}>
        <span className={`material-icons text-2xl ${iconColor} mb-3`}>{icon}</span>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}