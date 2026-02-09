"use client";

import Link from "next/link";
import Container from "./Container";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <Container className="py-4 flex items-center justify-between">
                <Link href="/" className="text-lg font-medium tracking-tight">
                    Draftly
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        href="/notes"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                        Notes
                    </Link>
                    <Link
                        href="/bookmarks"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                        Bookmarks
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-border/50 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="w-4 h-4 text-muted" />
                        ) : (
                            <Sun className="w-4 h-4 text-muted" />
                        )}
                    </button>
                </div>
            </Container>
        </nav>
    );
}
