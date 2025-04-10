import { AiAssistant } from "@/components/chatbot/ai-assistant";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ChatbotPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto py-6 px-4 space-y-6 flex-grow">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            EcoSense AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Get answers to your questions about Hanoi's weather, climate, and environmental conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AiAssistant />
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Assistant Features</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-2 rounded-lg">
                    <span className="material-icons text-base">wb_sunny</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Weather Information</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Ask about current or forecast weather conditions in Hanoi.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-2 rounded-lg">
                    <span className="material-icons text-base">health_and_safety</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Health Recommendations</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Get advice on staying healthy based on current environmental conditions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 p-2 rounded-lg">
                    <span className="material-icons text-base">trending_up</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Climate Trends</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Inquire about climate patterns and historical weather data in Hanoi.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-2 rounded-lg">
                    <span className="material-icons text-base">location_on</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Local Recommendations</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Get activity suggestions based on current and forecast conditions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-2 rounded-lg">
                    <span className="material-icons text-base">air</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Air Quality</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Learn about current air quality levels and protective measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Sample Questions</h2>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">"What's the current temperature in Hanoi?"</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">"Is it going to rain in Hanoi tomorrow?"</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">"How has the climate in Hanoi changed over the last 10 years?"</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">"What should I wear in Hanoi during the rainy season?"</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">"How can I protect myself from air pollution in Hanoi?"</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">"What indoor activities do you recommend on a hot day in Hanoi?"</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center mb-2">
                <span className="material-icons text-blue-500 dark:text-blue-400 mr-2">info</span>
                <h3 className="font-medium text-blue-700 dark:text-blue-300">About The AI Assistant</h3>
              </div>
              <p className="text-xs">
                This AI assistant is designed specifically for Hanoi and uses real-time data from weather APIs and historical climate records. It provides location-specific advice and recommendations tailored to Hanoi's unique environmental conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}