import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIInsights as AIInsightsType } from "@/types";
import TemperatureChart from "@/components/charts/TemperatureChart";
import { TemperatureTrend } from "@/types";
import { LucideCloudRain, LucideCloud, LucideThermometer, LucideBarChart3 } from "lucide-react";

interface AIInsightsProps {
  data: AIInsightsType;
  temperatureTrends: TemperatureTrend[];
  isLoading?: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ 
  data, 
  temperatureTrends, 
  isLoading = false 
}) => {
  const [activeTab, setActiveTab] = useState("current");
  
  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-5 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-7 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>
        
        <div className="flex space-x-2 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-md w-28"></div>
          ))}
        </div>
        
        <div className="h-4 bg-gray-200 rounded w-full my-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full my-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 my-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 my-2"></div>
        
        <div className="mt-6">
          <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-48 bg-gray-100 rounded w-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-5 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2 text-primary">
            <LucideBarChart3 className="h-5 w-5" />
          </span>
          AI Weather Analysis
        </h2>
        <span className="text-xs text-gray-500">Powered by OpenRouter AI</span>
      </div>
      
      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="current" className="flex items-center">
            <LucideCloud className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Current</span>
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center">
            <LucideCloudRain className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Patterns</span>
          </TabsTrigger>
          <TabsTrigger value="climate" className="flex items-center">
            <LucideThermometer className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Climate</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <LucideBarChart3 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="prose max-w-none">
          <h3 className="text-lg font-medium text-secondary mb-2">Current Weather Analysis</h3>
          <p className="text-gray-700">
            {data.current}
          </p>
        </TabsContent>
        
        <TabsContent value="patterns" className="prose max-w-none">
          <h3 className="text-lg font-medium text-secondary mb-2">Weather Pattern Insights</h3>
          <p className="text-gray-700">
            {data.patterns}
          </p>
        </TabsContent>
        
        <TabsContent value="climate" className="prose max-w-none">
          <h3 className="text-lg font-medium text-secondary mb-2">Climate Change Indicators</h3>
          <p className="text-gray-700">
            {data.climateChange}
          </p>
        </TabsContent>
        
        <TabsContent value="trends" className="prose max-w-none">
          <h3 className="text-lg font-medium text-secondary mb-3">Temperature Trends (Last 30 Days)</h3>
          <TemperatureChart data={temperatureTrends} />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <div className="flex items-center">
              <span className="h-2 w-2 bg-primary rounded-full mr-1"></span>
              <span>Actual Temperature</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 bg-warning rounded-full mr-1"></span>
              <span>Historical Average</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIInsights;
