import { useCurrency } from "@/context/currencyContext";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CurrencyType } from "@/types";

const CurrencySelector = () => {
  const { currency, handleCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={(value) => handleCurrency(value as CurrencyType)}>
      <SelectTrigger className="w-30">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="USD">USD ($)</SelectItem>
        <SelectItem value="INR">INR (₹)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;