'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';
import AgentMeshVisualizer from '../../components/demo/AgentMeshVisualizer';
import AgentControls from '../../components/demo/AgentControls';
import TaskMonitor from '../../components/demo/TaskMonitor';
import CompliancePanel from '../../components/demo/CompliancePanel';
import HumanReviewQueue from '../../components/demo/HumanReviewQueue';

// Enterprise demo data with realistic use cases
const demoAgents = [
  { id: 'classifier-1', name: 'Document Classifier', type: 'data-processing', status: 'active', confidence: 0.95, model: 'coreon-nlp-v2' },
  { id: 'extractor-1', name: 'Data Extractor', type: 'data-processing', status: 'active', confidence: 0.88, model: 'coreon-structure-v1' },
  { id: 'validator-1', name: 'Compliance Validator', type: 'compliance', status: 'active', confidence: 0.92, model: 'coreon-finance-secure' },
  { id: 'reviewer-1', name: 'Human Interface', type: 'interface', status: 'waiting', confidence: 1.0, model: 'coreon-interface-v3' },
  { id: 'orchestrator-1', name: 'Workflow Orchestrator', type: 'orchestration', status: 'active', confidence: 0.98, model: 'coreon-flow-v2' },
  { id: 'memory-1', name: 'Context Memory', type: 'storage', status: 'active', confidence: 0.99, model: 'coreon-memory-v1' },
  { id: 'security-1', name: 'Security Monitor', type: 'compliance', status: 'active', confidence: 0.97, model: 'coreon-secure-v2' },
];

const demoConnections = [
  { from: 'orchestrator-1', to: 'classifier-1' },
  { from: 'classifier-1', to: 'extractor-1' },
  { from: 'extractor-1', to: 'validator-1' },
  { from: 'validator-1', to: 'reviewer-1' },
  { from: 'orchestrator-1', to: 'memory-1' },
  { from: 'memory-1', to: 'extractor-1' },
  { from: 'memory-1', to: 'validator-1' },
  { from: 'security-1', to: 'validator-1' },
  { from: 'security-1', to: 'reviewer-1' },
  { from: 'orchestrator-1', to: 'security-1' },
];

const demoTasks = [
  { 
    id: 'task-1', 
    name: 'Insurance Claim #4872', 
    status: 'in-progress', 
    completion: 65, 
    priority: 'high', 
    agent: 'validator-1',
    type: 'Financial',
    created: '2023-06-15T10:23:15Z',
    deadline: '2023-06-15T18:00:00Z'
  },
  { 
    id: 'task-2', 
    name: 'Medical Record Review #103', 
    status: 'pending-review', 
    completion: 90, 
    priority: 'medium', 
    agent: 'reviewer-1',
    type: 'Healthcare',
    created: '2023-06-15T09:45:22Z',
    deadline: '2023-06-16T12:00:00Z'
  },
  { 
    id: 'task-3', 
    name: 'Loan Application #7291', 
    status: 'queued', 
    completion: 0, 
    priority: 'low', 
    agent: null,
    type: 'Financial',
    created: '2023-06-15T14:12:05Z',
    deadline: '2023-06-17T16:00:00Z'
  },
  { 
    id: 'task-4', 
    name: 'Compliance Report #56', 
    status: 'completed', 
    completion: 100, 
    priority: 'high', 
    agent: null,
    type: 'Regulatory',
    created: '2023-06-14T11:30:45Z',
    deadline: '2023-06-15T09:00:00Z'
  },
  { 
    id: 'task-5', 
    name: 'Patient Intake Form #238', 
    status: 'in-progress', 
    completion: 42, 
    priority: 'medium', 
    agent: 'extractor-1',
    type: 'Healthcare',
    created: '2023-06-15T13:18:32Z',
    deadline: '2023-06-16T10:00:00Z'
  },
  { 
    id: 'task-6', 
    name: 'Audit Documentation #19', 
    status: 'pending-review', 
    completion: 95, 
    priority: 'high', 
    agent: 'reviewer-1',
    type: 'Regulatory',
    created: '2023-06-15T08:22:17Z',
    deadline: '2023-06-15T17:00:00Z'
  },
];

const demoReviewItems = [
  { 
    id: 'review-1', 
    task: 'Medical Record Review #103', 
    status: 'pending', 
    priority: 'high',
    confidence: 0.82,
    flagged: true,
    reason: 'PII detected in unstructured field',
    timeReceived: '2023-06-15T14:32:00Z',
    department: 'Healthcare',
    assignedTo: 'Dr. Sarah Chen',
    dataPoints: ['Patient ID', 'Treatment Code', 'Diagnosis']
  },
  { 
    id: 'review-2', 
    task: 'Insurance Claim #4872', 
    status: 'pending', 
    priority: 'medium',
    confidence: 0.91,
    flagged: false,
    reason: 'Unusual claim amount detected',
    timeReceived: '2023-06-15T13:45:00Z',
    department: 'Financial',
    assignedTo: 'Michael Rodriguez',
    dataPoints: ['Claim Amount', 'Policy Number', 'Incident Date']
  },
  { 
    id: 'review-3', 
    task: 'Audit Documentation #19', 
    status: 'pending', 
    priority: 'high',
    confidence: 0.87,
    flagged: true,
    reason: 'Regulatory exception requires approval',
    timeReceived: '2023-06-15T15:10:00Z',
    department: 'Compliance',
    assignedTo: 'Jennifer Walsh',
    dataPoints: ['Exception Code', 'Regulation ID', 'Documentation Status']
  },
];

export default function Demo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agents, setAgents] = useState(demoAgents);
  const [tasks, setTasks] = useState(demoTasks);
  const [reviewItems, setReviewItems] = useState(demoReviewItems);
  const [demoInstance, setDemoInstance] = useState('healthcare-1');
  const [demoRunning, setDemoRunning] = useState(true);

  // Simulate agent activity
  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      if (!demoRunning) return;
      
      // Update agent confidence randomly
      setAgents(prev => 
        prev.map(agent => ({
          ...agent,
          confidence: Math.min(1, Math.max(0.7, agent.confidence + (Math.random() * 0.1 - 0.05))),
        }))
      );

      // Update task progress
      setTasks(prev => 
        prev.map(task => {
          if (task.status === 'in-progress') {
            const newCompletion = Math.min(100, task.completion + Math.floor(Math.random() * 5));
            return {
              ...task,
              completion: newCompletion,
              status: newCompletion === 100 ? 'pending-review' : 'in-progress'
            };
          }
          return task;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [demoRunning]);

  // Handle review approval
  const handleApprove = (reviewId: string) => {
    setReviewItems(prev => prev.filter(item => item.id !== reviewId));
    
    // Add a new review item after a delay
    setTimeout(() => {
      if (!demoRunning) return;
      
      const departments = ['Healthcare', 'Financial', 'Compliance', 'Legal'];
      const reasons = [
        'Requires human verification',
        'Confidence threshold not met',
        'Potential regulatory impact',
        'Anomaly detected in data pattern',
        'Security policy exception'
      ];
      
      const newReview = {
        id: `review-${Date.now()}`,
        task: `Task #${Math.floor(Math.random() * 1000)}`,
        status: 'pending',
        priority: Math.random() > 0.5 ? 'high' : 'medium',
        confidence: 0.75 + (Math.random() * 0.2),
        flagged: Math.random() > 0.7,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        timeReceived: new Date().toISOString(),
        department: departments[Math.floor(Math.random() * departments.length)],
        assignedTo: ['Dr. Sarah Chen', 'Michael Rodriguez', 'Jennifer Walsh', 'David Kim'][Math.floor(Math.random() * 4)],
        dataPoints: ['Document ID', 'Verification Status', 'Approval Level']
      };
      
      setReviewItems(prev => [...prev, newReview]);
    }, 5000);
  };

  // Handle review rejection
  const handleReject = (reviewId: string) => {
    setReviewItems(prev => prev.filter(item => item.id !== reviewId));
  };

  // Toggle demo running state
  const toggleDemo = () => {
    setDemoRunning(!demoRunning);
  };

  // Change demo instance
  const changeDemoInstance = (instance: string) => {
    setDemoInstance(instance);
    // In a real implementation, this would load different datasets
  };

  return (
    <main className="min-h-screen bg-coreon-navy-dark">
      <div 
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(8, 17, 54, 0.8) 0%, rgba(5, 10, 32, 1) 100%)',
          backgroundSize: 'cover',
        }}
      />
      
      <ParticleBackground />
      
      <Header />
      
      <motion.div
        className="pt-32 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  Enterprise AI Orchestration
                </h1>
                <p className="text-xl text-coreon-gray-light">
                  Interactive demonstration of Coreon's agent mesh technology
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-sm text-coreon-gray-light mr-2">Demo:</span>
                  <select 
                    className="bg-coreon-navy-dark border border-coreon-blue/30 rounded-lg px-3 py-1 text-sm"
                    value={demoInstance}
                    onChange={(e) => changeDemoInstance(e.target.value)}
                  >
                    <option value="healthcare-1">Healthcare Workflow</option>
                    <option value="finance-1">Financial Compliance</option>
                    <option value="legal-1">Legal Document Processing</option>
                  </select>
                </div>
                
                <button
                  className={`px-3 py-1 rounded-lg text-sm ${
                    demoRunning 
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                  onClick={toggleDemo}
                >
                  {demoRunning ? 'Pause Demo' : 'Resume Demo'}
                </button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-coreon-blue/10 border border-coreon-blue/30 rounded-lg">
              <div className="flex items-start">
                <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">About this demonstration</h3>
                  <p className="text-sm text-coreon-gray-light mt-1">
                    This interactive demo showcases Coreon's enterprise AI orchestration platform with real-time agent collaboration, 
                    human-in-the-loop oversight, and regulatory compliance features. The simulation demonstrates how multiple AI agents 
                    work together under governance controls to process sensitive enterprise data.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-coreon-navy-dark/50 p-1 rounded-lg border border-coreon-blue/10 inline-block">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
              { id: 'agents', label: 'Agents', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
              { id: 'tasks', label: 'Tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
              { id: 'compliance', label: 'Compliance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { id: 'review', label: 'Review', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'bg-coreon-blue/20 text-white border border-coreon-blue/50'
                    : 'text-coreon-gray-light hover:text-white hover:bg-coreon-navy/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-4 flex items-center">
                  <div className="p-3 rounded-lg bg-green-500/20 mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-coreon-gray-light">System Health</div>
                    <div className="text-xl font-bold">95%</div>
                    <div className="text-xs text-green-400">Operational</div>
                  </div>
                </div>
                
                <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-4 flex items-center">
                  <div className="p-3 rounded-lg bg-blue-500/20 mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-coreon-gray-light">Active Agents</div>
                    <div className="text-xl font-bold">{agents.filter(a => a.status === 'active').length}/{agents.length}</div>
                    <div className="text-xs text-blue-400">Ready</div>
                  </div>
                </div>
                
                <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-4 flex items-center">
                  <div className="p-3 rounded-lg bg-yellow-500/20 mr-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-coreon-gray-light">Running Tasks</div>
                    <div className="text-xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</div>
                    <div className="text-xs text-yellow-400">In Progress</div>
                  </div>
                </div>
                
                <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-4 flex items-center">
                  <div className="p-3 rounded-lg bg-purple-500/20 mr-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-coreon-gray-light">Pending Reviews</div>
                    <div className="text-xl font-bold">{reviewItems.length}</div>
                    <div className="text-xs text-purple-400">Awaiting</div>
                  </div>
                </div>
              </div>
              
              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Agent Mesh Visualization</h2>
                    <div className="flex space-x-2">
                      <button className="p-1.5 rounded bg-coreon-navy hover:bg-coreon-navy-dark text-xs flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                      </button>
                      <button className="p-1.5 rounded bg-coreon-navy hover:bg-coreon-navy-dark text-xs flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Expand
                      </button>
                    </div>
                  </div>
                  <div className="relative h-[400px] bg-coreon-navy-dark/30 rounded-lg border border-coreon-blue/10 overflow-hidden">
                    <div className="absolute top-3 left-3 z-10 bg-coreon-navy-dark/80 backdrop-blur-sm rounded-lg p-2 border border-coreon-blue/20 text-xs">
                      <div className="flex items-center mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>Data Processing</span>
                      </div>
                      <div className="flex items-center mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        <span>Compliance</span>
                      </div>
                      <div className="flex items-center mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                        <span>Interface</span>
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Orchestration</span>
                      </div>
                    </div>
                    <AgentMeshVisualizer agents={agents} connections={demoConnections} />
                  </div>
                </div>
                
                <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">System Status</h2>
                    <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Live</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Health</span>
                        <span className="text-green-400">Excellent</span>
                      </div>
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Active Agents</span>
                        <span>{agents.filter(a => a.status === 'active').length}/{agents.length}</span>
                      </div>
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2">
                        <div className="bg-coreon-blue h-2 rounded-full" style={{ width: `${(agents.filter(a => a.status === 'active').length / agents.length) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tasks in Progress</span>
                        <span>{tasks.filter(t => t.status === 'in-progress').length}</span>
                      </div>
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(tasks.filter(t => t.status === 'in-progress').length / tasks.length) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pending Reviews</span>
                        <span>{reviewItems.length}</span>
                      </div>
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(reviewItems.length / 5) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">Recent Activity</h3>
                        <button className="text-xs text-coreon-blue hover:underline">View All</button>
                      </div>
                      <div className="bg-coreon-navy-dark/50 rounded-lg border border-coreon-blue/10 overflow-hidden">
                        <ul className="divide-y divide-coreon-blue/10">
                          <li className="p-2.5 hover:bg-coreon-navy-dark/30">
                            <div className="flex items-start">
                              <span className="h-2 w-2 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0"></span>
                              <div>
                                <p className="text-sm">Compliance check passed for Insurance Claim #4872</p>
                                <p className="text-xs text-coreon-gray-light mt-0.5">5 minutes ago</p>
                              </div>
                            </div>
                          </li>
                          <li className="p-2.5 hover:bg-coreon-navy-dark/30">
                            <div className="flex items-start">
                              <span className="h-2 w-2 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></span>
                              <div>
                                <p className="text-sm">Human review requested for Medical Record #103</p>
                                <p className="text-xs text-coreon-gray-light mt-0.5">12 minutes ago</p>
                              </div>
                            </div>
                          </li>
                          <li className="p-2.5 hover:bg-coreon-navy-dark/30">
                            <div className="flex items-start">
                              <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                              <div>
                                <p className="text-sm">New task added to queue: Loan Application #7291</p>
                                <p className="text-xs text-coreon-gray-light mt-0.5">25 minutes ago</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Active Tasks</h2>
                    <div className="flex space-x-2">
                      <select className="bg-coreon-navy-dark border border-coreon-blue/30 rounded-lg px-2 py-1 text-xs">
                        <option value="all">All Tasks</option>
                        <option value="in-progress">In Progress</option>
                        <option value="queued">Queued</option>
                        <option value="review">Pending Review</option>
                      </select>
                      <button className="p-1.5 rounded bg-coreon-blue/20 text-coreon-blue hover:bg-coreon-blue/30 text-xs">
                        Add Task
                      </button>
                    </div>
                  </div>
                  <TaskMonitor tasks={tasks} />
                </div>
                
                <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Human Review Queue</h2>
                    <div className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      {reviewItems.length} Pending
                    </div>
                  </div>
                  <HumanReviewQueue 
                    items={reviewItems} 
                    onApprove={handleApprove} 
                    onReject={handleReject} 
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Agents View */}
          {activeTab === 'agents' && (
            <div className="space-y-6">
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Agent Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 rounded-lg bg-coreon-blue/20 text-coreon-blue hover:bg-coreon-blue/30 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Agent
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-coreon-navy hover:bg-coreon-navy-dark text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filter
                    </button>
                  </div>
                </div>
                
                <div className="bg-coreon-navy-dark/30 rounded-lg p-4 mb-6 border border-coreon-blue/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-medium">Agent Mesh Overview</h3>
                      <p className="text-sm text-coreon-gray-light mt-1">
                        This agent mesh is configured for a {demoInstance === 'healthcare-1' ? 'healthcare workflow' : 
                          demoInstance === 'finance-1' ? 'financial compliance' : 'legal document processing'} use case.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{agents.length}</div>
                        <div className="text-xs text-coreon-gray-light">Total Agents</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{agents.filter(a => a.status === 'active').length}</div>
                        <div className="text-xs text-coreon-gray-light">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{demoConnections.length}</div>
                        <div className="text-xs text-coreon-gray-light">Connections</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <AgentControls agents={agents} setAgents={setAgents} />
              </div>
            </div>
          )}
          
          {/* Tasks View */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Task Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 rounded-lg bg-coreon-blue/20 text-coreon-blue hover:bg-coreon-blue/30 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      New Task
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-coreon-navy hover:bg-coreon-navy-dark text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10 flex flex-col items-center">
                    <div className="text-2xl font-bold">{tasks.length}</div>
                    <div className="text-xs text-coreon-gray-light">Total Tasks</div>
                  </div>
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10 flex flex-col items-center">
                    <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</div>
                    <div className="text-xs text-coreon-gray-light">In Progress</div>
                  </div>
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10 flex flex-col items-center">
                    <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'pending-review').length}</div>
                    <div className="text-xs text-coreon-gray-light">Pending Review</div>
                  </div>
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10 flex flex-col items-center">
                    <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'completed').length}</div>
                    <div className="text-xs text-coreon-gray-light">Completed</div>
                  </div>
                </div>
                
                <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <select className="bg-coreon-navy-dark border border-coreon-blue/30 rounded-lg px-2 py-1 text-xs">
                        <option value="all">All Types</option>
                        <option value="financial">Financial</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="regulatory">Regulatory</option>
                      </select>
                      <select className="bg-coreon-navy-dark border border-coreon-blue/30 rounded-lg px-2 py-1 text-xs">
                        <option value="all">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        className="bg-coreon-navy-dark border border-coreon-blue/30 rounded-lg pl-8 pr-3 py-1 text-xs w-48"
                      />
                      <svg className="w-4 h-4 absolute left-2 top-1.5 text-coreon-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <TaskMonitor tasks={tasks} detailed={true} />
                </div>
              </div>
            </div>
          )}
          
          {/* Compliance View */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Compliance Dashboard</h2>
                    <p className="text-sm text-coreon-gray-light mt-1">
                      Real-time monitoring of regulatory compliance across agent operations
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 rounded-lg bg-coreon-navy hover:bg-coreon-navy-dark text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export Report
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-coreon-blue/20 text-coreon-blue hover:bg-coreon-blue/30 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Configure Alerts
                    </button>
                  </div>
                </div>
                
                <CompliancePanel />
              </div>
            </div>
          )}
          
          {/* Human Review View */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Human Review Interface</h2>
                    <p className="text-sm text-coreon-gray-light mt-1">
                      Review and approve AI decisions requiring human oversight
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-xs text-coreon-gray-light">Available: <span className="text-white">Dr. Sarah Chen</span></span>
                    </div>
                    <select className="bg-coreon-navy-dark border border-coreon-blue/30 rounded-lg px-2 py-1 text-xs">
                      <option value="all">All Items</option>
                      <option value="flagged">Flagged Only</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Pending Reviews</h3>
                      <div className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                        {reviewItems.length}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2 mr-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(reviewItems.length / 10) * 100}%` }}></div>
                      </div>
                      <span className="text-xs">{reviewItems.length}/10</span>
                    </div>
                  </div>
                  
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Flagged Items</h3>
                      <div className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                        {reviewItems.filter(i => i.flagged).length}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2 mr-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(reviewItems.filter(i => i.flagged).length / reviewItems.length) * 100}%` }}></div>
                      </div>
                      <span className="text-xs">{reviewItems.filter(i => i.flagged).length}/{reviewItems.length}</span>
                    </div>
                  </div>
                  
                  <div className="bg-coreon-navy-dark/30 rounded-lg p-4 border border-coreon-blue/10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Average Confidence</h3>
                      <div className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                        {Math.round((reviewItems.reduce((acc, item) => acc + item.confidence, 0) / reviewItems.length) * 100)}%
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-coreon-navy-dark rounded-full h-2 mr-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(reviewItems.reduce((acc, item) => acc + item.confidence, 0) / reviewItems.length) * 100}%` }}></div>
                      </div>
                      <span className="text-xs">{Math.round((reviewItems.reduce((acc, item) => acc + item.confidence, 0) / reviewItems.length) * 100)}%</span>
                    </div>
                  </div>
                </div>
                
                <HumanReviewQueue 
                  items={reviewItems} 
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                  detailed={true}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 