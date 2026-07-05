import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { slugify } from "./utils/slugify";

export default function StoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStory() {
      const storiesFiles = import.meta.glob("./ssb_stories/*.json", { eager: true });
      const stories = Object.keys(storiesFiles).map((filepath) => {
        const content = storiesFiles[filepath].default || storiesFiles[filepath];
        return {
          __filepath: filepath,
          ...content,
          slug: slugify(content.name || content.title || filepath),
        };
      });

      const foundStory = stories.find((item) => item.slug === slug);
      setStory(foundStory || null);
      setLoading(false);
    }

    loadStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Story not found</h1>
        <p className="mt-2 text-sm text-slate-500">The story you requested could not be found.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        ← Back to stories
      </button>

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700">
          {story.entry} Entry
        </span>
        <span>{story.ssb}</span>
        <span>•</span>
        <span>{new Date(story.date).toLocaleDateString()}</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {story.name}
      </h1>
      <p className="mt-3 text-sm text-slate-500">{story.recommendation}</p>

      <div className="prose prose-slate mt-8 max-w-none whitespace-pre-line text-sm leading-7 text-slate-700 md:text-base">
        {story.data}
      </div>
    </article>
  );
}
