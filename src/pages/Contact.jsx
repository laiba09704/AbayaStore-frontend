import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(form.email)) {
        err.email = "Enter a valid email address";
      }
    }
    if (!form.message.trim()) err.message = "Message is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("info");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/contacts/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMsg("Message sent successfully! 📬");
        setMsgType("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setMsg(data.message || "Failed to send message");
        setMsgType("danger");
      }
    } catch (err) {
      setLoading(false);
      console.error("CONTACT ERROR:", err);
      setMsg("Server error, please try again later");
      setMsgType("danger");
    }
  };

  return (
    <>
      <Navbar />
      <div className="gold_line"></div>

      <div className="container my-5" style={{ fontFamily: "'Lora', serif" }}>
        <h2 className="text-center fw-bold mb-3 mt-4" style={{ color: "#000", fontSize: "2.5rem" }}>
          Contact Us
        </h2>
        <div style={{ width: "80px", height: "3px", backgroundColor: "#cda112", margin: "0 auto 30px auto" }}></div>
        <p className="text-center text-muted mb-5 fs-5">
          Have questions, custom order requests, or feedback? Get in touch with us!
        </p>

        <div className="row g-5">
          {/* Contact Details */}
          <div className="col-md-5 text-start">
            <div className="p-4 rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-between border" style={{ borderColor: "#e5e4e7" }}>
              <div>
                <h4 className="fw-bold mb-4" style={{ color: "#000" }}>Get in Touch</h4>
                <p className="text-muted mb-4">
                  Fill out the form and our customer representative team will get back to you within 24 hours.
                </p>

                <div className="d-flex align-items-start mb-4">
                  <div className="fs-3 me-3" style={{ color: "#cda112" }}>
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#000" }}>Address</h6>
                    <span className="text-muted">Karachi, Pakistan</span>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <div className="fs-3 me-3" style={{ color: "#cda112" }}>
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#000" }}>Call / WhatsApp</h6>
                    <span className="text-muted">+92 300 1234567</span>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <div className="fs-3 me-3" style={{ color: "#cda112" }}>
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#000" }}>Email Address</h6>
                    <span className="text-muted">support@abayastore.com</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-top">
                <h6 className="fw-bold mb-3" style={{ color: "#000" }}>Follow & Chat</h6>
                <div className="d-flex gap-3">
                  <a href="https://www.facebook.com/" className="social-icon"><i className="bi bi-facebook"></i></a>
                  <a href="https://www.instagram.com/" className="social-icon"><i className="bi bi-instagram"></i></a>
                  <a href="https://wa.me/923001234567" className="social-icon" style={{ backgroundColor: "#25d366" }}><i className="bi bi-whatsapp"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-7">
            <form
              onSubmit={handleSubmit}
              className="p-4 rounded shadow-sm border text-start"
              style={{ backgroundColor: "#fff9e6", borderColor: "#cda112" }}
            >
              <h4 className="fw-bold mb-4 text-center" style={{ color: "#000" }}>Send Message</h4>
              {msg && <div className={`alert alert-${msgType} text-center py-2`}>{msg}</div>}

              <div className="mb-3">
                <label className="fw-bold mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-danger small mt-1">{errors.name}</p>}
              </div>

              <div className="mb-3">
                <label className="fw-bold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <label className="fw-bold mb-1">Subject (Optional)</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter message subject"
                />
              </div>

              <div className="mb-3">
                <label className="fw-bold mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && <p className="text-danger small mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 mt-2 text-white fw-bold py-2"
                style={{ backgroundColor: "#cda112", border: "none", transition: "background 0.3s" }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#a7860d"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#cda112"}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
