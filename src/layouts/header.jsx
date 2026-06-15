import React from "react";

export function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wider text-indigo-400">
          DefenceRoger
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            SSB Stories
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            PYQ's & Mocks
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Eligibility Calculator
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            About Us
          </a>
        </nav>
      </div>
    </header>
  );
}
