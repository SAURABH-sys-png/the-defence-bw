import React from "react";

export default function TestS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950 flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-10 md:p-16 text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-500/20 border border-indigo-500/30 px-5 py-2 mb-6">
            <span className="text-indigo-300 font-semibold tracking-wide">
              🚀 Launching Soon
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Test Series
          </h1>

          <p className="mt-4 text-2xl font-semibold text-indigo-400">
            Coming Soon
          </p>

          <p className="mt-8 text-gray-300 text-lg leading-8 max-w-3xl mx-auto">
            We're building a comprehensive test series designed to help you
            prepare efficiently with high-quality questions, detailed
            explanations, performance analytics, topic-wise practice, and
            realistic mock exams. Whether you're revising concepts or testing
            your speed, this platform aims to provide everything you need in one
            place.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-white font-semibold text-lg">
                Full-Length Mocks
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Practice with exam-like tests curated to match the latest
                patterns.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-white font-semibold text-lg">
                Performance Analytics
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Track your strengths, weaknesses, accuracy, and improvement over
                time.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold text-lg">
                Topic-wise Practice
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Strengthen individual topics with carefully selected practice
                questions.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="inline-block rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 shadow-lg">
              <p className="text-white text-lg">
                Estimated Launch Price
              </p>
              <p className="text-5xl font-extrabold text-white mt-2">
                ₹499
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-gray-400">
              Stay tuned! New updates, launch announcements, and additional
              features will be revealed soon. We can't wait to bring this
              experience to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}