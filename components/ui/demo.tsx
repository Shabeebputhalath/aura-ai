import Pricing from "@/components/ui/pricing-base";
import FullPricing from "@/components/ui/pricing";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function DemoOne() {
  return <Pricing />;
}

export function PricingDemo() {
  return <FullPricing />;
}

export const StaggerDemo = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <StaggerTestimonials />
    </div>
  );
};


