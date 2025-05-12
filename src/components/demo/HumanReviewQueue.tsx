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
}

interface HumanReviewQueueProps {
  items: ReviewItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  detailed?: boolean;
}

export default function HumanReviewQueue({ 
  items, 
  onApprove, 
  onReject,
  detailed = false 
}: HumanReviewQueueProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState('');

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timeString;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleApprove = (id: string) => {
    onApprove(id);
    setSelectedItem(null);
    setReviewNote('');
  };

  const handleReject = (id: string) => {
    onReject(id);
    setSelectedItem(null);
    setReviewNote('');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-coreon-gray-light">
        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>No items requiring review</p>
      </div>
    );
  }

  if (detailed) {
    return (
      <div className="space-y-6">
        {items.map(item => (
          <div 
            key={item.id}
            className={`bg-coreon-navy-dark/50 rounded-lg border ${
              item.flagged ? 'border-red-500/30' : 'border-coreon-blue/20'
            } overflow-hidden`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{item.task}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(item.priority)}`}></span>
                    <span className="text-xs text-coreon-gray-light capitalize">{item.priority} Priority</span>
                    <span className="mx-2 text-coreon-gray-light">•</span>
                    <span className="text-xs text-coreon-gray-light">Received at {formatTime(item.timeReceived)}</span>
                  </div>
                </div>
                {item.flagged && (
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs">
                    Flagged
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Review Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Task ID:</span>
                      <span>{item.task}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Confidence:</span>
                      <span>{Math.round(item.confidence * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-coreon-gray-light">Reason:</span>
                      <span className="text-right">{item.reason}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Review Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-coreon-gray-light mb-1">
                        Review Notes
                      </label>
                      <textarea 
                        className="w-full bg-coreon-navy rounded p-2 text-sm resize-none h-20"
                        placeholder="Add notes about this review..."
                        value={reviewNote}
                        onChange={(e) => setReviewNote(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 text-sm"
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-sm"
                        onClick={() => handleReject(item.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-coreon-blue/10">
                <h4 className="text-sm font-medium mb-2">Preview</h4>
                <div className="bg-coreon-navy-dark rounded p-3 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.task}</span>
                    <span className="text-coreon-gray-light">{formatTime(item.timeReceived)}</span>
                  </div>
                  <p className="text-coreon-gray-light mb-2">
                    This task requires human review because: {item.reason}
                  </p>
                  <div className="flex items-center">
                    <span className="text-coreon-gray-light mr-2">Confidence:</span>
                    <div className="w-full bg-coreon-navy rounded-full h-1.5 mr-2">
                      <div 
                        className={`h-1.5 rounded-full ${
                          item.confidence > 0.9 ? 'bg-green-500' : 
                          item.confidence > 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{Math.round(item.confidence * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map(item => (
        <div 
          key={item.id}
          className={`p-3 rounded-lg border ${
            item.flagged ? 'border-red-500/30' : 'border-coreon-blue/20'
          } hover:bg-coreon-navy-dark/30 cursor-pointer ${
            selectedItem === item.id ? 'bg-coreon-navy-dark/50' : 'bg-coreon-navy-dark/20'
          }`}
          onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <span className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(item.priority)}`}></span>
                <h3 className="font-medium text-sm">{item.task}</h3>
                {item.flagged && (
                  <span className="ml-2 px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-xs">
                    Flagged
                  </span>
                )}
              </div>
              <p className="text-xs text-coreon-gray-light mt-1">{item.reason}</p>
            </div>
            <span className="text-xs text-coreon-gray-light">{formatTime(item.timeReceived)}</span>
          </div>
          
          {selectedItem === item.id && (
            <div className="mt-3 pt-3 border-t border-coreon-blue/10 flex space-x-2">
              <button
                className="flex-1 py-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove(item.id);
                }}
              >
                Approve
              </button>
              <button
                className="flex-1 py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject(item.id);
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 