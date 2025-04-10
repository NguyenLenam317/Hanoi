import { ActivityRecommendations } from "@/components/recommendations/activity-recommendations";
import { ClothingRecommendations } from "@/components/recommendations/clothing-recommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function RecommendationsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            EcoSense Recommendations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Personalized suggestions for activities and clothing based on current Hanoi weather conditions.
          </p>
        </div>

        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="activities" className="flex items-center">
              <span className="material-icons mr-2 text-base">directions_run</span>
              Activities
            </TabsTrigger>
            <TabsTrigger value="clothing" className="flex items-center">
              <span className="material-icons mr-2 text-base">checkroom</span>
              Clothing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-6">
                <ActivityRecommendations />
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Hanoi Activities Calendar</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Spring (Feb-Apr)</h3>
                        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 mr-1 text-sm">event</span>
                            <span>Hoa Ban (Bauhinia) Festival (March)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 mr-1 text-sm">event</span>
                            <span>Perfume Pagoda Festival (Feb-Mar)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-blue-500 mr-1 text-sm">event</span>
                            <span>Thay Pagoda Festival (April)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg">
                        <h3 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Summer (May-Jul)</h3>
                        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start">
                            <span className="material-icons text-amber-500 mr-1 text-sm">event</span>
                            <span>Hanoi Dragon Boat Festival (May-Jun)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-amber-500 mr-1 text-sm">event</span>
                            <span>Summer Cultural Events at West Lake</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-amber-500 mr-1 text-sm">event</span>
                            <span>Hanoi Food Festival (June)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg">
                        <h3 className="font-medium text-orange-700 dark:text-orange-400 mb-2">Autumn (Aug-Oct)</h3>
                        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start">
                            <span className="material-icons text-orange-500 mr-1 text-sm">event</span>
                            <span>Mid-Autumn Festival (September)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-orange-500 mr-1 text-sm">event</span>
                            <span>Hanoi Liberation Day (October 10)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-orange-500 mr-1 text-sm">event</span>
                            <span>Traditional Craft Villages Festival</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-lg">
                        <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Winter (Nov-Jan)</h3>
                        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start">
                            <span className="material-icons text-indigo-500 mr-1 text-sm">event</span>
                            <span>Vietnamese New Year/Tet (Jan-Feb)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-indigo-500 mr-1 text-sm">event</span>
                            <span>Christmas Markets & Festivities</span>
                          </li>
                          <li className="flex items-start">
                            <span className="material-icons text-indigo-500 mr-1 text-sm">event</span>
                            <span>Hanoi Contemporary Art Exhibition</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="clothing" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <ClothingRecommendations />
              
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Seasonal Clothing Guide for Hanoi</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Season</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Temperature Range</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recommended Clothing</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Essentials</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="material-icons text-green-500 mr-2">eco</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Spring (Feb-Apr)</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">15-25°C</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Light sweaters, long-sleeve shirts, light jackets, pants
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Umbrella, light raincoat
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="material-icons text-amber-500 mr-2">wb_sunny</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Summer (May-Jul)</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">28-35°C</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Light cotton clothing, short sleeves, lightweight pants/shorts, breathable fabrics
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Hat, sunglasses, umbrella, portable fan
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="material-icons text-orange-500 mr-2">landscape</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Autumn (Aug-Oct)</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">22-30°C</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Light to medium-weight clothing, long pants, light jackets in evenings
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Umbrella, insect repellent
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="material-icons text-blue-500 mr-2">ac_unit</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Winter (Nov-Jan)</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">10-20°C</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Warm layers, sweaters, lightweight warm jacket, pants, scarf
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          Light gloves, warm socks, hat for colder days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="material-icons text-yellow-500 inline-block align-text-bottom mr-1">lightbulb</span>
                  <span className="font-medium">Note:</span> Hanoi has high humidity year-round, so breathable fabrics are recommended in all seasons.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}