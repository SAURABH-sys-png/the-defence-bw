import React, { useState } from "react";
import downloadsData from "./data/downloads.json";

export default function MocksAndPYQs() {
  const [downloads, setDownloads] = useState(downloadsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All"); // All, pyq, mock
  const [showGuide, setShowGuide] = useState(false);

  const exams = ["All", "NDA", "CDS", "AFCAT"];

  // Filter logic
  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExam =
      selectedExam === "All" ||
      item.exam.toUpperCase() === selectedExam.toUpperCase();
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesExam && matchesCategory;
  });

  const handleDownload = (item) => {
    const link = document.createElement("a");
    link.href = item.pdfUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans">
      {/* Title section */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-bold border border-indigo-100">
          Resource Center
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
          PYQs & <span className="text-indigo-600">Mock Tests</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto mt-2 text-sm md:text-base font-light">
          Boost your NDA, CDS, and AFCAT exam preparation by downloading
          official previous year question papers and expert mock tests.
        </p>
      </div>

      {/* Ads Banner Placeholder */}
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 mb-8 text-center text-slate-400 text-xs hover:bg-slate-100/50 transition-colors">
        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded mr-2 uppercase text-[10px] font-bold">
          Sponsored Ad
        </span>
        Unlock Premium NDA & CDS Test Series with video solutions.{" "}
        <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
          Use Code 'DEFENCE10' &rarr;
        </span>
      </div>

      {/* Main Grid: Controls + Content + Sidebar Ads */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Side: Controls & Downloads (Col-Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search papers, mocks, years..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                />
              </div>

              {/* Type Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200/40">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    selectedCategory === "All"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setSelectedCategory("pyq")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    selectedCategory === "pyq"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  PYQs
                </button>
                <button
                  onClick={() => setSelectedCategory("mock")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    selectedCategory === "mock"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  Mock Tests
                </button>
              </div>
            </div>

            {/* Exam Filter tabs */}
            <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-slate-50">
              <span className="text-xs text-slate-400 font-medium mr-1 uppercase">
                Filter Exam:
              </span>
              {exams.map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    selectedExam === exam
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

          {/* Downloads Card list */}
          {filteredDownloads.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm">
              <div className="text-slate-400 text-5xl mb-3">📁</div>
              <h3 className="font-bold text-slate-700 text-lg">
                No Papers Available
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                We couldn't find matches for your search/filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredDownloads.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon based on category */}
                    <div
                      className={`p-3 rounded-xl ${
                        item.category === "pyq"
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {item.category === "pyq" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            item.category === "pyq"
                              ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                              : "bg-emerald-50 text-emerald-700 border-emerald-100"
                          }`}
                        >
                          {item.category === "pyq"
                            ? "Official PYQ"
                            : "Practice Mock"}
                        </span>
                        <span className="text-[10px] bg-slate-50 text-slate-500 font-bold px-2 py-0.5 rounded border border-slate-200">
                          {item.exam}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base md:text-lg hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-3 md:pt-0 border-t border-slate-50 md:border-0">
                    <span className="text-xs text-slate-400 font-semibold uppercase">
                      {item.size}
                    </span>
                    <button
                      onClick={() => handleDownload(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg text-xs transition duration-200 shadow-sm flex items-center gap-1.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inline Ad Section within Content Area */}
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-indigo-800/20 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
            <div className="space-y-1 z-10 text-center sm:text-left">
              <span className="bg-indigo-500/20 border border-indigo-400/20 text-indigo-300 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                Ad Promotion
              </span>
              <h4 className="font-bold text-base md:text-lg">
                Premium SSB Interview Masterclass
              </h4>
              <p className="text-indigo-200 text-xs font-light">
                Interactive classes, live OIR/PPDT sessions and mock interview
                loops with assessors.
              </p>
            </div>
            <button className="bg-white hover:bg-indigo-50 text-indigo-950 font-bold py-2 px-5 rounded-lg text-xs transition duration-200 shadow-sm shrink-0 z-10">
              Apply Now &rarr;
            </button>
          </div>
        </div>

        {/* Right Side: Sidebar & Admin PDF Uploader Guide (Col-Span 1) */}
        <div className="space-y-6">
          {/* PDF Uploader Guide Accordion */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full p-4 bg-slate-900 text-white flex justify-between items-center font-bold text-sm tracking-wide text-left"
            >
              <span>📁 Admin: Upload PDFs Guide</span>
              <span className="text-indigo-400">{showGuide ? "▲" : "▼"}</span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${showGuide ? "max-h-[800px] border-t border-slate-100" : "max-h-0 overflow-hidden"}`}
            >
              <div className="p-4 space-y-4 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                <p>
                  Follow these simple steps to add your PDF papers & mocks so
                  users can download them:
                </p>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="bg-indigo-100 text-indigo-700 font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      1
                    </span>
                    <p>
                      <strong>Move PDF file:</strong> Place your PDF file inside
                      the React application's <code>public/pdfs/pyq/</code> or{" "}
                      <code>public/pdfs/mocks/</code> folder.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span className="bg-indigo-100 text-indigo-700 font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      2
                    </span>
                    <p>
                      <strong>Open configuration:</strong> Open the config file{" "}
                      <a
                        href="file:///home/saurabh/gitrepos/the-defence-bw/src/data/downloads.json"
                        className="text-indigo-600 font-semibold hover:underline"
                      >
                        src/data/downloads.json
                      </a>
                      .
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span className="bg-indigo-100 text-indigo-700 font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      3
                    </span>
                    <p>
                      <strong>Add a new entry:</strong> Paste a new JSON entry
                      like this at the end:
                    </p>
                  </div>

                  <pre className="bg-slate-900 text-slate-200 p-2.5 rounded text-[10px] overflow-x-auto leading-tight">
                    {`{
  "id": "pyq-nda-2026-gat",
  "title": "NDA (I) 2026 GAT Paper",
  "category": "pyq",
  "exam": "NDA",
  "year": 2026,
  "size": "3.4 MB",
  "pdfUrl": "/pdfs/pyq/nda_i_2026_gat.pdf",
  "description": "Short description of GAT exam."
}`}
                  </pre>

                  <div className="flex gap-2">
                    <span className="bg-indigo-100 text-indigo-700 font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      4
                    </span>
                    <p>
                      <strong>Save changes:</strong> Save the config file. The
                      system automatically reads it, updates the search filters,
                      and displays the download option!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Ads Panel (1) */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
              Ad Spot
            </span>
            <div className="aspect-square bg-slate-100 rounded-xl flex flex-col justify-center items-center text-center p-4 border border-slate-200/50">
              <span className="text-3xl mb-2">🎯</span>
              <h5 className="font-bold text-slate-800 text-sm">
                CDS Written Online Course
              </h5>
              <p className="text-slate-500 text-[11px] mt-1 font-light leading-relaxed">
                Prepare for CDS Math, English & GK under former UPSC examiners.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-4 rounded-lg text-[10px] transition duration-200 mt-4 shadow-sm">
                Enroll Online
              </button>
            </div>
          </div>

          {/* Sidebar Ads Panel (2) */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
              Ad Spot
            </span>
            <div className="aspect-4/3 bg-linear-to-tr from-slate-900 to-indigo-950 rounded-xl flex flex-col justify-center items-center text-center p-4 border border-indigo-800/10 text-white">
              <h5 className="font-bold text-sm">
                NDA Mathematics Mock Test Series
              </h5>
              <p className="text-slate-300 text-[10px] mt-1 font-light">
                30 Mock tests aligned with UPSC pattern.
              </p>
              <button className="bg-white hover:bg-slate-100 text-indigo-950 font-extrabold py-1 px-3 rounded text-[10px] mt-3.5 shadow-sm">
                Get Series
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
