import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

export default function VoicePage() {
  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto w-full max-w-md px-4 pb-safe-offset-4 pt-safe-offset-6">
        <section className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card">
          <Badge variant="accent">Voice MVP</Badge>
          <h1 className="mt-4 text-3xl font-black text-foreground">Голосовая запись</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Заготовка для фразы вроде “Запиши меня завтра вечером”. Реальный NLP пока не подключён.
          </p>
          <Link href="/booking" className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-[1.25rem] bg-accent font-semibold text-white">
            Записаться вручную
          </Link>
        </section>
        <Card className="mt-5">
          <p className="text-sm font-semibold text-foreground">Голосовой ввод недоступен</p>
          <p className="mt-1 text-sm text-muted">Пока используем обычный быстрый booking flow.</p>
        </Card>
      </div>
    </main>
  );
}
