import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "./utils/slugify";

export default function SSBStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAndSort() {
      // Use import.meta.glob eager true to sync import
      const StoriesFiles = import.meta.glob("./ssb_stories/*.json", { eager: true });
      const StoriesArray = Object.keys(StoriesFiles).map((filepath) => {
        const content = StoriesFiles[filepath].default || StoriesFiles[filepath];
        return {
          __filepath: filepath,
          ...content,
          slug: slugify(content.name || content.title || filepath),
        };
      });
      // Sort stories by date descending
      StoriesArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setStories(StoriesArray);
      setLoading(false);
    }
    loadAndSort();
  }, []);

  const entriesList = ["All", "NDA", "CDS", "AFCAT", "TES", "JAG", "NCC Special Entry"];

  // Filter logic
  const filteredStories = stories.filter((story) => {
    const matchesSearch = 
      story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.ssb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (story.summary && story.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEntry = selectedEntry === "All" || story.entry.toUpperCase() === selectedEntry.toUpperCase();
    
    return matchesSearch && matchesEntry;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Header section */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-bold border border-indigo-100">
          Hall of Fame
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
          Recommended <span className="text-indigo-600">SSB Stories</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto mt-2 text-sm md:text-base font-light">
          Real stories from candidates recommended by the Services Selection Board (SSB). Learn their strategies, mistakes, and mindsets.
        </p>
      </div>

      {/* Ads Banner Placeholder (Premium Card style) */}
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 mb-8 text-center text-slate-400 text-xs hover:bg-slate-100/50 transition-colors">
        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded mr-2 uppercase text-[10px] font-bold">Sponsored Ad</span>
        Targeted Defence Coaching programs & online resources. <span className="text-indigo-600 hover:underline cursor-pointer font-medium">Learn More &rarr;</span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by candidate name, SSB board..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-400 font-medium mr-1 uppercase">Filter Entry:</span>
          {entriesList.map((entry) => (
            <button
              key={entry}
              onClick={() => setSelectedEntry(entry)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                selectedEntry === entry
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
              }`}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm">
          <div className="text-slate-400 text-5xl mb-3">📭</div>
          <h3 className="font-bold text-slate-700 text-lg">No Stories Found</h3>
          <p className="text-slate-400 text-sm mt-1">Try broadening your search term or selection filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, idx) => (
            <div
              key={story.__filepath || idx}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-0.5"
            >
              {/* Badge Area */}
              <div className="px-5 pt-5 flex justify-between items-center">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-indigo-100">
                  {story.entry} Entry
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(story.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>

              {/* Title & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {story.name}
                  </h3>
                  <p className="text-xs text-indigo-500 font-medium mt-0.5">{story.ssb}</p>
                  <p className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded inline-block mt-2">
                    {story.recommendation}
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm mt-4 leading-relaxed line-clamp-3">
                    {story.summary || story.data}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400 italic">Read Success Journey</span>
                  <button
                    onClick={() => navigate(`/ssb-stories/${story.slug}`)}
                    className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Read Story &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
