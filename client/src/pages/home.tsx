import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { fetchWeatherData, refreshWeatherData } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LucideCloudRain, 
  LucideCloud, 
  LucideBarChart3, 
  LucideThermometer,
  LucideCalendarDays,
  LucideLineChart,
  LucideRefreshCw,
  LucideMessageSquare,
  LucideWind
} from "lucide-react";
import { 
  WeatherResponse, 
  CurrentWeather as CurrentWeatherType,
  DailyForecastItem,
  ClimateIndicators as ClimateIndicatorsType,
  TemperatureTrend,
  ForecastAccuracy as ForecastAccuracyType,
  AIInsights as AIInsightsType
} from "@shared/schema";

// Layout components
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";

// Weather components
import CurrentWeather from "@/components/weather/CurrentWeather";
import WeeklyForecast from "@/components/weather/WeeklyForecast";
import AIInsights from "@/components/weather/AIInsights";
import ClimateIndicators from "@/components/weather/ClimateIndicators";
import PredictionAccuracy from "@/components/weather/PredictionAccuracy";
import TemperatureChart from "@/components/charts/TemperatureChart";
import EnvironmentalMetrics from "@/components/weather/EnvironmentalMetrics";
import ClimateChangeSuggestions from "@/components/weather/ClimateChangeSuggestions";
import ExtendedClimateData from "@/components/weather/ExtendedClimateData";
import ClimateAIInsights from "@/components/weather/ClimateAIInsights";

const Home: React.FC = () => {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);

  // Query to fetch weather data
  const { 
    data: weatherData = {} as Partial<WeatherResponse>, 
    isLoading, 
    error, 
    isError 
  } = useQuery<Partial<WeatherResponse>>({
    queryKey: ['/api/weather'],
    staleTime: 5 * 60 * 1000, // 5 minutes before considering data stale
  });

  // Tab state
  const [activeTab, setActiveTab] = useState("forecast");

  // Mutation to refresh weather data
  const { mutate: refreshData } = useMutation({
    mutationFn: () => refreshWeatherData({ location: "hanoi" }),
    onMutate: () => {
      setRefreshing(true);
      toast({
        title: "Refreshing data...",
        description: "Fetching the latest weather data for Hanoi.",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Data refreshed!",
        description: "Weather data has been updated successfully.",
      });
      // Update the query cache with the new data
      queryClient.setQueryData(['/api/weather'], data);
      setRefreshing(false);
    },
    onError: (error) => {
      toast({
        title: "Error refreshing data",
        description: "There was a problem fetching the latest weather data.",
        variant: "destructive",
      });
      setRefreshing(false);
    },
  });

  // Handle refresh button click
  const handleRefresh = () => {
    if (!refreshing) {
      refreshData();
    }
  };

  // Show error state if there's a problem fetching data
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <MobileMenu activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-grow pb-20 md:pb-0 flex items-center justify-center bg-background">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-secondary mb-4">Error Loading Weather Data</h2>
            <p className="text-gray-700 mb-4">
              There was a problem fetching the weather data. Please try again later.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Error details: {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'forecast':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-secondary">Weather Forecast</h2>
            
            {/* Current Weather */}
            <CurrentWeather 
              data={weatherData?.current || {
                temperature: 0,
                feelsLike: 0,
                description: '',
                icon: 'sunny',
                humidity: 0,
                wind: 0,
                pressure: 0,
                visibility: 0,
                sunrise: '',
                sunset: '',
                daytimePercent: 0
              }} 
              isLoading={isLoading} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Environmental Metrics (replaced Hourly Forecast) */}
              <EnvironmentalMetrics
                data={{
                  airQuality: weatherData?.current?.airQuality || 0,
                  airQualityDesc: weatherData?.current?.airQualityDesc || 'Unknown',
                  uvIndex: weatherData?.current?.uvIndex || 0,
                  uvDesc: weatherData?.current?.uvDesc || 'Low',
                  dustLevel: weatherData?.current?.dustLevel || 0,
                  dustDesc: weatherData?.current?.dustDesc || 'Low',
                  feelsLike: weatherData?.current?.feelsLike || 0
                }}
                isLoading={isLoading}
              />
              
              {/* Weekly Forecast */}
              <WeeklyForecast 
                data={weatherData?.dailyForecast || []} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        );
      
      case 'climate':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Climate Change Information</h2>
            
            {/* Main climate indicators */}
            <ClimateIndicators 
              data={weatherData?.climateIndicators || {
                temperatureAnomaly: 1.2,
                precipitationChange: 8,
                extremeEvents: 35
              }} 
              isLoading={isLoading} 
            />
            
            {/* Extended climate data section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ExtendedClimateData 
                data={weatherData?.climateIndicators || {
                  temperatureAnomaly: 1.2,
                  precipitationChange: 8,
                  extremeEvents: 35
                }}
                isLoading={isLoading}
              />
              <ClimateChangeSuggestions isLoading={isLoading} />
            </div>
            
            {/* AI-powered climate insights */}
            <div className="mt-6">
              <ClimateAIInsights isLoading={isLoading} />
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary mb-4">Historical Weather Data</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-medium text-secondary mb-3">Temperature Trends (Last 30 Days)</h3>
                {isLoading ? (
                  <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <div>
                    <TemperatureChart data={weatherData?.temperatureTrends || []} />
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-primary rounded-full mr-1"></span>
                        <span>Actual Temperature</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-warning rounded-full mr-1"></span>
                        <span>Historical Average</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'accuracy':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary mb-4">Prediction Accuracy</h2>
            
            <PredictionAccuracy 
              data={weatherData?.forecastAccuracy || {
                day1: 95,
                day3: 85,
                day7: 70,
                overallRating: "high"
              }} 
              isLoading={isLoading} 
            />
          </div>
        );
      
      case 'insights':
        return (
          <div>
            <h2 className="text-xl font-semibold text-secondary mb-4">AI Weather Analysis</h2>
            
            <AIInsights 
              data={weatherData?.aiInsights || {
                current: "Weather conditions in Hanoi are currently warm with partly cloudy skies.",
                patterns: "Temperatures have been above average this week with occasional light rain.",
                climateChange: "Recent patterns show increased variability consistent with climate change models."
              }}
              temperatureTrends={weatherData?.temperatureTrends || []} 
              isLoading={isLoading} 
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <MobileMenu activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-grow pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Location and Date Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              {isLoading ? (
                <>
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-primary shadow-sm">
                    {weatherData?.location?.name}, {weatherData?.location?.country}
                  </h1>
                  <p className="text-gray-500">
                    {weatherData?.location?.localTime} | Last updated: {weatherData?.location?.lastUpdated}
                  </p>
                </>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              {isLoading ? (
                <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
              ) : (
                <span className="flex items-center">
                  <span className="material-icons text-warning mr-2">location_on</span>
                  <span className="text-gray-600">{weatherData?.location?.coordinates}</span>
                </span>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
