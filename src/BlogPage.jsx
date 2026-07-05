import { useParams } from "react-router-dom";
import blogs from "./blogs";

function BlogPage() {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Blog not found</h1>
        <p className="mt-2 text-sm text-slate-500">The article you requested could not be found.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700">
          {blog.category || "General"}
        </span>
        <span>{new Date(blog.date || blog.datetime).toLocaleDateString()}</span>
        <span>•</span>
        <span>{blog.readTime || "5 min read"}</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {blog.title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">By {blog.author || "DefenceRoger Editorial"}</p>

      <div className="prose prose-slate mt-8 max-w-none whitespace-pre-line text-sm leading-7 text-slate-700 md:text-base">
        {blog.data}
      </div>
    </article>
  );
}

export default BlogPage;