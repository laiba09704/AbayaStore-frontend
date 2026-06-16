import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import List from "../components/List";

function Home() {
  const navigate = useNavigate();

  // ✅ Scroll top fix
  useEffect(() => {
    if (window.location.hash !== "#featured-collections") {
      window.scrollTo(0, 0);
    }
  }, []);

  // ✅ Scroll to hash on mount/location change
  useEffect(() => {
    if (window.location.hash === "#featured-collections") {
      setTimeout(() => {
        const el = document.getElementById("featured-collections");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  // ✅ Scroll animation
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // cleanup
  }, []);

  const [abayaProducts] = useState([
    { id: 1, name: "Classy Black Abaya", price: 4999, img: "/src/assets/images/black.jfif" },
    { id: 2, name: "Elegant Beige Abaya", price: 3999, img: "/src/assets/images/beige.jfif" },
    { id: 3, name: "Mehroon Abaya", price: 4500, img: "/src/assets/images/mehroon.jfif" },
    { id: 4, name: "Elegant Pinkish Abaya", price: 3999, img: "/src/assets/images/pink.jpg" }
  ]);

  const [formalHijabProducts] = useState([
    { id: 10, name: "Formal Blue Hijab", price: 1999, img: "/src/assets/images/blueP.jpg" },
    { id: 11, name: "Cheetah Print Hijab", price: 2199, img: "/src/assets/images/cheetahP.jpg" },
    { id: 12, name: "Printed Bandana", price: 3999, img: "/src/assets/images/ethinicP.webp" },
    { id: 13, name: "Printed Green Hijab", price: 1509, img: "/src/assets/images/greenP.jpg" }
  ]);

  const [hijabProducts] = useState([
    { id: 5, name: "Dusky Blue Hijab", price: 1499, img: "/src/assets/images/dusty blue.jpg" },
    { id: 6, name: "Dark Hijab", price: 1499, img: "/src/assets/images/dark.jpg" },
    { id: 7, name: "Black Hijab", price: 1499, img: "/src/assets/images/black.jpg" },
    { id: 8, name: "Soft Hijab", price: 1499, img: "/src/assets/images/beach.jpg" }
  ]);

  const [chadarProducts] = useState([
    { id: 20, name: "Dot Chadar", price: 2999, img: "/src/assets/images/dotC.jpg" },
    { id: 21, name: "Blue Chadar", price: 3999, img: "/src/assets/images/blueC.jpg" },
    { id: 22, name: "Pink Chadar", price: 4999, img: "/src/assets/images/pinkC.jpg" },
    { id: 23, name: "Printed Chadar", price: 1999, img: "/src/assets/images/printedC.jpg" }
  ]);

  return (
    <>
      <Navbar />

      {/* 🔥 HERO SLIDER */}
      <div id="heroSlider" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="hero-slide slide-1"></div>
          </div>
          <div className="carousel-item">
            <div className="hero-slide slide-2"></div>
          </div>
        </div>
      </div>

      {/* 🔥 FEATURED COLLECTION */}
      <section id="featured-collections" className="container my-5 text-center fade-in">
        <h1 className="mb-5">Our Featured Collection</h1>

        <div className="row g-4">

          <div className="col-md-3 fade-in">
            <div className="collection-card" onClick={() => navigate("/abaya")}>
              <img src="/src/assets/images/beige.jfif" className="img-fluid" />
              <h5 className="collection-title text-dark">ABAYAS</h5>
            </div>
          </div>

          <div className="col-md-3 fade-in">
            <div className="collection-card" onClick={() => navigate("/formal-hijab")}>
              <img src="/src/assets/images/formal.jpg" className="img-fluid" />
              <h5 className="collection-title text-dark">FORMAL HIJABS</h5>
            </div>
          </div>

          <div className="col-md-3 fade-in">
            <div className="collection-card" onClick={() => navigate("/hijab")}>
              <img src="/src/assets/images/dark.jpg" className="img-fluid" />
              <h5 className="collection-title text-dark">HIJABS</h5>
            </div>
          </div>

          <div className="col-md-3 fade-in">
            <div className="collection-card" onClick={() => navigate("/chadar")}>
              <img src="/src/assets/images/blueC.jpg" className="img-fluid" />
              <h5 className="collection-title text-dark">NAMAZ CHADAR</h5>
            </div>
          </div>

        </div>
      </section>

      {/* ABAYAS */}
      <section className="text-center my-5 fade-in">
        <h1>ABAYAS</h1>
        <button className="btn btn-outline-dark mt-3" onClick={() => navigate("/abaya")}>
          VIEW ALL
        </button>
      </section>
      <div className="fade-in">
        <List products={abayaProducts} />
      </div>

      {/* FORMAL HIJABS */}
      <section className="text-center my-5 fade-in">
        <h1>FORMAL HIJABS</h1>
        <button className="btn btn-outline-dark mt-3" onClick={() => navigate("/formal-hijab")}>
          VIEW ALL
        </button>
      </section>
      <div className="fade-in">
        <List products={formalHijabProducts} />
      </div>

      {/* HIJABS */}
      <section className="text-center my-5 fade-in">
        <h1>HIJABS</h1>
        <button className="btn btn-outline-dark mt-3" onClick={() => navigate("/hijab")}>
          VIEW ALL
        </button>
      </section>
      <div className="fade-in">
        <List products={hijabProducts} />
      </div>

      {/* CHADAR */}
      <section className="text-center my-5 fade-in">
        <h1>CHADAR</h1>
        <button className="btn btn-outline-dark mt-3" onClick={() => navigate("/chadar")}>
          VIEW ALL
        </button>
      </section>
      <div className="fade-in">
        <List products={chadarProducts} />
      </div>

      {/* INFO SECTION */}
      <section className="info-section container my-5 fade-in">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="info-card">
              <h3>Premium Quality</h3>
              <p>High-quality abayas.</p>
              </div>
              </div>
          <div className="col-md-4">
            <div className="info-card">
              <h3>Fast Delivery</h3>
              <p>Quick delivery.</p>
              </div>
              </div>
          <div className="col-md-4">
            <div className="info-card">
              <h3>Affordable Prices</h3>
              <p>Budget friendly.</p>
              </div>
              </div>
          <div className="col-md-4">
            <div className="info-card">
              <h3>Customer Support</h3>
              <p>Always here to help.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card">
              <h3>Latest Trends</h3>
              <p>Modern styles available.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card">
              <h3>Secure Shopping</h3>
              <p>Your data is safe.</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;