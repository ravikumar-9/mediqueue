import { useCurrency } from "@/context/currencyContext";
import { Coin } from "@/types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const MarketMovers = () => {
  const [gainers, setGainers] = useState<Coin[]>([]);
  const [losers, setLosers] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);

  const { currency } = useCurrency();

  const fetchMovers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );

      const data: Coin[] = await response.json();

      const sorted = [...data]?.sort(
        (a, b) =>
          (b?.price_change_percentage_24h ?? 0) -
          (a?.price_change_percentage_24h ?? 0)
      );

      const topGainers = sorted?.slice(0, 5);
      const topLosers = sorted?.slice(-5).reverse();

      setGainers(topGainers);
      setLosers(topLosers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovers();
  }, [currency]);

  const renderCoins = (coins: Coin[]) =>
    coins?.map((coin) => (
      <div
        key={coin.id}
        className="flex items-center justify-between py-2 border-b border-slate-800 last:border-none"
      >
        <div className="flex items-center gap-3">
          <img src={coin?.image} alt={coin?.name} className="w-6 h-6" />

          <div>
            <p className="text-sm font-semibold uppercase">{coin?.symbol}</p>
            <p className="text-xs text-slate-400">{coin?.name}</p>
          </div>
        </div>

        <p
          className={`text-sm font-medium ${
            coin?.price_change_percentage_24h > 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </div>
    ));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Market Movers</h2>

        <Button
          size="sm"
          variant="primary"
          onClick={fetchMovers}
          disabled={loading}
        >
          <RefreshCcw className={loading ? "animate-spin" : ""} />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gainers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-400">
            Top Gainers
          </h3>
          {renderCoins(gainers)}
        </div>

        {/* Losers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Top Losers
          </h3>
          {renderCoins(losers)}
        </div>
      </div>
    </div>
  );
};

export default MarketMovers;
