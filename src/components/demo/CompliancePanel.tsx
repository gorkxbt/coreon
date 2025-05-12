'use client';

export default function CompliancePanel() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-coreon-navy-dark/50 rounded-lg p-3 border border-coreon-blue/10">
          <div className="text-xs text-coreon-gray-light mb-1">Audit Logs</div>
          <div className="text-xl font-bold">724</div>
          <div className="text-xs text-green-400">All compliant</div>
        </div>
        <div className="bg-coreon-navy-dark/50 rounded-lg p-3 border border-coreon-blue/10">
          <div className="text-xs text-coreon-gray-light mb-1">Data Lineage</div>
          <div className="text-xl font-bold">100%</div>
          <div className="text-xs text-green-400">Fully tracked</div>
        </div>
      </div>
      
      <div className="bg-coreon-navy-dark/50 rounded-lg p-3 border border-coreon-blue/10">
        <div className="text-xs text-coreon-gray-light mb-1">Compliance Status</div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm">GDPR</div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs text-green-400">Compliant</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm">HIPAA</div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs text-green-400">Compliant</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">SOC 2</div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs text-green-400">Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
} 