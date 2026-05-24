import type { Service } from "@/types/booking";
import { cn } from "@/lib/utils";

type ServiceSelectorProps = {
  services: Service[];
  selectedServiceId?: string;
  onSelect: (serviceId: string) => void;
};

export function ServiceSelector({ services, selectedServiceId, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-3" role="list" aria-label="Выбор услуги">
      {services.map((service) => {
        const selected = service.id === selectedServiceId;
        return (
          <button
            type="button"
            key={service.id}
            aria-pressed={selected}
            aria-label={`Выбрать услугу ${service.name}`}
            onClick={() => onSelect(service.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-3xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
              selected
                ? "border-accent bg-accent/12 shadow-glow"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
            )}
          >
            <div>
              <p className="text-base font-semibold text-white">{service.name}</p>
              <p className="text-sm text-muted">{service.description}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-white">{service.price} BYN</p>
              <p className="text-xs text-muted">{service.duration} мин</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
