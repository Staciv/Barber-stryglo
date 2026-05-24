import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-surfaceStrong text-foreground shadow-inset",
  {
    variants: {
      size: {
        sm: "size-10 text-xs",
        md: "size-12 text-sm",
        lg: "size-16 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
};

export function Avatar({ src, alt, fallback, size, className }: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size, className }))}>
      {src ? (
        <img src={src} alt={alt ?? fallback} className="size-full object-cover" />
      ) : (
        <span className="font-semibold uppercase tracking-[0.12em]">{fallback.slice(0, 2)}</span>
      )}
    </div>
  );
}
