import React from "react";
import { Link } from "wouter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-primary font-bold text-lg">WeatherWizard</span>
            <p className="text-gray-500 text-sm">Weather data and climate insights for Hanoi, Vietnam</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link href="/data-sources" className="text-gray-600 hover:text-primary">
              Data Sources
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-primary">
              Terms of Use
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">Data sources: Open Metro API, OpenRouter AI</p>
          <p className="text-gray-500 text-xs mt-2 sm:mt-0">© {new Date().getFullYear()} WeatherWizard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
