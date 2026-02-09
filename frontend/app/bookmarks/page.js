"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import BookmarkCard from "@/components/BookmarkCard";
import SearchBar from "@/components/SearchBar";
import TagFilter from "@/components/TagFilter";
import SortDropdown from "@/components/SortDropdown";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getBookmarks, deleteBookmark, updateBookmark } from "@/services/api";
import { Bookmark, Plus } from "lucide-react";
import Link from "next/link";

function BookmarksContent() {
    const router = useRouter();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortBy, setSortBy] = useState("updated");

    useEffect(() => {
        fetchBookmarks();
    }, [sortBy]);

    const fetchBookmarks = async () => {
        setLoading(true);
        const data = await getBookmarks(sortBy);
        setBookmarks(data);
        setLoading(false);
    };

    const allTags = useMemo(() => {
        const tagSet = new Set();
        bookmarks.forEach((bookmark) => {
            bookmark.tags?.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, [bookmarks]);

    const filteredBookmarks = useMemo(() => {
        return bookmarks.filter((bookmark) => {
            const matchesSearch =
                !searchQuery ||
                bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bookmark.url?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = !selectedTag || bookmark.tags?.includes(selectedTag);

            return matchesSearch && matchesTag;
        });
    }, [bookmarks, searchQuery, selectedTag]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this bookmark?")) return;
        const success = await deleteBookmark(id);
        if (success) {
            setBookmarks((prev) => prev.filter((b) => b._id !== id));
        }
    };

    const handleEdit = (bookmark) => {
        router.push(`/bookmarks/${bookmark._id}/edit`);
    };

    const handleToggleFavorite = async (id, favorite) => {
        const result = await updateBookmark(id, { favorite });
        if (result) {
            setBookmarks((prev) =>
                prev.map((b) => (b._id === id ? { ...b, favorite } : b))
            );
        }
    };

    return (
        <Container>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                    Bookmarks
                </h1>
                <Link
                    href="/bookmarks/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm"
                    style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
                >
                    <Plus className="w-4 h-4" />
                    Add Bookmark
                </Link>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search bookmarks..." />
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
            ) : filteredBookmarks.length === 0 ? (
                <EmptyState
                    icon={Bookmark}
                    title={searchQuery || selectedTag ? "No matching bookmarks" : "No bookmarks yet"}
                    description={searchQuery || selectedTag ? "Try adjusting your search." : "Click 'Add Bookmark' to save your first link."}
                />
            ) : (
                <div className="flex flex-col gap-3">
                    {filteredBookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark._id}
                            bookmark={bookmark}
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

export default function BookmarksPage() {
    return (
        <ProtectedRoute>
            <BookmarksContent />
        </ProtectedRoute>
    );
}
