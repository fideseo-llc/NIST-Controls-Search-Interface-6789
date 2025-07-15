import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiLayers, FiFilter, FiDatabase } = FiIcons;

const StatsCard = ({ controls, filteredControls, selectedFamily }) => {
  const totalControls = controls.length;
  const displayedControls = filteredControls.length;
  const totalFamilies = new Set(controls.map(c => c.family)).size;
  const totalEnhancements = controls.reduce((sum, control) => 
    sum + (control.control_enhancements?.length || 0), 0
  );

  const stats = [
    {
      icon: FiShield,
      label: 'Total Controls',
      value: totalControls,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FiFilter,
      label: selectedFamily ? 'Filtered Controls' : 'Displayed Controls',
      value: displayedControls,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: FiDatabase,
      label: 'Control Families',
      value: totalFamilies,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: FiLayers,
      label: 'Enhancements',
      value: totalEnhancements,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;