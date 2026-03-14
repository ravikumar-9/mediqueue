import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Coin } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "../ui/skeleton";
import { useCurrency } from "@/context/currencyContext";

const DashboardCarousel = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currency, symbol } = useCurrency();

  const plugin = useRef(
    Autoplay({
      delay: 2000,
    })
  );

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setIsLoading(true);
        const trendingRes = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );

        const trendingData = await trendingRes.json();

        const ids = trendingData.coins
          .map((coin: any) => coin.item.id)
          .join(",");

        const marketRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
        );

        const marketData: Coin[] = await marketRes.json();

        setTrendingCoins(marketData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingCoins();
  }, [currency]);

  return (
    <Carousel className="w-full" opts={{ loop: true }} plugins={[plugin.current]}>
      <CarouselContent className="-ml-4">

        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6"
              >
                <Card className="bg-slate-900 border border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center p-5 gap-3">

                    <Skeleton className="w-10 h-10 rounded-full" />

                    <div className="flex flex-col items-center gap-1">
                      <Skeleton className="w-16 h-3" />
                      <Skeleton className="w-20 h-3" />
                    </div>

                    <Skeleton className="w-12 h-3" />
                    <Skeleton className="w-16 h-3" />

                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          : trendingCoins.map((coin) => (
              <CarouselItem
                key={coin.id}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6"
              >
                <Card className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-5 gap-2 text-center">

                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-10 h-10"
                    />

                    <div>
                      <p className="font-semibold uppercase text-sm">
                        {coin.symbol}
                      </p>
                      <p className="text-xs text-slate-400">
                        {coin.name}
                      </p>
                    </div>

                    <p
                      className={`text-sm font-medium ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </p>

                    <p className="text-sm text-slate-200">
                      {symbol}
                      {coin.current_price?.toLocaleString()}
                    </p>

                  </CardContent>
                </Card>
              </CarouselItem>
            ))}

      </CarouselContent>
    </Carousel>
  );
};

export default DashboardCarousel;