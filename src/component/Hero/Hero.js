import React, { useState } from "react";
import "../Hero/Hero.styles.css";
import heroImage from "../../assets/bg1.jpg";
import Summary from "../Summary/Summary";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [scanType, setScanType] = useState("tcp");
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!ipAddress.trim()) {
      alert("Please enter a valid IP or domain.");
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // Store the intended scan and redirect to login
        localStorage.setItem('intendedScan', JSON.stringify({
          ip: ipAddress,
          scanType: scanType
        }));
        alert("Please log in to perform scans.");
        navigate("/login");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/scan/", {
        ip: ipAddress,
        scanType: scanType,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const { scan_id } = response.data;
      navigate(`/result?scan_id=${scan_id}`);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem('accessToken');
        navigate("/login");
      } else {
        alert("Scan failed. Make sure the backend server is running.");
      }
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Nmap doesn't hack. It reveals.</h1>
          <p>The best defense starts with reconnaissance—Nmap is your eyes.</p>
          <div className="scan-section">
            <input
              type="text"
              placeholder="Enter Domain or IP to Nmap scan..."
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <select
              className="scan-options"
              value={scanType}
              onChange={(e) => setScanType(e.target.value.toLowerCase())}
            >
              <option value="tcp">TCP Scan</option>
              <option value="udp">UDP Scan</option>
              <option value="full">Full Scan</option>
            </select>
            <button className="scan-button" onClick={handleScan}>
              Start Scan
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Cyber Security" />
        </div>
      </section>

      <Summary scanType={scanType} />
    </>
  );
};

export default Hero;
