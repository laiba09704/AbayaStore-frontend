import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

function Footer() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const renderCart = () => {
      const cartItems = document.getElementById("cartItems");
      const emptyText = document.getElementById("emptyCartText");
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!cartItems || !emptyText) return;

      cartItems.innerHTML = "";

      if (cart.length === 0) {
        emptyText.style.display = "block";
      } else {
        emptyText.style.display = "none";

        cart.forEach((item, index) => {
          const li = document.createElement("li");
          li.className =
            "list-group-item d-flex justify-content-between align-items-center";

          li.innerHTML = `
            <div class="cart-item-info d-flex align-items-center" style="cursor:pointer;">
              <img src="${item.img}" style="width:50px;height:50px;object-fit:cover;border-radius:5px;">
              <span class="ms-2">${item.name} - Rs. ${item.price}</span>
            </div>
            <button class="btn btn-sm btn-danger removeCartBtn" data-index="${index}">
              <i class="bi bi-x"></i>
            </button>
          `;

          cartItems.appendChild(li);
        });
      }

      cartItems.addEventListener("click", function (e) {
        if (e.target.closest(".cart-item-info")) {
          const li = e.target.closest("li");
          const index = Array.from(cartItems.children).indexOf(li);
          const item = cart[index];

          navigate(
            `/product?name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&img=${encodeURIComponent(item.img)}`
          );
        }

        if (e.target.closest(".removeCartBtn")) {
          const btn = e.target.closest(".removeCartBtn");
          const index = btn.getAttribute("data-index");

          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
    };

    renderCart();
  }, [navigate]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/subscriptions/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        showAlert("Subscribed successfully! 🎉", "success");
        setEmail("");
      } else {
        showAlert(data.message || "Subscription failed", "error");
      }
    } catch (err) {
      console.error("SUBSCRIBE ERROR:", err);
      showAlert("Server error, please try again later", "error");
    }
  };

  return (
    <>
      <div className="footer-links py-5">
        <div className="container">
          <div className="row text-start">

            <div className="col-md-3 mb-4">
              <h5 className="fw-bold mb-3">Information</h5>
              <ul className="list-unstyled">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/return">Return & Exchange</Link></li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="fw-bold mb-3">Top Categories</h5>
              <ul className="list-unstyled">
                <li><Link to="/abaya">Abayas</Link></li>
                <li><Link to="/hijab">Hijabs</Link></li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com/" className="social-icon"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/" className="social-icon"><i className="bi bi-instagram"></i></a>
                <a href="https://www.tiktok.com/" className="social-icon"><i className="bi bi-tiktok"></i></a>
              </div>
            </div>

            <div className="col-md-3">
              <h5 className="fw-bold mb-3">Never miss out!</h5>
              <p>Sign up for updates, discounts, and more.</p>

              <form className="d-flex" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control me-2"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-dark">Subscribe</button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <footer className="text-center py-3">
        ♥ 2025 Beautiful and Elegant Abayas | Designed with Love
      </footer>
    </>
  );
}

export default Footer;