"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/profile.css";
import { getUserFromToken } from "@/utils/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const userData = getUserFromToken();
    setUser(userData);
  }, [router]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-avatar">👤</div>

      <h1>My Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Member Since:</strong> 2024</p>
    </div>
  );
}
