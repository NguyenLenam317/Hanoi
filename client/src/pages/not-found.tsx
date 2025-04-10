import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-9xl font-bold text-primary-300 dark:text-primary-700 mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
        Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button>
            <span className="material-icons mr-2 text-sm">home</span>
            Return Home
          </Button>
        </Link>
        <Button variant="outline" onClick={() => window.history.back()}>
          <span className="material-icons mr-2 text-sm">arrow_back</span>
          Go Back
        </Button>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          Try one of these popular pages:
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/weather-forecast">
            <Button variant="link">Weather Forecast</Button>
          </Link>
          <Link href="/health-environment">
            <Button variant="link">Health & Environment</Button>
          </Link>
          <Link href="/recommendations">
            <Button variant="link">Recommendations</Button>
          </Link>
          <Link href="/chatbot">
            <Button variant="link">AI Assistant</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}