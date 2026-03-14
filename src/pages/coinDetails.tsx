import CoinChart from "@/components/coinDetails/coinChart";
import CoinDataPage from "@/components/coinDetails/coinDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const coinDetails = () => {
  const [coinDetails, setCoinDetails] = useState<any>("");
  const { coinId } = useParams();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        const data = await response?.json();
        setCoinDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoinDetails();
  }, []);

  return (
    <main className="space-y-6 p-8">
      <CoinDataPage coinData={coinDetails} />
      <CoinChart coinId={coinId} />
    </main>
  );
};

export default coinDetails;
