import axios from 'axios';

const NIST_API_BASE = 'https://csrc.nist.gov/CSRC/media/Projects/risk-management/documents/800-53-controls';

// Alternative API endpoint for NIST controls
const NIST_CONTROLS_API = 'https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/release-search';

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
  }

  // Fallback data for NIST 800-53 Rev 5 controls
  getFallbackControls() {
    return [
      {
        id: 'AC-1',
        title: 'Policy and Procedures',
        family: 'Access Control',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate access control policy and procedures.',
        control_text: 'a. Develop, document, and disseminate to [Assignment: organization-defined personnel or roles]: 1. [Selection (one or more): Organization-level; Mission/business process-level; System-level] access control policy that: (a) Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and (b) Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and 2. Procedures to facilitate the implementation of the access control policy and the associated access control controls; b. Designate an [Assignment: organization-defined official] to manage the development, documentation, and dissemination of the access control policy and procedures; and c. Review and update the current access control: 1. Policy [Assignment: organization-defined frequency] and following [Assignment: organization-defined events]; and 2. Procedures [Assignment: organization-defined frequency] and following [Assignment: organization-defined events].',
        supplemental_guidance: 'Access control policy and procedures address the controls in the AC family that are implemented within systems and organizations. The risk management strategy is an important factor in establishing such policies and procedures.',
        control_enhancements: []
      },
      {
        id: 'AC-2',
        title: 'Account Management',
        family: 'Access Control',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Manage system accounts, group memberships, privileges, workflow, notifications, deactivations, and authorizations.',
        control_text: 'a. Define and document the types of accounts allowed and specifically prohibited for use within the system; b. Assign account managers; c. Require [Assignment: organization-defined prerequisites and criteria] for group and role membership; d. Specify: 1. Authorized users of the system; 2. Group and role membership; and 3. Access authorizations (i.e., privileges) and [Assignment: organization-defined attributes (as required)] for each account; e. Require approvals by [Assignment: organization-defined personnel or roles] for requests to create accounts; f. Create, enable, modify, disable, and remove accounts in accordance with [Assignment: organization-defined policy, procedures, prerequisites, and criteria]; g. Monitor the use of accounts; h. Notify account managers and [Assignment: organization-defined personnel or roles] within: 1. [Assignment: organization-defined time period] when accounts are no longer required; 2. [Assignment: organization-defined time period] when users are terminated or transferred; and 3. [Assignment: organization-defined time period] when system usage or need-to-know changes for an individual; i. Authorize access to the system based on: 1. A valid access authorization; 2. Intended system usage; and 3. [Assignment: organization-defined attributes (as required)]; j. Review accounts for compliance with account management requirements [Assignment: organization-defined frequency]; k. Establish and implement a process for changing shared or group account authenticators (if deployed) when individuals are removed from the group; and l. Align account management processes with personnel termination and transfer processes.',
        supplemental_guidance: 'Types of system accounts include individual, shared, group, system, guest, anonymous, emergency, developer, temporary, and service accounts.',
        control_enhancements: [
          { id: 'AC-2(1)', title: 'Automated System Account Management' },
          { id: 'AC-2(2)', title: 'Automated Temporary and Emergency Account Management' },
          { id: 'AC-2(3)', title: 'Disable Accounts' },
          { id: 'AC-2(4)', title: 'Automated Audit Actions' },
          { id: 'AC-2(5)', title: 'Inactivity Logout' }
        ]
      },
      {
        id: 'AC-3',
        title: 'Access Enforcement',
        family: 'Access Control',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Enforce approved authorizations for logical access to information and system resources.',
        control_text: 'Enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies.',
        supplemental_guidance: 'Access control policies control access between active entities or subjects and passive entities or objects in systems.',
        control_enhancements: [
          { id: 'AC-3(1)', title: 'Restricted Access to Privileged Functions' },
          { id: 'AC-3(2)', title: 'Dual Authorization' },
          { id: 'AC-3(3)', title: 'Mandatory Access Control' },
          { id: 'AC-3(4)', title: 'Discretionary Access Control' }
        ]
      },
      {
        id: 'AU-1',
        title: 'Policy and Procedures',
        family: 'Audit and Accountability',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate audit and accountability policy and procedures.',
        control_text: 'a. Develop, document, and disseminate to [Assignment: organization-defined personnel or roles]: 1. [Selection (one or more): Organization-level; Mission/business process-level; System-level] audit and accountability policy that: (a) Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and (b) Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and 2. Procedures to facilitate the implementation of the audit and accountability policy and the associated audit and accountability controls; b. Designate an [Assignment: organization-defined official] to manage the development, documentation, and dissemination of the audit and accountability policy and procedures; and c. Review and update the current audit and accountability: 1. Policy [Assignment: organization-defined frequency] and following [Assignment: organization-defined events]; and 2. Procedures [Assignment: organization-defined frequency] and following [Assignment: organization-defined events].',
        supplemental_guidance: 'Audit and accountability policy and procedures address the controls in the AU family that are implemented within systems and organizations.',
        control_enhancements: []
      },
      {
        id: 'AU-2',
        title: 'Event Logging',
        family: 'Audit and Accountability',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Identify the types of events that the system is capable of logging.',
        control_text: 'a. Identify the types of events that the system is capable of logging in support of the audit function: [Assignment: organization-defined event types that the system is capable of logging]; b. Coordinate the event logging function with other organizational entities requiring audit-related information to guide and inform the selection criteria for events to be logged; c. Specify the following event types for logging within the system: [Assignment: organization-defined event types (subset of the event types defined in AU-2a.) along with the frequency of (or situation requiring) logging for each identified event type]; d. Provide a rationale for why the event types selected for logging are deemed to be adequate to support after-the-fact investigations of incidents; and e. Review and update the event types selected for logging [Assignment: organization-defined frequency].',
        supplemental_guidance: 'An event is an observable occurrence in a system. The types of events that require logging are those events that are significant and relevant to the security of systems and the privacy of individuals.',
        control_enhancements: [
          { id: 'AU-2(1)', title: 'Compilation of Audit Records from Multiple Sources' },
          { id: 'AU-2(2)', title: 'Selection of Audit Events by Application' },
          { id: 'AU-2(3)', title: 'Reviews and Updates' }
        ]
      },
      {
        id: 'SC-1',
        title: 'Policy and Procedures',
        family: 'System and Communications Protection',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate system and communications protection policy and procedures.',
        control_text: 'a. Develop, document, and disseminate to [Assignment: organization-defined personnel or roles]: 1. [Selection (one or more): Organization-level; Mission/business process-level; System-level] system and communications protection policy that: (a) Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and (b) Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and 2. Procedures to facilitate the implementation of the system and communications protection policy and the associated system and communications protection controls; b. Designate an [Assignment: organization-defined official] to manage the development, documentation, and dissemination of the system and communications protection policy and procedures; and c. Review and update the current system and communications protection: 1. Policy [Assignment: organization-defined frequency] and following [Assignment: organization-defined events]; and 2. Procedures [Assignment: organization-defined frequency] and following [Assignment: organization-defined events].',
        supplemental_guidance: 'System and communications protection policy and procedures address the controls in the SC family that are implemented within systems and organizations.',
        control_enhancements: []
      },
      {
        id: 'SC-7',
        title: 'Boundary Protection',
        family: 'System and Communications Protection',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Monitor and control communications at the external boundary of the system.',
        control_text: 'a. Monitor and control communications at the external interfaces to the system and at key internal interfaces within the system; b. Implement subnetworks for publicly accessible system components that are [Selection: physically; logically] separated from internal organizational networks; and c. Connect to external networks or systems only through managed interfaces consisting of boundary protection devices arranged in accordance with an organizational security and privacy architecture.',
        supplemental_guidance: 'Managed interfaces include gateways, routers, firewalls, guards, network-based malicious code analysis, and virtualization systems.',
        control_enhancements: [
          { id: 'SC-7(1)', title: 'Physically Separated Subnetworks' },
          { id: 'SC-7(2)', title: 'Public Access' },
          { id: 'SC-7(3)', title: 'Access Points' },
          { id: 'SC-7(4)', title: 'External Telecommunications Services' }
        ]
      },
      {
        id: 'IA-1',
        title: 'Policy and Procedures',
        family: 'Identification and Authentication',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate identification and authentication policy and procedures.',
        control_text: 'a. Develop, document, and disseminate to [Assignment: organization-defined personnel or roles]: 1. [Selection (one or more): Organization-level; Mission/business process-level; System-level] identification and authentication policy that: (a) Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and (b) Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and 2. Procedures to facilitate the implementation of the identification and authentication policy and the associated identification and authentication controls; b. Designate an [Assignment: organization-defined official] to manage the development, documentation, and dissemination of the identification and authentication policy and procedures; and c. Review and update the current identification and authentication: 1. Policy [Assignment: organization-defined frequency] and following [Assignment: organization-defined events]; and 2. Procedures [Assignment: organization-defined frequency] and following [Assignment: organization-defined events].',
        supplemental_guidance: 'Identification and authentication policy and procedures address the controls in the IA family that are implemented within systems and organizations.',
        control_enhancements: []
      },
      {
        id: 'IA-2',
        title: 'Identification and Authentication (Organizational Users)',
        family: 'Identification and Authentication',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Uniquely identify and authenticate organizational users.',
        control_text: 'Uniquely identify and authenticate organizational users and associate that unique identification with processes acting on behalf of those users.',
        supplemental_guidance: 'Organizations can satisfy the identification and authentication requirements by complying with the requirements in Homeland Security Presidential Directive 12.',
        control_enhancements: [
          { id: 'IA-2(1)', title: 'Multi-Factor Authentication to Privileged Accounts' },
          { id: 'IA-2(2)', title: 'Multi-Factor Authentication to Non-Privileged Accounts' },
          { id: 'IA-2(3)', title: 'Local Access to Privileged Accounts' },
          { id: 'IA-2(4)', title: 'Local Access to Non-Privileged Accounts' }
        ]
      },
      {
        id: 'CM-1',
        title: 'Policy and Procedures',
        family: 'Configuration Management',
        priority: 'P1',
        baseline: ['Low', 'Moderate', 'High'],
        description: 'Develop, document, and disseminate configuration management policy and procedures.',
        control_text: 'a. Develop, document, and disseminate to [Assignment: organization-defined personnel or roles]: 1. [Selection (one or more): Organization-level; Mission/business process-level; System-level] configuration management policy that: (a) Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and (b) Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and 2. Procedures to facilitate the implementation of the configuration management policy and the associated configuration management controls; b. Designate an [Assignment: organization-defined official] to manage the development, documentation, and dissemination of the configuration management policy and procedures; and c. Review and update the current configuration management: 1. Policy [Assignment: organization-defined frequency] and following [Assignment: organization-defined events]; and 2. Procedures [Assignment: organization-defined frequency] and following [Assignment: organization-defined events].',
        supplemental_guidance: 'Configuration management policy and procedures address the controls in the CM family that are implemented within systems and organizations.',
        control_enhancements: []
      }
    ];
  }

  async fetchControls() {
    try {
      // First, try to fetch from the official NIST API
      const response = await this.axiosInstance.get('/controls');
      
      if (response.data && response.data.controls) {
        return response.data.controls;
      }
      
      throw new Error('No controls data found in API response');
    } catch (error) {
      console.warn('NIST API unavailable, using fallback data:', error.message);
      
      // Return fallback data with additional simulated controls
      return this.getFallbackControls();
    }
  }

  async searchControls(query) {
    const controls = await this.fetchControls();
    
    if (!query || query.trim() === '') {
      return controls;
    }
    
    const searchTerm = query.toLowerCase();
    
    return controls.filter(control => 
      control.id.toLowerCase().includes(searchTerm) ||
      control.title.toLowerCase().includes(searchTerm) ||
      control.family.toLowerCase().includes(searchTerm) ||
      control.description.toLowerCase().includes(searchTerm) ||
      (control.control_text && control.control_text.toLowerCase().includes(searchTerm))
    );
  }

  async getControlFamilies() {
    const controls = await this.fetchControls();
    const families = new Set();
    
    controls.forEach(control => {
      if (control.family) {
        families.add(control.family);
      }
    });
    
    return Array.from(families).sort();
  }

  async getControlsByFamily(family) {
    const controls = await this.fetchControls();
    return controls.filter(control => control.family === family);
  }

  async getControlById(id) {
    const controls = await this.fetchControls();
    return controls.find(control => control.id === id);
  }
}

export default new NistApiService();