import * as React from "react";
import { cva } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "../../lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex w-full flex-col gap-6", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "inline-flex h-auto w-fit items-center justify-center rounded-2xl bg-zinc-100 p-1.5 text-muted-foreground shadow-inner",
  {
    variants: {
      variant: {
        default: "bg-zinc-100",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({ className, variant = "default", ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold text-gray-700 transition-all",
        "hover:text-orange-600",
        "data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("w-full text-sm outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };