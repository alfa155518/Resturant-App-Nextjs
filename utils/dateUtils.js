/**
 * Format a date string to a human-readable format
 * @param {string|Date} date - The date to format (can be a Date object or ISO string)
 * @param {Object} options - Options for date formatting (defaults to weekday, year, month, day)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = { 
  weekday: 'short', 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
}) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('en-US', options);
};

/**
 * Format a date to show relative time (e.g., "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const seconds = Math.floor((now - dateObj) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  
  return 'just now';
};
