"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@/components/Container";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getNoteById, updateNote } from "@/services/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

function EditNoteContent() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ title: "", content: "", tags: "", favorite: false });

    useEffect(() => {
        fetchNote();
    }, [params.id]);

    const fetchNote = async () => {
        setLoading(true);
        const note = await getNoteById(params.id);
        if (note) {
            setFormData({
                title: note.title || "",
                content: note.content || "",
                tags: note.tags?.join(", ") || "",
                favorite: note.favorite || false,
            });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setSaving(true);
        const result = await updateNote(params.id, {
            title: formData.title.trim(),
            content: formData.content.trim(),
            tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
            favorite: formData.favorite,
        });
        setSaving(false);
        if (result) router.push("/notes");
    };

    if (loading) {
        return <Container><div className="text-center py-12" style={{ color: 'var(--muted)' }}>Loading...</div></Container>;
    }

    return (
        <Container>
            <div className="mb-6">
                <Link href="/notes" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                    <ArrowLeft className="w-4 h-4" />Back to Notes
                </Link>
            </div>

            <h1 className="text-xl font-semibold mb-8" style={{ color: 'var(--foreground)' }}>Edit Note</h1>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                        Title <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Content</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={6}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm resize-none" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Tags</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="favorite" name="favorite" checked={formData.favorite} onChange={handleChange} className="w-4 h-4" style={{ accentColor: 'var(--accent)' }} />
                    <label htmlFor="favorite" className="text-sm" style={{ color: 'var(--foreground)' }}>Mark as favorite</label>
                </div>

                <button type="submit" disabled={saving || !formData.title.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}>
                    <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </Container>
    );
}

export default function EditNotePage() {
    return <ProtectedRoute><EditNoteContent /></ProtectedRoute>;
}
