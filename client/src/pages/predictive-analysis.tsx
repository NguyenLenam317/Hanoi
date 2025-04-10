import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function PredictiveAnalysisPage() {
  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ['/api/weather'],
    queryFn: fetchWeatherData,
  });

  // Function to identify potential weather alerts from the forecast data
  const identifyAlerts = (weatherData: any) => {
    if (!weatherData) return [];

    const alerts = [];
    
    // Check for high temperatures (above 35°C)
    const highTempIndex = weatherData.daily.temperature_2m_max.findIndex(
      (temp: number) => temp >= 35
    );
    if (highTempIndex !== -1) {
      alerts.push({
        type: "Extreme Heat",
        date: weatherData.daily.time[highTempIndex],
        description: `High temperature of ${weatherData.daily.temperature_2m_max[highTempIndex]}°C expected.`,
        severity: "high",
        icon: "thermostat",
        recommendations: [
          "Stay hydrated and drink plenty of water",
          "Avoid outdoor activities during peak hours (10AM-4PM)",
          "Use fans or air conditioning if available",
          "Wear lightweight, light-colored clothing"
        ]
      });
    }

    // Check for heavy rainfall (above 20mm in a day)
    const heavyRainIndex = weatherData.daily.precipitation_sum.findIndex(
      (precip: number) => precip >= 20
    );
    if (heavyRainIndex !== -1) {
      alerts.push({
        type: "Heavy Rainfall",
        date: weatherData.daily.time[heavyRainIndex],
        description: `Heavy rainfall of ${weatherData.daily.precipitation_sum[heavyRainIndex]}mm expected.`,
        severity: "medium",
        icon: "water_drop",
        recommendations: [
          "Be cautious of potential flooding in low-lying areas",
          "Avoid crossing flooded roads or walkways",
          "Secure outdoor items that could be damaged by heavy rain",
          "Have emergency supplies prepared"
        ]
      });
    }

    // Check for high winds (above 40 km/h)
    if (weatherData.hourly) {
      const highWindIndex = weatherData.hourly.wind_speed_10m.findIndex(
        (speed: number) => speed >= 40
      );
      if (highWindIndex !== -1) {
        const hourDate = new Date(weatherData.hourly.time[highWindIndex]);
        alerts.push({
          type: "Strong Winds",
          date: weatherData.hourly.time[highWindIndex],
          description: `Strong winds of ${weatherData.hourly.wind_speed_10m[highWindIndex]} km/h expected.`,
          severity: "medium",
          icon: "air",
          recommendations: [
            "Secure loose outdoor objects",
            "Be cautious when driving, especially on bridges",
            "Stay away from trees and power lines during high winds",
            "Close windows and stay indoors if possible"
          ]
        });
      }
    }

    // Check for thunderstorms (weather code 95-99)
    if (weatherData.hourly) {
      const thunderstormIndex = weatherData.hourly.weather_code.findIndex(
        (code: number) => code >= 95 && code <= 99
      );
      if (thunderstormIndex !== -1) {
        alerts.push({
          type: "Thunderstorm",
          date: weatherData.hourly.time[thunderstormIndex],
          description: "Thunderstorm activity expected.",
          severity: "high",
          icon: "thunderstorm",
          recommendations: [
            "Stay indoors and away from windows during thunderstorms",
            "Avoid using electrical appliances",
            "Seek shelter in a substantial building or vehicle (not convertible)",
            "Stay away from tall objects or open areas"
          ]
        });
      }
    }

    // Check for high UV index (8 or higher)
    const highUVIndex = weatherData.daily.uv_index_max.findIndex(
      (uv: number) => uv >= 8
    );
    if (highUVIndex !== -1) {
      alerts.push({
        type: "High UV Radiation",
        date: weatherData.daily.time[highUVIndex],
        description: `High UV index of ${weatherData.daily.uv_index_max[highUVIndex]} expected.`,
        severity: "medium",
        icon: "wb_sunny",
        recommendations: [
          "Apply SPF 30+ sunscreen and reapply every 2 hours",
          "Wear protective clothing, hat, and sunglasses",
          "Seek shade during peak hours (10AM-4PM)",
          "Stay hydrated and be aware of heat exhaustion symptoms"
        ]
      });
    }

    return alerts;
  };

  // Get alerts if weather data is available
  const alerts = weatherData ? identifyAlerts(weatherData) : [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-400";
      case "low":
        return "bg-yellow-300";
      default:
        return "bg-blue-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter mb-6">
            Weather Alerts for Hanoi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Predictive analysis of potential weather hazards and alerts for Hanoi. This page identifies 
            potential weather events that may impact daily activities and provides recommendations.
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">
                Error loading weather alert data. Please try again later.
              </p>
            </div>
          ) : alerts.length === 0 ? (
            <Card className="overflow-hidden bg-green-50 dark:bg-gray-800 border-green-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                  <span className="material-icons mr-2">check_circle</span>
                  No Weather Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  No significant weather hazards are predicted for Hanoi in the next 7 days.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {alerts.map((alert, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`h-2 ${getSeverityColor(alert.severity)}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center text-gray-800 dark:text-white">
                        <span className="material-icons mr-2">{alert.icon}</span>
                        {alert.type}
                      </CardTitle>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {formatDate(new Date(alert.date))}
                      </span>
                    </div>
                    <CardDescription>{alert.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {alert.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Understanding Weather Hazards in Hanoi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Common Weather Hazards</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <span className="material-icons text-red-500 mr-2 mt-0.5 text-base">thermostat</span>
                    <div>
                      <span className="font-medium">Heat Waves:</span> Most common from May to August, when temperatures can exceed 35°C for extended periods.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-blue-500 mr-2 mt-0.5 text-base">flood</span>
                    <div>
                      <span className="font-medium">Flooding:</span> Typically occurs during monsoon season (July-September) after heavy rainfall events.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-purple-500 mr-2 mt-0.5 text-base">air</span>
                    <div>
                      <span className="font-medium">Air Pollution:</span> Often worst during winter months (December-February) due to temperature inversions.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Preparedness</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <span className="material-icons text-amber-500 mr-2 mt-0.5 text-base">medical_services</span>
                    <div>
                      <span className="font-medium">Emergency Kit:</span> Prepare a basic emergency kit with water, non-perishable food, medications, and first aid supplies.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-green-500 mr-2 mt-0.5 text-base">phone_enabled</span>
                    <div>
                      <span className="font-medium">Emergency Contacts:</span> Save important phone numbers: Emergency (113), Fire (114), Ambulance (115).
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-blue-500 mr-2 mt-0.5 text-base">notifications_active</span>
                    <div>
                      <span className="font-medium">Stay Informed:</span> Follow local news and weather services for real-time updates during extreme weather events.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 mt-8">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="material-icons text-blue-600 dark:text-blue-300 text-base align-text-bottom mr-1">info</span>
              Weather alerts are based on forecast data and updated every 6 hours. Last update: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}