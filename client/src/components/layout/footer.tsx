import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold font-inter mb-4 text-yellow-300">EcoSense</h3>
            <p className="text-gray-200 text-sm">Providing accurate weather data, climate information, and health recommendations for Hanoi residents and visitors.</p>
          </div>
          
          <div>
            <h4 className="text-md font-bold font-inter mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link href="/weather-forecast"><a className="hover:text-yellow-300 transition">Weather Forecast</a></Link></li>
              <li><Link href="/health-environment"><a className="hover:text-yellow-300 transition">Air Quality Index</a></Link></li>
              <li><Link href="/climate-change"><a className="hover:text-yellow-300 transition">Climate Data</a></Link></li>
              <li><Link href="/recommendations"><a className="hover:text-yellow-300 transition">Health Recommendations</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold font-inter mb-4 text-yellow-300">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="https://www.nea.gov.vn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">Vietnam Environment Administration</a></li>
              <li><a href="https://www.nchmf.gov.vn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">Vietnam Meteorological Service</a></li>
              <li><a href="tel:115" className="hover:text-yellow-300 transition">Emergency Services (115)</a></li>
              <li><a href="https://hanoi.gov.vn/en/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">Hanoi City Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-bold font-inter mb-4 text-yellow-300">Data Sources</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">Open-Meteo API</a></li>
              <li><a href="https://aimllabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">AIMLAPI Climate Services</a></li>
              <li><a href="https://aqicn.org/city/vietnam/hanoi/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">Hanoi Air Quality Network</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-200 mb-4 md:mb-0">&copy; {new Date().getFullYear()} EcoSense. All rights reserved.</div>
          
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-200 hover:text-yellow-300 transition bg-primary-700 p-2 rounded-full">
              <span className="material-icons">facebook</span>
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-200 hover:text-yellow-300 transition bg-primary-700 p-2 rounded-full">
              <span className="material-icons">flutter_dash</span>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-200 hover:text-yellow-300 transition bg-primary-700 p-2 rounded-full">
              <span className="material-icons">photo_camera</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
