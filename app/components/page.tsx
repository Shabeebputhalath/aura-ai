'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  Navbar,
  Badge,
  Input,
  Textarea,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import {
  Sparkles,
  ArrowRight,
  Send,
  Layers,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  Play,
  Video,
  Eye,
  Sliders,
  ShieldCheck,
  LayoutTemplate,
  Mail,
  User,
} from 'lucide-react';

export default function UIComponentsGuidePage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalSize, setModalSize] = React.useState<'sm' | 'md' | 'lg'>('md');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  // Form interactive demo state
  const [inputVal, setInputVal] = React.useState('');
  const [emailVal, setEmailVal] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const copySnippet = (key: string, code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleValidateEmail = (val: string) => {
    setEmailVal(val);
    if (val && !val.includes('@')) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const simulateAsyncAction = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Demo Navbar Component in Action */}
      <Navbar
        brandName="AURA UI Kit"
        items={[
          { label: 'Overview', href: '#overview' },
          { label: 'Button', href: '#button' },
          { label: 'Card', href: '#card' },
          { label: 'Modal', href: '#modal' },
          { label: 'Navbar', href: '#navbar' },
          { label: 'Form Controls', href: '#forms' },
          { label: 'Page Examples', href: '#examples' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="/">Studio Home</Link>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Try Modal
            </Button>
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section id="overview" className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="primary" withDot pill>
              Next.js 15+ App Router
            </Badge>
            <Badge variant="outline" pill>
              Tailwind CSS v4
            </Badge>
            <Badge variant="success" pill>
              WCAG AA Accessible
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
            Reusable UI Component Library
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A production-ready set of accessible, highly composable React components built with TypeScript, Tailwind CSS, and Class Variance Authority. Import directly into any Next.js page or layout.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="glow-brand"
              onClick={() => {
                document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Page Examples
            </Button>
            <Button
              variant="secondary"
              onClick={() => copySnippet('quick-install', 'import { Button, Card, Modal, Navbar, Badge, Input, Tabs } from "@/components/ui";')}
              leftIcon={copiedKey === 'quick-install' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            >
              {copiedKey === 'quick-install' ? 'Import Copied!' : 'Copy Barrel Import'}
            </Button>
          </div>
        </section>

        {/* 1. BUTTON COMPONENT */}
        <section id="button" className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sliders className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">1. Button</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Polymorphic interactive button with 8 visual variants, size scales, loading state spinners, and icon slots.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copySnippet('btn-code', `<Button variant="primary" size="lg" rightIcon={<ArrowRight />}>Explore</Button>`)}
              leftIcon={copiedKey === 'btn-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5" />}
            >
              Copy JSX
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Visual Variants */}
            <Card variant="solid" padding="lg" className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Style Variants</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="default">Default</Button>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link Style</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Glow & Special Effects</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="glow-brand" rightIcon={<Sparkles className="w-4 h-4" />}>
                    Glow Brand
                  </Button>
                  <Button variant="glow" leftIcon={<Video className="w-4 h-4" />}>
                    Glow Neutral
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Sizes & Loading States</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm" variant="secondary">Small (sm)</Button>
                  <Button size="default" variant="secondary">Default</Button>
                  <Button size="lg" variant="primary">Large (lg)</Button>
                  <Button
                    variant="primary"
                    isLoading={loadingBtn}
                    loadingText="Processing..."
                    onClick={simulateAsyncAction}
                  >
                    Click to Test Loading
                  </Button>
                </div>
              </div>
            </Card>

            {/* Code / Docs */}
            <Card variant="default" padding="default" className="bg-[#0e1015] font-mono text-xs text-slate-300 overflow-x-auto space-y-4">
              <div className="text-slate-400 text-xs font-sans font-semibold uppercase tracking-wider pb-2 border-b border-slate-800">
                Usage & Props Specification
              </div>
              <pre className="text-emerald-400 leading-relaxed">
{`import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

// Standard Primary Button with Icon
<Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
  Launch Campaign
</Button>

// Async Action with Loading State
<Button
  variant="glow-brand"
  isLoading={isSubmitting}
  loadingText="Rendering 4K Commercial..."
  onClick={handleRender}
>
  Generate Video
</Button>`}
              </pre>
            </Card>
          </div>
        </section>

        {/* 2. CARD COMPONENT */}
        <section id="card" className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <LayoutTemplate className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">2. Card & Subcomponents</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Modular surface containers with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interactive Card */}
            <Card variant="interactive">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="primary" pill>4K Commercials</Badge>
                  <span className="text-xs text-slate-500 font-mono">01</span>
                </div>
                <CardTitle className="pt-2">Product Hero Reel</CardTitle>
                <CardDescription>
                  Hyper-realistic AI cinematic for luxury consumer goods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generated in under 24 hours with custom camera motion, studio lighting, and licensed soundtrack.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs font-semibold text-emerald-400">Starting at ₹999/sec</span>
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Details
                </Button>
              </CardFooter>
            </Card>

            {/* Solid Card */}
            <Card variant="solid">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success" withDot pill>Active Pipeline</Badge>
                  <span className="text-xs text-slate-500 font-mono">02</span>
                </div>
                <CardTitle className="pt-2">Cloud AI Render Farm</CardTitle>
                <CardDescription>
                  Parallelized diffusion rendering pipeline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>GPU Capacity</span>
                    <span className="text-white font-semibold">99.8% Online</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-slate-400">Status: Operational</span>
                <Badge variant="outline">Enterprise</Badge>
              </CardFooter>
            </Card>

            {/* Glass Card */}
            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="warning" pill>Featured Brief</Badge>
                  <span className="text-xs text-slate-500 font-mono">03</span>
                </div>
                <CardTitle className="pt-2">Fashion Campaign</CardTitle>
                <CardDescription>
                  Autumn / Winter 2026 Collection commercial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Combining live model footage with dynamic AI fluid lighting transforms.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm" fullWidth>
                  View Case Study
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 3. MODAL COMPONENT */}
        <section id="modal" className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">3. Modal Dialog</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Accessible dialog with ESC keyboard dismissal, backdrop click dismissal, focus management, and responsive widths.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setModalSize('sm');
                  setModalOpen(true);
                }}
              >
                Small Modal
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setModalSize('md');
                  setModalOpen(true);
                }}
              >
                Open Demo Modal
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setModalSize('lg');
                  setModalOpen(true);
                }}
              >
                Large Modal
              </Button>
            </div>
          </div>

          <Card variant="solid" padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">Interactive Modal Preview</h3>
                <p className="text-sm text-slate-400 max-w-xl">
                  Test the modal by clicking the trigger buttons above or below. It handles screen reader accessibility with appropriate ARIA roles, locks background scroll, and smoothly animates.
                </p>
              </div>
              <Button
                variant="glow-brand"
                size="lg"
                onClick={() => setModalOpen(true)}
                leftIcon={<Play className="w-4 h-4" />}
              >
                Launch Live Modal
              </Button>
            </div>
          </Card>
        </section>

        {/* 4. FORM CONTROLS & TABS */}
        <section id="forms" className="space-y-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">4. Form Inputs & Tabs</h2>
              <p className="text-sm text-slate-400 mt-1">
                Accessible form fields with error validation, icon slots, helper text, and accessible tab panels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Interactive Form */}
            <Card variant="solid" padding="lg" className="space-y-4">
              <h3 className="text-base font-semibold text-white pb-2 border-b border-slate-800">
                Live Interactive Form
              </h3>

              <Input
                label="Full Name"
                placeholder="e.g. Maya Chen"
                leftIcon={<User className="w-4 h-4" />}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                helperText="Primary point of contact for the production brief."
                required
              />

              <Input
                label="Work Email Address"
                placeholder="maya@company.com"
                type="email"
                leftIcon={<Mail className="w-4 h-4" />}
                value={emailVal}
                onChange={(e) => handleValidateEmail(e.target.value)}
                error={emailError}
                helperText="We will send quote estimates and previews here."
                required
              />

              <Textarea
                label="Project Scope & Vision"
                placeholder="Describe your product, target audience, and desired video length..."
                rows={3}
              />

              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  rightIcon={<Send className="w-4 h-4" />}
                  onClick={() => alert(`Submitted: ${inputVal || 'Demo User'} (${emailVal || 'No Email'})`)}
                >
                  Submit Inquiry
                </Button>
              </div>
            </Card>

            {/* Interactive Tabs */}
            <Card variant="solid" padding="lg" className="space-y-4">
              <h3 className="text-base font-semibold text-white pb-2 border-b border-slate-800">
                Accessible Tabbed Interface
              </h3>

              <Tabs defaultValue="features">
                <TabsList className="w-full">
                  <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                  <TabsTrigger value="specs" className="flex-1">Tech Specs</TabsTrigger>
                  <TabsTrigger value="code" className="flex-1">Code Snippet</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-3">
                  <h4 className="text-sm font-semibold text-white">Production Capabilities</h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      4K Ultra-HD Resolution at 60 FPS output
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Custom photorealistic 3D product integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Multi-language AI voiceover synthesis
                    </li>
                  </ul>
                </TabsContent>

                <TabsContent value="specs" className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                  <h4 className="text-sm font-semibold text-white">Technical Architecture</h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
                    <div className="p-2 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Framework</span>
                      <span className="font-semibold text-white">Next.js 15+ App Router</span>
                    </div>
                    <div className="p-2 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Styling</span>
                      <span className="font-semibold text-white">Tailwind CSS v4</span>
                    </div>
                    <div className="p-2 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Icons</span>
                      <span className="font-semibold text-white">Lucide React</span>
                    </div>
                    <div className="p-2 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Accessibility</span>
                      <span className="font-semibold text-white">WAI-ARIA Compliant</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="p-4 bg-[#0c0e12] rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content...</TabsContent>
  <TabsContent value="tab2">Tab 2 content...</TabsContent>
</Tabs>`}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </section>

        {/* 5. MULTI-PAGE IMPORT & INTEGRATION EXAMPLES */}
        <section id="examples" className="space-y-6 pt-6 border-t border-slate-800/80">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              5. How to Import and Use Across Next.js Pages
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Below are ready-to-use boilerplate templates showing how to import and combine these components in different pages (e.g. Landing Page, Contact Page, Dashboard Page).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example 1: Landing Page */}
            <Card variant="solid" padding="lg" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="primary" pill>Example 1</Badge>
                <CardTitle className="text-lg">Landing / Hero Page</CardTitle>
                <CardDescription>
                  Using Navbar, Button with glow variants, Badges, and interactive Cards for feature grids.
                </CardDescription>
                <pre className="p-3 bg-[#0a0c10] border border-slate-800 rounded-xl text-[10px] text-slate-300 font-mono overflow-x-auto">
{`// app/page.tsx
import { Navbar, Button, Card, Badge } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Navbar brandName="My App" />
      <main className="p-8">
        <Badge variant="primary" withDot>New Feature</Badge>
        <h1>Welcome</h1>
        <Button variant="glow-brand">Get Started</Button>
      </main>
    </>
  );
}`}
                </pre>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => copySnippet('ex-home', `import { Navbar, Button, Card, Badge } from "@/components/ui";\n\nexport default function HomePage() {\n  return (\n    <main className="p-8 space-y-6">\n      <Badge variant="primary" withDot>Next.js Ready</Badge>\n      <h1 className="text-3xl font-bold text-white">Welcome</h1>\n      <Button variant="glow-brand">Explore Now</Button>\n    </main>\n  );\n}`)}
                leftIcon={copiedKey === 'ex-home' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedKey === 'ex-home' ? 'Copied Template!' : 'Copy HomePage Boilerplate'}
              </Button>
            </Card>

            {/* Example 2: Contact Form Page */}
            <Card variant="solid" padding="lg" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="success" pill>Example 2</Badge>
                <CardTitle className="text-lg">Contact / Inquiry Page</CardTitle>
                <CardDescription>
                  Using Input, Textarea, Card, and Button with validation states.
                </CardDescription>
                <pre className="p-3 bg-[#0a0c10] border border-slate-800 rounded-xl text-[10px] text-slate-300 font-mono overflow-x-auto">
{`// app/contact/page.tsx
import { Input, Textarea, Button, Card } from "@/components/ui";

export default function ContactPage() {
  return (
    <Card variant="elevated" className="max-w-xl mx-auto">
      <Input label="Name" required />
      <Input label="Email" type="email" required />
      <Textarea label="Message" rows={4} />
      <Button variant="primary" fullWidth>Send</Button>
    </Card>
  );
}`}
                </pre>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => copySnippet('ex-contact', `import { Input, Textarea, Button, Card, CardHeader, CardTitle } from "@/components/ui";\n\nexport default function ContactPage() {\n  return (\n    <div className="max-w-md mx-auto py-12">\n      <Card variant="elevated">\n        <CardHeader><CardTitle>Get in Touch</CardTitle></CardHeader>\n        <form className="space-y-4">\n          <Input label="Full Name" required />\n          <Input label="Email" type="email" required />\n          <Textarea label="Message" rows={4} />\n          <Button variant="primary" fullWidth>Send Message</Button>\n        </form>\n      </Card>\n    </div>\n  );\n}`)}
                leftIcon={copiedKey === 'ex-contact' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedKey === 'ex-contact' ? 'Copied Template!' : 'Copy Contact Boilerplate'}
              </Button>
            </Card>

            {/* Example 3: Dashboard / Settings Page */}
            <Card variant="solid" padding="lg" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="warning" pill>Example 3</Badge>
                <CardTitle className="text-lg">Dashboard / Admin Page</CardTitle>
                <CardDescription>
                  Using Modal for actions, Tabs for section navigation, and Badge indicators.
                </CardDescription>
                <pre className="p-3 bg-[#0a0c10] border border-slate-800 rounded-xl text-[10px] text-slate-300 font-mono overflow-x-auto">
{`// app/dashboard/page.tsx
'use client';
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Modal, Button } from "@/components/ui";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Item</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="New Item">
        <p>Form inside modal...</p>
      </Modal>
    </div>
  );
}`}
                </pre>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => copySnippet('ex-dash', `'use client';\nimport { useState } from "react";\nimport { Tabs, TabsList, TabsTrigger, TabsContent, Modal, Button, Card } from "@/components/ui";\n\nexport default function DashboardPage() {\n  const [isModalOpen, setIsModalOpen] = useState(false);\n  return (\n    <div className="p-8 space-y-6">\n      <div className="flex justify-between items-center">\n        <h1 className="text-2xl font-bold text-white">Dashboard</h1>\n        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ New Item</Button>\n      </div>\n      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Item">\n        <p>Item creation form...</p>\n      </Modal>\n    </div>\n  );\n}`)}
                leftIcon={copiedKey === 'ex-dash' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedKey === 'ex-dash' ? 'Copied Template!' : 'Copy Dashboard Boilerplate'}
              </Button>
            </Card>
          </div>
        </section>
      </main>

      {/* Accessible Interactive Modal Demonstration */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size={modalSize}
        title="Schedule 4K AI Commercial Brief"
        description="Book a direct creative session with our AI director and production team."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Creative brief confirmed! Our team will contact you shortly.');
                setModalOpen(false);
              }}
              rightIcon={<Check className="w-4 h-4" />}
            >
              Confirm Brief Session
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            This modal illustrates full keyboard accessibility (press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono text-xs border border-slate-700">ESC</kbd> to close), backdrop click dismissal, focus trap, and responsive size adjustment.
          </p>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Currently showing modal with <strong>{modalSize}</strong> width preset.</span>
          </div>

          <Input
            label="Brand / Company Name"
            placeholder="e.g. Acme Luxury Eyewear"
          />

          <Textarea
            label="Product Focus"
            placeholder="Share the product or campaign objective..."
            rows={2}
          />
        </div>
      </Modal>
    </div>
  );
}
