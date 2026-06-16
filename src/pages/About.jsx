import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <div className="about-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">About Us</h2>

          <p className="lead mx-auto" style={{ maxWidth: "800px", lineHeight: "1.8" }}>
            Welcome to <strong>Abaya_Store</strong> – your trusted destination for modest fashion.

            We are passionate about bringing elegance, comfort, and style together through our beautifully designed
            <strong> abayas</strong> and <strong> hijabs</strong>.

            <br /><br />

            Each piece is crafted with care, inspired by tradition, and tailored for modern women who value modesty with grace.

            <br /><br />

            Our mission is to provide high-quality fabric, unique designs, and affordable prices so every woman
            can express her individuality confidently.

            <br /><br />

            Thank you for choosing <strong>Abaya_Store</strong> — where modest fashion meets timeless beauty.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;