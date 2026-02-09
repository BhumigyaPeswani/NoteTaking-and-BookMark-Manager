"use client";

import { useState } from "react";
import Container from "@/components/Container";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { signupUser } from "@/services/api";

export default function SignupPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        setError("");
        setLoading(true);

        const result = await signupUser(formData.name, formData.email, formData.password);

        setLoading(false);

        if (result.success) {
            login(result.data.user, result.data.token);
        } else {
            setError(result.error || "Signup failed");
        }
    };

    return (
        <Container className="flex items-center justify-center min-h-[60vh]">
            <AuthForm
                type="signup"
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </Container>
    );
}
