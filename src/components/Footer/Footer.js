import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">TripTales ✈️</h2>

        <p className="footer-text">
          A modern travel website built with Next.js to explore beautiful destinations around the world.
        </p>

        <div className="footer-details">
          <p>
            <strong>Developer:</strong> Souvik Biswas
          </p>
          <p>
            <strong>Email:</strong> souvikbiswas.dev@gmail.com
          </p>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} TripTales. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
