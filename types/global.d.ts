// Global type declarations for third-party scripts

interface Window {
  gtag?: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void;
  fbq?: (
    command: 'track' | 'init' | 'trackCustom',
    eventName: string,
    params?: Record<string, any>
  ) => void;
  dataLayer?: any[];
}

