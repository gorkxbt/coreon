'use client';

import { useState } from 'react';

interface ReviewItem {
  id: string;
  task: string;
  status: string;
  priority: string;
  confidence: number;
  flagged: boolean;
  reason: string;
  timeReceived: string;
  department?: string;
  assignedTo?: string;
  dataPoints?: string[];
}

interface HumanReviewQueueProps {
  items: ReviewItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function HumanReviewQueue({ items, onApprove, onReject }: HumanReviewQueueProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8 bg-coreon-navy-dark/30 rounded-lg border border-coreon-blue/10">
          <div className="text-coreon-gray-light">No items waiting for review</div>
        </div>
      ) : (
        items.map((item) => (
          <div 
            key={item.id}
            className={`bg-coreon-navy-dark/30 rounded-lg border ${
              item.flagged ? 'border-red-500/30' : 'border-coreon-blue/20'
            } overflow-hidden`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{item.task}</h3>
                    {item.flagged && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                        Flagged
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-coreon-gray-light">
                    <span className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(item.priority)}`}></span>
                    <span className="capitalize">{item.priority} Priority</span>
                    <span className="mx-2">•</span>
                    <span>{getTimeAgo(item.timeReceived)}</span>
                    {item.department && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="px-2 py-0.5 rounded bg-coreon-navy-dark">
                          {item.department}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <div className="text-sm">Confidence</div>
                    <div className="flex items-center">
                      <div className="w-16 bg-coreon-navy-dark rounded-full h-1.5 mr-2">
                        <div 
                          className={`h-1.5 rounded-full ${getConfidenceColor(item.confidence)}`}
                          style={{ width: `${item.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{Math.round(item.confidence * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-coreon-navy-dark/50 rounded-lg p-4 mb-4 border border-coreon-blue/10">
                <div className="text-sm mb-2">Review Reason:</div>
                <div className="text-sm text-coreon-gray-light">{item.reason}</div>
                
                {item.dataPoints && item.dataPoints.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm mb-2">Data Points:</div>
                    <div className="flex flex-wrap gap-2">
                      {item.dataPoints.map((point, index) => (
                        <span key={index} className="px-2 py-1 rounded-full bg-coreon-blue/10 text-coreon-blue text-xs">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  {item.assignedTo && (
                    <div className="text-xs text-coreon-gray-light">
                      Assigned to: <span className="text-white">{item.assignedTo}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button 
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm"
                    onClick={() => onReject(item.id)}
                  >
                    Reject
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 text-sm"
                    onClick={() => onApprove(item.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 