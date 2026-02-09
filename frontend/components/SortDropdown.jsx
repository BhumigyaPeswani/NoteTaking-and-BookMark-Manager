"use client";

export default function SortDropdown({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 rounded-lg text-xs"
            style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
            }}
        >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
        </select>
    );
}
