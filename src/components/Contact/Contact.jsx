import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  borderRadius: "10px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  resize: "vertical",
  borderRadius: "10px",
};
const cardStyle = {
  marginBottom: "20px",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/mleqondg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Serialize the formData object to JSON
    });

    if (response.ok) {
      alert("submitted successfully!You will be contacted soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      alert("error contacting Kurunzi");
    }
  }

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

  return (
    <div className="container text-center">
      <h2 style={{ position: "relative" }}>
        Send us a Message
        <span
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#3B71CA",
          }}
        ></span>
      </h2>
      <div className="row justify-content-center">
        <div
          className="col-md-6 mt-5 md-0 bg-white p-4"
          style={{
            maxWidth: "600px",
            boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ marginTop: "0" }}>
            <div className="form-group">
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name*"
                value={formData.name} // Use formData.name for the input value
                onChange={handleChange} // Handle input changes
                style={{
                  ...inputStyle,
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                value={formData.email} // Use formData.email for the input value
                onChange={handleChange} // Handle input changes
                style={{
                  ...inputStyle,
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
              />
    
            </div>
            <div className="form-group">
              <label htmlFor="phone"></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone*"
                value={formData.phone} // Use formData.phone for the input value
                onChange={handleChange} // Handle input changes
                style={{
                  ...inputStyle,
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message"></label>
              <textarea
                id="message"
                name="message"
                placeholder="How may we be of help to you? You can include your service budget..."
                value={formData.message} // Use formData.message for the textarea value
                onChange={handleChange} // Handle input changes
                style={{
                  ...textareaStyle,
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
              ></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Get Quote
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4 mt-5 ">
          {/* Contact Cards */}
          <div className="row">
            {/* Give Us a Call Card */}
            <div className="col-md-12 md-2 ">
              <div className="card text-center" style={cardStyle}>
                <div className="card-body">
                  <FaPhone size={40} color="#007bff" />
                  <h5 className="card-title">Give Us a Call</h5>
                  <p className="card-text">Phone: (+254)706 789 734</p>
                </div>
              </div>
            </div>

            {/* Send an Email Card */}
            <div className="col-md-12 md-4">
              <div className="card text-center" style={cardStyle}>
                <div className="card-body">
                  <FaEnvelope size={40} color="#007bff" />
                  <h5 className="card-title">Send an Email</h5>
                  <p className="card-text">
                    info@kurunzitech.com
                  </p>
                </div>
              </div>
            </div>
            {/* Social Media Card */}
            <div className="col-md-12">
              <div className="card text-center">
                <div className="card-body">
                  <div>
                    <Link to="https://web.facebook.com/p/Kurunzi-TECH-LTD-100066510652405/?_rdc=1&_rdr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook
                        size={30}
                        color="#007bff"
                        style={{ marginRight: "10px" }}
                      />
                    </Link>
                    <Link to="https://twitter.com/kurunzitech"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter
                        size={30}
                        color="#007bff"
                        style={{ marginRight: "10px" }}
                      />
                    </Link>
                    <Link to="https://www.instagram.com/kurunzi_tech"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram
                        size={30}
                        color="#007bff"
                        style={{ marginRight: "10px" }}
                      />
                    </Link>
                    <Link to="https://www.linkedin.com/company/kurunzi-tech-media/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={30} color="#007bff" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: "20px" }}>Find us on the map</h2>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15955.25385006218!2d36.8199947!3d-1.2859453!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f114f158d9f63%3A0x53093ba43f7c6a25!2sKurunzi%20Tech%20Media%20Ltd!5e0!3m2!1sen!2ske!4v1695296880015!5m2!1sen!2ske"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;