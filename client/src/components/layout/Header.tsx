import React from "react";
import { Link, useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LucideCloudRain, 
  LucideCloud, 
  LucideBarChart3, 
  LucideThermometer,
  LucideCalendarDays,
  LucideLineChart,
  LucideRefreshCw,
  LucideMessageSquare
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [location] = useLocation();
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-primary text-3xl font-bold font-sfpro">WeatherWizard</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-sm">search</span>
              </div>
              <input 
                type="text" 
                placeholder="Search location..." 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" 
              />
            </div>
            <div className="flex">
              <button 
                type="button" 
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => window.location.reload()}
              >
                <LucideRefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="forecast" className="flex items-center justify-center gap-2">
                <LucideCloudRain className="h-4 w-4" />
                <span className="hidden sm:inline">Forecast</span>
              </TabsTrigger>
              <TabsTrigger value="climate" className="flex items-center justify-center gap-2">
                <LucideThermometer className="h-4 w-4" />
                <span className="hidden sm:inline">Climate</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center justify-center gap-2">
                <LucideCalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="accuracy" className="flex items-center justify-center gap-2">
                <LucideLineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Accuracy</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center justify-center gap-2">
                <LucideMessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Insights</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  );
};

export default Header;
