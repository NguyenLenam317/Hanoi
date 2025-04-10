import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import WeatherForecastPage from "./pages/weather-forecast";
import ClimateChangePage from "./pages/climate-change";
import HealthEnvironmentPage from "./pages/health-environment";
import PredictiveAnalysisPage from "./pages/predictive-analysis";
import ChatbotPage from "./pages/chatbot";
import RecommendationsPage from "./pages/recommendations";
import SustainabilityPage from "./pages/sustainability";
import { ThemeProvider } from "./components/ui/theme-provider";
import { SurveyProvider } from "./components/survey/survey-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/weather-forecast" component={WeatherForecastPage} />
      <Route path="/climate-change" component={ClimateChangePage} />
      <Route path="/health-environment" component={HealthEnvironmentPage} />
      <Route path="/predictive-analysis" component={PredictiveAnalysisPage} />
      <Route path="/chatbot" component={ChatbotPage} />
      <Route path="/recommendations" component={RecommendationsPage} />
      <Route path="/sustainability" component={SustainabilityPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SurveyProvider>
          <Router />
          <Toaster />
        </SurveyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
