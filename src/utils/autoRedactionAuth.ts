/**
 * Auto-redaction authentication utilities
 * Centralized logic for managing auto-redaction session tokens
 */

export interface AutoRedactionAuthStatus {
  isValid: boolean;
  isExpired: boolean;
  hasToken: boolean;
}

/**
 * Check if the auto-redaction session token is valid
 * @returns Object with validation status
 */
export const checkAutoRedactionAuth = (): AutoRedactionAuthStatus => {
  const autoRedactionAuth = sessionStorage.getItem('autoRedactionAuth');
  const autoRedactionAuthTime = sessionStorage.getItem('autoRedactionAuthTime');
  
  const hasToken = Boolean(autoRedactionAuth && autoRedactionAuthTime);
  
  if (!hasToken || autoRedactionAuth !== 'true') {
    return {
      isValid: false,
      isExpired: false,
      hasToken: false
    };
  }

  const authTime = Number.parseInt(autoRedactionAuthTime ?? "");
  const currentTime = Date.now();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const isExpired = currentTime - authTime > oneHour;

  return {
    isValid: !isExpired,
    isExpired,
    hasToken: true
  };
};

/**
 * Set auto-redaction authentication token
 */
export const setAutoRedactionAuth = (): void => {
  sessionStorage.setItem('autoRedactionAuth', 'true');
  sessionStorage.setItem('autoRedactionAuthTime', Date.now().toString());
};

/**
 * Clear auto-redaction authentication token
 */
export const clearAutoRedactionAuth = (): void => {
  sessionStorage.removeItem('autoRedactionAuth');
  sessionStorage.removeItem('autoRedactionAuthTime');
};