import { cn } from "@/lib/utils";
import { TYPOGRAPHY } from "@/lib/design-tokens";

interface SectionHeaderProps {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "hero" | "page" | "section" | "subsection" | "small";
  className?: string;
  children: React.ReactNode;
}

export function SectionHeader({
  as: Component = "h2",
  size = "section",
  className,
  children,
}: SectionHeaderProps) {
  const sizeClasses = {
    hero: TYPOGRAPHY.heading.hero,
    page: TYPOGRAPHY.heading.page,
    section: TYPOGRAPHY.heading.section,
    subsection: TYPOGRAPHY.heading.subsection,
    small: TYPOGRAPHY.heading.small,
  };

  return (
    <Component className={cn(sizeClasses[size], "text-foreground", className)}>
      {children}
    </Component>
  );
}
