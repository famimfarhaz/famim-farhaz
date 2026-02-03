"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { cn } from "@/lib/utils";

const RatingScaleGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex w-full justify-between gap-1", className)}
    {...props}
  />
));
RatingScaleGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RatingScaleItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
  }
>(({ className, label, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-background text-sm font-medium shadow-sm transition-all",
      "hover:border-white/50 hover:shadow-md hover:bg-white/5",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30",
      "data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-black",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {label}
    <RadioGroupPrimitive.Indicator className="absolute -top-1 -right-1">
      <span className="flex size-2.5 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.6)]" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RatingScaleItem.displayName = "RatingScaleItem";

export { RatingScaleGroup, RatingScaleItem };
