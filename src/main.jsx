// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./layouts/header";
import BlogBody from "./homeBlog";
import DefenseCalculator from "./calculator";
import SSBStories from "./ssbStories";
import MocksAndPYQs from "./mocks";
import AboutUs from "./about";
import TestS from "./TestS";
import "./styles/index.css";

function App() {
  const [currentView, setCurrentView] = useState("home");

  // Dynamic document title update for SEO based on the active view
  useEffect(() => {
    const titles = {
      home: "DefenceRoger | UPSC NDA, CDS, AFCAT Preparation Blogs & SSB Tips",
      "ssb-stories":
        "SSB Recommended Success Stories | Services Selection Board Achievers",
      mocks: "Download UPSC NDA, CDS, AFCAT PYQs & Practice Mock Test PDFs",
      calculator:
        "Defence Eligibility Calculator | Check Age Limits & Attempt Limits",
      about: "About Us | Meet the Creators of DefenceRoger",
      "Test Series": "Test Series | NDA, CDS & AFCAT Mock Tests Coming Soon",
    };

    document.title =
      titles[currentView] || "DefenceRoger | Defence Eligibility & Resources";

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    const descriptions = {
      home: "Prepare for NDA, CDS, AFCAT, CAPF and other Indian Defence exams with DefenceRoger. Get free mock tests, previous year papers (PYQs), SSB interview guidance, defence eligibility calculator, exam syllabus, preparation tips, study resources, and the latest defence exam updates.",
      "ssb-stories":
        "Read 10+ inspiring, recommended stories of candidates who cleared various SSBs for Army, Navy, and Air Force.",
      mocks:
        "Access high-quality previous year question papers (PYQs) and sample mock test PDFs for NDA, CDS, and AFCAT with download instructions.",
      calculator:
        "Check your eligibility for Indian Armed Forces entries. Calculate your attempts left for NDA, CDS, AFCAT, TES, TGC, and more.",
      about:
        "Learn about the mission of DefenceRoger, contact details for business queries, and who built this defence eligibility portal.",
      "Test Series":
        "Practice with high-quality NDA, CDS and AFCAT mock tests featuring detailed solutions, analytics and topic-wise practice. Coming Soon.",
    };

    metaDescription.content =
      descriptions[currentView] ||
      "Defence eligibility and resource portal for NDA, CDS, AFCAT, and SSB prep.";
  }, [currentView]);

  const renderBody = () => {
    switch (currentView) {
      case "home":
        return <BlogBody />;
      case "calculator":
        return <DefenseCalculator />;
      case "ssb-stories":
        return <SSBStories />;
      case "mocks":
        return <MocksAndPYQs />;
      case "about":
        return <AboutUs />;
      case "Test Series":
        return <TestS />;
      default:
        return <BlogBody />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Header currentView={currentView} setCurrentView={setCurrentView} />

        <main className="container mx-auto px-4 py-8">{renderBody()}</main>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="text-white font-bold text-base mb-3">
              DefenceRoger
            </h4>
            <p className="text-slate-400 font-light leading-relaxed">
              Your comprehensive platform for defence exam eligibility, previous
              year question banks, and SSB interview success stories.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">
              Quick Navigation
            </h4>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView("home")}
                  className="hover:text-white transition-colors"
                >
                  Blogs & Preparation Guides
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentView("calculator")}
                  className="hover:text-white transition-colors"
                >
                  Eligibility Calculator
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentView("ssb-stories")}
                  className="hover:text-white transition-colors"
                >
                  Recommended SSB Stories
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentView("mocks")}
                  className="hover:text-white transition-colors"
                >
                  PYQs & Mock PDFs
                </button>
              </li>

              <li>
                <button
                  onClick={() => setCurrentView("Test Series")}
                  className="hover:text-white transition-colors"
                >
                  Test Series
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-3">
              SEO Keywords & Tags
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {[
                "NDA 2026",
                "CDS 2026",
                "AFCAT Exam",
                "SSB Interview",
                "UPSC Written Test",
                "Officer Like Qualities",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 mt-4">
              © {new Date().getFullYear()} DefenceRoger. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
