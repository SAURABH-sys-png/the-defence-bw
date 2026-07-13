import { useParams } from "react-router-dom";
import blogs from "./blogs";

function normalizeContentBlocks(blog) {
  if (Array.isArray(blog?.content) && blog.content.length > 0) {
    return blog.content;
  }

  if (Array.isArray(blog?.blocks) && blog.blocks.length > 0) {
    return blog.blocks;
  }

  const rawText = blog?.data || "";
  const paragraphs = rawText
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  return paragraphs.map((text) => ({ type: "paragraph", text }));
}

function renderContentBlock(block, index) {
  const content = block?.text || block?.content || block?.body || block?.value || "";

  switch (block?.type) {
    case "heading":
      return (
        <h2 key={index} className="mt-8 text-2xl font-semibold tracking-tight text-slate-900">
          {content}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="mt-6 border-l-4 border-indigo-500 bg-indigo-50/70 px-4 py-3 text-sm italic text-slate-700 md:text-base"
        >
          “{content}”
        </blockquote>
      );
    case "image":
      return (
        <figure key={index} className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img
            src={block.src || block.url || block.image}
            alt={block.alt || "Blog illustration"}
            className="h-auto w-full object-cover"
          />
          {block.caption ? (
            <figcaption className="px-4 py-3 text-sm text-slate-500">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "list":
      return (
        <ul key={index} className="mt-6 list-disc space-y-2 pl-6 text-sm leading-7 text-slate-700 md:text-base">
          {(Array.isArray(content) ? content : []).map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    case "paragraph":
    default:
      return (
        <p key={index} className="mt-5 text-sm leading-8 text-slate-700 md:text-base">
          {content}
        </p>
      );
  }
}

function BlogPage() {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Blog not found</h1>
        <p className="mt-2 text-sm text-slate-500">The article you requested could not be found.</p>
      </div>
    );
  }

  const contentBlocks = normalizeContentBlocks(blog);
  const heroImage = blog.coverImage || blog.image || blog.heroImage;

  return (
    <article className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:p-10">
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

      {heroImage ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img src={heroImage} alt={blog.title} className="h-72 w-full object-cover md:h-80" />
        </div>
      ) : null}

      <div className="mt-8 space-y-2">
        {contentBlocks.map((block, index) => renderContentBlock(block, index))}
      </div>
    </article>
  );
}

export default BlogPage;