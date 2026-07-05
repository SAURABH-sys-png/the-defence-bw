import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogsData from "./blogs";
import { slugify } from "./utils/slugify";

export default function BlogBody() {
  const [blogItems, setBlogItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  //const [activeBlog, setActiveBlog] = useState(null); // Detail modal

  const navigate = useNavigate();

  useEffect(() => {
    const sorted = [...blogsData].sort((a, b) => {
      return new Date(b.date || b.datetime) - new Date(a.date || a.datetime);
    });

    setBlogItems(sorted);
    setLoading(false);
  }, []);

  const categories = ["All", "NDA", "CDS", "AFCAT", "SSB", "General"];

  // Filter logic
  const filteredBlogs = blogItems.filter((blog) => {
    const matchesSearch =
      (blog.title &&
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.data && blog.data.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      (blog.category &&
        blog.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
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
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-600/15 rounded-full blur-2xl"></div>

        <span className="relative text-[10px] md:text-xs uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3.5 py-1 rounded-full font-bold border border-indigo-500/30">
          NDA • CDS • AFCAT • SSB • Defence Exam Preparation
        </span>

        <h1 className="relative text-3xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight max-w-3xl mx-auto">
          NDA, CDS & AFCAT{" "}
          <span className="text-indigo-400">Preparation Hub</span>
        </h1>

        <p className="relative text-slate-300 max-w-xl mx-auto mt-3 text-sm md:text-base font-light">
          Prepare for NDA, CDS, AFCAT and SSB Interviews with free study
          material, previous year question papers (PYQs), mock tests,
          eligibility guides, exam syllabus, preparation strategy, fitness tips,
          current affairs and the latest Indian Army, Navy & Air Force exam
          updates.
        </p>
      </div>

      {/* Top Banner Ad Placeholder */}
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 mb-8 text-center text-slate-400 text-xs hover:bg-slate-100/50 transition-colors">
        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded mr-2 uppercase text-[10px] font-bold">
          Sponsored Ad
        </span>
        Get 30% Off NDA 2026 crash courses!{" "}
        <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
          Join Classroom Batch &rarr;
        </span>
      </div>

      {/* Controls: Search + Categories */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search Input */}
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
            placeholder="Search articles by keywords (e.g., math, screening)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
        </div>

        {/* Categories list */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-400 font-semibold uppercase mr-1">
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Blogs grid + Sidebar Ads */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Blogs column (Col-span 3) */}
        <div className="lg:col-span-3 space-y-6">
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
              <div className="text-slate-400 text-5xl mb-3">📰</div>
              <h3 className="font-bold text-slate-700 text-lg">
                No Articles Found
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Try another search keyword or filter tab.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.__filepath || index}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-indigo-100">
                        {blog.category || "General"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {blog.readTime || "5 min read"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {blog.title || blog.event || "No Title"}
                    </h3>

                    <p className="text-slate-600 text-xs md:text-sm line-clamp-3 leading-relaxed">
                      {blog.data}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-[10px] text-slate-400 font-medium">
                      By {blog.author || "Editorial"} •{" "}
                      {new Date(
                        blog.date || blog.datetime,
                      ).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/blogs/${blog.slug || slugify(blog.title)}`)
                      }
                      className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Read Full →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ad section under blogs list */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div>
              <span className="bg-indigo-100 text-indigo-700 text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                Ad Campaign
              </span>
              <h4 className="font-bold text-slate-800 text-sm md:text-base mt-1">
                Get SSB Medical Assessment Mock Checkup
              </h4>
              <p className="text-slate-500 text-xs">
                Verify your dental points, knock knees & visual standards with
                professionals.
              </p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg text-xs transition duration-200 shadow-sm shrink-0">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Sidebar Ads column (Col-span 1) */}
        <div className="space-y-6">
          {/* Ad Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
              Ad Spot
            </span>
            <div className="aspect-square bg-slate-50 rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">
                  Best NDA Mock Test Series
                </h4>
                <p className="text-slate-500 text-[11px] mt-1 font-light leading-relaxed">
                  25 full tests for Math & GAT matching standard UPSC patterns.
                  Detail solutions included.
                </p>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition duration-200 mt-4 shadow-sm text-center">
                Start Test Series
              </button>
            </div>
          </div>

          {/* Ad Card 2 (Newsletter placeholder/Subscribe) */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
              Newsletter
            </span>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">
                Weekly Defence Updates
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Join 10k+ defence aspirants receiving study guides and SSB dates
                directly in their inbox.
              </p>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg text-xs transition-colors">
                Subscribe Free
              </button>
            </div>
          </div>

          {/* Ad Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
              Ad Spot
            </span>
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 rounded-xl text-center space-y-2 border border-indigo-950">
              <span className="text-2xl">🏆</span>
              <h5 className="font-bold text-xs">AFCAT Online Live Lectures</h5>
              <p className="text-slate-300 text-[10px] font-light leading-relaxed">
                Daily mock analysis & reasoning masterclasses.
              </p>
              <span className="text-[10px] text-indigo-300 font-bold block mt-2 cursor-pointer hover:underline">
                Register For Free Demo &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
