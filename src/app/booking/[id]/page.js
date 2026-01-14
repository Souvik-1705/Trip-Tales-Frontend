"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import "@/styles/booking.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookingPage() {
  const params = useParams();
  const destinationId = params.id;

  const [formData, setFormData] = useState({
    destination: destinationId,
    name: "",
    email: "",
    travellers: 1,
    travelDate: "",
  });

  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "travellers" ? Number(value) : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please login to book a trip");
      return;
    }

    const response = await fetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccess(true);
    } else {
      alert("Booking failed. Please login again.");
    }
  };

  if (success) {
    return <h2 style={{ padding: "60px" }}>🎉 Booking Successful!</h2>;
  }

  return (
    <div className="booking-container">
      <h1>Book Your Trip</h1>

      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
        />

        <label>
          Travellers:
          <input
            type="number"
            name="travellers"
            min="1"
            onChange={handleChange}
            required
          />
        </label>

        <small>Enter number of travellers (min 1)</small>

        <input
          type="date"
          name="travelDate"
          onChange={handleChange}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
