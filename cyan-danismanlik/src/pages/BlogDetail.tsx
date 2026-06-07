import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, type BlogPost } from "@/lib/blogService";
import MDEditor from "@uiw/react-md-editor";
import SEO from "@/components/seo/SEO";
import { Container, PageLoader, buttonClass } from "@/components/ui";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const data = await getPostBySlug(slug);
        if (!data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Yazı yüklenemedi:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) return <PageLoader />;

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-white">Yazı bulunamadı.</p>
        <Link to="/blog" className={buttonClass("primary", "sm")}>
          Blog'a Dön
        </Link>
      </div>
    );
  }

  return (
    <main>
      <SEO
        title={post.title}
        description={post.summary}
        url={`https://cyandanismanlik.com/blog/${post.slug}`}
        image={post.coverImage || undefined}
        type="article"
      />

      {/* Cover */}
      {post.coverImage && (
        <div className="relative h-72 w-full overflow-hidden md:h-96">
          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </div>
      )}

      <article className={post.coverImage ? "-mt-20 relative" : ""}>
        <Container width="narrow" className="py-12">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-light"
          >
            ← Blog'a Dön
          </Link>

          <h1 className="mb-4 mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>

          <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-8 text-sm text-gray-500">
            <span>
              {post.date?.toDate().toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="text-brand/50">•</span>
            <span>{post.authorEmail}</span>
          </div>

          <div data-color-mode="dark" className="prose">
            <MDEditor.Markdown
              source={post.content}
              style={{ backgroundColor: "transparent", color: "#d1d5db" }}
            />
          </div>
        </Container>
      </article>
    </main>
  );
}
