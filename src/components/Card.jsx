import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(
      `/product?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(
        product.price
      )}&img=${encodeURIComponent(product.img)}`
    );
  };

  // ✅ Scroll Animation
  useEffect(() => {
    const el = document.querySelectorAll(".fade-in");

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

    el.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="product_item fade-in" onClick={goToProduct}>
      <div className="image-wrapper">
        <img src={product.img} alt={product.name} />
      </div>

      <div className="text-center mt-2">
        <h6 className="fw-semibold">{product.name}</h6>
        <p>Rs. {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Card;