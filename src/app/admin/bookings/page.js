"use client";

import { useEffect, useState } from "react";
import "@/styles/admin-booking.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const res = await fetch(`${BASE_URL}/api/bookings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            } else if (res.status === 401) {
                alert("Unauthorized! Please login as admin.");
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id, action) => {
        const token = localStorage.getItem("adminToken");
        await fetch(`${BASE_URL}/api/bookings/${id}/${action}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchBookings();
    }

    const deleteBooking = async (id) => {
        const token = localStorage.getItem("adminToken");
        await fetch(`${BASE_URL}/api/bookings/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        fetchBookings();
    }

    if (bookings.length === 0) {
        return (
            <div className="admin-container">
                <h1>All Bookings</h1>
                <p>No bookings found.</p>
            </div>
        );
    }

    
    return (
        <div className="admin-container">
            <h1>All Bookings</h1>

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Destination</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Travellers</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    {booking.destination
                                        ? booking.destination.name
                                        : "Deleted Destination"}
                                </td>
                                <td>{booking.name}</td>
                                <td>{booking.email}</td>
                                <td>{booking.travellers}</td>
                                <td>
                                    {new Date(booking.travelDate).toLocaleDateString()}
                                </td>
                                <td>
                                    <span className={`status ${booking.status}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button
                                        className="confirm"
                                        onClick={() => updateStatus(booking._id, "confirm")}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="reject"
                                        onClick={() => updateStatus(booking._id, "reject")}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={() => deleteBooking(booking._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
