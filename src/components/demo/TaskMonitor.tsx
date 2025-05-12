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
  detailed?: boolean;
}

export default function TaskMonitor({ tasks, detailed = false }: TaskMonitorProps) {
  const [sortBy, setSortBy] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'priority') {
      const priorityMap: Record<string, number> = { 'high': 3, 'medium': 2, 'low': 1 };
      comparison = (priorityMap[a.priority] || 0) - (priorityMap[b.priority] || 0);
    } else if (sortBy === 'completion') {
      comparison = a.completion - b.completion;
    } else if (sortBy === 'status') {
      const statusMap: Record<string, number> = { 'in-progress': 3, 'pending-review': 2, 'queued': 1, 'completed': 0 };
      comparison = (statusMap[a.status] || 0) - (statusMap[b.status] || 0);
    } else if (sortBy === 'created' && a.created && b.created) {
      comparison = new Date(a.created).getTime() - new Date(b.created).getTime();
    } else if (sortBy === 'deadline' && a.deadline && b.deadline) {
      comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else if (sortBy === 'type' && a.type && b.type) {
      comparison = a.type.localeCompare(b.type);
    } else {
      // Default sort by name
      comparison = a.name.localeCompare(b.name);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-yellow-500';
      case 'pending-review': return 'bg-purple-500';
      case 'queued': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Financial': return 'bg-green-500/20 text-green-400';
      case 'Healthcare': return 'bg-blue-500/20 text-blue-400';
      case 'Regulatory': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dateString;
    }
  };
  
  const getTimeRemaining = (deadline?: string) => {
    if (!deadline) return '';
    try {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      const diffMs = deadlineDate.getTime() - now.getTime();
      
      if (diffMs < 0) return 'Overdue';
      
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 24) {
        return `${diffHours}h remaining`;
      }
      
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d remaining`;
    } catch (e) {
      return '';
    }
  };
  
  const isTaskUrgent = (deadline?: string) => {
    if (!deadline) return false;
    try {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      const diffMs = deadlineDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      
      return diffHours < 4; // Less than 4 hours remaining
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-coreon-gray-light border-b border-coreon-blue/20">
            <th className="py-3 px-4 text-left">
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('name')}
              >
                Task
                {sortBy === 'name' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            {detailed && (
              <th className="py-3 px-4 text-left">
                <button 
                  className="flex items-center font-medium"
                  onClick={() => handleSort('type')}
                >
                  Type
                  {sortBy === 'type' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
            )}
            <th className="py-3 px-4 text-left">
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('status')}
              >
                Status
                {sortBy === 'status' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            <th className="py-3 px-4 text-left">
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('completion')}
              >
                Progress
                {sortBy === 'completion' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            <th className="py-3 px-4 text-left">
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('priority')}
              >
                Priority
                {sortBy === 'priority' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </th>
            {detailed && (
              <>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center font-medium"
                    onClick={() => handleSort('deadline')}
                  >
                    Deadline
                    {sortBy === 'deadline' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="font-medium">Agent</span>
                </th>
                <th className="py-3 px-4 text-left">
                  <span className="font-medium">Actions</span>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr 
              key={task.id} 
              className="border-b border-coreon-blue/10 hover:bg-coreon-navy-dark/30"
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <td className="py-3 px-4">
                <div className="flex flex-col">
                  <span className="font-medium">{task.name}</span>
                  {detailed && task.created && (
                    <span className="text-xs text-coreon-gray-light mt-1">Created: {formatDate(task.created)}</span>
                  )}
                </div>
              </td>
              {detailed && (
                <td className="py-3 px-4">
                  {task.type && (
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(task.type)}`}>
                      {task.type}
                    </span>
                  )}
                </td>
              )}
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(task.status)}`}></span>
                  <span className="capitalize">{task.status.replace('-', ' ')}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="w-full bg-coreon-navy-dark rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${getStatusColor(task.status)}`} 
                      style={{ width: `${task.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{task.completion}%</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(task.priority)}`}></span>
                  <span className="capitalize">{task.priority}</span>
                </div>
              </td>
              {detailed && (
                <>
                  <td className="py-3 px-4">
                    {task.deadline ? (
                      <div className="flex flex-col">
                        <span className={isTaskUrgent(task.deadline) ? 'text-red-400' : ''}>
                          {formatDate(task.deadline)}
                        </span>
                        <span className={`text-xs ${isTaskUrgent(task.deadline) ? 'text-red-400' : 'text-coreon-gray-light'}`}>
                          {getTimeRemaining(task.deadline)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-coreon-gray-light">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {task.agent ? (
                      <span className="px-2 py-1 rounded bg-coreon-blue/10 text-coreon-blue text-xs">
                        {task.agent}
                      </span>
                    ) : (
                      <span className="text-coreon-gray-light">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className={`flex space-x-1 transition-opacity duration-200 ${hoveredTask === task.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="p-1 rounded hover:bg-coreon-navy text-coreon-gray-light hover:text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 rounded hover:bg-coreon-navy text-coreon-gray-light hover:text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-1 rounded hover:bg-coreon-navy text-coreon-gray-light hover:text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
          {sortedTasks.length === 0 && (
            <tr>
              <td colSpan={detailed ? 8 : 5} className="py-8 text-center text-coreon-gray-light">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 mb-2 text-coreon-gray-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <p>No tasks available</p>
                  <p className="text-xs mt-1">Tasks will appear here when they are created</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {detailed && sortedTasks.length > 0 && (
        <div className="mt-4 flex justify-between items-center text-xs text-coreon-gray-light">
          <span>Showing {sortedTasks.length} tasks</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 rounded hover:bg-coreon-navy-dark border border-coreon-blue/10">Previous</button>
            <button className="px-2 py-1 rounded bg-coreon-blue/20 text-coreon-blue border border-coreon-blue/30">1</button>
            <button className="px-2 py-1 rounded hover:bg-coreon-navy-dark border border-coreon-blue/10">Next</button>
          </div>
        </div>
      )}
    </div>
  );
} 