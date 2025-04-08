import React from "react";
import { TemperatureTrend } from "@/types";

interface TemperatureChartProps {
  data: TemperatureTrend[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  // Calculate chart dimensions
  const width = 800;
  const height = 200;
  const padding = { top: 20, right: 50, bottom: 20, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find min and max temperatures for scaling
  const minTemp = Math.min(...data.map(d => d.temperature), ...data.filter(d => d.historicalAverage).map(d => d.historicalAverage!));
  const maxTemp = Math.max(...data.map(d => d.temperature), ...data.filter(d => d.historicalAverage).map(d => d.historicalAverage!));
  
  // Scale functions
  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const yScale = (temp: number) => padding.top + chartHeight - ((temp - minTemp) / (maxTemp - minTemp)) * chartHeight;
  
  // Generate path for temperature line
  const linePath = data.map((point, i) => {
    return `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(point.temperature)}`;
  }).join(" ");
  
  // Generate area fill below the line
  const areaPath = `${linePath} L ${xScale(data.length - 1)} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;
  
  // Historical average line (if data has it)
  const hasHistoricalData = data.some(d => d.historicalAverage !== undefined);
  const historicalAverageLine = hasHistoricalData ? 
    `M ${padding.left} ${yScale(data[0].historicalAverage || 0)} L ${padding.left + chartWidth} ${yScale(data[0].historicalAverage || 0)}` : 
    "";
  
  // Calculate labels for the x-axis (first, middle, last)
  const dateLabels = [
    data[0]?.date,
    data[Math.floor(data.length / 2)]?.date,
    data[data.length - 1]?.date
  ];
  
  // Calculate temperature labels for y-axis
  const tempStep = (maxTemp - minTemp) / 4;
  const tempLabels = [
    maxTemp,
    maxTemp - tempStep,
    maxTemp - 2 * tempStep,
    maxTemp - 3 * tempStep,
    minTemp
  ];
  
  return (
    <div className="chart-container">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Grid lines */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} className="chart-grid-line" />
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} className="chart-axis" />
        <line x1={padding.left} y1={padding.top} x2={padding.left + chartWidth} y2={padding.top} className="chart-grid-line" />
        
        {/* Add horizontal grid lines */}
        {tempLabels.map((temp, i) => (
          <line 
            key={i}
            x1={padding.left} 
            y1={yScale(temp)} 
            x2={padding.left + chartWidth} 
            y2={yScale(temp)} 
            className="chart-grid-line" 
          />
        ))}
        
        {/* Temperature line and area */}
        <path d={linePath} className="chart-line" />
        <path d={areaPath} className="chart-area" />
        
        {/* Data points */}
        {data.map((point, i) => (
          <circle 
            key={i}
            cx={xScale(i)} 
            cy={yScale(point.temperature)} 
            r="3" 
            className="chart-dot" 
          />
        ))}
        
        {/* Historical average line */}
        {hasHistoricalData && (
          <path 
            d={historicalAverageLine} 
            stroke="#F39C12" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />
        )}
        
        {/* Y-axis labels */}
        {tempLabels.map((temp, i) => (
          <text 
            key={i}
            x={padding.left - 10} 
            y={yScale(temp)} 
            textAnchor="end" 
            dominantBaseline="middle" 
            className="text-xs text-gray-500"
          >
            {Math.round(temp)}°C
          </text>
        ))}
        
        {/* X-axis labels */}
        {dateLabels.map((date, i) => (
          <text 
            key={i}
            x={padding.left + (i * chartWidth / 2)} 
            y={padding.top + chartHeight + 15} 
            textAnchor="middle" 
            className="text-xs text-gray-500"
          >
            {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
          </text>
        ))}
        
        {/* Historical average label */}
        {hasHistoricalData && (
          <text 
            x={padding.left + chartWidth - 10} 
            y={yScale(data[0].historicalAverage || 0) - 10} 
            textAnchor="end" 
            className="text-xs text-warning"
          >
            Historical Avg ({data[0].historicalAverage}°C)
          </text>
        )}
      </svg>
    </div>
  );
};

export default TemperatureChart;
