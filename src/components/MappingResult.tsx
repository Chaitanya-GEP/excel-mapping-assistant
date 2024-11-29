import React from 'react';
import { Check, X } from 'lucide-react';
import { MappingResponse } from '../types/mapping';
import { approveMapping } from '../services/api';

interface MappingResultProps {
  mapping: MappingResponse;
  onApprove: () => void;
}

export function MappingResult({ mapping, onApprove }: MappingResultProps) {
  const handleApprove = async () => {
    const success = await approveMapping(mapping.sessionId);
    if (success) {
      onApprove();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Suggested Column Mappings</h3>
      <div className="space-y-4">
        {mapping.records.map((record) => (
          <div
            key={record.excelColumn}
            className="flex items-center justify-between p-3 bg-gray-700 rounded"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-200">{record.excelColumn}</p>
              <p className="text-sm text-gray-400">→ {record.modelProperty}</p>
            </div>
            <div className="text-sm text-gray-400">
              {(record.confidence * 100).toFixed(0)}% match
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleApprove}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Check className="w-4 h-4" />
          Approve
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-900/20">
          <X className="w-4 h-4" />
          Reject
        </button>
      </div>
    </div>
  );
}