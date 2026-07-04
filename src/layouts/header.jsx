import React, { useState } from "react";

// Destructure setCurrentView and currentView from props
export function Header({ currentView, setCurrentView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo - clicking it returns home */}
        <h1
          onClick={() => handleNavigation("home")}
          className="text-xl font-bold tracking-wider text-indigo-400 cursor-pointer"
        >
          DefenceRoger
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => handleNavigation("home")}
            className={`transition-colors font-medium ${
              currentView === "home"
                ? "text-indigo-400 font-bold"
                : "text-white hover:text-indigo-400"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation("ssb-stories")}
            className={`transition-colors font-medium ${
              currentView === "ssb-stories"
                ? "text-indigo-400 font-bold"
                : "text-white hover:text-indigo-400"
            }`}
          >
            SSB Stories
          </button>

          <button
            onClick={() => handleNavigation("mocks")}
            className={`transition-colors font-medium ${
              currentView === "mocks"
                ? "text-indigo-400 font-bold"
                : "text-white hover:text-indigo-400"
            }`}
          >
            PYQ's & Mocks
          </button>

          <button
            onClick={() => handleNavigation("Test Series")}
            className={`transition-colors font-medium ${
              currentView === "Test Series"
                ? "text-indigo-400 font-bold"
                : "text-white hover:text-indigo-400"
            }`}
          >
            Test Series
          </button>

          <button
            onClick={() => handleNavigation("calculator")}
            className={`transition-colors font-medium ${
              currentView === "calculator"
                ? "text-indigo-400 font-bold"
                : "text-white hover:text-indigo-400"
            }`}
          >
            Eligibility Calculator
          </button>

          <button
            onClick={() => handleNavigation("about")}
            className={`transition-colors font-medium ${
              currentView === "about"
                ? "text-indigo-400 font-bold"
                : "text-white hover:text-indigo-400"
            }`}
          >
            About Us
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-slate-800 border-t border-slate-700 flex flex-col">
          <button
            onClick={() => handleNavigation("home")}
            className={`px-6 py-3 text-left transition-colors ${
              currentView === "home"
                ? "text-indigo-400 font-bold"
                : "hover:bg-slate-700"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation("ssb-stories")}
            className={`px-6 py-3 text-left transition-colors ${
              currentView === "ssb-stories"
                ? "text-indigo-400 font-bold"
                : "hover:bg-slate-700"
            }`}
          >
            SSB Stories
          </button>

          <button
            onClick={() => handleNavigation("mocks")}
            className={`px-6 py-3 text-left transition-colors ${
              currentView === "mocks"
                ? "text-indigo-400 font-bold"
                : "hover:bg-slate-700"
            }`}
          >
            PYQ's & Mocks
          </button>

          <button
            onClick={() => handleNavigation("Test Series")}
            className={`px-6 py-3 text-left transition-colors ${
              currentView === "Test Series"
                ? "text-indigo-400 font-bold"
                : "hover:bg-slate-700"
            }`}
          >
            Test Series
          </button>

          <button
            onClick={() => handleNavigation("calculator")}
            className={`px-6 py-3 text-left transition-colors ${
              currentView === "calculator"
                ? "text-indigo-400 font-bold"
                : "hover:bg-slate-700"
            }`}
          >
            Eligibility Calculator
          </button>

          <button
            onClick={() => handleNavigation("about")}
            className={`px-6 py-3 text-left transition-colors ${
              currentView === "about"
                ? "text-indigo-400 font-bold"
                : "hover:bg-slate-700"
            }`}
          >
            About Us
          </button>
        </nav>
      )}
    </header>
  );
}