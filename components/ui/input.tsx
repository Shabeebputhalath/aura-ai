'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the input */
  label?: string;
  /** Explanatory helper text rendered below input */
  helperText?: string;
  /** Error message that highlights input in red */
  error?: string;
  /** Optional icon to render inside the left side of the input */
  leftIcon?: React.ReactNode;
  /** Optional icon to render inside the right side of the input */
  rightIcon?: React.ReactNode;
  /** Container wrapper class name */
  containerClassName?: string;
}

/**
 * Reusable, accessible Input field component with built-in labels,
 * helper text, validation error styling, and icon support.
 *
 * @example
 * ```tsx
 * import { Input } from "@/components/ui/input";
 * import { Mail } from "lucide-react";
 *
 * <Input
 *   label="Work Email"
 *   placeholder="alex@brand.com"
 *   leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
 *   helperText="We'll send your commercial rate card here."
 *   required
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      containerClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn('w-full space-y-1.5 text-left', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-200 tracking-wide"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400" aria-hidden="true">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              'w-full h-11 px-3.5 py-2 rounded-xl bg-slate-900/80 border text-white text-sm placeholder:text-slate-500 transition-all duration-150 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20'
                : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-xs text-red-400 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      containerClassName,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn('w-full space-y-1.5 text-left', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-200 tracking-wide"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full p-3.5 rounded-xl bg-slate-900/80 border text-white text-sm placeholder:text-slate-500 transition-all duration-150 focus:outline-none focus:ring-2 resize-y disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20',
            className
          )}
          {...props}
        />

        {error ? (
          <p id={errorId} role="alert" className="text-xs text-red-400 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;
