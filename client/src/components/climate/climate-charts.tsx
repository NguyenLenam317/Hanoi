import { useQuery } from "@tanstack/react-query";
import { fetchClimateData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function ClimateCharts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/climate'],
    queryFn: fetchClimateData,
  });

  if (isLoading) return <ClimateChartSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Climate Data</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading climate data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for yearly temperature chart
  const yearlyData = data?.yearly.time.map((year, index) => ({
    year,
    temperature: data.yearly.temperature_2m_mean[index],
  }));

  // Prepare data for monthly temperature and precipitation chart
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyData = data?.monthly.time.map((monthDate, index) => {
    const date = new Date(monthDate);
    return {
      month: monthNames[date.getMonth()],
      temperature: data.monthly.temperature_2m_mean[index],
      precipitation: data.monthly.precipitation_sum[index],
    };
  });

  // Calculate temperature trends
  const calculateTrend = () => {
    if (!yearlyData || yearlyData.length < 2) return { trend: 0, total: 0 };

    const startYear = yearlyData[0];
    const endYear = yearlyData[yearlyData.length - 1];
    const yearsDiff = endYear.year - startYear.year;
    
    if (yearsDiff === 0) return { trend: 0, total: 0 };
    
    const tempDiff = endYear.temperature - startYear.temperature;
    const trend = tempDiff / yearsDiff;
    
    return {
      trend: parseFloat(trend.toFixed(3)),
      total: parseFloat(tempDiff.toFixed(2)),
    };
  };

  const trend = calculateTrend();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Climate Data</CardTitle>
        <CardDescription>Historical climate trends for Hanoi, Vietnam</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="yearly">Yearly Trends</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="yearly">
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">Average Annual Temperature (1970-2023)</h3>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Temperature Change Rate:</span>
                  <span className={trend.trend > 0 ? "text-red-600 dark:text-red-400 ml-2" : "text-blue-600 dark:text-blue-400 ml-2"}>
                    {trend.trend > 0 ? "+" : ""}{trend.trend}°C per year
                  </span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Total Change:</span>
                  <span className={trend.total > 0 ? "text-red-600 dark:text-red-400 ml-2" : "text-blue-600 dark:text-blue-400 ml-2"}>
                    {trend.total > 0 ? "+" : ""}{trend.total}°C since 1970
                  </span>
                </p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={yearlyData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      tick={{ fontSize: 12 }}
                      label={{ 
                        value: 'Temperature (°C)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fontSize: 12 }
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}°C`, 'Temperature']}
                      labelFormatter={(value) => `Year: ${value}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#f97316"
                      name="Avg. Temperature"
                      dot={{ r: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">Average Monthly Temperature & Precipitation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Showing average patterns across all recorded years
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 12 }}
                      label={{ 
                        value: 'Temperature (°C)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fontSize: 12 }
                      }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tick={{ fontSize: 12 }}
                      label={{ 
                        value: 'Precipitation (mm)', 
                        angle: 90, 
                        position: 'insideRight',
                        style: { fontSize: 12 }
                      }}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        return name === "temperature" 
                          ? [`${value}°C`, 'Temperature'] 
                          : [`${value} mm`, 'Precipitation'];
                      }}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="temperature" 
                      fill="#f97316" 
                      name="Temperature"
                      barSize={20}
                    />
                    <Bar 
                      yAxisId="right" 
                      dataKey="precipitation" 
                      fill="#0ea5e9" 
                      name="Precipitation" 
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Temperature Patterns</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Hottest months: June-August</li>
                    <li>Coolest months: December-February</li>
                    <li>Annual temperature range: approximately 15°C</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Precipitation Patterns</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Rainy season: May-October</li>
                    <li>Dry season: November-April</li>
                    <li>About 80% of annual rainfall occurs during rainy season</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ClimateChartSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Climate Data</CardTitle>
        <CardDescription>Loading climate data...</CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="mb-4">
          <Skeleton className="h-5 w-64 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-72 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}