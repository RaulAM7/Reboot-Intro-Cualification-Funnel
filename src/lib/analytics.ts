type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ action, category, label, value, ...rest }: GtagEvent) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest
  });
}
