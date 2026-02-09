"use client";

import Link from "next/link";
import Container from "./Container";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { Sun, Moon, LogOut } from "lucide-react";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav
            className="sticky top-0 z-50"
            style={{
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)'
            }}
        >
            <Container className="py-3.5 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-lg font-semibold"
                    style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}
                >
                    Draftly
                </Link>
                <div className="flex items-center gap-5">
                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/notes"
                                className="text-sm font-medium"
                                style={{ color: 'var(--muted)' }}
                            >
                                Notes
                            </Link>
                            <Link
                                href="/bookmarks"
                                className="text-sm font-medium"
                                style={{ color: 'var(--muted)' }}
                            >
                                Bookmarks
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 text-sm font-medium"
                                style={{ color: 'var(--muted)' }}
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium"
                                style={{ color: 'var(--muted)' }}
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="text-sm font-medium px-3 py-1.5 rounded-lg"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: '#FFFFFF'
                                }}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg"
                        style={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)'
                        }}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                        ) : (
                            <Sun className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                        )}
                    </button>
                </div>
            </Container>
        </nav>
    );
}
