"use client";

import {
  Header,
  HeroCard,
  FeatureCards,
  RepeatBookingCard,
  TrustStrip,
} from "@/widgets/landing";
import { GoRideButton } from "@/features/go-request/ui/go-ride-button";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6 md:max-w-2xl lg:max-w-3xl">
        <Header />
        <HeroCard />
        <div className="mt-4">
          <GoRideButton />
        </div>
        <FeatureCards />
        <RepeatBookingCard />
        <TrustStrip />
      </div>
    </main>
  );
}
