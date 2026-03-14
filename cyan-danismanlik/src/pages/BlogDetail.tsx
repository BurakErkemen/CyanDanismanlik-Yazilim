import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, type BlogPost } from "../lib/blogService";
import MDEditor from "@uiw/react-md-editor";
import SEO from "../components/SEO";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      const data = await getPostBySlug(slug);
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <p className="text-white text-xl font-bold">Yazı bulunamadı.</p>
        <Link
          to="/blog"
          className="text-sm font-medium px-5 py-2 rounded-lg text-black"
          style={{ backgroundColor: "#06b6d4" }}
        >
          Blog'a Dön
        </Link>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>
      <SEO
        title={post.title}
        description={post.summary}
        url={`https://cyandanismanlik.com/blog/${post.slug}`}
        image={post.coverImage || undefined}
        type="article"
      />
      {/* Kapak */}
      {post.coverImage && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}

      {/* İçerik */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Geri Dön */}
        <Link
          to="/blog"
          className="text-sm text-gray-400 hover:text-white transition mb-8 inline-flex items-center gap-2"
        >
          ← Blog'a Dön
        </Link>

        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-white/10">
          <span>
            {post.date?.toDate().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{post.authorEmail}</span>
        </div>

        {/* İçerik */}
        <div data-color-mode="dark">
          <MDEditor.Markdown
            source={post.content}
            style={{ backgroundColor: "transparent", color: "#d1d5db" }}
          />
        </div>
      </article>
    </main>
  );
}