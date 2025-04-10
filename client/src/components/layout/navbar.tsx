import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/", icon: "dashboard" },
    { name: "Weather Forecast", href: "/weather-forecast", icon: "thermostat" },
    { name: "Climate Change", href: "/climate-change", icon: "assessment" },
    { name: "Health & Environment", href: "/health-environment", icon: "health_and_safety" },
    { name: "Weather Alerts", href: "/predictive-analysis", icon: "warning" },
    { name: "Recommendations", href: "/recommendations", icon: "recommend" },
    { name: "Sustainability", href: "/sustainability", icon: "eco" },
    { name: "AI Assistant", href: "/chatbot", icon: "smart_toy" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link href="/">
            <span className="flex items-center space-x-2">
              <span className="material-icons text-2xl text-yellow-300">wb_sunny</span>
              <h1 className="text-xl md:text-2xl font-bold font-inter text-white">EcoSense</h1>
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="text-white border-white hover:bg-primary-600 hover:text-yellow-300 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-icons">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </Button>
        </div>
      </div>
      
      <nav className="bg-primary-800">
        <div className="container mx-auto px-4">
          <ul className={`flex overflow-x-auto py-2 space-x-6 text-sm font-medium ${isMobileMenuOpen ? 'flex-col space-x-0 space-y-2 pb-3' : 'hidden md:flex'}`}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center whitespace-nowrap hover:bg-primary-700 hover:text-yellow-200 px-2 py-1 rounded ${location === item.href ? 'bg-primary-600 text-yellow-300 font-bold' : 'text-white'}`}
                >
                  <span className="material-icons text-sm mr-1">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
