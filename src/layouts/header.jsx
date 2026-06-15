import React from "react";

export function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wider text-indigo-400">
          MyBrand
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
