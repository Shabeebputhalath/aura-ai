'use client';

import React, { useState } from 'react';

interface ContactSectionProps {
  onOpenMenu?: () => void;
  isStandalonePage?: boolean;
}

export default function ContactSection({ onOpenMenu, isStandalonePage = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    service: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const messagePayload = {
      name: formData.name || 'Anonymous Client',
      email: formData.email,
      company: formData.company || 'Private Client',
      subject: formData.service ? `Inquiry for ${formData.service}` : 'Studio Production Consultation',
      serviceCategory: formData.service || 'Custom AI Video Production',
      message: `${formData.description || 'Client submitted contact form inquiry.'}${formData.website ? ` (Website: ${formData.website})` : ''}`,
      budget: 'Flexible',
      timeline: 'Standard',
      status: 'new',
    };

    // Save submission to MongoDB via API endpoint
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messagePayload),
      });
    } catch (err) {
      console.warn('Could not post inquiry to /api/messages:', err);
    }

    // Save submission to localStorage for Admin Requests view
    try {
      const existingRaw = localStorage.getItem('aura_inquiries');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      
      const newInquiry = {
        id: `req-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: formData.name || 'Anonymous Client',
        company: formData.company || 'Private Client',
        service: formData.service || 'Custom AI Video Production',
        budget: '₹1,50,000 (Inquired)',
        status: 'pending',
        time: 'Just now',
        submittedDate: new Date().toISOString().split('T')[0],
        email: formData.email,
        website: formData.website,
        avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random()*100000)}?w=150&auto=format&fit=crop&q=80`,
        details: formData.description || 'Client submitted contact form inquiry on AURA AI Studio.',
      };

      localStorage.setItem('aura_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.error('Failed to save submission:', err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white text-[#111111] min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-between font-sans selection:bg-[#111111] selection:text-white">
      <div>
        {/* Section Tag / Eyebrow */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          {/* Vertical Equalizer/Bar graphic */}
          <div className="flex items-end gap-1 h-3.5">
            <span className="w-1.5 h-3.5 bg-[#111111] rounded-xs" />
            <span className="w-1.5 h-3.5 bg-[#111111] rounded-xs" />
            <span className="w-1.5 h-3.5 bg-[#111111] rounded-xs" />
            <span className="w-1 h-3.5 bg-[#111111] rounded-xs" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#111111] uppercase">
            Contact
          </span>
        </div>

        {/* Main Title & Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#111111] leading-[0.95]">
              Contact Us
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed max-w-md">
              Explore ideas, strategies, and creative insights that help brands grow and digital experiences stand out.
            </p>
          </div>
        </div>

        {/* Main Content Grid: Info Column & Form Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          
          {/* Left Column: Office Information */}
          <div className="lg:col-span-4 space-y-10 sm:space-y-12">
            <div>
              <h3 className="text-sm font-semibold text-[#111111] mb-2 sm:mb-3">
                Office Location
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                12273 Dream Avenue, London,<br />
                123456 United Kingdom
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#111111] mb-2 sm:mb-3">
                Office Time
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                Monday - Sunday<br />
                11am - 7pm
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#111111] mb-2 sm:mb-3">
                Support
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                <a href="mailto:hello@aurastudio.ai" className="hover:text-[#111111] transition-colors">
                  hello@aurastudio.ai
                </a>
                <br />
                <a href="tel:1234567899" className="hover:text-[#111111] transition-colors">
                  123 456 7899
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Minimalist Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-[#f9f9f8] p-8 sm:p-12 rounded-2xl border border-[#e6e6e3] text-center my-auto">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto mb-4 text-xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-2">Message Received</h3>
                <p className="text-sm text-[#555555] max-w-md mx-auto mb-6">
                  Thank you for reaching out! Our creative team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold rounded-full hover:bg-[#333333] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-[#e2e2de] focus:border-[#111111] pb-3 text-sm text-[#111111] placeholder:text-[#888888] outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className="w-full bg-transparent border-b border-[#e2e2de] focus:border-[#111111] pb-3 text-sm text-[#111111] placeholder:text-[#888888] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full bg-transparent border-b border-[#e2e2de] focus:border-[#111111] pb-3 text-sm text-[#111111] placeholder:text-[#888888] outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="www.example.com"
                      className="w-full bg-transparent border-b border-[#e2e2de] focus:border-[#111111] pb-3 text-sm text-[#111111] placeholder:text-[#888888] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Service Selection */}
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b border-[#e2e2de] focus:border-[#111111] pb-3 text-sm text-[#888888] focus:text-[#111111] outline-none transition-colors cursor-pointer appearance-none"
                  >
                    <option value="" disabled className="text-[#888888]">
                      Select your services
                    </option>
                    <option value="commercial-video" className="text-[#111111]">AI Commercial Video</option>
                    <option value="product-photography" className="text-[#111111]">Product Photography & Renders</option>
                    <option value="brand-strategy" className="text-[#111111]">Brand Identity & Visuals</option>
                    <option value="custom-campaign" className="text-[#111111]">Custom Enterprise Campaign</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#888888] text-xs">
                    ▼
                  </div>
                </div>

                {/* Row 4: Project Description */}
                <div className="relative">
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project description"
                    className="w-full bg-transparent border-b border-[#e2e2de] focus:border-[#111111] pb-3 text-sm text-[#111111] placeholder:text-[#888888] outline-none transition-colors"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-3 group cursor-pointer"
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <a
                    href="https://instagram.com/_aura_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-medium text-[#555555] hover:text-[#111111] underline underline-offset-4 transition-colors"
                  >
                    Or DM on Instagram
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
