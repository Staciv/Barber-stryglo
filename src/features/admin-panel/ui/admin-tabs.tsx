import { cn } from "@/shared/lib/utils";

export type AdminTab = "barbers" | "services" | "schedules" | "bookings";

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: "barbers", label: "Мастера" },
  { id: "services", label: "Услуги" },
  { id: "schedules", label: "График" },
  { id: "bookings", label: "Записи" },
];

type AdminTabsProps = {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
};

export function AdminTabs({ activeTab, onChange }: AdminTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-1 sm:grid-cols-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "min-h-11 rounded-[1.15rem] px-3 text-sm font-semibold text-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
              isActive && "bg-accent text-white shadow-glow",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
