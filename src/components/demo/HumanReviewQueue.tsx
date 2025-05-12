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
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject' | null>(null);

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timeString;
    }
  };
  
  const formatDate = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
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
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.9) return 'bg-green-500';
    if (confidence > 0.8) return 'bg-blue-500';
    if (confidence > 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleApprove = (id: string) => {
    onApprove(id);
    setSelectedItem(null);
    setReviewNote('');
    setReviewDecision(null);
  };

  const handleReject = (id: string) => {
    onReject(id);
    setSelectedItem(null);
    setReviewNote('');
    setReviewDecision(null);
  };
  
  const getTimeAgo = (timeString: string) => {
    try {
      const date = new Date(timeString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      
      return `${Math.floor(diffHours / 24)}d ago`;
    } catch (e) {
      return '';
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-coreon-navy-dark/30 rounded-lg border border-coreon-blue/10">
        <svg className="mx-auto h-16 w-16 mb-4 text-coreon-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-coreon-gray-light">No items requiring review</p>
        <p className="text-xs text-coreon-gray-light mt-1">The review queue is currently empty</p>
        <button className="mt-4 px-4 py-2 rounded-lg bg-coreon-blue/20 text-coreon-blue hover:bg-coreon-blue/30 text-sm">
          Refresh Queue
        </button>
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
            <div className="p-6">
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
                  <div className="flex items-center mt-1">
                    <span className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(item.priority)}`}></span>
                    <span className="text-xs text-coreon-gray-light capitalize">{item.priority} Priority</span>
                    <span className="mx-2 text-coreon-gray-light">•</span>
                    <span className="text-xs text-coreon-gray-light">Received {getTimeAgo(item.timeReceived)}</span>
                    {item.department && (
                      <>
                        <span className="mx-2 text-coreon-gray-light">•</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-coreon-navy-dark text-coreon-gray-light">
                          {item.department}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs mr-2">
                    Review Required
                  </div>
                  <button className="p-1 rounded hover:bg-coreon-navy-dark text-coreon-gray-light hover:text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-coreon-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Review Details
                  </h4>
                  <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/10">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-coreon-gray-light">Task ID:</span>
                        <span className="font-mono">{item.task.split('#')[1] || item.task}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-coreon-gray-light">Confidence:</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-coreon-navy rounded-full h-1.5 mr-2">
                            <div 
                              className={`h-1.5 rounded-full ${getConfidenceColor(item.confidence)}`}
                              style={{ width: `${item.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span>{Math.round(item.confidence * 100)}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-coreon-gray-light">Received:</span>
                        <span>{formatDate(item.timeReceived)} at {formatTime(item.timeReceived)}</span>
                      </div>
                      {item.assignedTo && (
                        <div className="flex justify-between">
                          <span className="text-coreon-gray-light">Assigned To:</span>
                          <span>{item.assignedTo}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-coreon-gray-light block mb-1">Reason:</span>
                        <span className="block bg-coreon-navy-dark rounded p-2 text-sm">{item.reason}</span>
                      </div>
                      {item.dataPoints && item.dataPoints.length > 0 && (
                        <div>
                          <span className="text-coreon-gray-light block mb-1">Data Points:</span>
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
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-coreon-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Review Actions
                  </h4>
                  <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/10">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-coreon-gray-light mb-1">
                          Decision
                        </label>
                        <div className="flex space-x-2">
                          <button
                            className={`flex-1 py-2 rounded-lg ${
                              reviewDecision === 'approve'
                                ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                                : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            } text-sm flex items-center justify-center`}
                            onClick={() => setReviewDecision('approve')}
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button
                            className={`flex-1 py-2 rounded-lg ${
                              reviewDecision === 'reject'
                                ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            } text-sm flex items-center justify-center`}
                            onClick={() => setReviewDecision('reject')}
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-coreon-gray-light mb-1">
                          Review Notes
                        </label>
                        <textarea 
                          className="w-full bg-coreon-navy rounded p-3 text-sm resize-none h-24 border border-coreon-blue/20 focus:border-coreon-blue/50 focus:outline-none"
                          placeholder="Add notes about this review decision..."
                          value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button
                          className={`w-full py-2.5 rounded-lg ${
                            reviewDecision === 'approve'
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              : reviewDecision === 'reject'
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'bg-coreon-navy text-coreon-gray-light cursor-not-allowed'
                          } text-sm font-medium`}
                          onClick={() => reviewDecision === 'approve' ? handleApprove(item.id) : reviewDecision === 'reject' ? handleReject(item.id) : null}
                          disabled={!reviewDecision}
                        >
                          Submit Decision
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-coreon-navy-dark/50 rounded-lg p-4 border border-coreon-blue/10">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-coreon-gray-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </h4>
                <div className="bg-coreon-navy-dark rounded p-4 text-sm border border-coreon-blue/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{item.task}</span>
                    <span className="text-coreon-gray-light">{formatTime(item.timeReceived)}</span>
                  </div>
                  <p className="text-coreon-gray-light mb-3">
                    This task requires human review because: {item.reason}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-coreon-gray-light mr-2">Confidence:</span>
                    <div className="w-full bg-coreon-navy rounded-full h-1.5 mr-2">
                      <div 
                        className={`h-1.5 rounded-full ${getConfidenceColor(item.confidence)}`}
                        style={{ width: `${item.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{Math.round(item.confidence * 100)}%</span>
                  </div>
                  {item.dataPoints && item.dataPoints.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-coreon-blue/10">
                      <div className="text-xs text-coreon-gray-light mb-2">Data Points:</div>
                      <div className="grid grid-cols-3 gap-2">
                        {item.dataPoints.map((point, index) => (
                          <div key={index} className="bg-coreon-navy p-2 rounded border border-coreon-blue/10 text-center">
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                    Flagged
                  </span>
                )}
              </div>
              <p className="text-xs text-coreon-gray-light mt-1 line-clamp-1">{item.reason}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-coreon-gray-light">{getTimeAgo(item.timeReceived)}</span>
              {item.department && (
                <span className="text-xs px-1.5 py-0.5 mt-1 rounded bg-coreon-navy-dark text-coreon-gray-light">
                  {item.department}
                </span>
              )}
            </div>
          </div>
          
          {selectedItem === item.id && (
            <div className="mt-3 pt-3 border-t border-coreon-blue/10">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-coreon-gray-light">Confidence:</span>
                  <span className="text-xs">{Math.round(item.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-coreon-navy-dark rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getConfidenceColor(item.confidence)}`}
                    style={{ width: `${item.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="flex-1 py-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(item.id);
                  }}
                >
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approve
                </button>
                <button
                  className="flex-1 py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(item.id);
                  }}
                >
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 