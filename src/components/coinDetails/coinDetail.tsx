import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CoinDataPage = ({ coinData }: { coinData: any }) => {
  const market = coinData?.market_data;
  const volumes = market?.total_volume || {};

  return (
    <Card className="bg-slate-900 border border-slate-800">
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={coinData?.image?.large}
          alt={coinData?.name}
          className="h-14 w-14"
        />

        <div>
          <CardTitle className="text-white text-xl">
            {coinData?.name} ({coinData?.symbol?.toUpperCase()})
          </CardTitle>

          <p className="text-slate-400 text-sm">
            Rank #{market?.market_cap_rank}
          </p>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Current Price</p>
          <p className="text-white font-semibold">
            ${market?.current_price?.usd?.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Market Cap</p>
          <p className="text-white font-semibold">
            ${market?.market_cap?.usd?.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400">24h High</p>
          <p className="text-green-400 font-semibold">
            ${market?.high_24h?.usd?.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400">24h Low</p>
          <p className="text-red-400 font-semibold">
            ${market?.low_24h?.usd?.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Circulating Supply</p>
          <p className="text-white">
            {market?.circulating_supply?.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Max Supply</p>
          <p className="text-white">
            {market?.max_supply
              ? market.max_supply.toLocaleString()
              : "Unlimited"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">All Time High</p>
          <p className="text-white">${market?.ath?.usd?.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-slate-400">ATH Change</p>
          <p className="text-red-400">
            {market?.ath_change_percentage?.usd?.toFixed(2)}%
          </p>
        </div>
        {/* <div className="col-span-2">
          <h3 className="text-white font-semibold mb-4">
            Total Volume by Currency
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {Object?.entries(volumes)?.map(([currency, value]) => (
              <div
                key={currency}
                className="bg-slate-800 border border-slate-700 rounded-md p-3"
              >
                <p className="text-slate-400 uppercase">{currency}</p>
                <p className="text-white font-medium">
                  {Number(value)?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default CoinDataPage;
