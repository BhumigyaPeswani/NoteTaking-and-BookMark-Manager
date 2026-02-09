"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import ProtectedRoute from "@/components/ProtectedRoute";
import { createNote } from "@/services/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

function NewNoteContent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setLoading(true);
        const noteData = {
            title: formData.title.trim(),
            content: formData.content.trim(),
            tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        };

        const result = await createNote(noteData);
        setLoading(false);

        if (result) {
            router.push("/notes");
        }
    };

    return (
        <Container>
            <div className="mb-6">
                <Link href="/notes" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                    <ArrowLeft className="w-4 h-4" />
                    Back to Notes
                </Link>
            </div>

            <h1 className="text-xl font-semibold mb-8" style={{ color: 'var(--foreground)' }}>New Note</h1>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                        Title <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter note title..." required
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Content</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} placeholder="Write your note..." rows={6}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm resize-none" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Tags</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="work, personal (comma separated)"
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
                </div>

                <button type="submit" disabled={loading || !formData.title.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}>
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Note"}
                </button>
            </form>
        </Container>
    );
}

export default function NewNotePage() {
    return (
        <ProtectedRoute>
            <NewNoteContent />
        </ProtectedRoute>
    );
}
