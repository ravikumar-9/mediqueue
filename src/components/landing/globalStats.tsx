import React, { useEffect, useState } from "react";

interface GlobalData {
  active_cryptocurrencies: number;
  markets: number;
  ongoing_icos: number;
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number; eth: number };
  market_cap_change_percentage_24h_usd: number;
}

const GlobalStats = () => {
  const [data, setData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/global"
        );

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalStats();
  }, []);

  const formatNumber = (num: number) =>
    Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(num);

  if (loading) {
    return (
      <p className="text-slate-400 text-sm">Loading market statistics...</p>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">Total Market Cap</p>
        <p className="text-lg font-semibold">
          ${formatNumber(data.total_market_cap.usd)}
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">24h Volume</p>
        <p className="text-lg font-semibold">
          ${formatNumber(data.total_volume.usd)}
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">BTC Dominance</p>
        <p className="text-lg font-semibold">
          {data.market_cap_percentage.btc.toFixed(2)}%
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">ETH Dominance</p>
        <p className="text-lg font-semibold">
          {data.market_cap_percentage.eth.toFixed(2)}%
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">Active Cryptos</p>
        <p className="text-lg font-semibold">
          {data.active_cryptocurrencies.toLocaleString()}
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">Markets</p>
        <p className="text-lg font-semibold">
          {data.markets.toLocaleString()}
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">Ongoing ICOs</p>
        <p className="text-lg font-semibold">
          {data.ongoing_icos}
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
        <p className="text-slate-400 text-xs">Market Change (24h)</p>
        <p
          className={`text-lg font-semibold ${
            data.market_cap_change_percentage_24h_usd > 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {data.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default GlobalStats;