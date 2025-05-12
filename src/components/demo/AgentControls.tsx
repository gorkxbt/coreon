'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  confidence: number;
}

interface AgentControlsProps {
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
}

export default function AgentControls({ agents, setAgents }: AgentControlsProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' } 
          : agent
      )
    );
  };

  const adjustConfidence = (agentId: string, value: number) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, confidence: Math.min(1, Math.max(0, agent.confidence + value)) } 
          : agent
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'data-processing': return 'bg-blue-500';
      case 'compliance': return 'bg-red-500';
      case 'interface': return 'bg-purple-500';
      case 'orchestration': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {agents.map(agent => (
        <div 
          key={agent.id}
          className="bg-coreon-navy-dark/50 rounded-lg border border-coreon-blue/10 overflow-hidden"
        >
          <div 
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
          >
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-3 ${getTypeColor(agent.type)}`}></div>
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                <p className="text-xs text-coreon-gray-light capitalize">{agent.type.replace('-', ' ')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-xs mr-2">Confidence:</span>
                <div className="w-20 bg-coreon-navy rounded-full h-1.5">
                  <div 
                    className="bg-coreon-blue h-1.5 rounded-full" 
                    style={{ width: `${agent.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{Math.round(agent.confidence * 100)}%</span>
              </div>
              
              <div className="flex items-center">
                <span 
                  className={`px-2 py-0.5 rounded text-xs ${
                    agent.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {agent.status}
                </span>
              </div>
              
              <button className="text-coreon-gray-light">
                {expandedAgent === agent.id ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {expandedAgent === agent.id && (
            <div className="p-4 pt-0 border-t border-coreon-blue/10 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Agent Controls</h4>
                  <div className="space-y-3">
                    <div>
                      <button
                        className={`w-full py-2 px-4 rounded-lg text-sm ${
                          agent.status === 'active'
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                        onClick={() => toggleAgentStatus(agent.id)}
                      >
                        {agent.status === 'active' ? 'Pause Agent' : 'Activate Agent'}
                      </button>
                    </div>
                    
                    <div>
                      <h5 className="text-xs text-coreon-gray-light mb-1">Confidence Adjustment</h5>
                      <div className="flex space-x-2">
                        <button
                          className="flex-1 py-1 rounded bg-coreon-navy hover:bg-coreon-navy-dark text-sm"
                          onClick={() => adjustConfidence(agent.id, -0.1)}
                        >
                          -10%
                        </button>
                        <button
                          className="flex-1 py-1 rounded bg-coreon-navy hover:bg-coreon-navy-dark text-sm"
                          onClick={() => adjustConfidence(agent.id, -0.05)}
                        >
                          -5%
                        </button>
                        <button
                          className="flex-1 py-1 rounded bg-coreon-navy hover:bg-coreon-navy-dark text-sm"
                          onClick={() => adjustConfidence(agent.id, 0.05)}
                        >
                          +5%
                        </button>
                        <button
                          className="flex-1 py-1 rounded bg-coreon-navy hover:bg-coreon-navy-dark text-sm"
                          onClick={() => adjustConfidence(agent.id, 0.1)}
                        >
                          +10%
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Agent Parameters</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">ID:</span>
                      <span>{agent.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Type:</span>
                      <span className="capitalize">{agent.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Status:</span>
                      <span className="capitalize">{agent.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Confidence:</span>
                      <span>{Math.round(agent.confidence * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Model:</span>
                      <span>coreon-{agent.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-coreon-blue/10">
                <h4 className="text-sm font-medium mb-2">Agent Logs</h4>
                <div className="bg-coreon-navy-dark rounded p-2 text-xs font-mono h-24 overflow-y-auto">
                  <div className="text-green-400">[{new Date().toISOString()}] Agent {agent.name} initialized</div>
                  <div className="text-coreon-gray-light">[{new Date().toISOString()}] Processing input data</div>
                  <div className="text-coreon-blue">[{new Date().toISOString()}] Confidence score: {Math.round(agent.confidence * 100)}%</div>
                  <div className="text-yellow-400">[{new Date().toISOString()}] Warning: Unusual pattern detected</div>
                  <div className="text-coreon-gray-light">[{new Date().toISOString()}] Applying validation rules</div>
                  <div className="text-coreon-gray-light">[{new Date().toISOString()}] Connecting to downstream agents</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 