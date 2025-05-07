import React, { useState } from 'react';
import axios from 'axios';
import { MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import "../SignUp/SignUp.styles.css";
import signUpImg from "../../assets/signup.jpg";
import RegNavBar from "../../component/RegNavBar/RegNavbar";
import { useNavigate } from "react-router-dom";

// Utility function to get CSRF token from cookies
const getCSRFToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; csrftoken=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const csrfToken = getCSRFToken();  // Get the CSRF token

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username: name,
        email,
        password,
        confirm_password: confirmPassword
      }, {
        headers: {
          'X-CSRFToken': csrfToken,  // Include CSRF token in the request header
        }
      });

      if (response.status === 201) {
        alert("User registered successfully! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      const msg = err.response?.data?.email || "An error occurred. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="signup-page">
      <RegNavBar />
      <div className="signup-section">
        <div className="signup-form">
          <h2>Sign Up</h2>
          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="checkbox-container">
            <MDBCheckbox label="I agree to the terms and conditions" className="form-check-input" />
          </div>

          <MDBBtn block className="btn" onClick={handleSubmit}>Sign Up</MDBBtn>
        </div>
        <div className="signup-image">
          <img src={signUpImg} alt="Sign Up" />
        </div>
      </div>
    </div>
  );
}
