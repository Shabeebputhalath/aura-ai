'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
}

export interface NavbarProps {
  /** Brand identity logo or title */
  brandLogo?: React.ReactNode;
  /** Brand title string if no custom logo is provided */
  brandName?: string;
  /** Primary navigation routes */
  items?: NavItem[];
  /** Optional secondary actions / CTA slot (e.g., Get Started button) */
  actions?: React.ReactNode;
  /** Whether the navbar sticks to the top with a backdrop blur */
  sticky?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Reusable, responsive Navbar component supporting mobile drawers,
 * active path detection, action slots, and accessible keyboard navigation.
 *
 * @example
 * ```tsx
 * import { Navbar } from "@/components/ui/navbar";
 * import { Button } from "@/components/ui/button";
 *
 * <Navbar
 *   brandName="AURA AI"
 *   items={[
 *     { label: "Works", href: "/works" },
 *     { label: "About", href: "/about" },
 *     { label: "Contact", href: "/contact" },
 *   ]}
 *   actions={<Button variant="primary" size="sm">Book Project</Button>}
 * />
 * ```
 */
export function Navbar({
  brandLogo,
  brandName = 'AURA AI',
  items = [
    { label: 'Works', href: '/works' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin' },
  ],
  actions,
  sticky = true,
  className,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const prevPathRef = React.useRef(pathname);

  React.useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      // Delay closing to next tick to avoid cascading renders
      const timer = setTimeout(() => {
        setMobileMenuOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        'w-full z-40 transition-all duration-200 select-none',
        sticky
          ? 'sticky top-0 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl tracking-tight hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
          aria-label={`${brandName} Home`}
        >
          {brandLogo || (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-emerald-500/20">
              A
            </div>
          )}
          <span className="font-sans">{brandName}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1.5 px-3"
        >
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 flex items-center gap-1.5',
                  isActive
                    ? 'text-white bg-white/10 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions Slot */}
        <div className="hidden md:flex items-center gap-3">
          {actions || (
            <Button
              variant="primary"
              size="sm"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label="Toggle navigation menu"
            className="text-white hover:bg-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden bg-[#0d0e12] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
                    isActive
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {actions && <div className="pt-2 border-t border-slate-800/80">{actions}</div>}
        </div>
      )}
    </header>
  );
}

export default Navbar;
