import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAlert } from "../context/AlertContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const params = new URLSearchParams(location.search);

  const product = {
    name: params.get("name"),
    price: Number(params.get("price")) || 0,
    img: params.get("img"),
    quantity: Number(params.get("quantity")) || 1,
  };

  const [form, setForm] = useState({
    contact: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const shipping = 200;
  const subtotal = product.price * product.quantity;
  const total = subtotal + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.contact.trim()) {
      err.contact = "Contact information is required";
    }
    if (!form.country.trim()) err.country = "Country required";
    if (!form.firstName.trim()) err.firstName = "First name required";
    if (!form.lastName.trim()) err.lastName = "Last name required";
    if (!form.address.trim()) err.address = "Address required";

    const phonePattern = /^03\d{9}$/;
    if (!form.phone.trim()) {
      err.phone = "Phone required";
    } else if (!phonePattern.test(form.phone)) {
      err.phone = "Invalid phone format";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("Please login first", "warning");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: {
            name: product.name,
            price: Number(product.price),
            img: product.img,
          },
          quantity: product.quantity,
          totalPrice: total,
          shippingDetails: form,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("Order placed successfully! 🎉", "success");
        navigate("/");
      } else {
        showAlert(data.message || "Order failed", "error");
      }
    } catch (err) {
      console.error("ORDER ERROR:", err);
      showAlert("Server error, try again later", "error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-md-7 p-5">
            <form onSubmit={handleSubmit}>

              <h4 className="fw-bold mb-4">Contact</h4>

              <input
                type="text"
                name="contact"
                placeholder="Email or mobile phone number"
                className="form-control mb-1"
                value={form.contact}
                onChange={handleChange}
              />
              <p className="text-danger small">{errors.contact}</p>

              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">
                  Email me with news and offers
                </label>
              </div>

              <h4 className="fw-bold mb-3">Delivery</h4>

              <input
                name="country"
                placeholder="Country / Region"
                className="form-control mb-2"
                value={form.country}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.country}</p>

              <div className="row">
                <div className="col-md-6">
                  <input
                    name="firstName"
                    placeholder="First name"
                    className="form-control mb-2"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{errors.firstName}</p>
                </div>

                <div className="col-md-6">
                  <input
                    name="lastName"
                    placeholder="Last name"
                    className="form-control mb-2"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  <p className="text-danger">{errors.lastName}</p>
                </div>
              </div>

              <textarea
                name="address"
                placeholder="Address"
                className="form-control mb-2"
                value={form.address}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.address}</p>

              <input
                name="apartment"
                placeholder="Apartment (optional)"
                className="form-control mb-3"
                value={form.apartment}
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                className="form-control mb-3"
                value={form.city}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="03XXXXXXXXX"
                className="form-control mb-2"
                value={form.phone}
                onChange={handleChange}
              />
              <p className="text-danger">{errors.phone}</p>

              <h5 className="fw-bold mt-4">Payment</h5>
              <input
                className="form-control mb-4"
                value="Cash on Delivery"
                readOnly
              />

              <button className="btn btn-dark w-100">
                Confirm Order
              </button>

            </form>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="col-md-5 bg-light p-4"
            style={{
              height: "100vh",
              overflowY: "auto",
              position: "sticky",
              top: 0,
            }}
          >

            {/* PRODUCT */}
            <div className="d-flex align-items-center mb-4">
              <img
                src={product.img}
                alt=""
                style={{ width: "70px", borderRadius: "10px" }}
              />
              <div className="ms-3">
                <h6 className="mb-1">{product.name}</h6>
                <small>Qty: {product.quantity}</small>
              </div>
              <div className="ms-auto">
                Rs {product.price}
              </div>
            </div>

            {/* BILL */}
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>Rs {shipping}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Checkout;