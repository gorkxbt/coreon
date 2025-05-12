'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  confidence: number;
  model?: string;
}

interface AgentControlsProps {
  agents: Agent[];
}

export default function AgentControls({ agents }: AgentControlsProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'data-processing': return 'bg-blue-500';
      case 'compliance': return 'bg-red-500';
      case 'interface': return 'bg-purple-500';
      case 'orchestration': return 'bg-green-500';
      case 'storage': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400';
      case 'waiting': return 'bg-yellow-400';
      case 'paused': return 'bg-gray-400';
      case 'error': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-2">
      {agents.slice(0, 2).map((agent) => (
        <div 
          key={agent.id}
          className="bg-coreon-navy-dark/50 rounded-lg border border-coreon-blue/20 overflow-hidden mb-2"
        >
          <div 
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-coreon-navy-dark/70"
            onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
          >
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-3 ${getStatusColor(agent.status)}`}></div>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate max-w-[160px]">{agent.name}</div>
                <div className="flex items-center text-xs text-coreon-gray-light">
                  <span className={`h-2 w-2 rounded-full mr-1.5 ${getTypeColor(agent.type)}`}></span>
                  <span className="capitalize truncate">{agent.type.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-3">
                <div className="text-sm">{Math.round(agent.confidence * 100)}%</div>
                <div className="text-xs text-coreon-gray-light">Confidence</div>
              </div>
              <svg 
                className={`w-5 h-5 text-coreon-gray-light transition-transform ${expandedAgent === agent.id ? 'transform rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {expandedAgent === agent.id && (
            <div className="p-3 border-t border-coreon-blue/10 bg-coreon-navy-dark/30">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-coreon-gray-light mb-1">Status</div>
                  <select 
                    className="w-full bg-coreon-navy-dark border border-coreon-blue/20 rounded px-2 py-1 text-sm"
                    value={agent.status}
                    disabled
                  >
                    <option value="active">Active</option>
                    <option value="waiting">Waiting</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs text-coreon-gray-light mb-1">Model</div>
                  <div className="text-sm font-mono bg-coreon-navy-dark border border-coreon-blue/20 rounded px-2 py-1 truncate">
                    {agent.model || 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs text-coreon-gray-light mb-1">
                  <span>Confidence Threshold</span>
                  <span>{Math.round(agent.confidence * 100)}%</span>
                </div>
                <div className="h-1.5 bg-coreon-navy-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-coreon-blue to-coreon-blue-light rounded-full"
                    style={{ width: `${agent.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-3 py-1 rounded text-xs bg-coreon-navy-dark hover:bg-coreon-navy border border-coreon-blue/20"
                >
                  Configure
                </button>
                <button 
                  className={`px-3 py-1 rounded text-xs ${
                    agent.status === 'active' 
                      ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' 
                      : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                  }`}
                >
                  {agent.status === 'active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 