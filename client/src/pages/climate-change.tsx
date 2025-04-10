import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClimateCharts } from "@/components/climate/climate-charts";

export default function ClimateChangePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter mb-6">
            Climate Change in Hanoi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Historical climate data and trends for Hanoi, Vietnam. This page shows temperature and precipitation patterns 
            over time, helping you understand how climate change is affecting the local environment.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Historical Climate Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The charts below show yearly and monthly temperature and precipitation trends for Hanoi. 
              Data is sourced from Open Meteo Historical API.
            </p>
            
            <ClimateCharts />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Climate Change Impacts in Hanoi
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-red-500 mr-2 mt-0.5">trending_up</span>
                  <span>Rising temperatures, with more frequent and intense heat waves</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-blue-500 mr-2 mt-0.5">water_drop</span>
                  <span>Increased rainfall intensity during monsoon seasons</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-yellow-500 mr-2 mt-0.5">flood</span>
                  <span>Higher risk of flooding in urban areas</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-orange-500 mr-2 mt-0.5">ac_unit</span>
                  <span>Changes in seasonal patterns affecting agriculture</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-purple-500 mr-2 mt-0.5">air</span>
                  <span>Air quality deterioration due to increased heat</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Climate Adaptation in Hanoi
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mr-2 mt-0.5">park</span>
                  <span>Expanding urban green spaces to reduce heat island effect</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-blue-500 mr-2 mt-0.5">water</span>
                  <span>Improving drainage systems to manage increased rainfall</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-amber-500 mr-2 mt-0.5">wb_sunny</span>
                  <span>Increasing renewable energy capacity throughout the city</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-500 mr-2 mt-0.5">local_florist</span>
                  <span>Promoting climate-resilient agriculture practices</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-indigo-500 mr-2 mt-0.5">policy</span>
                  <span>Implementation of climate action policies at local level</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="material-icons text-blue-600 dark:text-blue-300 text-base align-text-bottom mr-1">info</span>
              Climate data is updated monthly. Historical trends are based on records from 1970 to present.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}