import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import List from "../components/List";

function FormalHijabs() {

  // ✅ Scroll top fix
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products] = useState([
    { id: 1, name: "Formal Blue Hijab", price: 1999, img: "/src/assets/images/blueP.jpg" },
    { id: 2, name: "Cheetah Print Hijab", price: 2199, img: "/src/assets/images/cheetahP.jpg" },
    { id: 3, name: "Printed Bandana", price: 3999, img: "/src/assets/images/ethinicP.webp" },
    { id: 4, name: "Printed Green Hijab", price: 1509, img: "/src/assets/images/greenP.jpg" },
    { id: 5, name: "Elegant Black Formal Hijab", price: 2499, img: "/src/assets/images/elegant.jpg" },
    { id: 6, name: "Luxury Beige Hijab", price: 2699, img: "/src/assets/images/skin.jpg" },
    { id: 7, name: "Premium Silk Hijab", price: 2999, img: "/src/assets/images/formal.jpg" },
    { id: 8, name: "Designer Formal Hijab", price: 3199, img: "/src/assets/images/lightG.jpg" }
  ]);

  return (
    <>
      <Navbar />

      <div className="gold_line"></div>

      {/* ✅ HEADING */}
     <section className="text-center my-5">
        <h1>Our Hijab Collection</h1>
      </section>

      {/* ✅ PRODUCTS */}
      <List products={products} />

      <Footer />
    </>
  );
}

export default FormalHijabs;