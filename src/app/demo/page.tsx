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
  { from: 'orchestrator-1', to: 'classifier-1', type: 'control', strength: 0.9 },
  { from: 'classifier-1', to: 'extractor-1', type: 'data', strength: 0.8 },
  { from: 'extractor-1', to: 'validator-1', type: 'data', strength: 0.85 },
  { from: 'validator-1', to: 'reviewer-1', type: 'review', strength: 0.7 },
  { from: 'orchestrator-1', to: 'memory-1', type: 'storage', strength: 0.95 },
  { from: 'memory-1', to: 'extractor-1', type: 'context', strength: 0.75 },
  { from: 'memory-1', to: 'validator-1', type: 'context', strength: 0.8 },
  { from: 'security-1', to: 'validator-1', type: 'audit', strength: 0.9 },
  { from: 'security-1', to: 'reviewer-1', type: 'audit', strength: 0.85 },
  { from: 'orchestrator-1', to: 'security-1', type: 'control', strength: 0.95 },
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
              
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <div className="flex items-center border border-coreon-blue/30 rounded-lg px-4 py-2 bg-coreon-navy/50">
                  <span className="text-sm text-coreon-gray-light mr-2">Instance:</span>
                  <select 
                    className="bg-transparent text-white border-0 outline-none text-sm"
                    value={demoInstance}
                    onChange={(e) => changeDemoInstance(e.target.value)}
                  >
                    <option value="healthcare-1" className="bg-coreon-navy-dark">Healthcare System</option>
                    <option value="finance-1" className="bg-coreon-navy-dark">Financial Services</option>
                    <option value="insurance-1" className="bg-coreon-navy-dark">Insurance Claims</option>
                    <option value="government-1" className="bg-coreon-navy-dark">Public Sector</option>
                  </select>
                </div>
                
                <button 
                  onClick={toggleDemo} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${demoRunning ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'} transition-colors`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${demoRunning ? 'bg-red-400' : 'bg-green-400'}`}></span>
                  {demoRunning ? 'Pause Demo' : 'Resume Demo'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg overflow-hidden">
              <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                <h2 className="font-bold text-lg">Agent Mesh Visualization</h2>
                <div className="flex items-center">
                  <span className="text-xs text-coreon-gray-light mr-2">View:</span>
                  <div className="flex bg-coreon-navy/70 rounded-lg overflow-hidden">
                    <button className="px-3 py-1 text-xs bg-coreon-blue/20 text-white">Network</button>
                    <button className="px-3 py-1 text-xs text-coreon-gray-light hover:bg-coreon-blue/10">Hierarchy</button>
                  </div>
                </div>
              </div>
              <div className="p-4 h-[400px]">
                <AgentMeshVisualizer 
                  agents={agents} 
                  connections={demoConnections}
                />
              </div>
            </div>
            
            <div>
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg mb-6">
                <div className="p-4 border-b border-coreon-blue/20">
                  <h2 className="font-bold text-lg">Agent Controls</h2>
                </div>
                <div className="p-4">
                  <AgentControls agents={agents} />
                </div>
              </div>
              
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <h2 className="font-bold text-lg">System Status</h2>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    <span className="text-xs text-green-400">Operational</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-coreon-gray-light">CPU Usage</span>
                        <span>24%</span>
                      </div>
                      <div className="h-2 bg-coreon-navy-dark rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-coreon-blue to-coreon-blue-light w-1/4 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-coreon-gray-light">Memory</span>
                        <span>2.4 GB / 8 GB</span>
                      </div>
                      <div className="h-2 bg-coreon-navy-dark rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-coreon-blue to-coreon-blue-light w-[30%] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-coreon-gray-light">Network</span>
                        <span>4.2 MB/s</span>
                      </div>
                      <div className="h-2 bg-coreon-navy-dark rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-coreon-blue to-coreon-blue-light w-[15%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Task Monitor</h2>
                  <div className="flex items-center text-xs text-coreon-gray-light">
                    <span className="mr-2">Filter:</span>
                    <select className="bg-coreon-navy/70 border border-coreon-blue/20 rounded px-2 py-1 text-white text-xs">
                      <option>All Tasks</option>
                      <option>In Progress</option>
                      <option>Pending Review</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
                <div className="p-4">
                  <TaskMonitor tasks={tasks} />
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="font-bold text-lg">Human Review</h2>
                    <span className="ml-2 px-2 py-0.5 bg-coreon-blue/20 text-coreon-blue rounded-full text-xs">
                      {reviewItems.length}
                    </span>
                  </div>
                  <button className="text-xs text-coreon-blue hover:text-coreon-blue-light">
                    View All
                  </button>
                </div>
                <div className="p-4">
                  <HumanReviewQueue 
                    items={reviewItems} 
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
            <div className="p-4 border-b border-coreon-blue/20">
              <h2 className="font-bold text-lg">Compliance & Audit</h2>
            </div>
            <div className="p-4">
              <CompliancePanel />
            </div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 