'use client';

import { useState } from 'react';

const complianceFrameworks = [
  { id: 'hipaa', name: 'HIPAA', status: 'compliant', score: 98, lastCheck: '2023-06-14T08:30:00Z' },
  { id: 'gdpr', name: 'GDPR', status: 'compliant', score: 95, lastCheck: '2023-06-15T10:15:00Z' },
  { id: 'soc2', name: 'SOC 2', status: 'compliant', score: 97, lastCheck: '2023-06-13T14:45:00Z' },
  { id: 'iso27001', name: 'ISO 27001', status: 'review-needed', score: 89, lastCheck: '2023-06-12T09:20:00Z' },
  { id: 'pci', name: 'PCI DSS', status: 'compliant', score: 94, lastCheck: '2023-06-14T16:10:00Z' },
];

const complianceIssues = [
  { 
    id: 'issue-1', 
    title: 'Data retention policy exception', 
    severity: 'medium', 
    framework: 'GDPR', 
    status: 'open',
    description: 'Customer data retained beyond the configured 90-day limit in temporary storage.',
    created: '2023-06-10T11:25:00Z',
  },
  { 
    id: 'issue-2', 
    title: 'Access control audit failure', 
    severity: 'high', 
    framework: 'ISO 27001', 
    status: 'open',
    description: 'Two user accounts have excessive permissions that violate least-privilege principle.',
    created: '2023-06-11T09:15:00Z',
  },
  { 
    id: 'issue-3', 
    title: 'Encryption verification pending', 
    severity: 'low', 
    framework: 'HIPAA', 
    status: 'in-progress',
    description: 'Routine verification of at-rest encryption pending for Q2 2023.',
    created: '2023-06-13T14:30:00Z',
  },
];

const recentAudits = [
  { id: 'audit-1', name: 'Weekly HIPAA Compliance Check', date: '2023-06-14T08:30:00Z', result: 'Pass', issues: 0 },
  { id: 'audit-2', name: 'GDPR Data Processing Audit', date: '2023-06-15T10:15:00Z', result: 'Pass', issues: 1 },
  { id: 'audit-3', name: 'ISO 27001 Control Assessment', date: '2023-06-12T09:20:00Z', result: 'Needs Review', issues: 2 },
  { id: 'audit-4', name: 'PCI DSS Quarterly Scan', date: '2023-06-14T16:10:00Z', result: 'Pass', issues: 0 },
];

export default function CompliancePanel() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant': return 'bg-green-500';
      case 'review-needed': return 'bg-yellow-500';
      case 'non-compliant': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };
  
  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case 'pass': return 'text-green-400';
      case 'needs review': return 'text-yellow-400';
      case 'fail': return 'text-red-400';
      default: return 'text-coreon-gray-light';
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['overview', 'frameworks', 'issues', 'audits'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === tab
                ? 'bg-coreon-blue/20 text-white border border-coreon-blue/50'
                : 'text-coreon-gray-light hover:text-white hover:bg-coreon-navy/50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <h3 className="text-lg font-medium mb-2">Overall Compliance</h3>
              <div className="flex items-center">
                <div className="relative h-24 w-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#30C6FF"
                      strokeWidth="2"
                      strokeDasharray="94.2, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">94%</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-coreon-gray-light">Status</p>
                  <p className="text-green-400 font-medium">Compliant</p>
                </div>
              </div>
            </div>
            
            <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <h3 className="text-lg font-medium mb-2">Open Issues</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold">{complianceIssues.filter(i => i.status === 'open').length}</div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-sm">High: {complianceIssues.filter(i => i.severity === 'high' && i.status === 'open').length}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-sm">Medium: {complianceIssues.filter(i => i.severity === 'medium' && i.status === 'open').length}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    <span className="text-sm">Low: {complianceIssues.filter(i => i.severity === 'low' && i.status === 'open').length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <h3 className="text-lg font-medium mb-2">Recent Audits</h3>
              <div className="space-y-2">
                {recentAudits.slice(0, 2).map(audit => (
                  <div key={audit.id} className="flex justify-between items-center">
                    <span className="text-sm truncate">{audit.name}</span>
                    <span className={`text-sm ${getResultColor(audit.result)}`}>{audit.result}</span>
                  </div>
                ))}
                <button className="text-xs text-coreon-blue hover:underline">
                  View all audits
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <h3 className="text-lg font-medium mb-4">Compliance Frameworks</h3>
              <div className="space-y-3">
                {complianceFrameworks.map(framework => (
                  <div key={framework.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(framework.status)}`}></span>
                      <span>{framework.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 bg-coreon-navy rounded-full h-1.5 mr-2">
                        <div 
                          className={`h-1.5 rounded-full ${
                            framework.score > 95 ? 'bg-green-500' : 
                            framework.score > 90 ? 'bg-blue-500' : 
                            framework.score > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${framework.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{framework.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <h3 className="text-lg font-medium mb-4">Recent Issues</h3>
              <div className="space-y-3">
                {complianceIssues.map(issue => (
                  <div key={issue.id} className="flex items-start">
                    <span className={`h-2 w-2 rounded-full mt-1.5 mr-2 ${getSeverityColor(issue.severity)}`}></span>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">{issue.title}</h4>
                        <span className="ml-2 text-xs text-coreon-gray-light">{issue.framework}</span>
                      </div>
                      <p className="text-xs text-coreon-gray-light mt-0.5">{formatDate(issue.created)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Frameworks Tab */}
      {activeTab === 'frameworks' && (
        <div className="space-y-6">
          {complianceFrameworks.map(framework => (
            <div key={framework.id} className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{framework.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(framework.status)}`}></span>
                    <span className="text-sm text-coreon-gray-light capitalize">
                      {framework.status.replace('-', ' ')}
                    </span>
                    <span className="mx-2 text-coreon-gray-light">•</span>
                    <span className="text-sm text-coreon-gray-light">
                      Last checked: {formatDate(framework.lastCheck)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold mr-2">{framework.score}%</div>
                  <button className="px-3 py-1 rounded bg-coreon-blue/20 text-coreon-blue text-sm hover:bg-coreon-blue/30">
                    Details
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-coreon-navy rounded-full h-2 mb-4">
                <div 
                  className={`h-2 rounded-full ${
                    framework.score > 95 ? 'bg-green-500' : 
                    framework.score > 90 ? 'bg-blue-500' : 
                    framework.score > 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${framework.score}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-coreon-navy/50 rounded p-3">
                  <div className="text-coreon-gray-light mb-1">Controls</div>
                  <div className="font-medium">
                    {framework.id === 'hipaa' ? '42/45 Passed' : 
                     framework.id === 'gdpr' ? '38/40 Passed' :
                     framework.id === 'soc2' ? '61/63 Passed' :
                     framework.id === 'iso27001' ? '103/114 Passed' :
                     '78/82 Passed'}
                  </div>
                </div>
                
                <div className="bg-coreon-navy/50 rounded p-3">
                  <div className="text-coreon-gray-light mb-1">Open Issues</div>
                  <div className="font-medium">
                    {complianceIssues.filter(i => i.framework === framework.name && i.status === 'open').length}
                  </div>
                </div>
                
                <div className="bg-coreon-navy/50 rounded p-3">
                  <div className="text-coreon-gray-light mb-1">Next Audit</div>
                  <div className="font-medium">
                    {framework.id === 'hipaa' ? 'Jun 21, 2023' : 
                     framework.id === 'gdpr' ? 'Jun 29, 2023' :
                     framework.id === 'soc2' ? 'Jul 13, 2023' :
                     framework.id === 'iso27001' ? 'Jun 19, 2023' :
                     'Jul 14, 2023'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Issues Tab */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Compliance Issues</h3>
            <button className="px-3 py-1 rounded bg-coreon-blue/20 text-coreon-blue text-sm hover:bg-coreon-blue/30">
              Export Report
            </button>
          </div>
          
          {complianceIssues.map(issue => (
            <div key={issue.id} className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start">
                  <span className={`h-3 w-3 rounded-full mt-1 mr-3 ${getSeverityColor(issue.severity)}`}></span>
                  <div>
                    <h4 className="font-medium">{issue.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-coreon-blue/10 text-coreon-blue">
                        {issue.framework}
                      </span>
                      <span className="mx-2 text-xs text-coreon-gray-light">•</span>
                      <span className="text-xs text-coreon-gray-light">
                        Created: {formatDate(issue.created)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    issue.status === 'open' ? 'bg-yellow-500/20 text-yellow-400' : 
                    issue.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-coreon-gray-light mb-4">
                {issue.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded bg-coreon-navy text-sm hover:bg-coreon-navy-dark">
                    Assign
                  </button>
                  <button className="px-3 py-1 rounded bg-coreon-navy text-sm hover:bg-coreon-navy-dark">
                    Details
                  </button>
                </div>
                
                <div className="text-xs text-coreon-gray-light">
                  Severity: <span className="capitalize">{issue.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Audits Tab */}
      {activeTab === 'audits' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Recent Audits</h3>
            <button className="px-3 py-1 rounded bg-coreon-blue/20 text-coreon-blue text-sm hover:bg-coreon-blue/30">
              Schedule Audit
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-coreon-gray-light border-b border-coreon-blue/20">
                  <th className="py-3 px-4 text-left">Audit Name</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Result</th>
                  <th className="py-3 px-4 text-left">Issues</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentAudits.map(audit => (
                  <tr 
                    key={audit.id} 
                    className="border-b border-coreon-blue/10 hover:bg-coreon-navy-dark/30"
                  >
                    <td className="py-3 px-4">{audit.name}</td>
                    <td className="py-3 px-4">{formatDate(audit.date)}</td>
                    <td className="py-3 px-4">
                      <span className={getResultColor(audit.result)}>
                        {audit.result}
                      </span>
                    </td>
                    <td className="py-3 px-4">{audit.issues}</td>
                    <td className="py-3 px-4">
                      <button className="px-2 py-1 rounded bg-coreon-navy text-xs hover:bg-coreon-navy-dark">
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/20 mt-6">
            <h3 className="text-lg font-medium mb-4">Upcoming Audits</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Weekly HIPAA Compliance Check</h4>
                  <p className="text-xs text-coreon-gray-light">Scheduled for Jun 21, 2023</p>
                </div>
                <button className="px-3 py-1 rounded bg-coreon-navy text-sm hover:bg-coreon-navy-dark">
                  Reschedule
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">ISO 27001 Control Assessment</h4>
                  <p className="text-xs text-coreon-gray-light">Scheduled for Jun 19, 2023</p>
                </div>
                <button className="px-3 py-1 rounded bg-coreon-navy text-sm hover:bg-coreon-navy-dark">
                  Reschedule
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">GDPR Data Processing Audit</h4>
                  <p className="text-xs text-coreon-gray-light">Scheduled for Jun 29, 2023</p>
                </div>
                <button className="px-3 py-1 rounded bg-coreon-navy text-sm hover:bg-coreon-navy-dark">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 