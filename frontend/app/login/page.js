"use client";

import { useState } from "react";
import Container from "@/components/Container";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/api";

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        setError("");
        setLoading(true);

        const result = await loginUser(formData.email, formData.password);

        setLoading(false);

        if (result.success) {
            login(result.data.user, result.data.token);
        } else {
            setError(result.error || "Invalid credentials");
        }
    };

    return (
        <Container className="flex items-center justify-center min-h-[60vh]">
            <AuthForm
                type="login"
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </Container>
    );
}
