// Shared utility to load UnicornStudio script only once
let scriptLoadingPromise: Promise<void> | null = null;
let isScriptLoaded = false;

export function loadUnicornStudioScript(): Promise<void> {
  // If already loaded, return resolved promise
  if (isScriptLoaded && window.UnicornStudio?.isInitialized) {
    return Promise.resolve();
  }

  // If already loading, return the existing promise
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  // Create new loading promise
  scriptLoadingPromise = new Promise((resolve, reject) => {
    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="unicornstudio.js"]');
    if (existingScript) {
      // Script tag exists, wait for it to load
      if (window.UnicornStudio?.isInitialized) {
        isScriptLoaded = true;
        resolve();
        return;
      }
      // Wait for load event
      existingScript.addEventListener('load', () => {
        if (window.UnicornStudio) {
          if (!window.UnicornStudio.isInitialized) {
            UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
          isScriptLoaded = true;
          resolve();
        }
      });
      existingScript.addEventListener('error', reject);
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.UnicornStudio) {
        if (!window.UnicornStudio.isInitialized) {
          UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
        isScriptLoaded = true;
        resolve();
      }
    };
    
    script.onerror = () => {
      scriptLoadingPromise = null;
      reject(new Error('Failed to load UnicornStudio script'));
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

// Declare global types
declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean;
      init?: () => void;
    };
  }
}

