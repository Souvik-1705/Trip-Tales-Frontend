"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/my-bookings.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            router.replace("/login");
            return;
        }

        fetch(`${BASE_URL}/api/bookings/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    router.replace("/login");
                    return [];
                }
                return res.json();
            })
            .then((data) => setBookings(data))
            .catch(() => router.replace("/login"))
            .finally(() => setLoading(false));
    }, [router]);

    if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
    if (bookings.length === 0) return <p style={{ padding: "40px" }}>No bookings found.</p>;

    return (
        <div className="user-bookings-container">
            <h1>My Bookings</h1>

            <div className="bookings-table">
                <div className="table-header">
                    <span>Destination</span>
                    <span>Travel Date</span>
                    <span>Travellers</span>
                    <span>Status</span>
                </div>

                {bookings.map((booking) => (
                    <div className="table-row" key={booking._id}>
                        <span className="destination-name">
                            {booking.destination?.name}
                        </span>

                        <span>
                            {new Date(booking.travelDate).toDateString()}
                        </span>

                        <span>{booking.travellers}</span>

                        <span className={`status ${booking.status}`}>
                            {booking.status.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
