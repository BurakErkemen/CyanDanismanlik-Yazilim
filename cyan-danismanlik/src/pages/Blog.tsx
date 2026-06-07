import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts, type BlogPost } from "@/lib/blogService";
import SEO from "@/components/seo/SEO";
import PageHero from "@/components/site/PageHero";
import { Section, Card, CardAccent, SkeletonCard, Reveal } from "@/components/ui";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPublishedPosts();
        setPosts(data);
      } catch (err) {
        console.error("Blog yazıları yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main>
      <SEO
        title="Blog"
        description="KOSGEB, yazılım ve dijital dönüşüm hakkında güncel yazılar ve makaleler."
        url="https://cyandanismanlik.com/blog"
      />

      <PageHero
        eyebrow="Blog"
        title="Yazılar & Makaleler"
        subtitle="KOSGEB, yazılım ve dijital dönüşüm hakkında güncel yazılar."
      />

      <Section>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="py-20 text-center text-gray-400">Henüz yazı yayınlanmadı.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 90}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <Card interactive className="h-full overflow-hidden">
                  {post.coverImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <CardAccent className="mb-4" />
                    <h2 className="mb-2 line-clamp-2 text-base font-semibold text-white transition group-hover:text-brand-light">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">{post.summary}</p>
                    <p className="mt-4 text-xs text-gray-600">
                      {post.date?.toDate().toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
