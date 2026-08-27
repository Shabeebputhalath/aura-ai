'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Reusable button styling variants built with Class Variance Authority (CVA)
 * and Tailwind CSS utility classes.
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-white text-slate-900 shadow hover:bg-slate-100 active:scale-[0.98]',
        primary:
          'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20 hover:bg-emerald-400 active:scale-[0.98]',
        secondary:
          'bg-slate-800 text-slate-100 hover:bg-slate-700 active:scale-[0.98] border border-slate-700',
        outline:
          'border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/60 hover:text-white active:scale-[0.98]',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-500 active:scale-[0.98]',
        ghost:
          'bg-transparent text-slate-300 hover:bg-slate-800/80 hover:text-white',
        link:
          'text-emerald-400 underline-offset-4 hover:underline p-0 h-auto font-normal',
        glow:
          'bg-white text-slate-950 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(255,255,255,0.4)] hover:bg-slate-100 active:scale-[0.98]',
        'glow-brand':
          'bg-emerald-500 text-slate-950 font-semibold shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:bg-emerald-400 active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base font-semibold',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element using Radix UI Slot */
  asChild?: boolean;
  /** Display a loading spinner and disable interactions */
  isLoading?: boolean;
  /** Custom text to display during loading */
  loadingText?: string;
  /** Optional icon to display before the button label */
  leftIcon?: React.ReactNode;
  /** Optional icon to display after the button label */
  rightIcon?: React.ReactNode;
}

/**
 * Accessible, polymorphic Button component with multiple style variants,
 * size configurations, loading indicators, and icon slots.
 *
 * @example
 * ```tsx
 * import { Button } from "@/components/ui/button";
 * import { ArrowRight } from "lucide-react";
 *
 * <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
 *   Get Started
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
export default Button;
