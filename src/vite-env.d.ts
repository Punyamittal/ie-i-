/// <reference types="vite/client" />

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init?: () => void;
    };
    supabase?: {
      createClient: (url: string, key: string) => any;
    };
  }
}

export {};
