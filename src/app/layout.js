import Footer from "@/components/Footer/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "TripTales | Travel Website",
  description: "Explore and book amazing travel destinations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
