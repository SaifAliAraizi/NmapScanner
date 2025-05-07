import React, { useState } from 'react';
import axios from 'axios';
import { MDBCheckbox, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/Footer";
import "../ContactUs/ContactUs.styles.css";
import contactImg from "../../assets/about1.jpg";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    send_copy: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/contact/', formData);
      alert('Message sent successfully!');
      // Optionally reset the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        send_copy: false
      });
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="contact-page">
        <NavBar />

        <div className="contact-section">
          <div className="contact-form">
            <h2>Contact Us</h2>

            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">Message</label>
              <MDBTextArea
                id="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="checkbox-container">
              <MDBCheckbox
                id="send_copy"
                label="Send me a copy"
                checked={formData.send_copy}
                onChange={handleChange}
                className="form-check-input"
              />
            </div>

            <MDBBtn block className="btn" onClick={handleSubmit}>
              Send
            </MDBBtn>
          </div>

          <div className="contact-image">
            <img className="contactImage" src={contactImg} alt="Contact" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
