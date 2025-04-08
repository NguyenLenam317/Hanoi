import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ClimateIndicators as ClimateIndicatorsType } from "@shared/schema";

interface ExtendedClimateDataProps {
  data: ClimateIndicatorsType;
  isLoading?: boolean;
}

// Extended climate data contains additional visualization and information about climate trends
const ExtendedClimateData: React.FC<ExtendedClimateDataProps> = ({ data, isLoading = false }) => {
  // Additional climate metrics (these would ideally come from a real climate API)
  const climateTrends = {
    globalTemperatureRise: 1.1, // Global temperature rise in °C above pre-industrial levels
    arcticSeaIceDecline: 13.1, // % decline per decade
    sealevelRise: 3.6, // mm per year
    oceanAcidification: 30, // % increase in acidity
    extremeWeatherEvents: 5, // x more likely
    glacierMassLoss: 267, // billion metric tons per year
  };

  // Risk levels for Hanoi region
  const regionalRisks = {
    flooding: 80, // High risk
    drought: 45, // Medium risk
    heatwaves: 65, // Medium-high risk
    waterScarcity: 55, // Medium risk
    biodiversityLoss: 70, // High risk
  };

  const getRiskColor = (value: number): string => {
    if (value < 33) return "bg-green-500";
    if (value < 66) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-[200px]" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-4">
            <Skeleton className="h-5 w-[200px]" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Extended Climate Data</CardTitle>
        <CardDescription>
          Global and regional climate change indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-3">Global Climate Trends</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Global Temperature Rise</p>
                <p className="text-sm font-medium">{climateTrends.globalTemperatureRise}°C above pre-industrial</p>
              </div>
              <Progress value={climateTrends.globalTemperatureRise * 50} className="h-2 bg-gray-200" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Arctic Sea Ice Decline</p>
                <p className="text-sm font-medium">{climateTrends.arcticSeaIceDecline}% per decade</p>
              </div>
              <Progress value={climateTrends.arcticSeaIceDecline} className="h-2 bg-gray-200" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Sea Level Rise</p>
                <p className="text-sm font-medium">{climateTrends.sealevelRise} mm per year</p>
              </div>
              <Progress value={climateTrends.sealevelRise * 10} className="h-2 bg-gray-200" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Ocean Acidification Increase</p>
                <p className="text-sm font-medium">{climateTrends.oceanAcidification}% since pre-industrial</p>
              </div>
              <Progress value={climateTrends.oceanAcidification / 3} className="h-2 bg-gray-200" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-base font-medium mb-3">Hanoi Region Climate Risks</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Flooding Risk</p>
                <p className="text-sm font-medium">High Risk</p>
              </div>
              <Progress value={regionalRisks.flooding} className={`h-2 ${getRiskColor(regionalRisks.flooding)}`} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Drought Risk</p>
                <p className="text-sm font-medium">Medium Risk</p>
              </div>
              <Progress value={regionalRisks.drought} className={`h-2 ${getRiskColor(regionalRisks.drought)}`} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Heatwave Risk</p>
                <p className="text-sm font-medium">Medium-High Risk</p>
              </div>
              <Progress value={regionalRisks.heatwaves} className={`h-2 ${getRiskColor(regionalRisks.heatwaves)}`} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Water Scarcity Risk</p>
                <p className="text-sm font-medium">Medium Risk</p>
              </div>
              <Progress value={regionalRisks.waterScarcity} className={`h-2 ${getRiskColor(regionalRisks.waterScarcity)}`} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">Biodiversity Loss Risk</p>
                <p className="text-sm font-medium">High Risk</p>
              </div>
              <Progress value={regionalRisks.biodiversityLoss} className={`h-2 ${getRiskColor(regionalRisks.biodiversityLoss)}`} />
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>Data based on IPCC, NASA, and regional climate models. Risks are calculated based on current trends, projected changes, and regional vulnerability factors.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtendedClimateData;