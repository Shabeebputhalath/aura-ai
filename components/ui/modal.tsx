'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface ModalProps {
  /** Controls visibility of the modal */
  isOpen: boolean;
  /** Callback fired when the modal requests closure (Esc key, backdrop click, close button) */
  onClose: () => void;
  /** Modal header title */
  title?: React.ReactNode;
  /** Optional secondary subtitle or description */
  description?: React.ReactNode;
  /** Modal body content */
  children: React.ReactNode;
  /** Modal footer action buttons */
  footer?: React.ReactNode;
  /** Width size constraint of modal dialog */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether clicking the backdrop overlay closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing the ESC key closes the modal */
  closeOnEsc?: boolean;
  /** Whether to show the top-right X close button */
  showCloseButton?: boolean;
  /** Additional classes for modal card */
  className?: string;
  /** Optional unique ID for ARIA title association */
  id?: string;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] sm:max-w-6xl',
};

/**
 * Accessible, keyboard-navigable Modal Dialog component with backdrop blur,
 * scroll locking, focus isolation, and responsive layout.
 *
 * @example
 * ```tsx
 * import { Modal } from "@/components/ui/modal";
 * import { Button } from "@/components/ui/button";
 *
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Schedule Creative Brief"
 *   description="Fill out the project details to connect with our production director."
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleSubmit}>Confirm Booking</Button>
 *     </>
 *   }
 * >
 *   <p>Modal body content goes here...</p>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
  id = 'modal-dialog',
}: ModalProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  // Keyboard accessibility: ESC key handler
  React.useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock background scroll when open
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      onClick={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Dialog container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-[#121316] border border-[#26282e] text-slate-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-800/80 shrink-0">
            <div className="space-y-1 pr-6">
              {title && (
                <h2
                  id={titleId}
                  className="text-lg sm:text-xl font-semibold tracking-tight text-white font-sans"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="text-sm text-slate-400 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close dialog"
                className="text-slate-400 hover:text-white rounded-lg -mr-2 -mt-2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto text-sm text-slate-300 leading-relaxed flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-3 p-4 sm:p-6 pt-4 bg-slate-900/40 border-t border-slate-800/80 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
