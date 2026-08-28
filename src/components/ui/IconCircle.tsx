import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const WRAPPER_SIZE = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
} as const;

const ICON_SIZE = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

interface IconCircleProps {
  icon: LucideIcon;
  size?: keyof typeof WRAPPER_SIZE;
  className?: string;
}

export function IconCircle({ icon: Icon, size = "md", className }: IconCircleProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-accent/10",
        WRAPPER_SIZE[size],
        className,
      )}
    >
      <Icon className={cn(ICON_SIZE[size], "text-accent")} />
    </div>
  );
}
