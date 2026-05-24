import type { ReactNode } from "react";

type AdminSectionProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
};

export function AdminSection({ title, subtitle, action, children }: AdminSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-foreground">{title}</h2>
          <p className="mt-1 text-sm leading-5 text-muted">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
