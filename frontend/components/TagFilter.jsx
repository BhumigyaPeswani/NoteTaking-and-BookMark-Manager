"use client";

export default function TagFilter({ tags, selectedTag, onSelect }) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onSelect(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                    backgroundColor: !selectedTag ? 'var(--accent)' : 'var(--surface)',
                    color: !selectedTag ? '#FFFFFF' : 'var(--muted)',
                    border: !selectedTag ? 'none' : '1px solid var(--border)',
                }}
            >
                All
            </button>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onSelect(tag)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                    style={{
                        backgroundColor: selectedTag === tag ? 'var(--accent)' : 'var(--surface)',
                        color: selectedTag === tag ? '#FFFFFF' : 'var(--muted)',
                        border: selectedTag === tag ? 'none' : '1px solid var(--border)',
                    }}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
