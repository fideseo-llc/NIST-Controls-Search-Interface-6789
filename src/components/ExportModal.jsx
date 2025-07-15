import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { exportToJSON, exportToCSV, exportToMarkdown } from '../utils/exportUtils';

const { FiX, FiDownload, FiFileText, FiDatabase, FiCode } = FiIcons;

const ExportModal = ({ isOpen, onClose, controls, filteredControls, selectedFamily }) => {
  const [exportType, setExportType] = useState('json');
  const [exportScope, setExportScope] = useState('filtered');

  if (!isOpen) return null;

  const getExportData = () => {
    return exportScope === 'all' ? controls : filteredControls;
  };

  const handleExport = () => {
    const data = getExportData();
    const timestamp = new Date().toISOString().split('T')[0];
    const scopePrefix = exportScope === 'all' ? 'all' : (selectedFamily ? selectedFamily.toLowerCase().replace(/\s+/g, '-') : 'filtered');
    
    switch (exportType) {
      case 'json':
        exportToJSON(data, `nist-800-53-${scopePrefix}-controls-${timestamp}.json`);
        break;
      case 'csv':
        exportToCSV(data, `nist-800-53-${scopePrefix}-controls-${timestamp}.csv`);
        break;
      case 'markdown':
        exportToMarkdown(data, `nist-800-53-${scopePrefix}-controls-${timestamp}.md`);
        break;
      default:
        exportToJSON(data);
    }
    
    onClose();
  };

  const exportOptions = [
    {
      id: 'json',
      label: 'JSON',
      description: 'Structured data format for programmatic use',
      icon: FiCode
    },
    {
      id: 'csv',
      label: 'CSV',
      description: 'Comma-separated values for spreadsheet applications',
      icon: FiDatabase
    },
    {
      id: 'markdown',
      label: 'Markdown',
      description: 'Human-readable documentation format',
      icon: FiFileText
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Export Controls</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Export Scope</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="filtered"
                checked={exportScope === 'filtered'}
                onChange={(e) => setExportScope(e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Current View ({filteredControls.length} controls)
                </span>
                <p className="text-xs text-gray-500">
                  {selectedFamily ? `${selectedFamily} family` : 'All filtered results'}
                </p>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="all"
                checked={exportScope === 'all'}
                onChange={(e) => setExportScope(e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  All Controls ({controls.length} controls)
                </span>
                <p className="text-xs text-gray-500">Complete NIST 800-53 Rev 5 dataset</p>
              </div>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Export Format</h3>
          <div className="space-y-2">
            {exportOptions.map((option) => (
              <label key={option.id} className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  value={option.id}
                  checked={exportType === option.id}
                  onChange={(e) => setExportType(e.target.value)}
                  className="mr-3 mt-1"
                />
                <div className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <SafeIcon icon={option.icon} className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{option.label}</span>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExportModal;