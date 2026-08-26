import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </section>
  );
}
