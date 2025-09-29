/**
 * Mobile Touch Utilities for better button interaction on touch devices
 * Addresses the common issue where buttons don't respond properly on mobile browsers
 */

/**
 * Creates touch event handlers for better mobile button interaction
 * @param {Function} onClick - The click handler function
 * @returns {Object} Object containing onTouchStart and onTouchEnd handlers
 */
export const createTouchHandlers = (onClick) => ({
  onTouchStart: (e) => {
    // Prevent touch delay and provide visual feedback
    e.currentTarget.style.transform = 'scale(0.98)';
    e.currentTarget.style.transition = 'transform 0.1s ease';
  },
  
  onTouchEnd: (e) => {
    // Reset visual state
    e.currentTarget.style.transform = 'scale(1)';
    
    // Trigger the click handler for touch devices
    if (e.type === 'touchend') {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }
  }
});

/**
 * Enhanced click handler that works better on mobile devices
 * @param {Function} originalHandler - The original click handler
 * @returns {Function} Enhanced handler with mobile compatibility
 */
export const createMobileClickHandler = (originalHandler) => {
  return (e) => {
    // Prevent event bubbling and default behavior for better mobile compatibility
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    return originalHandler(e);
  };
};

/**
 * CSS styles for mobile-optimized buttons
 */
export const mobileButtonStyles = {
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  touchAction: 'manipulation',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none'
};

/**
 * CSS classes for mobile-optimized buttons (to be used with Tailwind)
 */
export const mobileButtonClasses = 'min-h-[44px] touch-manipulation transition-all duration-150';

/**
 * Detects if the device is likely a touch device
 * @returns {boolean} True if touch device is detected
 */
export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0));
};

/**
 * Detects if the device is likely mobile based on screen size and user agent
 * @returns {boolean} True if mobile device is detected
 */
export const isMobileDevice = () => {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};