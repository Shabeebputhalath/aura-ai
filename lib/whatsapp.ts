export interface WhatsAppConfig {
  phoneNumber: string;
  isEnabled: boolean;
  defaultGreeting: string;
  preFilledPrompt: string;
  prefilledMessage?: string;
  ctaText: string;
  floatingButtonPosition?: 'bottom-right' | 'bottom-left';
  buttonVisibility?: {
    mobile: boolean;
    desktop: boolean;
  };
}

export const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: '+91 94002 96191',
  isEnabled: true,
  defaultGreeting: 'Hello! Welcome to AURA AI Studio. Redefining Commercials with AI.',
  preFilledPrompt: 'Hi AURA AI Studio! I would like to create an AI video commercial for my brand. Let us discuss details.',
  ctaText: 'Chat on WhatsApp',
  floatingButtonPosition: 'bottom-right',
  buttonVisibility: {
    mobile: true,
    desktop: true,
  },
};

export function cleanPhoneNumber(phone?: string): string {
  if (!phone) return '919400296191';
  const cleaned = phone.replace(/[^0-9]/g, '');
  // If no country code provided and 10 digits (India default), prepend 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned || '919400296191';
}

export function getActiveWhatsAppConfig(): WhatsAppConfig {
  if (typeof window === 'undefined') return DEFAULT_WHATSAPP_CONFIG;
  try {
    const saved = localStorage.getItem('aura_admin_whatsapp');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_WHATSAPP_CONFIG,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Error loading WhatsApp config:', e);
  }
  return DEFAULT_WHATSAPP_CONFIG;
}

export function recordWhatsAppInquiry(topic: string, sourcePage: string) {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem('aura_admin_whatsapp');
    const config = saved ? JSON.parse(saved) : { ...DEFAULT_WHATSAPP_CONFIG, inquiryLogs: [] };
    const logs = Array.isArray(config.inquiryLogs) ? config.inquiryLogs : [];
    
    const newLog = {
      id: `wa-${Date.now()}`,
      name: 'Website Visitor',
      phone: 'Direct WhatsApp',
      timestamp: 'Just now',
      topic,
      sourcePage,
    };
    
    config.inquiryLogs = [newLog, ...logs.slice(0, 49)];
    localStorage.setItem('aura_admin_whatsapp', JSON.stringify(config));
    window.dispatchEvent(new Event('aura_admin_whatsapp_updated'));
  } catch (e) {
    console.error('Error logging WhatsApp inquiry:', e);
  }
}

export function buildWhatsAppUrl(message?: string, customPhone?: string): string {
  const config = getActiveWhatsAppConfig();
  const phone = cleanPhoneNumber(customPhone || config.phoneNumber);
  const text = message || config.prefilledMessage || config.preFilledPrompt || DEFAULT_WHATSAPP_CONFIG.preFilledPrompt;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text.trim())}`;
}

export function buildPricingInquiryUrl(
  planName: string,
  durationSeconds: number,
  finalPrice: number,
  addOns?: string,
  isExpress?: boolean
): string {
  const config = getActiveWhatsAppConfig();
  const phone = cleanPhoneNumber(config.phoneNumber);

  const formattedPrice = `₹${finalPrice.toLocaleString('en-IN')}`;
  
  const textLines = [
    `🎬 *AURA AI Studio — Commercial Video Booking*`,
    ``,
    `*Selected Plan:* ${planName}`,
    `*Video Duration:* ${durationSeconds} Seconds`,
    `*Estimated Rate:* ${formattedPrice}`,
  ];

  if (addOns && addOns.trim().length > 0) {
    textLines.push(`*Add-ons:* ${addOns}`);
  }

  if (isExpress) {
    textLines.push(`*Turnaround:* Express (24-48h Delivery)`);
  }

  textLines.push(``);
  textLines.push(`Hello! I'd like to book this production package and share our project creative brief. Let's discuss!`);

  const fullMessage = textLines.join('\n');
  
  recordWhatsAppInquiry(`${planName} (${durationSeconds}s @ ${formattedPrice})`, 'Pricing Calculator');

  return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
}
