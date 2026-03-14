import { useState, useEffect } from "react";
import { type BlogPost, getAllPosts, createPost, updatePost, deletePost, generateSlug } from "../lib/blogService";
import { auth } from "../lib/firebase";
import { uploadImage } from "../lib/cloudinaryService";
import { Timestamp } from "firebase/firestore";
import MDEditor from "@uiw/react-md-editor";

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "edit">("list");
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const emptyPost: BlogPost = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    coverImage: "",
    date: Timestamp.now(),
    published: false,
    authorEmail: auth.currentUser?.email || "",
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  }

  function handleNew() {
    setEditPost({ ...emptyPost });
    setImageFile(null);
    setImagePreview("");
    setView("edit");
  }

  function handleEdit(post: BlogPost) {
    setEditPost({ ...post });
    setImagePreview(post.coverImage || "");
    setImageFile(null);
    setView("edit");
  }

  function handleCancel() {
    setEditPost(null);
    setImageFile(null);
    setImagePreview("");
    setView("list");
  }

  function handleTitleChange(title: string) {
    if (!editPost) return;
    setEditPost({
      ...editPost,
      title,
      slug: editPost.id ? editPost.slug : generateSlug(title),
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!editPost) return;
    if (!editPost.title || !editPost.content) {
      alert("Başlık ve içerik zorunludur.");
      return;
    }
    setSaving(true);
    try {
      let coverImage = editPost.coverImage || "";

      if (imageFile) {
        coverImage = await uploadImage(imageFile);
      }

      const postData: Omit<BlogPost, "id"> = {
        title: editPost.title,
        slug: editPost.slug || generateSlug(editPost.title),
        summary: editPost.summary,
        content: editPost.content,
        coverImage,
        date: editPost.date || Timestamp.now(),
        published: editPost.published,
        authorEmail: auth.currentUser?.email || "",
      };

      if (editPost.id) {
        await updatePost(editPost.id, postData);
      } else {
        await createPost(postData);
      }

      await fetchPosts();
      handleCancel();
    } catch (err) {
      alert("Kayıt sırasında hata oluştu.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    await deletePost(id);
    await fetchPosts();
  }

  async function handleTogglePublish(post: BlogPost) {
    if (!post.id) return;
    await updatePost(post.id, { published: !post.published });
    await fetchPosts();
  }

  if (view === "edit" && editPost) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {editPost.id ? "Yazıyı Düzenle" : "Yeni Yazı"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition"
          >
            Geri Dön
          </button>
        </div>

        <div className="space-y-4">
          {/* Başlık */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Başlık</label>
            <input
              type="text"
              value={editPost.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Yazı başlığı"
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Slug (URL)</label>
            <input
              type="text"
              value={editPost.slug}
              onChange={(e) => setEditPost({ ...editPost, slug: e.target.value })}
              placeholder="yazi-basligi"
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          </div>

          {/* Özet */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Özet</label>
            <textarea
              value={editPost.summary}
              onChange={(e) => setEditPost({ ...editPost, summary: e.target.value })}
              placeholder="Kısa özet (liste sayfasında görünür)"
              rows={3}
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-500"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          </div>

          {/* Kapak Görseli */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Kapak Görseli</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:text-black file:cursor-pointer"
              style={{ fileBackgroundColor: "#06b6d4" } as React.CSSProperties}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Önizleme"
                className="mt-3 h-40 w-full object-cover rounded-lg border border-white/10"
              />
            )}
          </div>

          {/* İçerik */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">İçerik</label>
          <div data-color-mode="dark">
            <MDEditor
              value={editPost.content}
              onChange={(val: string | undefined) => setEditPost({ ...editPost, content: val || "" })}
              height={300}
              preview="edit"
            />
            </div>
          </div>

          {/* Yayın Durumu */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={editPost.published}
              onChange={(e) => setEditPost({ ...editPost, published: e.target.checked })}
              className="w-4 h-4 accent-cyan-500"
            />
            <label htmlFor="published" className="text-sm text-gray-400">
              Yayınla
            </label>
          </div>

          {/* Kaydet */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full font-semibold py-3 rounded-lg transition text-black disabled:opacity-50"
            style={{ backgroundColor: "#06b6d4" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Blog Yazıları</h2>
        <button
          onClick={handleNew}
          className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm"
          style={{ backgroundColor: "#06b6d4" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0891b2")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#06b6d4")}
        >
          + Yeni Yazı
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : posts.length === 0 ? (
        <div
          className="rounded-xl p-12 border border-white/10 text-center"
          style={{ backgroundColor: "#111111" }}
        >
          <p className="text-gray-400 mb-4">Henüz blog yazısı yok.</p>
          <button
            onClick={handleNew}
            className="font-semibold px-5 py-2 rounded-lg transition text-black text-sm"
            style={{ backgroundColor: "#06b6d4" }}
          >
            İlk Yazıyı Ekle
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl p-5 border border-white/10 flex justify-between items-center gap-4"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                    style={{
                      backgroundColor: post.published ? "#06b6d420" : "#ffffff10",
                      color: post.published ? "#06b6d4" : "#9ca3af",
                    }}
                  >
                    {post.published ? "Yayında" : "Taslak"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate">{post.summary}</p>
                <p className="text-gray-600 text-xs mt-1">/blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleTogglePublish(post)}
                  className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition"
                >
                  {post.published ? "Yayından Al" : "Yayınla"}
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => post.id && handleDelete(post.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 px-3 py-1.5 rounded-lg transition"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}