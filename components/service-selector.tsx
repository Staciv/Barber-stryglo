import type { Service } from "@/types/booking";
import { cn } from "@/lib/utils";

type ServiceSelectorProps = {
  services: Service[];
  selectedServiceId?: string;
  onSelect: (serviceId: string) => void;
};

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelect,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-3" role="list" aria-label="Выбор услуги">
      {services.map((service, index) => {
        const selected = service.id === selectedServiceId;
        return (
          <button
            type="button"
            key={service.id}
            aria-pressed={selected}
            aria-label={`Выбрать услугу ${service.name}`}
            onClick={() => onSelect(service.id)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={cn(
              "group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
              selected
                ? "border-accent bg-accent/[0.08] shadow-glow"
                : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
            )}
          >
            {/* Hover effect */}
            {!selected && (
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/[0.02] to-accent-cyan/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}

            <div className="relative flex items-center gap-3">
              {/* Selection indicator */}
              <div
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                  selected
                    ? "border-accent bg-accent"
                    : "border-white/20 bg-transparent group-hover:border-white/30"
                )}
              >
                {selected && <div className="size-2 rounded-full bg-white" />}
              </div>

              <div>
                <p
                  className={cn(
                    "text-base font-semibold transition-colors",
                    selected
                      ? "text-white"
                      : "text-white group-hover:text-white"
                  )}
                >
                  {service.name}
                </p>
                <p className="text-sm text-white/50">{service.description}</p>
              </div>
            </div>

            <div className="relative text-right">
              <p
                className={cn(
                  "text-base font-bold transition-colors",
                  selected ? "text-accent" : "text-white"
                )}
              >
                {service.price} BYN
              </p>
              <p className="text-xs text-white/40">{service.duration} мин</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
