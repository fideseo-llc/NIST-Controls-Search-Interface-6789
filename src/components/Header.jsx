import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiExternalLink, FiDownload } = FiIcons;

const Header = ({ onExport }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-500 rounded-xl mr-4">
              <SafeIcon icon={FiShield} className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold">NIST 800-53 Rev 5</h1>
          </div>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Security and Privacy Controls for Information Systems and Organizations
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onExport}
              className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              <SafeIcon icon={FiDownload} className="w-5 h-5" />
              <span>Export Controls</span>
            </button>
            
            <a
              href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-200"
            >
              <SafeIcon icon={FiExternalLink} className="w-5 h-5" />
              <span>Official NIST Publication</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;