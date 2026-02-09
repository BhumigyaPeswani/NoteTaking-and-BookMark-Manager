"use client";

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
    return (
        <div className="relative">
            <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--muted)' }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                }}
            />
        </div>
    );
}
