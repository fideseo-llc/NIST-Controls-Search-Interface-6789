import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp, FiShield, FiTag, FiLayers, FiInfo } = FiIcons;

const ControlCard = ({ control, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'P2':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'P3':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBaselineColor = (baseline) => {
    if (baseline?.includes('High')) return 'bg-red-50 text-red-700';
    if (baseline?.includes('Moderate')) return 'bg-yellow-50 text-yellow-700';
    if (baseline?.includes('Low')) return 'bg-green-50 text-green-700';
    return 'bg-gray-50 text-gray-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <SafeIcon icon={FiShield} className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{control.id}</h3>
              <p className="text-sm text-gray-500">{control.family}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {control.priority && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(control.priority)}`}>
                {control.priority}
              </span>
            )}
            {control.baseline && control.baseline.length > 0 && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBaselineColor(control.baseline)}`}>
                {control.baseline.join(', ')}
              </span>
            )}
          </div>
        </div>

        <h4 className="text-lg font-medium text-gray-800 mb-3">{control.title}</h4>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{control.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiTag} className="w-4 h-4" />
              <span>{control.family}</span>
            </div>
            {control.control_enhancements && control.control_enhancements.length > 0 && (
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiLayers} className="w-4 h-4" />
                <span>{control.control_enhancements.length} enhancements</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Show Less' : 'Show More'}
            </span>
            <SafeIcon 
              icon={isExpanded ? FiChevronUp : FiChevronDown} 
              className="w-4 h-4" 
            />
          </button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            {control.control_text && (
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <SafeIcon icon={FiInfo} className="w-4 h-4 mr-2" />
                  Control Text
                </h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {control.control_text}
                  </p>
                </div>
              </div>
            )}

            {control.supplemental_guidance && (
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                  Supplemental Guidance
                </h5>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {control.supplemental_guidance}
                  </p>
                </div>
              </div>
            )}

            {control.control_enhancements && control.control_enhancements.length > 0 && (
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                  Control Enhancements
                </h5>
                <div className="space-y-2">
                  {control.control_enhancements.map((enhancement, idx) => (
                    <div key={idx} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <div className="flex items-start space-x-2">
                        <span className="text-sm font-medium text-yellow-800">
                          {enhancement.id}
                        </span>
                        <span className="text-sm text-yellow-700">
                          {enhancement.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ControlCard;