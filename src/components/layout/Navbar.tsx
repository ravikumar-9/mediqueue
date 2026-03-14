import React, { useState } from "react";
import { Button } from "../ui/button";
import CurrencySelector from "../currencySelector";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-lg">
            <span className="text-white font-bold text-lg">₿</span>
          </div>

          <h2 className="text-lg font-semibold tracking-wide text-white">
            Crypto Tracker
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a className="hover:text-white transition cursor-pointer" href="/">Dashboard</a>
          <a className="hover:text-white transition cursor-pointer" href="/markets">Markets</a>
        </nav>

        <CurrencySelector/>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Login
          </Button>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Sign Up
          </Button>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-6 py-4 space-y-4 z-50 absolute w-full">

          <nav className="flex flex-col gap-3 text-slate-300">
            <a className="hover:text-white transition" href="/">Dashboard</a>
            <a className="hover:text-white transition" href="/markets">Markets</a>
          </nav>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Login
            </Button>

            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
              Sign Up
            </Button>
          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;