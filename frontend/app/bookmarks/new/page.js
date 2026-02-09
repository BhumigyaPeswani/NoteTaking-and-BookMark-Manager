"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import ProtectedRoute from "@/components/ProtectedRoute";
import { createBookmark } from "@/services/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

function NewBookmarkContent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ url: "", title: "", description: "", tags: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.url.trim()) return;

        setLoading(true);
        const result = await createBookmark({
            url: formData.url.trim(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        });
        setLoading(false);
        if (result) router.push("/bookmarks");
    };

    return (
        <Container>
            <div className="mb-6">
                <Link href="/bookmarks" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                    <ArrowLeft className="w-4 h-4" />Back to Bookmarks
                </Link>
            </div>

            <h1 className="text-xl font-semibold mb-8" style={{ color: 'var(--foreground)' }}>New Bookmark</h1>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                        URL <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input type="url" id="url" name="url" value={formData.url} onChange={handleChange} placeholder="https://example.com" required
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm resize-none" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Tags</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <button type="submit" disabled={loading || !formData.url.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}>
                    <Save className="w-4 h-4" />{loading ? "Saving..." : "Save Bookmark"}
                </button>
            </form>
        </Container>
    );
}

export default function NewBookmarkPage() {
    return <ProtectedRoute><NewBookmarkContent /></ProtectedRoute>;
}
