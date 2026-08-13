'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answers: string[];
}

const FAQS: FAQItem[] = [
  {
    id: 'what-is-aura',
    question: 'What is AURA AI Studio?',
    answers: [
      'AURA AI Studio is a next-generation creative agency specializing in studio-grade commercial videos, product ads, and cinematic visual stories built with state-of-the-art AI video models and professional editing.',
      'We combine artificial intelligence with hands-on post-production to help brands elevate their digital presence, launch high-converting ad campaigns, and stand out across social media.',
    ],
  },
  {
    id: 'how-it-works',
    question: 'How does AURA AI video creation work?',
    answers: [
      'AURA uses creative prompt-engineering, custom motion control, and high-definition video synthesis to convert your product ideas or raw assets into studio-quality commercials.',
      'Simply describe your campaign concept or upload your product images. From there, we generate scripts, motion storyboards, and ultra-realistic visual renders until everything matches your vision.',
    ],
  },
  {
    id: 'pricing-cost',
    question: 'How much does it cost?',
    answers: [
      'Our pricing is straightforward and transparent, calculated per second based on your selected package tier: Starter (₹40/s), Business (₹60/s), and Enterprise (₹80-100/s).',
      'All packages include 4K UHD export, tailored aspect ratios, professional sound design, and free revisions to guarantee complete satisfaction.',
    ],
  },
  {
    id: 'no-editing-needed',
    question: 'Do I need video editing or AI experience?',
    answers: [
      'Not at all! We handle the entire creative production end-to-end — from AI generation, motion sequencing, color grading, and voiceovers to final 4K rendering.',
    ],
  },
  {
    id: 'ai-tools-used',
    question: 'Which AI video tools and models do you use?',
    answers: [
      'We utilize the latest industry-leading generative video and image models (including Sora, Runway Gen-3, Kling AI, Midjourney v6, and Stable Diffusion XL) paired with professional Davinci Resolve and Premiere Pro finishing.',
    ],
  },
  {
    id: 'complete-commercials',
    question: 'Can I produce a complete commercial campaign with AURA?',
    answers: [
      'Yes! We deliver end-to-end commercial campaigns complete with cinematic visuals, motion typography, licensed soundtrack scoring, and platform-specific formatting.',
    ],
  },
  {
    id: 'kinds-of-ads',
    question: 'What kinds of video ads can I create?',
    answers: [
      'You can produce luxury product showcases, e-commerce listing commercials, app teaser trailers, social media reels, broadcast television ads, and high-tech product renders.',
    ],
  },
  {
    id: 'formats-resolutions',
    question: 'What video formats and resolutions do you support?',
    answers: [
      'All commercial videos are delivered in crisp 4K UHD resolution. We provide custom exports in vertical (9:16 for Reels/TikTok), widescreen (16:9 for YouTube/TV), and square (1:1 for feed ads).',
    ],
  },
  {
    id: 'turnarounds-revisions',
    question: 'How do turnarounds and revisions work?',
    answers: [
      'Standard turnarounds take between 2 to 5 working days depending on video duration. We also offer 24-hour Express delivery for urgent launch schedules. Each project includes free revision rounds.',
    ],
  },
  {
    id: 'rights-ownership',
    question: 'Do I own full commercial rights to the final videos?',
    answers: [
      'Yes. Upon project delivery, you hold 100% full commercial usage rights worldwide for digital ads, broadcast TV, website embedding, and social media campaigns without recurring royalties.',
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 md:py-32 transition-colors">
      <div className="shell px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Sticky Title */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08]">
              Frequently <br />
              asked questions
            </h2>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 border-t border-[#111111]">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id} className="border-b border-[#111111]">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between gap-6 py-6 sm:py-7 text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl md:text-[1.25rem] font-semibold text-[#111111] tracking-tight leading-snug group-hover:text-[#111111]/80 transition-colors">
                      {faq.question}
                    </span>

                    {/* Circular Icon with Arrow */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#111111] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                      {isOpen ? (
                        /* Arrow Up (↑) when open */
                        <svg
                          className="w-3.5 h-3.5 text-[#111111]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
                        </svg>
                      ) : (
                        /* Arrow Down (↓) when closed */
                        <svg
                          className="w-3.5 h-3.5 text-[#111111]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
                        </svg>
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 sm:pb-7 space-y-3 text-xs sm:text-sm text-[#444444] font-normal leading-relaxed max-w-2xl">
                          {faq.answers.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

