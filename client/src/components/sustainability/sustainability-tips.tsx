import { useQuery } from "@tanstack/react-query";
import { fetchSustainabilityTip } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentSeason } from "@/lib/utils";

export function SustainabilityTips() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/sustainability/tip'],
    queryFn: fetchSustainabilityTip,
  });

  if (isLoading) return <SustainabilityTipSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Sustainability Tips</CardTitle>
          <CardDescription>Hanoi, Vietnam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading sustainability tips. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="material-icons text-green-600 dark:text-green-500 mr-2">eco</span>
          Sustainability Tips
        </CardTitle>
        <CardDescription>Eco-friendly practices for Hanoi residents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-5 mb-6">
          <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Daily Eco Tip</h3>
          <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{data?.tip}"</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Updated {new Date(data?.createdAt || new Date()).toLocaleDateString()}
            </span>
            <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full">
              {(data?.season && typeof data.season === 'string') ? 
                data.season.charAt(0).toUpperCase() + data.season.slice(1) : 'General'} Tip
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">Sustainable Living in Hanoi</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sustainable living in Hanoi means adapting eco-friendly practices to the unique climate and urban challenges of the city.
            Making small changes in daily habits can have a significant impact on reducing your environmental footprint.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <span className="material-icons text-blue-500 mr-1 text-base">water_drop</span>
                Water Conservation
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Collect rainwater during monsoon season</li>
                <li>Fix leaking faucets and toilets promptly</li>
                <li>Use water-efficient washing machines</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <span className="material-icons text-amber-500 mr-1 text-base">lightbulb</span>
                Energy Efficiency
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Use LED lighting throughout your home</li>
                <li>Set AC to 25-26°C for optimal efficiency</li>
                <li>Use fans instead of AC when possible</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <span className="material-icons text-green-500 mr-1 text-base">shopping_bag</span>
                Reduce Waste
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Bring reusable bags to local markets</li>
                <li>Choose products with minimal packaging</li>
                <li>Compost food waste for balcony plants</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center mb-2">
                <span className="material-icons text-red-500 mr-1 text-base">directions_bike</span>
                Transportation
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Use public transportation when possible</li>
                <li>Consider electric bicycles for short trips</li>
                <li>Carpooling for longer commutes</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SeasonalRecommendations() {
  const currentSeason = getCurrentSeason();
  
  const seasonalTips = {
    spring: [
      "Plant native flowers to support local pollinators",
      "Open windows for natural ventilation instead of using AC",
      "Use natural light during longer daylight hours",
      "Collect and use rainwater for plants during spring showers",
      "Switch to lighter bedding materials to reduce laundry frequency"
    ],
    summer: [
      "Install window shades or blinds to reduce heat gain",
      "Use ceiling fans to circulate air and reduce AC usage",
      "Hang clothes to dry instead of using electric dryers",
      "Cook outdoors or use microwave to keep home cooler",
      "Use solar-powered outdoor lighting for evening activities"
    ],
    autumn: [
      "Check and clean air filtration systems before winter",
      "Utilize falling temperatures by reducing AC usage",
      "Compost falling leaves for garden fertilizer",
      "Harvest rainwater before dry season begins",
      "Prepare indoor plants for less sunlight conditions"
    ],
    winter: [
      "Use thermal curtains to keep heat inside homes",
      "Set water heaters to lower temperatures",
      "Use programmable thermostats to optimize heating",
      "Insulate windows with plastic film for better efficiency",
      "Wear extra layers at home instead of turning up heat"
    ]
  };
  
  const seasonName = {
    spring: "Spring (Feb-Apr)",
    summer: "Summer (May-Jul)",
    autumn: "Autumn (Aug-Oct)",
    winter: "Winter (Nov-Jan)"
  };
  
  const seasonIcon = {
    spring: "local_florist",
    summer: "wb_sunny",
    autumn: "eco",
    winter: "ac_unit"
  };
  
  const seasonColor = {
    spring: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 text-green-700 dark:text-green-400",
    summer: "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/30 text-amber-700 dark:text-amber-400",
    autumn: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 text-orange-700 dark:text-orange-400",
    winter: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 text-blue-700 dark:text-blue-400"
  };

  const seasons = ["spring", "summer", "autumn", "winter"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {seasons.map((season) => (
        <div 
          key={season} 
          className={`bg-gradient-to-b ${seasonColor[season as keyof typeof seasonColor]} p-4 rounded-lg ${
            season === currentSeason ? 'ring-2 ring-primary-500' : ''
          }`}
        >
          <h3 className={`font-bold mb-3 flex items-center ${season === currentSeason ? 'text-primary-600 dark:text-primary-400' : ''}`}>
            <span className="material-icons mr-1">
              {seasonIcon[season as keyof typeof seasonIcon]}
            </span>
            {seasonName[season as keyof typeof seasonName]}
            {season === currentSeason && (
              <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs px-2 py-0.5 rounded-full ml-2">
                Current Season
              </span>
            )}
          </h3>
          <ul className="text-sm space-y-1.5">
            {seasonalTips[season as keyof typeof seasonalTips].map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="material-icons text-primary-500 mr-1 text-sm">eco</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SustainabilityTipSkeleton() {
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
        <Skeleton className="h-32 w-full rounded-lg mb-6" />
        
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-16 w-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}