import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent)] text-[var(--primary)]",
        primary: "bg-[var(--primary)] text-white",
        secondary: "bg-[var(--secondary)] text-white",
        gold: "bg-[var(--gold)] text-white",
        outline: "border border-[var(--primary)] text-[var(--primary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
