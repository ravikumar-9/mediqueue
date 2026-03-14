import React, { useEffect, useState } from "react";
import { useCurrency } from "@/context/currencyContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button } from "../ui/button";
import { formatTime } from "@/lib/utils";
import { Card } from "../ui/card";

interface Props {
  coinId: string | undefined;
}

const CoinChart = ({ coinId }: Props) => {
  const { currency } = useCurrency();
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
        );

        const data = await response.json();

        const formatted = data?.prices?.map((item: any) => ({
          date: formatTime(days, item[0]),
          price: item[1],
        }));

        setChartData(formatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) fetchChart();
  }, [coinId, currency, days]);

  if (loading) return <p className="text-slate-400">Loading chart...</p>;

  return (
    <Card className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-125">
      <h3 className="text-white font-semibold mb-4">Price Chart</h3>
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setDays(1)}
          variant={days === 1 ? "primary" : "default"}
        >
          1D
        </Button>
        <Button
          onClick={() => setDays(7)}
          variant={days === 7 ? "primary" : "default"}
        >
          7D
        </Button>
        <Button
          onClick={() => setDays(30)}
          variant={days === 30 ? "primary" : "default"}
        >
          30D
        </Button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />

          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            domain={["auto", "auto"]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CoinChart;
