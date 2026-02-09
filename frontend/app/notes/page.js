"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import NoteCard from "@/components/NoteCard";
import { getNotes, deleteNote } from "@/services/api";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        const success = await deleteNote(id);
        if (success) {
            setNotes((prev) => prev.filter((note) => note._id !== id));
        }
    };

    return (
        <Container>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">Notes</h1>
                <Link
                    href="/notes/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    style={{
                        backgroundColor: "var(--foreground)",
                        color: "var(--background)",
                    }}
                >
                    <Plus className="w-4 h-4" />
                    Add Note
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-12 text-muted">Loading notes...</div>
            ) : notes.length === 0 ? (
                <EmptyState
                    icon={FileText}
                    title="No notes yet"
                    description="Click 'Add Note' to create your first note."
                />
            ) : (
                <div className="grid gap-4">
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </Container>
    );
}
