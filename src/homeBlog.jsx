import React from "react";
import { useEffect, useState } from "react";

export default function BlogBody() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAndSort() {
      // Use eager: true to import JSON files synchronously
      const BlogsFiles = import.meta.glob("./blogs/*.json", { eager: true });
      const BlogsArrayObj = Object.keys(BlogsFiles).map((filepath) => {
        const content = BlogsFiles[filepath].default || BlogsFiles[filepath];
        return {
            __filepath : filepath,
            ...content
        };
      });
      BlogsArrayObj.sort((a,b) => {
        const dateA = a.date || a.datetime;
        const dateB = b.date || b.datetime;
        return new Date(dateB) - new Date(dateA);
      });
      setBlogs(BlogsArrayObj);
      setLoading(false);
    }
    loadAndSort();
  },[]);

  if (loading) {
    return <div className="text-gray-500 p-4">Loading configurations...</div>;
  }
  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Sorted JSON Documents</h2>
      
      {blogs.map((item, index) => (
        <div 
          key={item.__filepath || index} 
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-600">{item.title || item.event || "No Title"}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
              Date: {item.date || item.datetime || "No Date"}
            </span>
          </div>
          <p className="text-gray-700 text-sm">{item.data}</p>
          <div className="mt-3 text-right text-xs text-gray-400">
            Published: {new Date(item.date || item.datetime).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
