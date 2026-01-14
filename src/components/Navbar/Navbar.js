"use client";

import Link from "next/link";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem("userToken"));
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);
        window.addEventListener("focus", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("focus", checkAuth);
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("userToken");
        router.push("/login");
        setIsLoggedIn(false);
    }

    return (
        <nav className="navbar">
            <div className="logo">TripTales</div>
            <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/destinations">Destination</Link>
                {isLoggedIn ? (
                    <>
                        <Link href="/bookings">My Bookings</Link>
                        <div className="profile-menu">
                            <div className="profile-icon">👤</div>
                            <div className="profile-dropdown">
                                <Link href="/profile">My Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/admin/login">Admin</Link>
                    </>
                )}
            </div>
        </nav>
    )
}