'use client';

import { useState } from 'react';

interface Task {
  id: string;
  name: string;
  status: string;
  completion: number;
  priority: string;
  agent: string | null;
}

interface TaskMonitorProps {
  tasks: Task[];
  detailed?: boolean;
}

export default function TaskMonitor({ tasks, detailed = false }: TaskMonitorProps) {
  const [sortBy, setSortBy] = useState('priority');
  const [sortDirection, setSortDirection] = useState('desc');

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
              <th className="py-3 px-4 text-left">
                <span className="font-medium">Agent</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr 
              key={task.id} 
              className="border-b border-coreon-blue/10 hover:bg-coreon-navy-dark/30"
            >
              <td className="py-3 px-4">{task.name}</td>
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
                <td className="py-3 px-4">
                  {task.agent ? (
                    <span className="px-2 py-1 rounded bg-coreon-blue/10 text-coreon-blue text-xs">
                      {task.agent}
                    </span>
                  ) : (
                    <span className="text-coreon-gray-light">—</span>
                  )}
                </td>
              )}
            </tr>
          ))}
          {sortedTasks.length === 0 && (
            <tr>
              <td colSpan={detailed ? 5 : 4} className="py-8 text-center text-coreon-gray-light">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 