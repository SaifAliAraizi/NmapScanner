import React, { useState } from 'react';
import axios from 'axios';
import { MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import "../Login/Login.styles.css";
import loginImg from "../../assets/login.jpg";
import RegNavBar from "../../component/RegNavBar/RegNavbar";

// Utility function to get CSRF token from cookies
const getCSRFToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; csrftoken=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const csrfToken = getCSRFToken();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password
      }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });

      if (response.data.access) {
        // Store the access token in localStorage
        localStorage.setItem("accessToken", response.data.access);

        // Check for intended scan
        const intendedScan = localStorage.getItem('intendedScan');
        if (intendedScan) {
          const scanData = JSON.parse(intendedScan);
          localStorage.removeItem('intendedScan');
          // Navigate to home with scan parameters
          navigate(`/home?ip=${encodeURIComponent(scanData.ip)}&type=${scanData.scanType}`);
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed. Please try again.";
      setError(msg);
    }
  };


  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <RegNavBar />
      <div className="login-section">
        <div className="login-form">
          <h2>Sign In</h2>
          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="checkbox-container">
            <MDBCheckbox label="Remember me" className="form-check-input" />
          </div>

          <MDBBtn block className="btn" onClick={handleSubmit}>Sign In</MDBBtn>

          <div className="signup-prompt">
            <span>Don't have an account? </span>
            <MDBBtn color="link" onClick={handleSignUpRedirect}>Sign Up</MDBBtn>
          </div>
        </div>
        <div className="login-image">
          <img src={loginImg} alt="Login" />
        </div>
      </div>
    </div>
  );
}