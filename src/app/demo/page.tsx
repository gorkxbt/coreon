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

// Demo data
const demoAgents = [
  { id: 'classifier-1', name: 'Document Classifier', type: 'data-processing', status: 'active', confidence: 0.95 },
  { id: 'extractor-1', name: 'Data Extractor', type: 'data-processing', status: 'active', confidence: 0.88 },
  { id: 'validator-1', name: 'Compliance Validator', type: 'compliance', status: 'active', confidence: 0.92 },
  { id: 'reviewer-1', name: 'Human Interface', type: 'interface', status: 'waiting', confidence: 1.0 },
  { id: 'orchestrator-1', name: 'Workflow Orchestrator', type: 'orchestration', status: 'active', confidence: 0.98 },
];

const demoConnections = [
  { from: 'classifier-1', to: 'extractor-1' },
  { from: 'extractor-1', to: 'validator-1' },
  { from: 'validator-1', to: 'reviewer-1' },
  { from: 'orchestrator-1', to: 'classifier-1' },
  { from: 'orchestrator-1', to: 'extractor-1' },
  { from: 'orchestrator-1', to: 'validator-1' },
];

const demoTasks = [
  { id: 'task-1', name: 'Insurance Claim #4872', status: 'in-progress', completion: 65, priority: 'high', agent: 'validator-1' },
  { id: 'task-2', name: 'Medical Record Review #103', status: 'pending-review', completion: 90, priority: 'medium', agent: 'reviewer-1' },
  { id: 'task-3', name: 'Loan Application #7291', status: 'queued', completion: 0, priority: 'low', agent: null },
  { id: 'task-4', name: 'Compliance Report #56', status: 'completed', completion: 100, priority: 'high', agent: null },
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
    timeReceived: '2023-06-15T14:32:00Z'
  },
  { 
    id: 'review-2', 
    task: 'Insurance Claim #4872', 
    status: 'pending', 
    priority: 'medium',
    confidence: 0.91,
    flagged: false,
    reason: 'Unusual claim amount detected',
    timeReceived: '2023-06-15T13:45:00Z'
  },
];

export default function Demo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agents, setAgents] = useState(demoAgents);
  const [tasks, setTasks] = useState(demoTasks);
  const [reviewItems, setReviewItems] = useState(demoReviewItems);

  // Simulate agent activity
  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
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
  }, []);

  // Handle review approval
  const handleApprove = (reviewId: string) => {
    setReviewItems(prev => prev.filter(item => item.id !== reviewId));
    
    // Add a new review item after a delay
    setTimeout(() => {
      const newReview = {
        id: `review-${Date.now()}`,
        task: `New Task #${Math.floor(Math.random() * 1000)}`,
        status: 'pending',
        priority: Math.random() > 0.5 ? 'high' : 'medium',
        confidence: 0.75 + (Math.random() * 0.2),
        flagged: Math.random() > 0.7,
        reason: 'Requires human verification',
        timeReceived: new Date().toISOString()
      };
      
      setReviewItems(prev => [...prev, newReview]);
    }, 5000);
  };

  // Handle review rejection
  const handleReject = (reviewId: string) => {
    setReviewItems(prev => prev.filter(item => item.id !== reviewId));
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Coreon Interactive Demo
            </h1>
            <p className="text-xl text-coreon-gray-light">
              Experience the power of AI orchestration with human oversight
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['dashboard', 'agents', 'tasks', 'compliance', 'review'].map((tab) => (
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
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <h2 className="text-xl font-bold mb-4">Agent Mesh Visualization</h2>
                <div className="h-[400px]">
                  <AgentMeshVisualizer agents={agents} connections={demoConnections} />
                </div>
              </div>
              
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <h2 className="text-xl font-bold mb-4">System Status</h2>
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
                    <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Compliance check passed for Insurance Claim #4872</span>
                      </li>
                      <li className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                        <span>Human review requested for Medical Record #103</span>
                      </li>
                      <li className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>New task added to queue: Loan Application #7291</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <h2 className="text-xl font-bold mb-4">Active Tasks</h2>
                <TaskMonitor tasks={tasks} />
              </div>
              
              <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
                <h2 className="text-xl font-bold mb-4">Human Review Queue</h2>
                <HumanReviewQueue 
                  items={reviewItems} 
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                />
              </div>
            </div>
          )}
          
          {/* Agents View */}
          {activeTab === 'agents' && (
            <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
              <h2 className="text-xl font-bold mb-6">Agent Management</h2>
              <AgentControls agents={agents} setAgents={setAgents} />
            </div>
          )}
          
          {/* Tasks View */}
          {activeTab === 'tasks' && (
            <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
              <h2 className="text-xl font-bold mb-6">Task Management</h2>
              <TaskMonitor tasks={tasks} detailed={true} />
            </div>
          )}
          
          {/* Compliance View */}
          {activeTab === 'compliance' && (
            <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
              <h2 className="text-xl font-bold mb-6">Compliance Dashboard</h2>
              <CompliancePanel />
            </div>
          )}
          
          {/* Human Review View */}
          {activeTab === 'review' && (
            <div className="bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 p-6">
              <h2 className="text-xl font-bold mb-6">Human Review Interface</h2>
              <HumanReviewQueue 
                items={reviewItems} 
                onApprove={handleApprove} 
                onReject={handleReject} 
                detailed={true}
              />
            </div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 