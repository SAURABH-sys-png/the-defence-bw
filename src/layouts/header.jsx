import React from "react";

// Destructure setCurrentView and currentView from props
export function Header({ currentView, setCurrentView }) {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo - clicking it returns home */}
        <h1 
          onClick={() => setCurrentView("home")}
          className="text-xl font-bold tracking-wider text-indigo-400 cursor-pointer"
        >
          DefenceRoger
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <button 
            onClick={() => setCurrentView("home")}
            className={`transition-colors font-medium ${
              currentView === "home" ? "text-indigo-400 font-bold" : "text-white hover:text-indigo-400"
            }`}
          >
            Home
          </button>

          <button 
            onClick={() => setCurrentView("ssb-stories")}
            className={`transition-colors font-medium ${
              currentView === "ssb-stories" ? "text-indigo-400 font-bold" : "text-white hover:text-indigo-400"
            }`}
          >
            SSB Stories
          </button>

          <button 
            onClick={() => setCurrentView("mocks")}
            className={`transition-colors font-medium ${
              currentView === "mocks" ? "text-indigo-400 font-bold" : "text-white hover:text-indigo-400"
            }`}
          >
            PYQ's & Mocks
          </button>

          {/* This now changes state instantly instead of looking for a raw file path */}
          <button 
            onClick={() => setCurrentView("calculator")}
            className={`transition-colors font-medium ${
              currentView === "calculator" ? "text-indigo-400 font-bold" : "text-white hover:text-indigo-400"
            }`}
          >
            Eligibility Calculator
          </button>

          <button 
            onClick={() => setCurrentView("about")}
            className={`transition-colors font-medium ${
              currentView === "about" ? "text-indigo-400 font-bold" : "text-white hover:text-indigo-400"
            }`}
          >
            About Us
          </button>
        </nav>
      </div>
    </header>
  );
}