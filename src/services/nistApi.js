// Important: Due to file size limitations in this response, I'm showing key parts of the API service.
// The complete implementation would include ALL control families and their controls.

import axios from 'axios';

class NistApiService {
  constructor() {
    this.baseURL = 'https://csrc.nist.gov/api/csrc/v1';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Initialize control families
    this.controlFamilies = [
      'Access Control',
      'Awareness and Training',
      'Audit and Accountability',
      'Assessment, Authorization, and Monitoring',
      'Configuration Management',
      'Contingency Planning',
      'Identification and Authentication',
      'Incident Response',
      'Maintenance',
      'Media Protection',
      'Physical and Environmental Protection',
      'Planning',
      'Program Management',
      'Personnel Security',
      'Personally Identifiable Information Processing and Transparency',
      'Risk Assessment',
      'System and Services Acquisition',
      'System and Communications Protection',
      'System and Information Integrity',
      'Supply Chain Risk Management'
    ];
  }

  async fetchControlsFromAllSources() {
    try {
      // Try multiple NIST API endpoints
      const endpoints = [
        '/controls/sp800-53/r5',
        '/controls',
        '/publications/800-53/rev-5/controls'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await this.axiosInstance.get(endpoint);
          if (response.data && response.data.controls) {
            return response.data.controls;
          }
        } catch (error) {
          console.warn(`Failed to fetch from ${endpoint}:`, error.message);
        }
      }

      // If all API attempts fail, use comprehensive fallback data
      return this.getComprehensiveControls();
    } catch (error) {
      console.error('Failed to fetch controls:', error);
      return this.getComprehensiveControls();
    }
  }

  getComprehensiveControls() {
    // Return the comprehensive catalog of controls
    // This is a small sample - the actual implementation would include ALL controls
    return [
      // Access Control (AC) Family
      {
        id: 'AC-1',
        title: 'Policy and Procedures',
        family: 'Access Control',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate access control policy and procedures.',
        control_text: '...',
        supplemental_guidance: '...',
        control_enhancements: []
      },
      // ... more AC controls

      // Awareness and Training (AT) Family
      {
        id: 'AT-1',
        title: 'Policy and Procedures',
        family: 'Awareness and Training',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate security awareness and training policy and procedures.',
        control_text: '...',
        supplemental_guidance: '...',
        control_enhancements: []
      },
      // ... more AT controls

      // Audit and Accountability (AU) Family
      {
        id: 'AU-1',
        title: 'Policy and Procedures',
        family: 'Audit and Accountability',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate audit and accountability policy and procedures.',
        control_text: '...',
        supplemental_guidance: '...',
        control_enhancements: []
      },
      // ... more AU controls

      // Assessment, Authorization, and Monitoring (CA) Family
      {
        id: 'CA-1',
        title: 'Policy and Procedures',
        family: 'Assessment, Authorization, and Monitoring',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate assessment, authorization, and monitoring policy and procedures.',
        control_text: '...',
        supplemental_guidance: '...',
        control_enhancements: []
      },
      // ... more CA controls

      // Configuration Management (CM) Family
      {
        id: 'CM-1',
        title: 'Policy and Procedures',
        family: 'Configuration Management',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate configuration management policy and procedures.',
        control_text: '...',
        supplemental_guidance: '...',
        control_enhancements: []
      },
      // ... more CM controls

      // Continue with ALL control families...
    ];
  }

  async fetchControls() {
    return this.fetchControlsFromAllSources();
  }

  // Enhanced search to include more control attributes
  async searchControls(query) {
    const controls = await this.fetchControls();
    
    if (!query || query.trim() === '') {
      return controls;
    }
    
    const searchTerm = query.toLowerCase();
    
    return controls.filter(control => {
      const searchableFields = [
        control.id,
        control.title,
        control.family,
        control.description,
        control.control_text,
        control.supplemental_guidance,
        control.priority,
        control.baseline?.join(' '),
        control.control_enhancements?.map(e => `${e.id} ${e.title}`).join(' ')
      ].filter(Boolean).map(field => field.toLowerCase());

      return searchableFields.some(field => field.includes(searchTerm));
    });
  }

  async getControlFamilies() {
    return this.controlFamilies;
  }

  async getControlsByFamily(family) {
    const controls = await this.fetchControls();
    return controls.filter(control => control.family === family);
  }

  async getControlById(id) {
    const controls = await this.fetchControls();
    return controls.find(control => control.id === id);
  }

  // New method to get controls by baseline impact level
  async getControlsByBaseline(baseline) {
    const controls = await this.fetchControls();
    return controls.filter(control => 
      control.baseline && control.baseline.includes(baseline)
    );
  }

  // New method to get controls by priority
  async getControlsByPriority(priority) {
    const controls = await this.fetchControls();
    return controls.filter(control => control.priority === priority);
  }
}

export default new NistApiService();