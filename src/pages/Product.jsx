import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAlert } from "../context/AlertContext";

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const params = new URLSearchParams(location.search);

  const product = {
    name: params.get("name") || "",
    price: params.get("price") || "",
    img: params.get("img") || "",
  };

  const [quantity, setQuantity] = useState(1);

  const getStorage = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  };

  const [cart, setCart] = useState(() => getStorage("cart"));
  const [wishlist, setWishlist] = useState(() => getStorage("wishlist"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  }, [wishlist]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // 🛒 ADD TO CART
  const addToCart = () => {
    const index = cart.findIndex((item) => item.name === product.name);

    let updatedCart;

    if (index !== -1) {
      updatedCart = [...cart];
      updatedCart[index].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    setCart(updatedCart);
    showAlert("Added to cart 🛒", "success");
  };

  // ❤️ WISHLIST
  const toggleWishlist = () => {
    const exists = wishlist.find((item) => item.name === product.name);

    let updated;

    if (exists) {
      updated = wishlist.filter((item) => item.name !== product.name);
    } else {
      updated = [...wishlist, { ...product }];
    }

    setWishlist(updated);
  };

  const isWishlisted = wishlist.some((item) => item.name === product.name);

  // 🔥 BUY NOW (FULL BACKEND INTEGRATION)
  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showAlert("Please login first", "warning");
      navigate("/login");
      return;
    }

    navigate(
      `/checkout?name=${encodeURIComponent(product.name)}&price=${
        product.price
      }&img=${encodeURIComponent(product.img)}&quantity=${quantity}`
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row">

          {/* IMAGE */}
          <div className="col-md-6">
            <img
              src={product.img}
              alt={product.name}
              className="img-fluid"
              style={{ borderRadius: "10px" }}
            />
          </div>

          {/* DETAILS */}
          <div className="col-md-6">
            <div style={{ position: "sticky", top: "100px" }}>

              <h2 className="fw-bold">{product.name}</h2>

              <p className="fs-4 fw-semibold">
                Rs. {product.price}
              </p>

              <p className="mt-3">
                Elegant premium quality abaya made with soft fabric.
                Perfect for daily and formal wear.
              </p>

              {/* QUANTITY */}
              <div className="mb-3">
                <label>Quantity:</label>

                <div className="d-flex align-items-center mt-2">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={decreaseQty}
                  >
                    -
                  </button>

                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="text-center mx-2"
                    style={{ width: "50px" }}
                  />

                  <button
                    className="btn btn-outline-secondary"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="d-flex gap-3 mb-3">

                <button
                  className="btn btn-dark px-4"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-light border rounded-circle"
                  onClick={toggleWishlist}
                >
                  <i
                    className={`bi ${
                      isWishlisted
                        ? "bi-heart-fill text-danger"
                        : "bi-heart"
                    }`}
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </button>

              </div>

              {/* BUY NOW */}
              <button
                className="btn btn-outline-dark w-100"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="container my-5">
        <h3 className="text-center fw-bold mb-4 border-bottom pb-2">
          Description
        </h3>

        <div className="mt-4">
          <h5 className="fw-semibold mb-3">
            Premium Elegant Abaya – Modest & Stylish Wear
          </h5>

          <p className="text-muted">
            Elevate your modest fashion with our premium quality abaya.
          </p>

          <h6 className="fw-bold mt-4">Key Features:</h6>

          <ul className="mt-3">
            <li>Soft & breathable fabric</li>
            <li>Elegant modest design</li>
            <li>Comfortable for all-day wear</li>
            <li>Perfect for casual & formal use</li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Product;