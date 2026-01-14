import DestinationCard from "./DestinationCard";
import "./Destinations.css";

export default function Destinations({ destinations }) {
  return (
    <section className="destinations-section">
      <h2>Popular Destinations</h2>

      <div className="destinations-grid">
        {destinations.map((dest) => (
          <DestinationCard key={dest._id} destination={dest} />
        ))}
      </div>
    </section>
  );
}
