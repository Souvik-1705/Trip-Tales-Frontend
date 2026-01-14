# Trip Tales Frontend

This is the **frontend** for the Trip Tales travel booking application built with **Next.js** and **React**. It interacts with the backend API to display destinations, handle bookings, and manage user/admin authentication.

---

## Features

- **User Authentication**: Signup and login with JWT token storage in `localStorage`.
- **Admin Authentication**: Admin login to manage destinations and view bookings.
- **Destinations**: Users can browse destinations; Admin can add, edit, delete destinations.
- **Bookings**: Users can book trips; Admin can view, confirm, reject, or delete bookings.
- **Protected Routes**: Certain pages are accessible only after login.
- **Responsive Design**: Works on both desktop and mobile screens.

---

## Tech Stack

- Next.js 13 (App Router)
- React 18+
- CSS Modules / Separate CSS files
- Fetch API for backend communication
- Client-side routing and authentication with `localStorage` and `useEffect`

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/trip-tales-frontend.git
cd trip-tales-frontend
