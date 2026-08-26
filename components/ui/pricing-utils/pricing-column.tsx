import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingColumnProps {
  name: string;
  icon?: React.ReactNode;
  description?: string;
  price: number | string;
  originalPrice?: number | string;
  promotionText?: string;
  priceNote?: string;
  cta: {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow" | "glow-brand" | "orange-solid" | "orange-glow";
    label: string;
    href?: string;
    onClick?: () => void;
  };
  features?: string[];
  variant?: "default" | "glow" | "glow-brand" | string;
  className?: string;
}

export function PricingColumn({
  name,
  icon,
  description,
  price,
  originalPrice,
  promotionText,
  priceNote,
  cta,
  features = [],
  variant = "default",
  className,
}: PricingColumnProps) {
  const isGlowBrand = variant === "glow-brand" || name.toLowerCase().includes("business");
  const isEnterprise = name.toLowerCase().includes("enterprise") || variant === "glow";

  const formattedPrice = typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price;
  const formattedOriginal =
    typeof originalPrice === "number" ? `₹${originalPrice.toLocaleString("en-IN")}` : originalPrice;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-[2rem] p-8 transition-all duration-300 select-none",
        isGlowBrand
          ? "border-2 border-[#e65c00] bg-gradient-to-b from-[#fff6ef] via-[#fffbf7] to-white shadow-[0_20px_50px_rgba(230,92,0,0.14)] scale-[1.02] z-10"
          : "border border-[#e6e5e2] bg-white shadow-md hover:shadow-xl hover:border-gray-300",
        className
      )}
    >
      {/* Promotion or Popular tag */}
      {isGlowBrand && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-[#e65c00] px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-md shadow-[#e65c00]/30">
            {promotionText || "MOST POPULAR"}
          </span>
        </div>
      )}

      <div>
        {/* Header: Icon & Name */}
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-xl transition-colors",
                isGlowBrand
                  ? "bg-[#ffedd5] text-[#e65c00] border border-[#fed7aa]"
                  : isEnterprise
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "bg-orange-50/80 text-gray-700 border border-orange-100/60"
              )}
            >
              {icon}
            </div>
          )}
          <h3 className="text-2xl font-bold tracking-tight text-[#111111]">
            {name}
          </h3>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-3.5 text-sm text-[#666666] leading-relaxed min-h-[44px]">
            {description}
          </p>
        )}

        {/* Pricing block */}
        <div className="my-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111111] font-sans">
              {formattedPrice}
            </span>
            {formattedOriginal && (
              <span className="text-lg text-[#8d8d8d] line-through">
                {formattedOriginal}
              </span>
            )}
          </div>
          {priceNote && (
            <p className="mt-1.5 text-xs text-[#8d8d8d] font-medium tracking-tight">
              {priceNote}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="my-6">
          {cta.href ? (
            <a
              href={cta.href}
              target={cta.href.startsWith("http") ? "_blank" : undefined}
              rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="w-full block"
            >
              <button
                className={cn(
                  "w-full py-3.5 px-4 text-sm font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center text-center",
                  isGlowBrand
                    ? "bg-[#e65c00] hover:bg-[#cf5300] text-white shadow-[0_10px_25px_rgba(230,92,0,0.35)] hover:shadow-[0_14px_30px_rgba(230,92,0,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                    : isEnterprise
                    ? "bg-[#e65c00] hover:bg-[#cf5300] text-white shadow-[0_6px_18px_rgba(230,92,0,0.25)] hover:shadow-[0_10px_24px_rgba(230,92,0,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                    : "border-2 border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white shadow-xs active:scale-[0.98]"
                )}
              >
                {cta.label}
              </button>
            </a>
          ) : (
            <button
              onClick={cta.onClick}
              className={cn(
                "w-full py-3.5 px-4 text-sm font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center text-center",
                isGlowBrand
                  ? "bg-[#e65c00] hover:bg-[#cf5300] text-white shadow-[0_10px_25px_rgba(230,92,0,0.35)] hover:shadow-[0_14px_30px_rgba(230,92,0,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  : isEnterprise
                  ? "bg-[#e65c00] hover:bg-[#cf5300] text-white shadow-[0_6px_18px_rgba(230,92,0,0.25)] hover:shadow-[0_10px_24px_rgba(230,92,0,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                  : "border-2 border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white shadow-xs active:scale-[0.98]"
              )}
            >
              {cta.label}
            </button>
          )}
        </div>

        {/* Features Checklist */}
        {features.length > 0 && (
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#8d8d8d] mb-4">
              WHAT&apos;S INCLUDED:
            </p>
            <ul className="space-y-3.5 text-sm text-[#111111]">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ffedd5] text-[#e65c00] mt-0.5 shadow-2xs">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <span className="leading-tight text-[13.5px] font-medium text-[#222222]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
