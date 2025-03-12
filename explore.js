
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // UI Elements
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.main-content');
  const videoGrid = document.getElementById('video-grid');
  const searchTitle = document.getElementById('search-title');
  const noResults = document.getElementById('no-results');
  const errorContainer = document.getElementById('error-container');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  
  // Toggle sidebar
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
  });
  
  // Get search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search') || '';
  
  // Update search input with query
  if (searchQuery) {
    searchInput.value = searchQuery;
    searchTitle.textContent = `Search results for: "${searchQuery}"`;
  }
  
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
  
  // Load videos
  try {
    const videos = await searchVideos(searchQuery);
    
    // Show no results message if needed
    if (videos.length === 0 && searchQuery) {
      videoGrid.style.display = 'none';
      noResults.style.display = 'block';
      noResults.querySelector('p').textContent = `We couldn't find any videos matching "${searchQuery}"`;
    } else {
      renderVideos(videos, videoGrid);
    }
  } catch (error) {
    console.error('Error loading videos:', error);
    videoGrid.style.display = 'none';
    errorContainer.style.display = 'block';
    showToast('error', 'Failed to load videos. Please try again later.');
  }
});

// Function to render videos
function renderVideos(videos, container) {
  // Clear container of loading skeletons
  container.innerHTML = '';
  
  // Render each video
  videos.forEach((video, index) => {
    const videoCard = createVideoCard(video, index);
    container.appendChild(videoCard);
  });
}

// Function to create a video card
function createVideoCard(video, index) {
  const videoCard = document.createElement('div');
  videoCard.className = 'video-card animate-fade-in';
  videoCard.style.animationDelay = `${100 * (index % 8)}ms`;
  videoCard.onclick = () => {
    window.location.href = `video.html?id=${video.id}`;
  };
  
  videoCard.innerHTML = `
    <div class="video-thumbnail">
      <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
      <div class="video-duration">${video.duration}</div>
    </div>
    <div class="video-info">
      <div class="channel-avatar">
        <img src="${video.channel.avatar}" alt="${video.channel.name}">
      </div>
      <div class="video-text">
        <h3 class="video-title">${video.title}</h3>
        <p class="channel-name">${video.channel.name}</p>
        <p class="video-stats">${video.views} • ${video.uploadTime}</p>
      </div>
    </div>
  `;
  
  return videoCard;
}

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
