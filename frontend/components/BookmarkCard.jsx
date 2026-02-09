"use client";

import { Trash2, Star, Pencil, ExternalLink } from "lucide-react";
import { getRelativeTime } from "@/utils/relativeTime";

export default function BookmarkCard({ bookmark, onDelete, onEdit, onToggleFavorite }) {
    const getDomain = (url) => {
        try {
            return new URL(url).hostname.replace("www.", "");
        } catch {
            return url;
        }
    };

    return (
        <article
            className="p-5 rounded-lg card-shadow"
            style={{
                backgroundColor: 'var(--surface)',
            }}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-1">
                <h3
                    className="font-medium"
                    style={{ color: 'var(--foreground)', fontSize: '1rem' }}
                >
                    {bookmark.title || getDomain(bookmark.url)}
                </h3>
                <div className="flex items-center gap-0.5 shrink-0">
                    <button
                        onClick={() => onToggleFavorite(bookmark._id, !bookmark.favorite)}
                        className="p-1.5 rounded-md"
                        title={bookmark.favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Star
                            className={`w-4 h-4 ${bookmark.favorite ? "fill-yellow-400" : ""}`}
                            style={{ color: bookmark.favorite ? '#FBBF24' : 'var(--muted)' }}
                        />
                    </button>
                    <button
                        onClick={() => onEdit(bookmark)}
                        className="p-1.5 rounded-md"
                        title="Edit bookmark"
                    >
                        <Pencil className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                    </button>
                    <button
                        onClick={() => onDelete(bookmark._id)}
                        className="p-1.5 rounded-md"
                        title="Delete bookmark"
                    >
                        <Trash2 className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                    </button>
                </div>
            </div>

            {/* Timestamp */}
            <p className="text-xs mb-2" style={{ color: 'var(--muted)', opacity: 0.8 }}>
                {getRelativeTime(bookmark.updatedAt, bookmark.createdAt)}
            </p>

            {/* URL */}
            <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm mb-2"
                style={{ color: 'var(--accent)' }}
            >
                <ExternalLink className="w-3 h-3" />
                {getDomain(bookmark.url)}
            </a>

            {/* Description */}
            {bookmark.description && (
                <p
                    className="text-sm line-clamp-2 mb-3"
                    style={{ color: 'var(--muted)', lineHeight: 1.6 }}
                >
                    {bookmark.description}
                </p>
            )}

            {/* Tags */}
            {bookmark.tags && bookmark.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {bookmark.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-md"
                            style={{
                                backgroundColor: 'var(--background)',
                                color: 'var(--muted)'
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
