import { ContextType, CurrencySymbol, CurrencyType } from "@/types";
import React, { createContext, useContext, useState } from "react";

export const CurrencyContext = createContext<ContextType | undefined>(
  undefined
);

export const CurrencyContextProvider = ({children}: {children:React.ReactNode}) => {
  const [currency, setCurrency] = useState<CurrencyType>("USD");
  const [symbol, setSymbol] = useState<CurrencySymbol>("$");

  const handleCurrency = (selectedCurrency: CurrencyType) => {
    if (selectedCurrency === "INR") {
      setCurrency("INR");
      setSymbol("₹");
    } else {
      setCurrency("USD");
      setSymbol("$");
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, symbol, handleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency=()=>{
  const context=useContext(CurrencyContext);
  if (!context){
    throw new Error("useCurrency must be used inside CurrencyContextProvider");
  }
  return context;
};
