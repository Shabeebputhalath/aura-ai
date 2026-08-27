import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        default:
          'bg-slate-800 text-slate-200 border border-slate-700',
        primary:
          'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
        success:
          'bg-green-500/15 text-green-300 border border-green-500/30',
        warning:
          'bg-amber-500/15 text-amber-300 border border-amber-500/30',
        destructive:
          'bg-red-500/15 text-red-300 border border-red-500/30',
        outline:
          'border border-slate-700 text-slate-300 bg-transparent',
        solid:
          'bg-white text-slate-950 font-semibold',
      },
      size: {
        sm: 'text-[11px] px-2 py-0.5 rounded-md',
        default: 'text-xs px-2.5 py-1 rounded-lg',
        lg: 'text-sm px-3 py-1.5 rounded-xl',
      },
      pill: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      pill: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional animated status dot indicator */
  withDot?: boolean;
}

/**
 * Reusable Badge component for tags, status indicators, and category pills.
 *
 * @example
 * ```tsx
 * import { Badge } from "@/components/ui/badge";
 *
 * <Badge variant="primary" withDot pill>
 *   4K AI Render
 * </Badge>
 * ```
 */
export function Badge({
  className,
  variant,
  size,
  pill,
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, pill, className }))}
      {...props}
    >
      {withDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            variant === 'primary' && 'bg-emerald-400 animate-pulse',
            variant === 'success' && 'bg-green-400',
            variant === 'warning' && 'bg-amber-400 animate-ping',
            variant === 'destructive' && 'bg-red-400',
            (!variant || variant === 'default' || variant === 'outline') && 'bg-slate-400'
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
