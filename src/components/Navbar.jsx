import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../products.json";

function Navbar() {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ FIX: Initialize directly (no warning)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  // ✅ Listen for updates (from Product page)
  useEffect(() => {
    const updateCart = () => {
      try {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
      } catch {
        setCart([]);
      }
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  // Remove item
  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // notify update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const selectProduct = (item) => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSearch(false);
    navigate(
      `/product?name=${encodeURIComponent(item.name)}&price=${item.price}&img=${encodeURIComponent(item.img)}`
    );
  };

  const handleCollectionClick = (e) => {
    const closeBtn = document.querySelector("#offcanvasMenu .btn-close");
    if (closeBtn) closeBtn.click();

    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("featured-collections");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#featured-collections");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar text-white py-2 text-center">
        <span className="fw-semibold">
          NO RETURNS / EXCHANGE AFTER DELIVERY
        </span>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-light bg-light-yellow">
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

          {/* Menu */}
          <button
            className="btn p-0 border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
          >
            <i className="bi bi-list fs-2"></i>
          </button>

          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Abaya_Store
          </Link>

          {/* Icons */}
          <div className="d-flex align-items-center gap-3">

            {/* SEARCH TOGGLE */}
            <button
              className="btn p-0 border-0 text-dark"
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="bi bi-search fs-5"></i>
            </button>

            <Link to="/wishlist" className="text-dark">
              <i className="bi bi-heart fs-5"></i>
            </Link>

            {/* CART BUTTON */}
            <button
              className="btn p-0 border-0 text-dark position-relative"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
            >
              <i className="bi bi-bag fs-5"></i>

              {/* Cart Count */}
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                  {cart.length}
                </span>
              )}
            </button>

            <Link to="/login" className="text-dark">
              <i className="bi bi-person fs-4"></i>
            </Link>
          </div>
        </div>

        {/* LEFT MENU */}
        <div className="offcanvas offcanvas-start" id="offcanvasMenu" style={{ backgroundColor: "#fff9e6", fontFamily: "'Lora', serif" }}>
          <div className="offcanvas-header border-bottom" style={{ borderColor: "#cda112" }}>
            <h5 className="fw-bold m-0" style={{ color: "#000" }}>Menu</h5>
            <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav gap-3 mt-3">
              <li>
                <Link className="nav-link fw-semibold text-dark fs-5" to="/" onClick={() => {
                  const closeBtn = document.querySelector("#offcanvasMenu .btn-close");
                  if (closeBtn) closeBtn.click();
                }}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link fw-semibold text-dark fs-5" to="/abaya" onClick={() => {
                  const closeBtn = document.querySelector("#offcanvasMenu .btn-close");
                  if (closeBtn) closeBtn.click();
                }}>
                  Abayas
                </Link>
              </li>
              <li>
                <Link className="nav-link fw-semibold text-dark fs-5" to="/formal-hijab" onClick={() => {
                  const closeBtn = document.querySelector("#offcanvasMenu .btn-close");
                  if (closeBtn) closeBtn.click();
                }}>
                  Formal Hijabs
                </Link>
              </li>
              <li>
                <Link className="nav-link fw-semibold text-dark fs-5" to="/hijab" onClick={() => {
                  const closeBtn = document.querySelector("#offcanvasMenu .btn-close");
                  if (closeBtn) closeBtn.click();
                }}>
                  Hijabs
                </Link>
              </li>
              <li>
                <Link className="nav-link fw-semibold text-dark fs-5" to="/chadar" onClick={() => {
                  const closeBtn = document.querySelector("#offcanvasMenu .btn-close");
                  if (closeBtn) closeBtn.click();
                }}>
                  Namaz Chadars
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT CART SIDEBAR */}
        <div className="offcanvas offcanvas-end" id="cartSidebar">
          <div className="offcanvas-header">
            <h5>Your Cart</h5>
            <button className="btn-close" data-bs-dismiss="offcanvas"></button>
          </div>

          <div className="offcanvas-body">

            {/* EMPTY CART */}
            {cart.length === 0 ? (
              <div className="text-center mt-4">
                <p className="text-muted">Your cart is empty</p>

                <button
                  className="btn btn-warning mt-3"
                  data-bs-dismiss="offcanvas"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="list-group">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.img}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />

                      <div className="ms-2">
                        <small>{item.name}</small>
                        <br />
                        <small>Qty: {item.quantity}</small>
                      </div>
                    </div>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

          </div>
        </div>
      </nav>

      {/* Search Drawer */}
      <div className={`search-bar-container ${showSearch ? "show" : ""}`}>
        <div className="container d-flex flex-column align-items-center position-relative">
          <div className="w-100 d-flex justify-content-center align-items-center gap-2">
            <input
              type="text"
              className="form-control search-input"
              style={{ maxWidth: "500px", borderRadius: "20px", border: "1px solid #cda112" }}
              placeholder="Search products (e.g. Abaya, Hijab, Chadar)..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                className="btn btn-sm btn-outline-secondary"
                style={{ borderRadius: "50%" }}
                onClick={() => {
                  setSearchQuery("");
                  setSuggestions([]);
                }}
              >
                ✕
              </button>
            )}
          </div>

          {suggestions.length > 0 && (
            <div
              className="suggestions-list shadow-sm border rounded bg-white mt-2 position-absolute"
              style={{
                zIndex: 1000,
                top: "100%",
                width: "100%",
                maxWidth: "500px",
                maxHeight: "300px",
                overflowY: "auto"
              }}
            >
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center gap-3 p-2 border-bottom suggestion-item"
                  style={{ cursor: "pointer", transition: "background 0.2s" }}
                  onClick={() => selectProduct(item)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5efe6"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "40px", height: "45px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <div className="text-start">
                    <div className="fw-bold text-dark small">{item.name}</div>
                    <small className="text-muted">Rs. {item.price}</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchQuery.trim() !== "" && suggestions.length === 0 && (
            <div className="mt-2 text-danger fw-semibold small">
              No products found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;