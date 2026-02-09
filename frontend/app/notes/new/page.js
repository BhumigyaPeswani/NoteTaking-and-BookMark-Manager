"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { createNote } from "@/services/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewNotePage() {
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
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag),
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
                <Link
                    href="/notes"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Notes
                </Link>
            </div>

            <h1 className="text-2xl font-medium mb-8">New Note</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter note title..."
                        required
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                        style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your note..."
                        rows={8}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none transition-colors"
                        style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-2">
                        Tags
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="work, personal, ideas (comma separated)"
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                        style={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !formData.title.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    style={{
                        backgroundColor: "var(--foreground)",
                        color: "var(--background)",
                    }}
                >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Note"}
                </button>
            </form>
        </Container>
    );
}
