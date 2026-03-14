import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts, type BlogPost } from "../lib/blogService";
import SEO from "../components/SEO";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPublishedPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <main style={{ backgroundColor: "#0a0a0a" }}>
    <SEO
      title="Blog"
      description="KOSGEB, yazılım ve dijital dönüşüm hakkında güncel yazılar ve makaleler."
      url="https://cyandanismanlik.com/blog"
      />
      
      {/* Hero */}
      <section className="py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm font-medium mb-4 tracking-widest uppercase"
            style={{ color: "#06b6d4" }}
          >
            Blog
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Yazılar & Makaleler
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            KOSGEB, yazılım ve dijital dönüşüm hakkında güncel yazılar.
          </p>
        </div>
      </section>

      {/* Yazılar */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Yükleniyor...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Henüz yazı yayınlanmadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="rounded-xl border border-white/10 hover:border-cyan-500/50 transition group overflow-hidden"
                  style={{ backgroundColor: "#111111" }}
                >
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div
                      className="w-8 h-0.5 mb-4 transition-all group-hover:w-12"
                      style={{ backgroundColor: "#06b6d4" }}
                    />
                    <h2 className="text-white font-semibold text-base mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                    <p className="text-gray-600 text-xs mt-4">
                      {post.date?.toDate().toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}