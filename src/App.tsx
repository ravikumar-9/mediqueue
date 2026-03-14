import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import { CurrencyContextProvider } from "./context/currencyContext";

const LandingPage = lazy(() => import("./pages/landing"));
const MarketsPage = lazy(() => import("./pages/markets"));
const CoinDetailsPage = lazy(() => import("./pages/coinDetails"));

function App() {
  return (
    <CurrencyContextProvider>
      <div className="flex flex-col min-h-screen w-full bg-slate-950 text-white">
        <Navbar />
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/coins/:coinId" element={<CoinDetailsPage />} />
          </Routes>
        </Suspense>
        <footer className="text-center py-4 text-sm text-slate-500 border-t border-slate-800">
          © 2026 Crypto Tracker
        </footer>
      </div>
    </CurrencyContextProvider>
  );
}

export default App;
