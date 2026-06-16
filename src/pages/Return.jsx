import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Return() {

  // 🔥 Scroll to top fix
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* RETURN & EXCHANGE SECTION */}
      <div className="return-section py-5">
        <div className="container text-center">

          <h2 className="fw-bold mb-4">Return & Exchange Policy</h2>

          <p
            className="lead mx-auto"
            style={{ maxWidth: "850px", lineHeight: "1.8" }}
          >
            At <strong>Abaya_Store</strong>, customer satisfaction is our top priority.
            However, due to the delicate nature of our products, we follow a clear and fair return policy.

            <br /><br />

            <strong>1. No Return or Exchange on Sale Items:</strong>
            All items purchased during sales, promotions, or with discount codes are non-returnable and non-exchangeable.

            <br /><br />

            <strong>2. Eligibility for Return/Exchange:</strong>
            Items may be exchanged only if they are defective, damaged, or incorrect.
            Products must be unused, unwashed, and in their original packaging with tags attached.

            <br /><br />

            <strong>3. Request Timeframe:</strong>
            All exchange requests must be made within <strong>3 days</strong> of receiving your order.

            <br /><br />

            <strong>4. Process:</strong>
            To request an exchange, please contact our customer support team through our{" "}
            <a
              href="https://wa.me/"
              className="fw-semibold"
              style={{ textDecoration: "none", color: "#000" }}
            >
              WhatsApp
            </a>{" "}
            page. Once your request is approved, you will be guided through the exchange process.

            <br /><br />

            <strong>5. Shipping Costs:</strong>
            Customers are responsible for shipping charges during exchanges unless the product delivered is defective or incorrect.

            <br /><br />

            Thank you for understanding and supporting <strong>Abaya_Store</strong>.
            We truly appreciate your trust in our modest fashion collection.
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Return;