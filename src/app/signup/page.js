"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export default function LoginPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Signup failed");
            return;
        }

        localStorage.setItem("userToken", data.token);
        router.replace("/");

    }

    return (
        <div className="auth-container">
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}