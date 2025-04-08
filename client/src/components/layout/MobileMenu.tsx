import React from "react";
import { 
  LucideCloudRain, 
  LucideThermometer,
  LucideCalendarDays,
  LucideLineChart,
  LucideMessageSquare
} from "lucide-react";

interface MobileMenuProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="px-2 py-3 flex justify-around">
        <button 
          onClick={() => onTabChange("forecast")}
          className={`flex flex-col items-center text-xs ${activeTab === "forecast" ? "text-secondary font-medium" : "text-gray-500"}`}
        >
          <LucideCloudRain className="h-5 w-5 mb-1" />
          <span>Forecast</span>
        </button>
        <button 
          onClick={() => onTabChange("climate")}
          className={`flex flex-col items-center text-xs ${activeTab === "climate" ? "text-secondary font-medium" : "text-gray-500"}`}
        >
          <LucideThermometer className="h-5 w-5 mb-1" />
          <span>Climate</span>
        </button>
        <button 
          onClick={() => onTabChange("history")}
          className={`flex flex-col items-center text-xs ${activeTab === "history" ? "text-secondary font-medium" : "text-gray-500"}`}
        >
          <LucideCalendarDays className="h-5 w-5 mb-1" />
          <span>History</span>
        </button>
        <button 
          onClick={() => onTabChange("accuracy")}
          className={`flex flex-col items-center text-xs ${activeTab === "accuracy" ? "text-secondary font-medium" : "text-gray-500"}`}
        >
          <LucideLineChart className="h-5 w-5 mb-1" />
          <span>Accuracy</span>
        </button>
        <button 
          onClick={() => onTabChange("insights")}
          className={`flex flex-col items-center text-xs ${activeTab === "insights" ? "text-secondary font-medium" : "text-gray-500"}`}
        >
          <LucideMessageSquare className="h-5 w-5 mb-1" />
          <span>Insights</span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
