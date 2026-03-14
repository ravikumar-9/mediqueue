import { useCurrency } from "@/context/currencyContext";
import { Coin } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";
import { Link, useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const [coinsList, setCoinsList] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { currency, symbol } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=${currentPage}&sparkline=false`
        );

        const data = await response.json();
        setCoinsList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [currentPage, currency]);

  return (
    <>
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-950 border-b border-slate-800">
            <TableRow>
              <TableHead className="text-slate-400 w-15">#</TableHead>
              <TableHead className="text-slate-400">Coin</TableHead>
              <TableHead className="text-slate-400">Price</TableHead>

              <TableHead className="text-slate-400 text-right">
                <div className="flex items-center justify-end gap-1">
                  24h High
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </TableHead>

              <TableHead className="text-slate-400 text-right">
                <div className="flex items-center justify-end gap-1">
                  24h Low
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
              </TableHead>

              <TableHead className="text-slate-400 text-right">
                Market Cap
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : coinsList?.length > 0 ? (
              coinsList?.map((coin) => (
                  <TableRow
                    key={coin?.id}
                    onClick={() => navigate(`/coins/${coin?.id}`)}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition"
                  >
                    <TableCell className="text-slate-400">
                      {coin?.market_cap_rank}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={coin?.image}
                          alt={coin?.name}
                          className="h-8 w-8"
                        />
                        <div>
                          <p className="font-medium text-white">{coin.name}</p>
                          <p className="text-xs text-slate-400 uppercase">
                            {coin?.symbol}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          {symbol}
                          {coin?.current_price?.toLocaleString()}
                        </span>

                        <span
                          className={`text-xs ${
                            (coin?.price_change_percentage_24h ?? 0) > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {(coin?.price_change_percentage_24h ?? 0).toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right text-green-400">
                      {symbol}
                      {coin.high_24h?.toLocaleString()}
                    </TableCell>

                    <TableCell className="text-right text-red-400">
                      {symbol}
                      {coin?.low_24h?.toLocaleString()}
                    </TableCell>

                    <TableCell className="text-right">
                      {symbol}
                      {coin?.market_cap?.toLocaleString()}
                    </TableCell>
                  </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="text-center py-24 text-slate-400"
                >
                  No coins available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 3))}
              className={
                currentPage === 3 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default CoinsTable;
