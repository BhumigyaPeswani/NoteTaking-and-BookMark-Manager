"use client";

import { Trash2, Star } from "lucide-react";

export default function NoteCard({ note, onDelete }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div
            className="p-4 rounded-lg transition-colors"
            style={{ border: '1px solid var(--border)' }}
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-medium text-lg leading-tight">{note.title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                    {note.favorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                    <button
                        onClick={() => onDelete(note._id)}
                        className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        title="Delete note"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            {note.content && (
                <p className="text-sm text-muted line-clamp-2 mb-3">
                    {note.content}
                </p>
            )}

            <div className="flex items-center justify-between">
                {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {note.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: 'var(--border)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <span className="text-xs text-muted ml-auto">
                    {formatDate(note.createdAt)}
                </span>
            </div>
        </div>
    );
}
