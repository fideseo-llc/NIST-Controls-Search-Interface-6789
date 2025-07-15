// Enhanced SearchBar with additional filters
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiX, FiFilter, FiAlertTriangle, FiShield } = FiIcons;

const SearchBar = ({ 
  onSearch, 
  onFilterChange, 
  families, 
  selectedFamily, 
  isLoading,
  onBaselineChange,
  onPriorityChange,
  selectedBaseline,
  selectedPriority 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleFamilyChange = (family) => {
    onFilterChange(family);
    setShowFilters(false);
  };

  const baselineOptions = ['Low', 'Moderate', 'High'];
  const priorityOptions = ['P1', 'P2', 'P3'];

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="relative">
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <input
            type="text"
            placeholder="Search controls by ID, title, family, description, or control text..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-20 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white shadow-sm"
            disabled={isLoading}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearSearch}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <SafeIcon icon={FiX} className="w-4 h-4 text-gray-400" />
              </motion.button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                showFilters || selectedFamily || selectedBaseline || selectedPriority
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-100 text-gray-400'
              }`}
            >
              <SafeIcon icon={FiFilter} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Family Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <SafeIcon icon={FiFilter} className="w-4 h-4 mr-2" />
                  Control Family
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleFamilyChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      !selectedFamily 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    All Families
                  </button>
                  {families.map((family) => (
                    <button
                      key={family}
                      onClick={() => handleFamilyChange(family)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedFamily === family 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {family}
                    </button>
                  ))}
                </div>
              </div>

              {/* Baseline Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <SafeIcon icon={FiShield} className="w-4 h-4 mr-2" />
                  Baseline Impact
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => onBaselineChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      !selectedBaseline 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    All Baselines
                  </button>
                  {baselineOptions.map((baseline) => (
                    <button
                      key={baseline}
                      onClick={() => onBaselineChange(baseline)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedBaseline === baseline 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {baseline} Impact
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 mr-2" />
                  Priority Level
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => onPriorityChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      !selectedPriority 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    All Priorities
                  </button>
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => onPriorityChange(priority)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedPriority === priority 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      Priority {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;