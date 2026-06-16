import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import List from "../components/List";

function Hijab() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products] = useState([
    { id: 1, name: "Mehroon Hijab", price: 499, img: "/src/assets/images/mehroonscaef.jpg" },
    { id: 2, name: "Light Pink Hijab", price: 499, img: "/src/assets/images/light pink.jpg" },
    { id: 3, name: "Green Hijab", price: 499, img: "/src/assets/images/light green.jpg" },
    { id: 4, name: "Dusty Blue Hijab", price: 499, img: "/src/assets/images/dusty blue.jpg" },
    { id: 5, name: "Black Hijab", price: 499, img: "/src/assets/images/black.jpg" },
    { id: 6, name: "White Hijab", price: 499, img: "/src/assets/images/white.jpg" },
    { id: 7, name: "Brown Hijab", price: 499, img: "/src/assets/images/bwo.jpg" },
    { id: 8, name: "Purple Hijab", price: 499, img: "/src/assets/images/purplr.jpg" }
  ]);

  return (
    <>
      <Navbar />

      <div className="gold_line"></div>

      {/* HEADING */}
      <section className="text-center my-5">
        <h1>Our Hijab Collection</h1>
      </section>

      {/* PRODUCTS */}
      <List products={products} />

      <Footer />
    </>
  );
}

export default Hijab;