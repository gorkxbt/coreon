'use client';

import { useState, useEffect } from 'react';

interface MetricsDisplayProps {
  demoRunning: boolean;
}

export default function MetricsDisplay({ demoRunning }: MetricsDisplayProps) {
  const [metrics, setMetrics] = useState({
    responseTime: 187,
    throughput: 142,
    errorRate: 0.12,
    uptime: 99.98,
    latency: 42,
    activeUsers: 24
  });

  // Simulate changing metrics
  useEffect(() => {
    if (!demoRunning) return;
    
    const interval = setInterval(() => {
      setMetrics(prev => ({
        responseTime: Math.max(150, Math.min(250, prev.responseTime + (Math.random() - 0.5) * 20)),
        throughput: Math.max(120, Math.min(200, prev.throughput + (Math.random() - 0.5) * 10)),
        errorRate: Math.max(0.01, Math.min(0.5, prev.errorRate + (Math.random() - 0.5) * 0.05)),
        uptime: Math.max(99.5, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.05)),
        latency: Math.max(30, Math.min(60, prev.latency + (Math.random() - 0.5) * 5)),
        activeUsers: Math.max(10, Math.min(50, Math.floor(prev.activeUsers + (Math.random() - 0.5) * 5)))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [demoRunning]);

  return (
    <div className="rounded-xl border border-coreon-blue/20 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
        <h2 className="font-bold text-lg">System Metrics</h2>
        <span className="text-xs text-coreon-gray-light">Live Data</span>
      </div>
      
      <div className="p-4 bg-coreon-navy/30 backdrop-blur-md">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Response Time */}
          <div className="bg-coreon-navy/50 rounded-lg p-4 border border-coreon-blue/10">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-coreon-gray-light">Response Time</div>
              <div className="text-sm font-mono">{Math.round(metrics.responseTime)} ms</div>
            </div>
            <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.responseTime / 250) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Throughput */}
          <div className="bg-coreon-navy/50 rounded-lg p-4 border border-coreon-blue/10">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-coreon-gray-light">Throughput</div>
              <div className="text-sm font-mono">{Math.round(metrics.throughput)} req/s</div>
            </div>
            <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-coreon-blue to-coreon-blue-light rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.throughput / 200) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Error Rate */}
          <div className="bg-coreon-navy/50 rounded-lg p-4 border border-coreon-blue/10">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-coreon-gray-light">Error Rate</div>
              <div className="text-sm font-mono">{(metrics.errorRate * 100).toFixed(2)}%</div>
            </div>
            <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.errorRate / 0.5) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Uptime */}
          <div className="bg-coreon-navy/50 rounded-lg p-4 border border-coreon-blue/10">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-coreon-gray-light">Uptime</div>
              <div className="text-sm font-mono">{metrics.uptime.toFixed(2)}%</div>
            </div>
            <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, ((metrics.uptime - 99) / 1) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Latency */}
          <div className="bg-coreon-navy/50 rounded-lg p-4 border border-coreon-blue/10">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-coreon-gray-light">Latency</div>
              <div className="text-sm font-mono">{Math.round(metrics.latency)} ms</div>
            </div>
            <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.latency / 60) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active Users */}
          <div className="bg-coreon-navy/50 rounded-lg p-4 border border-coreon-blue/10">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-coreon-gray-light">Active Users</div>
              <div className="text-sm font-mono">{metrics.activeUsers}</div>
            </div>
            <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-coreon-blue to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.activeUsers / 50) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 