export const exportToJSON = (controls, filename = 'nist-800-53-controls.json') => {
  const dataStr = JSON.stringify(controls, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const exportToCSV = (controls, filename = 'nist-800-53-controls.csv') => {
  const csvHeaders = ['ID', 'Title', 'Family', 'Priority', 'Baseline', 'Description', 'Control Text', 'Supplemental Guidance', 'Enhancements'];
  
  const csvRows = controls.map(control => [
    control.id,
    control.title,
    control.family,
    control.priority || '',
    control.baseline ? control.baseline.join('; ') : '',
    control.description,
    control.control_text || '',
    control.supplemental_guidance || '',
    control.control_enhancements ? control.control_enhancements.map(e => `${e.id}: ${e.title}`).join('; ') : ''
  ]);
  
  const csvContent = [csvHeaders, ...csvRows]
    .map(row => row.map(field => `"${field?.toString().replace(/"/g, '""') || ''}"`).join(','))
    .join('\n');
  
  const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', filename);
  linkElement.click();
};

export const exportToMarkdown = (controls, filename = 'nist-800-53-controls.md') => {
  let markdown = '# NIST 800-53 Rev 5 Security Controls\n\n';
  markdown += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
  markdown += `Total Controls: ${controls.length}\n\n`;
  markdown += '---\n\n';
  
  controls.forEach(control => {
    markdown += `## ${control.id} - ${control.title}\n\n`;
    markdown += `**Family:** ${control.family}\n\n`;
    
    if (control.priority) {
      markdown += `**Priority:** ${control.priority}\n\n`;
    }
    
    if (control.baseline && control.baseline.length > 0) {
      markdown += `**Baseline:** ${control.baseline.join(', ')}\n\n`;
    }
    
    markdown += `**Description:** ${control.description}\n\n`;
    
    if (control.control_text) {
      markdown += `**Control Text:**\n\n${control.control_text}\n\n`;
    }
    
    if (control.supplemental_guidance) {
      markdown += `**Supplemental Guidance:**\n\n${control.supplemental_guidance}\n\n`;
    }
    
    if (control.control_enhancements && control.control_enhancements.length > 0) {
      markdown += `**Control Enhancements:**\n\n`;
      control.control_enhancements.forEach(enhancement => {
        markdown += `- **${enhancement.id}:** ${enhancement.title}\n`;
      });
      markdown += '\n';
    }
    
    markdown += '---\n\n';
  });
  
  const dataUri = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(markdown);
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', filename);
  linkElement.click();
};