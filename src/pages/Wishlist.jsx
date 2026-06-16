import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Wishlist = () => {
  const navigate = useNavigate();

  // ✅ Safe + clean initialization (NO warning)
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  // ✅ Sync with localStorage + listen for updates
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const updated =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(updated);
      } catch {
        setWishlist([]);
      }
    };

    window.addEventListener("wishlistUpdated", handleUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleUpdate);
    };
  }, []);

  // ✅ Remove item
  const removeFromWishlist = (index) => {
    const updated = [...wishlist];
    updated.splice(index, 1);

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // 🔥 notify other components (Navbar etc.)
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // ✅ Navigate to product
  const goToProduct = (item) => {
    navigate(
      `/product?name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&img=${encodeURIComponent(item.img)}`
    );
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ CONTENT */}
      <div className="container text-center my-5">
        <h2 className="fw-bold mb-4">Your Wishlist</h2>
        <p className="text-muted">
          Keep track of your favorite abayas and hijabs here
        </p>

        <div className="row justify-content-center mt-4">
          {wishlist.length === 0 ? (
            <p className="text-muted">Your wishlist is empty.</p>
          ) : (
            wishlist.map((item, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="product_item position-relative">

                  {/* IMAGE */}
                  <img
                    src={item.img}
                    alt={item.name}
                    onClick={() => goToProduct(item)}
                    style={{ cursor: "pointer" }}
                  />

                  {/* NAME */}
                  <h5
                    onClick={() => goToProduct(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </h5>

                  {/* PRICE */}
                  <p
                    onClick={() => goToProduct(item)}
                    style={{ cursor: "pointer" }}
                  >
                    Rs. {item.price}
                  </p>

                  {/* ❤️ REMOVE */}
                  <i
                    className="bi bi-heart-fill position-absolute top-0 end-0 m-2"
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "#cda112",
                    }}
                    onClick={() => removeFromWishlist(index)}
                  ></i>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
};

export default Wishlist;