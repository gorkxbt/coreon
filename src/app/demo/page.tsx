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
import MetricsDisplay from '../../components/demo/MetricsDisplay';

// Generate current and upcoming dates
const currentDate = new Date();
const tomorrow = new Date();
tomorrow.setDate(currentDate.getDate() + 1);
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(currentDate.getDate() + 2);

// Time an hour ago
const hourAgo = new Date();
hourAgo.setHours(currentDate.getHours() - 1);

// Earlier today
const earlierToday = new Date();
earlierToday.setHours(currentDate.getHours() - 3);

// Format to ISO string
const currentDateISO = currentDate.toISOString();
const hourAgoISO = hourAgo.toISOString();
const earlierTodayISO = earlierToday.toISOString();
const tomorrowISO = tomorrow.toISOString();
const dayAfterTomorrowISO = dayAfterTomorrow.toISOString();

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
    created: hourAgoISO,
    deadline: tomorrowISO
  },
  { 
    id: 'task-2', 
    name: 'Medical Record Review #103', 
    status: 'pending-review', 
    completion: 90, 
    priority: 'medium', 
    agent: 'reviewer-1',
    type: 'Healthcare',
    created: earlierTodayISO,
    deadline: tomorrowISO
  },
  { 
    id: 'task-3', 
    name: 'Loan Application #7291', 
    status: 'queued', 
    completion: 0, 
    priority: 'low', 
    agent: null,
    type: 'Financial',
    created: currentDateISO,
    deadline: dayAfterTomorrowISO
  },
  { 
    id: 'task-4', 
    name: 'Compliance Report #56', 
    status: 'completed', 
    completion: 100, 
    priority: 'high', 
    agent: null,
    type: 'Regulatory',
    created: earlierTodayISO,
    deadline: currentDateISO
  },
  { 
    id: 'task-5', 
    name: 'Patient Intake Form #238', 
    status: 'in-progress', 
    completion: 42, 
    priority: 'medium', 
    agent: 'extractor-1',
    type: 'Healthcare',
    created: currentDateISO,
    deadline: tomorrowISO
  },
  { 
    id: 'task-6', 
    name: 'Audit Documentation #19', 
    status: 'pending-review', 
    completion: 95, 
    priority: 'high', 
    agent: 'reviewer-1',
    type: 'Regulatory',
    created: earlierTodayISO,
    deadline: currentDateISO
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
    timeReceived: hourAgoISO,
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
    timeReceived: earlierTodayISO,
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
    timeReceived: currentDateISO,
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
  const [filteredTasks, setFilteredTasks] = useState(demoTasks);
  const [taskFilter, setTaskFilter] = useState('all');
  const [reviewItems, setReviewItems] = useState(demoReviewItems);
  const [demoInstance, setDemoInstance] = useState('healthcare-1');
  const [demoRunning, setDemoRunning] = useState(true);
  const [visualizationView, setVisualizationView] = useState<'network' | 'hierarchy'>('network');

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
      setTasks(prev => {
        const updatedTasks = prev.map(task => {
          if (task.status === 'in-progress') {
            const newCompletion = Math.min(100, task.completion + Math.floor(Math.random() * 5));
            return {
              ...task,
              completion: newCompletion,
              status: newCompletion === 100 ? 'pending-review' : 'in-progress'
            };
          }
          return task;
        });
        
        // Apply filter to updated tasks
        applyTaskFilter(updatedTasks);
        return updatedTasks;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [demoRunning, taskFilter]);

  // Apply task filter
  const applyTaskFilter = (tasksToFilter = tasks) => {
    if (taskFilter === 'all') {
      setFilteredTasks(tasksToFilter);
    } else {
      setFilteredTasks(tasksToFilter.filter(task => task.status === taskFilter));
    }
  };

  // Handle task filter change
  const handleFilterChange = (filter: string) => {
    setTaskFilter(filter);
    applyTaskFilter(tasks);
  };

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
      
      const now = new Date();
      
      const newReview = {
        id: `review-${Date.now()}`,
        task: `Task #${Math.floor(Math.random() * 1000)}`,
        status: 'pending',
        priority: Math.random() > 0.5 ? 'high' : 'medium',
        confidence: 0.75 + (Math.random() * 0.2),
        flagged: Math.random() > 0.7,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        timeReceived: now.toISOString(),
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

  // Toggle visualization view
  const toggleVisualizationView = (view: 'network' | 'hierarchy') => {
    setVisualizationView(view);
  };

  // Get current date formatted
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get current time formatted
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
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
        className="pt-28 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section with title and controls */}
          <div className="mb-8 bg-coreon-navy/30 backdrop-blur-md p-6 rounded-xl border border-coreon-blue/20 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  Enterprise AI Orchestration
                </h1>
                <p className="text-xl text-coreon-gray-light">
                  Interactive demonstration of Coreon's agent mesh technology
                </p>
                <p className="text-sm text-coreon-gray-light mt-2">
                  {getCurrentDate()} • {getCurrentTime()} • Live Demo Environment
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
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
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${demoRunning ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`}></span>
                  {demoRunning ? 'Pause Demo' : 'Resume Demo'}
                </button>
              </div>
            </div>

            {/* System status - Redesigned row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-coreon-blue/10">
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/10 mr-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                  </div>
                  <div>
                    <div className="text-sm text-coreon-gray-light">System Status</div>
                    <div className="font-medium">Operational</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-coreon-blue/10 mr-3">
                    <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-coreon-gray-light">CPU Usage</div>
                    <div className="font-medium">24%</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/10 mr-3">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-coreon-gray-light">Active Agents</div>
                    <div className="font-medium">{agents.filter(a => a.status === 'active').length}/{agents.length}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500/10 mr-3">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-coreon-gray-light">Memory</div>
                    <div className="font-medium">2.4 GB / 8 GB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main layout - Redesigned for better organization */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left column - Visualization + Controls */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Visualization Section */}
              <div className="bg-coreon-navy/30 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Agent Mesh Visualization</h2>
                  <div className="flex items-center">
                    <span className="text-xs text-coreon-gray-light mr-2">View:</span>
                    <div className="flex bg-coreon-navy/70 rounded-lg overflow-hidden">
                      <button 
                        className={`px-3 py-1 text-xs ${visualizationView === 'network' ? 'bg-coreon-blue/20 text-white' : 'text-coreon-gray-light hover:bg-coreon-blue/10'}`}
                        onClick={() => toggleVisualizationView('network')}
                      >
                        Network
                      </button>
                      <button 
                        className={`px-3 py-1 text-xs ${visualizationView === 'hierarchy' ? 'bg-coreon-blue/20 text-white' : 'text-coreon-gray-light hover:bg-coreon-blue/10'}`}
                        onClick={() => toggleVisualizationView('hierarchy')}
                      >
                        Hierarchy
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4" style={{ height: '320px' }}>
                  <AgentMeshVisualizer 
                    agents={agents} 
                    connections={demoConnections}
                    view={visualizationView}
                  />
                </div>
              </div>
              
              {/* Task Monitor Section */}
              <div className="bg-coreon-navy/30 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Task Monitor</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-xs text-coreon-gray-light">
                      <span className="mr-2">Filter:</span>
                      <select 
                        className="bg-coreon-navy/70 border border-coreon-blue/20 rounded px-2 py-1 text-white text-xs"
                        value={taskFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                      >
                        <option value="all">All Tasks</option>
                        <option value="in-progress">In Progress</option>
                        <option value="pending-review">Pending Review</option>
                        <option value="completed">Completed</option>
                        <option value="queued">Queued</option>
                      </select>
                    </div>
                    <button className="text-xs text-coreon-blue hover:text-coreon-blue-light">
                      View All
                    </button>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <TaskMonitor tasks={filteredTasks.slice(0, 3)} />
                </div>
              </div>
              
              {/* Metrics Display */}
              <div>
                <MetricsDisplay demoRunning={demoRunning} />
              </div>
            </div>
            
            {/* Right column - Controls, Review Queue, Compliance */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Agent Controls */}
              <div className="bg-coreon-navy/30 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Agent Controls</h2>
                  <button className="text-xs text-coreon-blue hover:text-coreon-blue-light">
                    Configure All
                  </button>
                </div>
                <div className="px-4 py-3">
                  <AgentControls agents={agents.slice(0, 2)} />
                </div>
              </div>
              
              {/* Human Review Queue */}
              <div className="bg-coreon-navy/30 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
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
                    items={reviewItems.slice(0, 1)} 
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </div>
              </div>
              
              {/* Compliance Panel - Compact version */}
              <div className="bg-coreon-navy/30 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <div className="p-4 border-b border-coreon-blue/20 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Compliance & Audit</h2>
                  <button className="text-xs text-coreon-blue hover:text-coreon-blue-light">
                    Export Report
                  </button>
                </div>
                <div className="p-4">
                  <CompliancePanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 