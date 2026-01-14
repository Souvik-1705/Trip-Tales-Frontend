"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/admin-dashboard.css";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export default function AdminDashboard() {
    const [destinations, setDestinations] = useState([]);
    const [formData, setFormData] = useState({ name: "", country: "", price: "", image: "", category: "" })
    const [editingId, setEditingId] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            router.push("/admin/login");
        }
    }, [router]);

    const fetchDestinations = async () => {
        const res = await fetch(`${BASE_URL}/api/destinations`);
        const data = await res.json();
        setDestinations(data);
    }

    useEffect(() => {
        fetchDestinations();
    }, []);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        const url = editingId ?
             `${BASE_URL}/api/destinations/${editingId}`
            : `${BASE_URL}/api/destinations`;

        const method = editingId ? "PUT" : "POST";
        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            },
            body: JSON.stringify(formData),
        });
        setFormData({ name: "", country: "", price: "", image: "", category: "", description: "" });
        setEditingId(null);
        fetchDestinations();
    }

    const handleDelete = async (id) => {
        await fetch(`${BASE_URL}/api/destinations/${id}`, {
            method: "DELETE",
        });
        fetchDestinations();
    }
    const handleEdit = async (destination) => {
        setEditingId(destination._id);
        setFormData({
            name: destination.name,
            country: destination.country,
            price: destination.price,
            image: destination.image,
            description: destination.description
        });
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
            </div>

            <Link href="/admin/bookings">
          <button className="admin-bookings-btn">
            View All Bookings
          </button>
        </Link>

            <div className="admin-form">
                <h2>{editingId ? "Edit Destination" : "Add Destination"}</h2>

                <form onSubmit={handleAdd}>
                    <input
                        name="name"
                        placeholder="Destination Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        {editingId ? "Update Destination" : "Add Destination"}
                    </button>
                </form>
            </div>

            <h2 className="all-destinations">All Destinations</h2>

            <div className="destinations-grid">
                {destinations.map((destination) => (
                    <div className="destination-card" key={destination._id}>
                        <h3>{destination.name}</h3>
                        <p>{destination.country}</p>
                        <p>₹{destination.price}</p>
                        <p>{destination.description}</p>

                        <div className="card-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(destination)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(destination._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}