
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // UI Elements
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  
  // Toggle sidebar
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
  });
  
  // Handle search
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
      showToast('success', `Searching for: ${query}`);
    }
  });
  
  // Initialize voice search
  initVoiceSearch(voiceSearchBtn, searchInput, (transcript) => {
    searchInput.value = transcript;
    searchForm.dispatchEvent(new Event('submit'));
  });
  
  // Add click listeners to library cards
  document.querySelectorAll('.view-all-btn').forEach(button => {
    button.addEventListener('click', () => {
      showToast('info', 'This feature is not available in the prototype');
    });
  });
  
  // Add click listeners to playlist cards
  document.querySelectorAll('.playlist-card').forEach(card => {
    card.addEventListener('click', () => {
      showToast('info', 'This feature is not available in the prototype');
    });
  });
});

// Voice search functionality
function initVoiceSearch(button, inputElement, callback) {
  let recognition = null;
  
  // Check if browser supports speech recognition
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    // Set up event listeners
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputElement.value = transcript;
      button.classList.remove('listening');
      if (callback) callback(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      button.classList.remove('listening');
      showToast('error', 'Voice recognition failed. Please try again.');
    };
    
    recognition.onend = () => {
      button.classList.remove('listening');
    };
    
    // Add click handler to button
    button.addEventListener('click', () => {
      if (button.classList.contains('listening')) {
        recognition.stop();
        button.classList.remove('listening');
      } else {
        try {
          recognition.start();
          button.classList.add('listening');
          showToast('info', 'Listening... Speak now');
        } catch (error) {
          console.error('Speech recognition error:', error);
          showToast('error', 'Could not start voice recognition. Please try again.');
        }
      }
    });
  } else {
    // Hide button if speech recognition is not supported
    button.addEventListener('click', () => {
      showToast('error', 'Speech recognition is not supported in your browser');
    });
  }
}

// Toast notification system
function showToast(type, message, duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Make the toast visible (needed for animation to work properly)
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Remove the toast after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
