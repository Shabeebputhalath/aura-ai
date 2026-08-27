'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const cardVariants = cva(
  'rounded-2xl transition-all duration-200 overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900/60 border border-slate-800 text-slate-100 shadow-sm backdrop-blur-sm',
        solid:
          'bg-[#121316] border border-[#26282e] text-white shadow-md',
        elevated:
          'bg-slate-900 border border-slate-700/80 text-white shadow-xl shadow-black/40',
        glass:
          'bg-white/[0.04] border border-white/[0.08] text-white backdrop-blur-md shadow-2xl',
        interactive:
          'bg-slate-900/60 border border-slate-800 text-slate-100 hover:border-slate-600 hover:bg-slate-800/60 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-lg transition-all',
        outline:
          'bg-transparent border border-slate-800 text-slate-100',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Optional interactive click handler */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Reusable Card container component that serves as the building block for
 * content sections, feature items, dashboards, and media listings.
 *
 * @example
 * ```tsx
 * import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
 *
 * <Card variant="interactive">
 *   <CardHeader>
 *     <CardTitle>AI Video Generation</CardTitle>
 *     <CardDescription>Render high-fidelity commercial reels in seconds.</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content body...</CardContent>
 *   <CardFooter>Footer actions...</CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg sm:text-xl font-semibold tracking-tight text-white',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-400 leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-slate-300', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between pt-4 mt-2 border-t border-slate-800/80', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
export default Card;
