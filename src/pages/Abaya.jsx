import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import List from "../components/List";

function Abaya() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products] = useState([
    { id: 1, name: "Classy Black Abaya", price: 4999, img: "/src/assets/images/pachwork.jpg"  },
    { id: 2, name: "Elegant Beige Abaya", price: 3999, img: "/src/assets/images/beige.jfif" },
    { id: 3, name: "Classy Mehroon Abaya", price: 6999, img: "/src/assets/images/mehroon.jfif" },
    { id: 4, name: "Elegant Pinkish Abaya", price: 3999, img: "/src/assets/images/pink.jpg" },
    { id: 5, name: "Classy Brown Abaya", price: 4999, img: "/src/assets/images/brown.jpg" },
    { id: 6, name: "Black Patchwork Abaya", price: 3999, img: "/src/assets/images/pachwork.jpg" },
    { id: 7, name: "Elegant Blue Abaya", price: 6999, img: "/src/assets/images/blue.jpg" },
    { id: 8, name: "Elegant Green Abaya", price: 3999, img: "/src/assets/images/green.jpg" },
    { id: 9, name: "Black Patchwork Abaya", price: 3999, img: "/src/assets/images/black.jpg" },
    { id: 10, name: "Elegant Mehroon Abaya", price: 6999, img: "/src/assets/images/mehroon.jfif" },
    { id: 11, name: "Elegant Green Abaya", price: 3999, img: "/src/assets/images/green.jpg" },
    { id: 12, name: "Black Abaya", price: 4999, img: "/src/assets/images/black.jfif" }
  ]);

  return (
    <>
      <Navbar />

      <div className="gold_line"></div>

      {/* HEADING */}
      <section className="text-center my-5">
        <h1>Our Abaya Collection</h1>
      </section>

      {/* PRODUCTS */}
      <List products={products} />

      <Footer />
    </>
  );
}

export default Abaya;