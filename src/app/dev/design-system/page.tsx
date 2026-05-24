import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { SectionTitle } from "@/shared/ui/section-title";
import { Skeleton } from "@/shared/ui/skeleton";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto w-full max-w-md px-4 pb-safe-offset-4 pt-safe-offset-6">
        <section className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">STRIGLO design system</p>
          <h1 className="mt-3 text-3xl font-black text-foreground">Premium barber-tech UI foundation</h1>
          <p className="mt-4 text-sm leading-6 text-muted">Reusable primitives preview for development only.</p>
        </section>
        <div className="mt-5 space-y-4">
          <Card>
            <SectionTitle title="Buttons" subtitle="Primary, secondary, ghost and loading states." />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button loading>Loading</Button>
            </div>
          </Card>
          <Card>
            <SectionTitle title="Badges" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </Card>
          <Card>
            <SectionTitle title="Skeleton" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-20 w-full rounded-3xl" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
