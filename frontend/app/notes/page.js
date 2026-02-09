"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import NoteCard from "@/components/NoteCard";
import SearchBar from "@/components/SearchBar";
import TagFilter from "@/components/TagFilter";
import SortDropdown from "@/components/SortDropdown";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getNotes, deleteNote, updateNote } from "@/services/api";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

function NotesContent() {
    const router = useRouter();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortBy, setSortBy] = useState("updated");

    useEffect(() => {
        fetchNotes();
    }, [sortBy]);

    const fetchNotes = async () => {
        setLoading(true);
        const data = await getNotes(sortBy);
        setNotes(data);
        setLoading(false);
    };

    const allTags = useMemo(() => {
        const tagSet = new Set();
        notes.forEach((note) => {
            note.tags?.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, [notes]);

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesSearch =
                !searchQuery ||
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.content?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = !selectedTag || note.tags?.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [notes, searchQuery, selectedTag]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this note?")) return;
        const success = await deleteNote(id);
        if (success) {
            setNotes((prev) => prev.filter((note) => note._id !== id));
        }
    };

    const handleEdit = (note) => {
        router.push(`/notes/${note._id}/edit`);
    };

    const handleToggleFavorite = async (id, favorite) => {
        const result = await updateNote(id, { favorite });
        if (result) {
            setNotes((prev) =>
                prev.map((note) => (note._id === id ? { ...note, favorite } : note))
            );
        }
    };

    return (
        <Container>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                    Notes
                </h1>
                <Link
                    href="/notes/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm"
                    style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
                >
                    <Plus className="w-4 h-4" />
                    Add Note
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search notes..." />
                </div>
                <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {allTags.length > 0 && (
                <div className="mb-6">
                    <TagFilter tags={allTags} selectedTag={selectedTag} onSelect={setSelectedTag} />
                </div>
            )}

            {loading ? (
                <div className="text-center py-12" style={{ color: 'var(--muted)' }}>Loading...</div>
            ) : filteredNotes.length === 0 ? (
                <EmptyState
                    icon={FileText}
                    title={searchQuery || selectedTag ? "No matching notes" : "No notes yet"}
                    description={searchQuery || selectedTag ? "Try adjusting your search." : "Click 'Add Note' to create your first note."}
                />
            ) : (
                <div className="flex flex-col gap-3">
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
}

export default function NotesPage() {
    return (
        <ProtectedRoute>
            <NotesContent />
        </ProtectedRoute>
    );
}
