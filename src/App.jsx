import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StatsCard from './components/StatsCard';
import ControlCard from './components/ControlCard';
import LoadingSpinner from './components/LoadingSpinner';
import ExportModal from './components/ExportModal';
import nistApiService from './services/nistApi';
import './App.css';

function App() {
  const [controls, setControls] = useState([]);
  const [filteredControls, setFilteredControls] = useState([]);
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    loadControls();
  }, []);

  const loadControls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [controlsData, familiesData] = await Promise.all([
        nistApiService.fetchControls(),
        nistApiService.getControlFamilies()
      ]);
      
      setControls(controlsData);
      setFilteredControls(controlsData);
      setFamilies(familiesData);
    } catch (err) {
      setError('Failed to load NIST controls. Please try again later.');
      console.error('Error loading controls:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchTerm(query);
    
    try {
      let results = await nistApiService.searchControls(query);
      
      // Apply family filter if selected
      if (selectedFamily) {
        results = results.filter(control => control.family === selectedFamily);
      }
      
      setFilteredControls(results);
    } catch (err) {
      console.error('Error searching controls:', err);
    }
  };

  const handleFamilyFilter = async (family) => {
    setSelectedFamily(family);
    
    try {
      let results;
      if (family) {
        results = await nistApiService.getControlsByFamily(family);
        
        // Apply search filter if active
        if (searchTerm) {
          results = results.filter(control => 
            control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            control.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (control.control_text && control.control_text.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }
      } else {
        results = await nistApiService.searchControls(searchTerm);
      }
      
      setFilteredControls(results);
    } catch (err) {
      console.error('Error filtering by family:', err);
    }
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Controls</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadControls}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onExport={handleExport} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFamilyFilter}
          families={families}
          selectedFamily={selectedFamily}
          isLoading={isLoading}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <StatsCard 
              controls={controls}
              filteredControls={filteredControls}
              selectedFamily={selectedFamily}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedFamily ? `${selectedFamily} Controls` : 'All Controls'}
              </h2>
              <p className="text-gray-600">
                Showing {filteredControls.length} of {controls.length} controls
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {filteredControls.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <p className="text-gray-500 text-lg">
                    No controls found matching your search criteria.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6"
                >
                  {filteredControls.map((control, index) => (
                    <ControlCard
                      key={control.id}
                      control={control}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>

      <AnimatePresence>
        {isExportModalOpen && (
          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            controls={controls}
            filteredControls={filteredControls}
            selectedFamily={selectedFamily}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;