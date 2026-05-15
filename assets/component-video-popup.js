/******/ (() => { // webpackBootstrap
class VideoPopup extends HTMLElement {
  constructor() {
    super();
    this.initializeProperties();
  }

  // ==================== INITIALIZATION ==================== //
  
  initializeProperties() {
    // DOM elements
    this.sectionId = this.getAttribute('data-section-id');
    this.videoContainer = this.querySelector('[data-video-popup-container] .video-popup--video');
    this.endState = this.querySelector('[data-video-popup-end-state]');
    this.closeButton = this.querySelector('[data-video-popup-close]');
    this.popupOverlay = this.querySelector('[data-video-popup-overlay]');
    this.replayButton = this.querySelector('[data-video-popup-replay]');
    this.popupImage = this.querySelector('[data-video-popup-image]');
    
    // Configuration options
    this.autoplay = this.getAttribute('data-autoplay') === 'true';
    this.mediaId = this.getAttribute('data-media-id');
    this.showOn = this.getAttribute('data-show-on');
    this.currentPage = this.getAttribute('data-current-page');
    this.showAfter = parseInt(this.getAttribute('data-show-after'));
    this.frequency = parseInt(this.getAttribute('data-frequency'));
    this.showOnExitIntent = this.getAttribute('data-show-on-exit-intent') === 'true';
    this.customerLoggedIn = this.getAttribute('customer-logged-in') === 'true';
    this.disableForAccountHolders = this.getAttribute('disable-for-account-holders') === 'true';
    this.enableTestMode = this.getAttribute('data-enable-test-mode') === 'true';
    
    // State variables
    this.player = null;
    this.videoEl = null;
    this.dismissed = false;
    this.deviceType = this.getViewportSize();
    this.resizeTimeout = null;
    this.lastWidth = window.innerWidth;
    this.showAfterTimeout = null;
    this.backToTopButton = document.querySelector('back-to-top');
    this.backToTopVisible = false;
    this.imageClicked = false; // Track if the image has been clicked
    this.noContent = this.getAttribute('data-no-content') === 'true';
    
    // Accessibility
    this.previouslyFocusedElement = null;
    this.focusableElements = null;
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }
  
  isBackToTopVisible() {
    if (!this.backToTopButton) return false;
    // Check if the back-to-top button is visible (has visible class)
    return this.backToTopButton.classList.contains('back-to-top--visible');
  }

  // ==================== LIFECYCLE METHODS ==================== //
  
  connectedCallback() {
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Initial check for back-to-top visibility
    this.checkBackToTopVisibility();
    
    this.initializeBasedOnConditions();
  }

  disconnectedCallback() {
    this.clearTimeouts();
    this.removeEventListeners();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  clearTimeouts() {
    if (this.showAfterTimeout) {
      clearTimeout(this.showAfterTimeout);
      this.showAfterTimeout = null;
    }
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  // ==================== DISPLAY LOGIC ==================== //
  
  initializeBasedOnConditions() {
    this.clearTimeouts();

    if (this.shouldSkipDisplay()) return;

    if (this.showOnExitIntent && this.deviceType === 'desktop') {
      if (!this.enableTestMode) {
        this.initExitIntentPopup();
      } else {
        this.initPopup();
      }
    } else if (window.Shopify.designMode && this.deviceType === 'mobile' && this.showOnExitIntent) {
      this.showAfterTimeout = setTimeout(() => {
        this.initPopup();
      }, 0);
    } else if (typeof this.showAfter === 'number' && !window.Shopify.designMode && !this.enableTestMode) {
      this.showAfterTimeout = setTimeout(() => {
        this.initPopup();
      }, this.showAfter);
    } else {
      this.initPopup();
    }
  }

  shouldSkipDisplay() {
    return (this.showOn === 'homepage_only' && this.currentPage !== 'index') || (this.disableForAccountHolders && this.customerLoggedIn);
  }

  initPopup() {
    if (!this.enableTestMode) {
      if (this.readCookie() || this.shouldSkipDisplay()) return;
    }

    // Reset the imageClicked state when initializing the popup
    this.imageClicked = false;
    
    this.showPopup();

    if (!this.enableTestMode) {
      this.addEventListeners();

      if (this.shouldLoadMediaImmediately()) {
        this.loadMedia();
      }
    }
  }

  shouldLoadMediaImmediately() {
    return !this.popupImage && !this.autoplay && !this.videoEl;
  }

  initExitIntentPopup() {
    if (this.readCookie() || this.shouldSkipDisplay()) return;
    document.addEventListener('mouseleave', this.handleExitIntent.bind(this));
  }

  showPopup() {
    // Check for back-to-top button visibility on page load
    this.checkBackToTopVisibility();
    
    this.classList.add('visible');
    this.removeAttribute('inert');
    
    // Make sure the popup is not expanded by default
    // Only add this if we're not already in an expanded or end state
    if (!this.enableTestMode && this.classList.contains('expanded') && !this.classList.contains('show-end-state') && !this.endState.classList.contains('hidden')) {
      this.classList.remove('expanded');
    }
    
    // Reset the imageClicked state if the popup image is visible
    if (!this.enableTestMode && this.popupImage && !this.popupImage.classList.contains('hidden')) {
      this.imageClicked = false;
    }
    
    // Store the currently focused element to restore focus when popup is closed
    this.previouslyFocusedElement = document.activeElement;
    
    // Update focus trap and focus on close button
    this.updateFocusTrapAndFocus(this.closeButton);
  }
  
  checkBackToTopVisibility() {
    // Re-check if back-to-top is visible (may have changed since initialization)
    if (!this.backToTopButton) {
      // Try to find the back-to-top button again if we didn't find it during initialization
      this.backToTopButton = document.querySelector('back-to-top');
    }
    
    // If we have a back-to-top button, check its visibility
    if (this.backToTopButton) {
      this.backToTopVisible = this.isBackToTopVisible();
      
      // Apply or remove the class based on current state
      if (this.backToTopVisible) {
        this.classList.add('back-to-top-visible');
      } else {
        this.classList.remove('back-to-top-visible');
      }
    }
  }

  hidePopup() {
    this.classList.remove('visible');
    this.setAttribute('inert', '');
    
    // Restore focus to the element that was focused before the popup opened
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  hidePopupOverlay() {
    this.popupOverlay.classList.add('hidden');
  }

  showPopupOverlay() {
    this.popupOverlay.classList.remove('hidden');
  }

  // ==================== EVENT LISTENERS ==================== //
  
  addEventListeners() {
    window.eventBus.on('video:started', this.handleVideoStarted.bind(this));
    window.eventBus.on('video:ended', this.handleVideoEnded.bind(this));
    window.eventBus.on('back-to-top:visible', this.handleBackToTopVisible.bind(this));
    window.eventBus.on('back-to-top:hidden', this.handleBackToTopHidden.bind(this));
    this.closeButton.addEventListener('click', this.handleCloseButtonClick.bind(this));
    this.popupOverlay.addEventListener('click', this.handlePopupOverlayClick.bind(this));
    this.popupOverlay.addEventListener('keydown', this.handlePopupOverlayKeydown.bind(this));
    this.replayButton.addEventListener('click', this.handleReplayButtonClick.bind(this));
    
    // Add keyboard event listener for focus trapping
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  removeEventListeners() {
    window.eventBus.off('video:started', this.handleVideoStarted.bind(this));
    window.eventBus.off('video:ended', this.handleVideoEnded.bind(this));
    window.eventBus.off('back-to-top:visible', this.handleBackToTopVisible.bind(this));
    window.eventBus.off('back-to-top:hidden', this.handleBackToTopHidden.bind(this));
    this.closeButton.removeEventListener('click', this.handleCloseButtonClick.bind(this));
    this.popupOverlay.removeEventListener('click', this.handlePopupOverlayClick.bind(this));
    this.popupOverlay.removeEventListener('keydown', this.handlePopupOverlayKeydown.bind(this));
    this.replayButton.removeEventListener('click', this.handleReplayButtonClick.bind(this));
    
    // Remove keyboard event listener
    this.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  // ==================== EVENT HANDLERS ==================== //
  
  handleExitIntent(event) {
    if (event.clientY <= 0 && !this.dismissed) {
      this.showPopup();
      this.addEventListeners();

      if (this.shouldLoadMediaImmediately()) {
        this.loadMedia();
      }
    }
  }

  handleVideoStarted(event) {
    if (event.details.sectionId === this.sectionId) {
      if (event.details.player) this.player = event.details.player;
      if (event.details.el) this.videoEl = event.details.el;
      if (!window.Shopify.designMode && this.classList.contains('expanded')) this.unmuteVideo();
    }
  }

  handleVideoEnded(event) {
    if (event.details.sectionId === this.sectionId) {
      // Only show end state if the popup is expanded
      if (this.classList.contains('expanded')) {
        this.videoContainer.classList.add('hidden');
        this.endState.classList.remove('hidden');
        this.hidePopupOverlay();
        
        // Set sequential transition delays for buttons
        // We need a small delay to ensure the end state is fully visible in the DOM
        setTimeout(() => {
          this.setupSequentialButtonAnimations();
          
          // Add a class to trigger the end state with animation
          requestAnimationFrame(() => {
            this.classList.add('show-end-state');
          });
        }, 50);
        
        // Update focus trap for end state and focus on the first button
        setTimeout(() => {
          const firstButton = this.endState.querySelector('.video-popup--button');
          this.updateFocusTrapAndFocus(firstButton);
        }, 600); // Wait for animation to complete
      } else {
        // If not expanded, restart the video
        this.playVideo();
      }
    }
  }
  
  setupSequentialButtonAnimations() {
    // Get all buttons in the end state
    const buttons = this.endState.querySelectorAll('.video-popup--button');
    
    if (buttons.length === 0) {
      console.warn('No end state buttons found');
      return;
    }
    
    // Reset any existing inline styles
    buttons.forEach(button => {
      button.style.transitionDelay = '';
    });
    
    // Apply delays to all buttons (handles both single and multiple button cases)
    buttons.forEach((button, index) => {
      // Start at 0.4s and increment by 0.2s for each button
      const delay = 0.4 + (index * 0.2);
      button.style.transitionDelay = `${delay}s`;
    });
  }

  handleCloseButtonClick(event) {
    // Clear the timeout when popup is manually closed
    if (this.showAfterTimeout) {
      clearTimeout(this.showAfterTimeout);
      this.showAfterTimeout = null;
    }
  
    event.preventDefault();
    this.classList.remove('visible', 'show-end-state');
    
    // Reset the expanded state when closing
    // Only if we're not in the end state (where the video has ended)
    if (this.classList.contains('expanded') && this.endState.classList.contains('hidden')) {
      this.classList.remove('expanded');
    }
    
    // Reset the imageClicked state when closing
    this.imageClicked = false;
    
    this.setAttribute('inert', '');
    this.classList.add('dismissed');
    this.stopVideo();
    this.writeCookie();
    this.dismissed = true;
    
    // Restore focus with a slight delay to ensure the DOM has updated
    setTimeout(() => {
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
      }
    }, 100);
  }

  handlePopupOverlayClick() {
    // If we have an image and no video yet, load the media
    if (this.popupImage && !this.autoplay && !this.videoEl && !this.imageClicked) {
      this.loadMedia();
      this.popupImage?.classList.add('hidden');
      this.classList.add('expanded');
      this.imageClicked = true; // Mark that we've clicked the image
    } else {
      // Toggle the expanded class if the overlay is visible (not hidden)
      if (!this.popupOverlay.classList.contains('hidden')) {
        if (this.classList.contains('expanded')) {
          // If already expanded, minimize it
          this.classList.remove('expanded');
          // Mute the video
          if (!window.Shopify.designMode) this.muteVideo();
          // Enable looping when not expanded
          this.toggleLoop(true);
          // If there's no content, and there's an image, show the image
          if (this.noContent && this.popupImage) {
            this.popupImage?.classList.remove('hidden');
          }
        } else {
          // If not expanded, expand it
          this.classList.add('expanded');
          // If there's no content, and there's an image, hide the image
          if (this.noContent && this.popupImage) {
            this.popupImage?.classList.add('hidden');
          }
          // If not in Shopify design mode, unmute the video
          if (!window.Shopify.designMode) {
            this.unmuteVideo();
          }
          // Disable looping when expanded
          this.toggleLoop(false);
          // Restart the video from the beginning
          if (this.player) {
            const videoType = this.getVideoType(this.videoEl);
            if (videoType === 'youtube') {
              this.player.seekTo(0);
              this.player.playVideo();
            } else if (videoType === 'vimeo') {
              this.player.setCurrentTime(0);
              this.player.play();
            } else {
              this.videoEl.currentTime = 0;
              this.videoEl.play();
            }
          }
        }
      }
    }
    
    // Update focus trap and focus on close button
    this.updateFocusTrapAndFocus(this.closeButton);
  }
  
  handlePopupOverlayKeydown(event) {
    // Trigger click action on Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handlePopupOverlayClick();
    }
  }

  handleReplayButtonClick(event) {
    event.preventDefault();
    
    // Store a reference to the current state before changing it
    const wasInEndState = this.classList.contains('show-end-state');
    
    // Reset button animations by clearing transition delays
    const buttons = this.endState.querySelectorAll('.video-popup--button');
    buttons.forEach(button => {
      button.style.transitionDelay = '';
    });
    
    this.classList.remove('show-end-state');
    
    // Ensure the expanded class is preserved when replaying
    if (!this.classList.contains('expanded')) {
      this.classList.add('expanded');
    }
    
    this.videoContainer.classList.remove('hidden');
    this.endState.classList.add('hidden');
    this.showPopupOverlay();
    this.playVideo();
    if (!window.Shopify.designMode) this.unmuteVideo();
    
    // Update focus trap and focus on the close button instead of the overlay
    // This ensures the focus trap is maintained
    this.updateFocusTrapAndFocus(this.closeButton);
    
    // Double-check focus trap after a delay to ensure it's properly set up
    if (wasInEndState) {
      setTimeout(() => {
        console.debug('Verifying focus trap after replay...');
        // Force a refresh of the focus trap
        this.setupFocusTrap();
        
        // Ensure focus is still within the popup
        if (!this.contains(document.activeElement)) {
          console.warn('Focus lost after replay - restoring to close button');
          this.closeButton.focus();
        }
      }, 500); // Longer delay to ensure all transitions are complete
    }
  }

  handleBackToTopVisible() {
    this.classList.add('back-to-top-visible');
  }

  handleBackToTopHidden() {
    this.classList.remove('back-to-top-visible');
  }

  // ==================== COOKIE MANAGEMENT ==================== //
  
  writeCookie() {
    if (this.readCookie() || window.Shopify.designMode) return;

    const expiryMs = this.frequency * 24 * 60 * 60 * 1000;
    document.cookie = `video-popup-${this.sectionId}=true; expires=${new Date(Date.now() + expiryMs).toUTCString()}; path=/`;
  }

  readCookie() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`video-popup-${this.sectionId}=`));
    return cookie ? true : false;
  }

  // ==================== VIDEO CONTROL ==================== //
  
  loadMedia() {
    window.eventBus.emit('load:media', {
      mediaId: this.mediaId,
      sectionId: this.sectionId,
    });
  }

  getVideoType(el) {
    if (!el) return;
    if (el.src.includes('youtube.com')) return 'youtube';
    if (el.src.includes('vimeo.com')) return 'vimeo';
    return 'mp4';
  }

  stopVideo() {
    if (!this.player) return;
    const videoType = this.getVideoType(this.videoEl);

    if (videoType === 'youtube') {
      this.player.pauseVideo();
    } else if (videoType === 'vimeo') {
      this.player.pause();
    } else {
      this.videoEl.pause();
    }
  }

  playVideo() {
    if (!this.player) return;
    const videoType = this.getVideoType(this.videoEl);

    if (videoType === 'youtube') {
      this.player.playVideo();
    } else if (videoType === 'vimeo') {
      this.player.play();
    } else {
      this.videoEl.play();
    }
  }

  unmuteVideo() {
    if (!this.player) return;
    const videoType = this.getVideoType(this.videoEl);

    if (videoType === 'youtube') {
      this.player.unMute();
    } else if (videoType === 'vimeo') {
      this.player.setVolume(1);
    } else {
      this.videoEl.muted = false;
    }
  }

  muteVideo() {
    if (!this.player) return;
    const videoType = this.getVideoType(this.videoEl);

    if (videoType === 'youtube') {
      this.player.mute();
    } else if (videoType === 'vimeo') {
      this.player.setVolume(0);
    } else {
      this.videoEl.muted = true;
    }
  }

  toggleLoop(shouldLoop) {
    if (!this.player) return;
    const videoType = this.getVideoType(this.videoEl);

    if (videoType === 'youtube') {
      this.player.setLoop(shouldLoop);
    } else if (videoType === 'vimeo') {
      this.player.setLoop(shouldLoop);
    } else {
      this.videoEl.loop = shouldLoop;
    }
  }
  

  // ==================== RESPONSIVE BEHAVIOR ==================== //
  
  handleResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - this.lastWidth) > 100) {
        const newDeviceType = this.getViewportSize();
        
        if (newDeviceType !== this.deviceType) {
          this.deviceType = newDeviceType;
          this.handleDeviceTypeChange();
        }
        
        this.lastWidth = currentWidth;
      }
    }, 250);
  }

  handleDeviceTypeChange() {
    if (!this.showOnExitIntent) return;
    
    if (this.deviceType === 'mobile') {
      this.handleDeviceChangedToMobile();
    } else {
      this.handleDeviceChangedToDesktop();
    }
  }

  handleDeviceChangedToMobile() {
    document.removeEventListener('mouseleave', this.handleExitIntent.bind(this));
    
    if (!this.readCookie() && !this.dismissed && !this.classList.contains('visible')) {
      this.initializeBasedOnConditions();
    }
  }

  handleDeviceChangedToDesktop() {
    if (!this.dismissed) {
      this.initializeBasedOnConditions();
    }
    
    if (this.classList.contains('visible') && !this.dismissed) {
      this.hidePopup();
    }
  }

  getViewportSize() {
    return window.innerWidth > 1025 ? 'desktop' : 'mobile';
  }

  // ==================== ACCESSIBILITY METHODS ==================== //
  
  updateFocusTrapAndFocus(focusElement = null) {
    // Update the focus trap based on current state
    this.setupFocusTrap();
    
    // Log which element will receive focus
    const state = this.classList.contains('show-end-state') ? 'end-state' : this.classList.contains('expanded') ? 'expanded' : 'initial';
    
    const targetElement = focusElement ? (focusElement.className || focusElement.tagName) : (state === 'end-state' ? 'first button' : 'close button');
    
    console.debug(`Setting focus in ${state} state to: ${targetElement}`);
    
    // Focus on the specified element or determine the appropriate element based on state
    setTimeout(() => {
      if (focusElement) {
        // Focus on the specified element if provided
        focusElement.focus();
      } else if (this.classList.contains('show-end-state')) {
        // In end state, focus on the first button
        const firstButton = this.endState.querySelector('.video-popup--button');
        if (firstButton) {
          firstButton.focus();
        }
      } else if (this.classList.contains('expanded')) {
        // In expanded state, focus on the close button
        this.closeButton.focus();
      } else {
        // In initial state, focus on the close button
        this.closeButton.focus();
      }
      
      // Verify focus was set correctly
      setTimeout(() => {
        const activeElement = document.activeElement;
        console.debug('Active element after focus:', activeElement ? (activeElement.className || activeElement.tagName) : 'none');
      }, 50);
    }, 100);
  }
  
  setupFocusTrap() {
    // Get all focusable elements within the popup
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Determine which elements should be included in the focus trap based on current state
    if (this.classList.contains('show-end-state')) {
      // When in end state, only include elements in the end state and the close button
      this.focusableElements = [
        this.closeButton,
        ...Array.from(this.endState.querySelectorAll(selector))
      ];
    } else if (this.classList.contains('expanded')) {
      // When expanded, include all focusable elements
      this.focusableElements = Array.from(this.querySelectorAll(selector));
    } else {
      // When in initial state, only include the overlay and close button
      this.focusableElements = [
        this.closeButton,
        this.popupOverlay
      ];
    }
    
    // Filter out any hidden elements
    this.focusableElements = this.focusableElements.filter(el => {
      return !el.classList.contains('hidden') && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
    });
    
    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    }
    
    // Log the current focus trap elements for debugging
    console.debug('Focus trap updated:', {
      state: this.classList.contains('show-end-state') ? 'end-state' : this.classList.contains('expanded') ? 'expanded' : 'initial',
      elements: this.focusableElements.map(el => el.tagName + (el.className ? ` (${el.className})` : ''))
    });
  }
  
  handleKeyDown(event) {
    // Handle Escape key to close the popup
    if (event.key === 'Escape') {
      this.handleCloseButtonClick(event);
      return;
    }
    
    // Only trap focus if popup is visible
    if (!this.classList.contains('visible')) {
      return;
    }
    
    // Check if Tab or Shift+Tab is pressed
    if (event.key === 'Tab') {
      // If there are no focusable elements, prevent tabbing
      if (!this.focusableElements || this.focusableElements.length === 0) {
        event.preventDefault();
        console.warn('No focusable elements found in popup - refreshing focus trap');
        this.setupFocusTrap();
        if (this.closeButton) {
          this.closeButton.focus();
        }
        return;
      }
      
      // Handle focus trap
      if (event.shiftKey) { // Shift + Tab
        // If focus is on first element, move to last element
        if (document.activeElement === this.firstFocusableElement) {
          event.preventDefault();
          this.lastFocusableElement.focus();
        }
      } else { // Tab
        // If focus is on last element, move to first element
        if (document.activeElement === this.lastFocusableElement) {
          event.preventDefault();
          this.firstFocusableElement.focus();
        }
      }
      
      // Safety check - if focus would move outside the popup, prevent it
      setTimeout(() => {
        if (this.classList.contains('visible') && !this.contains(document.activeElement)) {
          console.warn('Focus escaped the popup - restoring to close button');
          this.closeButton.focus();
        }
      }, 0);
    }
  }
}

if (!customElements.get('video-popup')) {
  customElements.define('video-popup', VideoPopup);
}
/******/ })()
;