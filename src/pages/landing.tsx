import DashboardCarousel from "@/components/landing/Carousel";
import GlobalStats from "@/components/landing/globalStats";
import MarketMovers from "@/components/landing/marketmovers";
import { Button } from "@/components/ui/button";
import React from "react";

const LandingPage = () => {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-12">
      {/* Heading */}
      <section className="flex flex-col gap-3 items-center">
        <h1 className="text-xl font-bold">Crypto Market Overview</h1>
        <p className="text-slate-400 max-w-xl text-center">
          Discover Trending Cryptocurrencies and explore the latest movements
          across the crypto market.
        </p>
      </section>

      <section>
        <GlobalStats />
      </section>

      {/* Trending Carousel */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Trending Coins</h2>
          <Button variant="primary">View All Coins</Button>
        </div>

        <DashboardCarousel />
      </section>

      {/* Informational Sections */}
      <section>
        <MarketMovers />
      </section>
    </main>
  );
};

export default LandingPage;
