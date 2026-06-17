import React from "react";
import aboutShowcase from "./assets/about_showcase.png";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
        
        {/* Banner section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 py-12 px-6 text-center text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-300 via-slate-900 to-black"></div>
          <span className="relative text-xs uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full font-semibold border border-indigo-500/20">
            Who We Are
          </span>
          <h1 className="relative text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            About <span className="text-indigo-400">DefenceRoger</span>
          </h1>
          <p className="relative text-slate-300 max-w-xl mx-auto mt-2 text-sm md:text-base font-light">
            Empowering defence aspirants with eligibility intelligence, previous year question banks, and Services Selection Board (SSB) success stories.
          </p>
        </div>

        <div className="p-6 md:p-10 space-y-12">
          
          {/* Showcase Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Our Mission & Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                DefenceRoger was founded by a team of veterans, educators, and technology experts dedicated to simplifying the process of entering the Indian Armed Forces. The journey to NDA, CDS, AFCAT, and SSB is rigorous and requires both academic and mental preparation.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                We believe that every candidate, regardless of their background, deserves access to high-quality preparation guidance, mock materials, and transparent tools. Our smart eligibility engine helps aspirants instantly identify paths they qualify for, saving valuable preparation time.
              </p>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative group p-2 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-inner overflow-hidden max-w-sm md:max-w-full">
                <img 
                  src={aboutShowcase} 
                  alt="DefenceRoger Team Showcase" 
                  className="rounded-xl object-cover hover:scale-[1.02] transition-transform duration-300 w-full"
                />
                <div className="absolute inset-2 bg-gradient-to-t from-slate-950/20 to-transparent rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Feature Pillars */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 text-center mb-8">What We Stand For</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/50 hover:border-indigo-400 transition-colors">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-lg mb-3">✓</div>
                <h4 className="font-bold text-slate-800 mb-1">Authentic Resources</h4>
                <p className="text-slate-600 text-xs md:text-sm">We verify and source official question banks, syllabus details, and recommended stories from real achievers.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/50 hover:border-indigo-400 transition-colors">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-lg mb-3">⚙</div>
                <h4 className="font-bold text-slate-800 mb-1">Precision Calculators</h4>
                <p className="text-slate-600 text-xs md:text-sm">Our eligibility algorithm accounts for age windows, streams, certificates, and genders to yield precise attempt metrics.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/50 hover:border-indigo-400 transition-colors">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-lg mb-3">★</div>
                <h4 className="font-bold text-slate-800 mb-1">Inspirational Community</h4>
                <p className="text-slate-600 text-xs md:text-sm">Connecting aspiring candidates with the real journeys, failures, and methods of recommended cadets.</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Contact Section */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Get in Touch</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Have questions about your eligibility? Want to contribute your own SSB recommendation story? Or are you looking for partnership opportunities? Our support desk is here to assist you.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Business Email</p>
                    <a href="mailto:contact@defenceroger.com" className="text-indigo-600 font-semibold text-sm hover:underline">
                      contact@defenceroger.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Phone Support</p>
                    <a href="tel:+919876543210" className="text-slate-800 font-semibold text-sm hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
