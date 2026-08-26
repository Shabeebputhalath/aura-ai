export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: 'Product Commercial' | 'Cinematic Storytelling' | 'VFX & 3D Motion' | 'Fashion & Luxury' | 'Automotive';
  status: 'published' | 'draft' | 'archived';
  isFeatured: boolean;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  resolution: string;
  year: string;
  views: number;
  likes: number;
  shortDescription: string;
  fullDescription: string;
  toolsUsed: string[];
  results: string;
  clientTestimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  seoTitle: string;
  seoDescription: string;
  socialShareImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminService {
  id: string;
  name: string;
  icon: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  startingPrice: string;
  ctaText: string;
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  deliverables: string;
  turnaround: string;
}

export interface AdminPricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingLabel: string;
  description: string;
  features: string[];
  turnaroundTime: string;
  ctaText: string;
  isFeatured: boolean;
  displayOrder: number;
  isActive: boolean;
  badge?: string;
}

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  serviceCategory?: string;
  date: string;
  time: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  replies?: Array<{
    id: string;
    sender: 'admin' | 'client';
    message: string;
    timestamp: string;
  }>;
}

export interface AdminWhatsAppConfig {
  phoneNumber: string;
  isEnabled: boolean;
  defaultGreeting: string;
  preFilledPrompt: string;
  prefilledMessage?: string;
  ctaText: string;
  customPromptPlaceholder?: string;
  floatingButtonPosition?: 'bottom-right' | 'bottom-left';
  availabilityStatus?: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  buttonVisibility?: {
    mobile: boolean;
    desktop: boolean;
  };
  businessHours:
    | string
    | {
        enabled: boolean;
        start: string;
        end: string;
        timezone: string;
        offlineMessage: string;
      };
  inquiryLogs?: Array<{
    id: string;
    name?: string;
    sender?: string;
    phone?: string;
    timestamp: string;
    topic?: string;
    message?: string;
    sourcePage?: string;
  }>;
}

export interface AdminMediaAsset {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio' | 'document';
  category?: string;
  dimensions?: string;
  url: string;
  thumbnail?: string;
  size: string;
  resolution?: string;
  duration?: string;
  tags: string[];
  uploadedAt?: string;
  createdAt?: string;
  usedInProjects?: string[];
}

export interface AdminTestimonial {
  id: string;
  clientName?: string;
  name?: string;
  company: string;
  position?: string;
  role?: string;
  profileImage?: string;
  avatar?: string;
  testimonial?: string;
  quote?: string;
  rating: number;
  projectTag?: string;
  projectName?: string;
  isFeatured?: boolean;
  displayOrder?: number;
  isPublished?: boolean;
  isActive?: boolean;
  verified?: boolean;
  dateAdded?: string;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatar: string;
  bio: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  socialHandle?: string;
  specialties?: string[];
  displayOrder?: number;
  isActive?: boolean;
}

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  summary?: string;
  content: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedAt?: string;
  publishDate?: string;
  status: 'published' | 'draft' | 'archived';
  views?: number;
  tags: string[];
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  type?: 'inquiry' | 'whatsapp' | 'system' | 'general';
  category?: 'enquiry' | 'whatsapp' | 'project' | 'system' | 'security';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  linkTab?: string;
}

export interface AdminStudioSettings {
  studioName: string;
  tagline: string;
  primaryEmail: string;
  primaryPhone: string;
  location: string;
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;
  currency?: string;
  primaryColor?: string;
  accentColor?: string;
}

export type AdminSettings = AdminStudioSettings;

export interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
}
