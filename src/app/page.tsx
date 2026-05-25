"use client";

import {
  Header,
  HeroCard,
  StrigloGoCard,
  FeatureCards,
  RepeatBookingCard,
  TrustStrip,
} from "@/widgets/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6 md:max-w-2xl lg:max-w-3xl">
        <Header />
        <HeroCard />
        <StrigloGoCard />
        <FeatureCards />
        <RepeatBookingCard />
        <TrustStrip />
      </div>
    </main>
  );
}
