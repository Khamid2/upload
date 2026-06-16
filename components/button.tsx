import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-primary text-white shadow-soft hover:bg-blue-700",
        variant === "secondary" && "bg-secondary text-white hover:bg-slate-800",
        variant === "ghost" && "bg-white text-secondary ring-1 ring-slate-200 hover:bg-slate-50",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
