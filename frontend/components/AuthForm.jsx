"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AuthForm({ type, onSubmit, loading, error }) {
    const isSignup = type === "signup";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <h1
                className="text-2xl font-semibold text-center mb-2"
                style={{ color: 'var(--foreground)' }}
            >
                {isSignup ? "Create account" : "Welcome back"}
            </h1>
            <p
                className="text-sm text-center mb-8"
                style={{ color: 'var(--muted)' }}
            >
                {isSignup
                    ? "Sign up to start organizing your thoughts"
                    : "Sign in to continue to Draftly"
                }
            </p>

            {error && (
                <div
                    className="text-sm mb-4 p-3 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#DC2626' }}
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-1.5"
                            style={{ color: 'var(--foreground)' }}
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)',
                            }}
                        />
                    </div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--foreground)' }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)',
                        }}
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--foreground)' }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)',
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm disabled:opacity-50"
                    style={{
                        backgroundColor: 'var(--accent)',
                        color: '#FFFFFF',
                    }}
                >
                    {loading ? "Please wait..." : (isSignup ? "Create account" : "Sign in")}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <p
                className="text-sm text-center mt-6"
                style={{ color: 'var(--muted)' }}
            >
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <Link
                    href={isSignup ? "/login" : "/signup"}
                    style={{ color: 'var(--accent)' }}
                >
                    {isSignup ? "Sign in" : "Sign up"}
                </Link>
            </p>
        </div>
    );
}
