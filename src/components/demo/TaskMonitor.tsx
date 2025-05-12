'use client';

import { useState } from 'react';

interface Task {
  id: string;
  name: string;
  status: string;
  completion: number;
  priority: string;
  agent: string | null;
  type?: string;
  created?: string;
  deadline?: string;
}

interface TaskMonitorProps {
  tasks: Task[];
}

export default function TaskMonitor({ tasks }: TaskMonitorProps) {
  const [sortBy, setSortBy] = useState<string>('priority');
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'text-blue-400';
      case 'pending-review': return 'text-purple-400';
      case 'completed': return 'text-green-400';
      case 'queued': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">In Progress</span>;
      case 'pending-review':
        return <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">Review</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Completed</span>;
      case 'queued':
        return <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">Queued</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs">{status}</span>;
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
        return (priorityOrder[a.priority.toLowerCase()] ?? 3) - (priorityOrder[b.priority.toLowerCase()] ?? 3);
      case 'completion':
        return b.completion - a.completion;
      case 'deadline':
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-coreon-gray-light border-b border-coreon-blue/10">
            <th className="pb-2 text-left font-medium">Task</th>
            <th className="pb-2 text-left font-medium">Status</th>
            <th className="pb-2 text-left font-medium">Type</th>
            <th className="pb-2 text-left font-medium">
              <button 
                className="flex items-center hover:text-white"
                onClick={() => setSortBy('priority')}
              >
                Priority
                {sortBy === 'priority' && (
                  <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </th>
            <th className="pb-2 text-left font-medium">
              <button 
                className="flex items-center hover:text-white"
                onClick={() => setSortBy('completion')}
              >
                Progress
                {sortBy === 'completion' && (
                  <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </th>
            <th className="pb-2 text-left font-medium">
              <button 
                className="flex items-center hover:text-white"
                onClick={() => setSortBy('deadline')}
              >
                Deadline
                {sortBy === 'deadline' && (
                  <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.slice(0, 3).map((task) => (
            <tr key={task.id} className="border-b border-coreon-blue/5 hover:bg-coreon-navy-dark/30">
              <td className="py-2 pr-2">
                <div className="font-medium text-sm truncate max-w-[120px]">{task.name}</div>
                <div className="text-xs text-coreon-gray-light">{task.id}</div>
              </td>
              <td className="py-2 pr-2">
                {getStatusBadge(task.status)}
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center">
                  <span className="inline-block h-2 w-2 rounded-full mr-2 bg-coreon-blue/70"></span>
                  <span className="text-sm truncate max-w-[80px]">{task.type || 'General'}</span>
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center">
                  <span className={`inline-block h-2 w-2 rounded-full mr-2 ${getPriorityColor(task.priority)}`}></span>
                  <span className="text-sm capitalize">{task.priority}</span>
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center">
                  <div className="w-16 bg-coreon-navy-dark rounded-full h-1.5 mr-2">
                    <div 
                      className={`h-1.5 rounded-full ${
                        task.completion >= 100 
                          ? 'bg-green-500' 
                          : task.completion > 50 
                            ? 'bg-blue-500' 
                            : 'bg-yellow-500'
                      }`}
                      style={{ width: `${task.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{task.completion}%</span>
                </div>
              </td>
              <td className="py-2">
                {task.deadline ? (
                  <div>
                    <div className="text-sm">{formatDate(task.deadline)}</div>
                    <div className="text-xs text-coreon-gray-light">{formatTime(task.deadline)}</div>
                  </div>
                ) : (
                  <span className="text-xs text-coreon-gray-light">Not set</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 