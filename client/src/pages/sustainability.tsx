import { SustainabilityTips, SeasonalRecommendations } from "@/components/sustainability/sustainability-tips";
import { SustainabilityPoll } from "@/components/sustainability/sustainability-poll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function SustainabilityPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            EcoSense Sustainability
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Eco-friendly initiatives, tips, and community insights for a greener Hanoi.
          </p>
        </div>
        
        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="tips" className="flex items-center">
              <span className="material-icons mr-2 text-base">eco</span>
              Eco Tips
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center">
              <span className="material-icons mr-2 text-base">groups</span>
              Community
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tips" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <SustainabilityTips />
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm h-full">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Sustainability Goals</h2>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                          <span className="material-icons text-green-500 mr-1 text-base">park</span>
                          Green Spaces
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                          <span className="material-icons text-blue-500 mr-1 text-base">water_drop</span>
                          Water Quality
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                          <span className="material-icons text-amber-500 mr-1 text-base">lightbulb</span>
                          Clean Energy
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                          <span className="material-icons text-purple-500 mr-1 text-base">recycling</span>
                          Waste Recycled
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                          <span className="material-icons text-red-500 mr-1 text-base">directions_bike</span>
                          Sustainable Transport
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-300 text-sm mb-2">
                      Hanoi Green Initiative 2025
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Hanoi aims to increase its green spaces by 15%, improve water quality by 20%, and reduce greenhouse gas emissions by 30% by 2025 through community participation and government initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Seasonal Sustainability Guide</h2>
              <SeasonalRecommendations />
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SustainabilityPoll />
              </div>
              
              <div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upcoming Events</h2>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-2 rounded-lg">
                          <span className="material-icons text-base">calendar_today</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Hanoi Clean-Up Day</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">May 15, 2025 • West Lake Area</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Community initiative to clean parks and public spaces.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-2 rounded-lg">
                          <span className="material-icons text-base">calendar_today</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Sustainable Living Workshop</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">June 5, 2025 • Hanoi Cultural Center</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Learn about reducing your carbon footprint at home.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-2 rounded-lg">
                          <span className="material-icons text-base">calendar_today</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Farmers Market</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Every Saturday • Old Quarter</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Local, organic produce and sustainably made crafts.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 p-2 rounded-lg">
                          <span className="material-icons text-base">calendar_today</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Tree Planting Initiative</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">July 10, 2025 • Various Locations</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Help plant 1,000 new trees throughout Hanoi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}