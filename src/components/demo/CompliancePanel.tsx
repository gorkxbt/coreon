'use client';

import { useState } from 'react';

export default function CompliancePanel() {
  const [activeTab, setActiveTab] = useState('summary');

  // Sample compliance data
  const complianceData = {
    summary: {
      overallScore: 97,
      criticalIssues: 0,
      warnings: 2,
      lastAudit: '2023-06-14T09:30:00Z',
    },
    regulations: [
      { id: 'reg-1', name: 'GDPR', status: 'compliant', score: 98 },
      { id: 'reg-2', name: 'HIPAA', status: 'compliant', score: 100 },
      { id: 'reg-3', name: 'SOC 2', status: 'warning', score: 94 },
      { id: 'reg-4', name: 'PCI DSS', status: 'compliant', score: 97 },
    ],
    policies: [
      { id: 'pol-1', name: 'Data Retention', status: 'compliant', lastVerified: '2023-06-12T14:20:00Z' },
      { id: 'pol-2', name: 'Access Controls', status: 'compliant', lastVerified: '2023-06-13T10:15:00Z' },
      { id: 'pol-3', name: 'Encryption Standards', status: 'warning', lastVerified: '2023-06-10T08:45:00Z' },
      { id: 'pol-4', name: 'Audit Logging', status: 'compliant', lastVerified: '2023-06-14T09:30:00Z' },
    ],
    auditLog: [
      { id: 'log-1', timestamp: '2023-06-15T14:32:00Z', event: 'Compliance check completed', status: 'success', agent: 'validator-1' },
      { id: 'log-2', timestamp: '2023-06-15T14:30:00Z', event: 'PII detection in document #103', status: 'warning', agent: 'security-1' },
      { id: 'log-3', timestamp: '2023-06-15T14:25:00Z', event: 'Encryption verification', status: 'success', agent: 'security-1' },
      { id: 'log-4', timestamp: '2023-06-15T14:20:00Z', event: 'Access control validation', status: 'success', agent: 'validator-1' },
      { id: 'log-5', timestamp: '2023-06-15T14:15:00Z', event: 'Data retention policy check', status: 'success', agent: 'validator-1' },
    ]
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
      case 'non-compliant':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
      case 'success':
        return <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Compliant</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">Warning</span>;
      case 'error':
      case 'non-compliant':
        return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">Non-Compliant</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex space-x-1 mb-4 bg-coreon-navy/70 p-1 rounded-lg inline-block">
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'summary' ? 'bg-coreon-blue/20 text-white' : 'text-coreon-gray-light hover:text-white'}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'regulations' ? 'bg-coreon-blue/20 text-white' : 'text-coreon-gray-light hover:text-white'}`}
          onClick={() => setActiveTab('regulations')}
        >
          Regulations
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'policies' ? 'bg-coreon-blue/20 text-white' : 'text-coreon-gray-light hover:text-white'}`}
          onClick={() => setActiveTab('policies')}
        >
          Policies
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'audit' ? 'bg-coreon-blue/20 text-white' : 'text-coreon-gray-light hover:text-white'}`}
          onClick={() => setActiveTab('audit')}
        >
          Audit Log
        </button>
      </div>

      {activeTab === 'summary' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-coreon-navy/70 rounded-lg p-4 border border-coreon-blue/20">
              <div className="text-sm text-coreon-gray-light mb-1">Overall Compliance</div>
              <div className="flex items-end">
                <div className="text-3xl font-bold">{complianceData.summary.overallScore}%</div>
                <div className="text-green-400 text-sm ml-2 mb-1">Compliant</div>
              </div>
            </div>
            
            <div className="bg-coreon-navy/70 rounded-lg p-4 border border-coreon-blue/20">
              <div className="text-sm text-coreon-gray-light mb-1">Issues</div>
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-xl font-bold">{complianceData.summary.criticalIssues}</div>
                  <div className="text-xs text-coreon-gray-light">Critical</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{complianceData.summary.warnings}</div>
                  <div className="text-xs text-coreon-gray-light">Warnings</div>
                </div>
              </div>
            </div>
            
            <div className="bg-coreon-navy/70 rounded-lg p-4 border border-coreon-blue/20">
              <div className="text-sm text-coreon-gray-light mb-1">Last Audit</div>
              <div className="text-xl font-bold">{formatDate(complianceData.summary.lastAudit)}</div>
              <div className="text-xs text-coreon-gray-light">{formatTime(complianceData.summary.lastAudit)}</div>
            </div>
          </div>
          
          <div className="bg-coreon-navy/70 rounded-lg p-4 border border-coreon-blue/20">
            <h3 className="font-medium mb-3">Compliance Overview</h3>
            <div className="space-y-3">
              {complianceData.regulations.map(regulation => (
                <div key={regulation.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(regulation.status)}`}></div>
                    <span>{regulation.name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-coreon-navy-dark rounded-full h-1.5 mr-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          regulation.score >= 95 ? 'bg-green-500' : 
                          regulation.score >= 90 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${regulation.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{regulation.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'regulations' && (
        <div className="bg-coreon-navy/70 rounded-lg border border-coreon-blue/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-coreon-navy/50 border-b border-coreon-blue/20">
                <th className="py-3 px-4 text-left font-medium">Regulation</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Score</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complianceData.regulations.map(regulation => (
                <tr key={regulation.id} className="border-b border-coreon-blue/10">
                  <td className="py-3 px-4">{regulation.name}</td>
                  <td className="py-3 px-4">{getStatusBadge(regulation.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-32 bg-coreon-navy-dark rounded-full h-1.5 mr-2">
                        <div 
                          className={`h-1.5 rounded-full ${
                            regulation.score >= 95 ? 'bg-green-500' : 
                            regulation.score >= 90 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${regulation.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{regulation.score}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1 rounded text-xs bg-coreon-navy-dark hover:bg-coreon-navy border border-coreon-blue/20">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="bg-coreon-navy/70 rounded-lg border border-coreon-blue/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-coreon-navy/50 border-b border-coreon-blue/20">
                <th className="py-3 px-4 text-left font-medium">Policy</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Last Verified</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complianceData.policies.map(policy => (
                <tr key={policy.id} className="border-b border-coreon-blue/10">
                  <td className="py-3 px-4">{policy.name}</td>
                  <td className="py-3 px-4">{getStatusBadge(policy.status)}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm">{formatDate(policy.lastVerified)}</div>
                      <div className="text-xs text-coreon-gray-light">{formatTime(policy.lastVerified)}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button className="px-3 py-1 rounded text-xs bg-coreon-navy-dark hover:bg-coreon-navy border border-coreon-blue/20">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-coreon-navy/70 rounded-lg border border-coreon-blue/20 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-coreon-navy/50 border-b border-coreon-blue/20">
                <th className="py-3 px-4 text-left font-medium">Timestamp</th>
                <th className="py-3 px-4 text-left font-medium">Event</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Agent</th>
              </tr>
            </thead>
            <tbody>
              {complianceData.auditLog.map(log => (
                <tr key={log.id} className="border-b border-coreon-blue/10">
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm">{formatTime(log.timestamp)}</div>
                      <div className="text-xs text-coreon-gray-light">{formatDate(log.timestamp)}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{log.event}</td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center ${getStatusColor(log.status)}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 bg-current`}></div>
                      <span className="capitalize">{log.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-coreon-navy-dark text-coreon-blue text-xs">
                      {log.agent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 