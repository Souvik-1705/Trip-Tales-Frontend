import Link from "next/link";

export default function DestinationCard({ destination }) {
    return (
        <div className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <div className="card-content">
                <h3>{destination.name}</h3>
                <p>{destination.country}</p>
                <p className="price">₹{destination.price}</p>
                <Link href={`/destinations/${destination._id}`} className="details-btn">View Details</Link>
            </div>
        </div>
    )
}