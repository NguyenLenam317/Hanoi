import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Lightbulb, 
  Leaf, 
  Recycle, 
  PersonStanding 
} from "lucide-react";

interface ClimateChangeSuggestionProps {
  isLoading?: boolean;
}

export interface SuggestionItem {
  title: string;
  description: string;
  impact: string;
  icon: React.ReactNode;
}

// Climate change action suggestions component
const ClimateChangeSuggestions: React.FC<ClimateChangeSuggestionProps> = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // These would typically be based on regional data and recommendations
  const suggestions: SuggestionItem[] = [
    {
      title: "Reduce Water Usage",
      description: "Hanoi's monsoon seasons are changing due to climate change. Water conservation helps minimize flooding impact.",
      impact: "Medium Impact",
      icon: <Droplets className="h-10 w-10 text-sky-500" />,
    },
    {
      title: "Switch to LED Lighting",
      description: "Power generation in Vietnam still relies heavily on fossil fuels. LEDs use 75% less energy than incandescent bulbs.",
      impact: "High Impact",
      icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
    },
    {
      title: "Use Public Transport",
      description: "Traffic congestion in Hanoi contributes significantly to air pollution. Use buses or consider carpooling.",
      impact: "High Impact",
      icon: <PersonStanding className="h-10 w-10 text-green-500" />,
    },
    {
      title: "Reduce Plastic Waste",
      description: "Plastic pollution affects local waterways and the wider ocean. Bring reusable bags and containers when shopping.",
      impact: "Medium Impact",
      icon: <Recycle className="h-10 w-10 text-teal-500" />,
    },
    {
      title: "Plant Native Species",
      description: "Native plants support local biodiversity and require less water and maintenance than exotic species.",
      impact: "Medium Impact",
      icon: <Leaf className="h-10 w-10 text-emerald-500" />,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Climate Action Suggestions</CardTitle>
        <CardDescription>
          Personalized recommendations to reduce your environmental impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.slice(0, 4).map((suggestion, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-shrink-0 p-1">
                {suggestion.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-secondary">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                <Badge variant={suggestion.impact.includes("High") ? "default" : "secondary"} className="mt-1">
                  {suggestion.impact}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClimateChangeSuggestions;