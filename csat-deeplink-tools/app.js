// Application Data
const appData = {
  countries: [
    {"value": "Algeria", "label": "Algeria"},
    {"value": "Argentina", "label": "Argentina"},
    {"value": "Brazil", "label": "Brazil"},
    {"value": "Chile", "label": "Chile"},
    {"value": "Colombia", "label": "Colombia"},
    {"value": "Costa%20Rica", "label": "Costa Rica"},
    {"value": "Dominican%20Republic", "label": "Dominican Republic"},
    {"value": "Egypt", "label": "Egypt"},
    {"value": "Ecuador", "label": "Ecuador"},
    {"value": "El%20Salvador", "label": "El Salvador"},
    {"value": "Gulf", "label": "Gulf"},
    {"value": "Guatemala", "label": "Guatemala"},
    {"value": "Honduras", "label": "Honduras"},
    {"value": "India", "label": "India"},
    {"value": "Indonesia", "label": "Indonesia"},
    {"value": "Jamaica", "label": "Jamaica"},
    {"value": "Malaysia", "label": "Malaysia"},
    {"value": "Morocco", "label": "Morocco"},
    {"value": "Mexico", "label": "Mexico"},
    {"value": "Panama", "label": "Panama"},
    {"value": "Peru", "label": "Peru"},
    {"value": "Pakistan", "label": "Pakistan"},
    {"value": "Philippines", "label": "Philippines"},
    {"value": "Saudi%20Arabia", "label": "Saudi Arabia"},
    {"value": "Trinidad%20and%20Tobago", "label": "Trinidad and Tobago"},
    {"value": "Turkey", "label": "Turkey"},
    {"value": "Thailand", "label": "Thailand"},
    {"value": "Ukraine", "label": "Ukraine"},
    {"value": "Vietnam", "label": "Vietnam"},
    {"value": "Venezuela", "label": "Venezuela"}
  ],
  baseUrl: "https://gsk.qualtrics.com/jfe/form/SV_8jBXbvdpv4zkrvo",
  channels: ["1:1Email", "MassEmail"],
  groups: ["Commercial", "Medical", "Both"],
  businessUnits: ["Pharma", "ViiV"],
  outputTypes: ["Mass", "Veeva"]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  populateCountries();
  setupTabSwitching();
  setupFormHandlers();
  
  // Show default tab
  showTab('csat');
});

function populateCountries() {
  const countrySelect = document.getElementById('country');
  if (!countrySelect) return;
  
  appData.countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.value;
    option.textContent = country.label;
    countrySelect.appendChild(option);
  });
  
  console.log('Countries populated');
}

function setupTabSwitching() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const tabName = this.getAttribute('data-tab');
      console.log('Tab clicked:', tabName);
      showTab(tabName);
    });
  });
}

function showTab(tabName) {
  console.log('Showing tab:', tabName);
  
  // Update tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    }
  });
  
  // Update tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
    if (content.id === `${tabName}-tab`) {
      content.classList.add('active');
      console.log('Activated tab content:', content.id);
    }
  });
}

function setupFormHandlers() {
  // CSAT form submission
  const csatForm = document.getElementById('csat-form');
  if (csatForm) {
    csatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleCSATGeneration(e);
    });
  }
  
  // Deep Link form submission
  const deepLinkForm = document.getElementById('deeplink-form');
  if (deepLinkForm) {
    deepLinkForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleDeepLinkConversion(e);
    });
  }
}

function handleCSATGeneration(e) {
  console.log('Handling CSAT generation...');
  
  const channel = document.getElementById('channel').value;
  const country = document.getElementById('country').value;
  const group = document.getElementById('group').value;
  const contentLabId = document.getElementById('contentlab-id').value;
  const therapyArea = document.getElementById('therapy-area').value;
  const brand = document.getElementById('brand').value;
  const specialty = document.getElementById('specialty').value;
  const emNa = document.getElementById('em-na').value;
  
  console.log('Form data:', { channel, country, group, contentLabId, therapyArea, brand, specialty, emNa });
  
  // Validation
  if (!channel || !country || !group) {
    showToast('Please fill in all required fields (Channel, Country, Group)', 'error');
    return;
  }
  
  const data = {
    channel, country, group, contentLabId, therapyArea, brand, specialty, emNa
  };
  
  // Generate URLs
  const smileyUrl = generateCSATUrl(data, 'smiley');
  const starUrl = generateCSATUrl(data, 'star');
  
  console.log('Generated URLs:', { smileyUrl, starUrl });
  
  // Display results
  document.getElementById('smiley-url').value = smileyUrl;
  document.getElementById('star-url').value = starUrl;
  document.getElementById('csat-results').classList.remove('hidden');
  
  // Scroll to results
  document.getElementById('csat-results').scrollIntoView({ behavior: 'smooth' });
  
  showToast('Survey URLs generated successfully!', 'success');
}

function generateCSATUrl(data, type) {
  const params = new URLSearchParams();
  
  // Required parameters
  params.append('Channel', data.channel);
  params.append('Country', data.country);
  params.append('Group', data.group);
  params.append('Type', type === 'smiley' ? 'Smiley' : 'Star');
  
  // Optional parameters
  if (data.contentLabId) params.append('ContentLabId', data.contentLabId);
  if (data.therapyArea) params.append('TherapyArea', data.therapyArea);
  if (data.brand) params.append('Brand', data.brand);
  if (data.specialty) params.append('Specialty', data.specialty);
  if (data.emNa) params.append('EMNA', data.emNa);
  
  return `${appData.baseUrl}?${params.toString()}`;
}

function handleDeepLinkConversion(e) {
  console.log('Handling Deep Link conversion...');
  
  const inputUrl = document.getElementById('input-url').value.trim();
  const businessUnit = document.getElementById('business-unit').value;
  const outputType = document.getElementById('output-type').value;
  
  console.log('Deep link data:', { inputUrl, businessUnit, outputType });
  
  // Validation
  if (!inputUrl || !businessUnit || !outputType) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  if (!isValidUrl(inputUrl)) {
    showToast('Please enter a valid URL', 'error');
    return;
  }
  
  // Convert URL
  const convertedUrl = convertDeepLinkUrl(inputUrl, businessUnit, outputType);
  
  console.log('Converted URL:', convertedUrl);
  
  // Display results
  document.getElementById('converted-url').value = convertedUrl;
  document.getElementById('deeplink-results').classList.remove('hidden');
  
  // Scroll to results
  document.getElementById('deeplink-results').scrollIntoView({ behavior: 'smooth' });
  
  showToast('URL converted successfully!', 'success');
}

function convertDeepLinkUrl(inputUrl, businessUnit, outputType) {
  try {
    const url = new URL(inputUrl);
    const params = new URLSearchParams(url.search);
    
    // Add business unit parameter
    params.set('bu', businessUnit.toLowerCase());
    
    // Add output type parameter
    params.set('output', outputType.toLowerCase());
    
    // Add timestamp for uniqueness
    params.set('ts', Date.now().toString());
    
    // Reconstruct URL
    url.search = params.toString();
    
    return url.toString();
  } catch (error) {
    console.error('URL conversion error:', error);
    return inputUrl + (inputUrl.includes('?') ? '&' : '?') + 
           `bu=${businessUnit.toLowerCase()}&output=${outputType.toLowerCase()}&ts=${Date.now()}`;
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }
  
  const text = element.value;
  if (!text) {
    showToast('Nothing to copy', 'error');
    return;
  }
  
  // Modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
      highlightElement(element);
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('Copied to clipboard!', 'success');
    } else {
      showToast('Failed to copy to clipboard', 'error');
    }
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    showToast('Failed to copy to clipboard', 'error');
  }
  
  document.body.removeChild(textArea);
}

function highlightElement(element) {
  const originalBackground = element.style.backgroundColor;
  element.style.backgroundColor = '#e8f5e8';
  element.style.transition = 'background-color 0.3s ease';
  
  setTimeout(() => {
    element.style.backgroundColor = originalBackground;
  }, 1000);
}

function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

function resetCSATForm() {
  const form = document.getElementById('csat-form');
  if (form) {
    form.reset();
  }
  
  const results = document.getElementById('csat-results');
  if (results) {
    results.classList.add('hidden');
  }
  
  showToast('CSAT form reset', 'success');
}

function resetDeepLinkForm() {
  const form = document.getElementById('deeplink-form');
  if (form) {
    form.reset();
  }
  
  const results = document.getElementById('deeplink-results');
  if (results) {
    results.classList.add('hidden');
  }
  
  showToast('Deep Link form reset', 'success');
}

// Make functions globally available
window.copyToClipboard = copyToClipboard;
window.resetCSATForm = resetCSATForm;
window.resetDeepLinkForm = resetDeepLinkForm;

console.log('Application script loaded');