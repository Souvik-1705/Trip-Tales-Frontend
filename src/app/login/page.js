"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import "@/styles/auth.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError("");

        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setAuthError(data.message);
                return;
            }

            localStorage.setItem("userToken", data.token);
            router.push("/");
        } catch (error) {
            setAuthError("Something went wrong. Try again");
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {authError && <p className="error">{authError}</p>}

                <button type="submit">Login</button>
            </form>

            <p className="auth-redirect">
                First time here? <Link href="/signup">Create an account</Link>
            </p>
        </div>
    );
}
