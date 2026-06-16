import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import List from "../components/List";

function Chadar() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products] = useState([
    { id: 1, name: "Dot Chadar", price: 2999, img: "/src/assets/images/dotC.jpg" },
    { id: 2, name: "Blue Chadar", price: 3999, img: "/src/assets/images/blueC.jpg" },
    { id: 3, name: "Pink Chadar", price: 4999, img: "/src/assets/images/pinkC.jpg" },
    { id: 4, name: "Printed Chadar", price: 1999, img: "/src/assets/images/printedC.jpg" },
    { id: 5, name: "Elegant White Chadar", price: 3499, img: "/src/assets/images/whiteC.jpg" },
    { id: 6, name: "Soft Brown Chadar", price: 2799, img: "/src/assets/images/brownC.jpg" },
    { id: 7, name: "Luxury Black Chadar", price: 4599, img: "/src/assets/images/blueC.jpg" },
    { id: 8, name: "Floral Chadar", price: 3199, img: "/src/assets/images/floral.jpg" }
  ]);

  return (
    <>
      <Navbar />

      <div className="gold_line"></div>

      {/* HEADING */}
      <section className="text-center my-5">
        <h1>Our Chadar Collection</h1>
      </section>

      {/* PRODUCTS */}
      <List products={products} />

      <Footer />
    </>
  );
}

export default Chadar;