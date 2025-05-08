import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Result.styles.css";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/Footer";
import axios from "axios";

const Result = () => {
  const location = useLocation();
  const [scanOutput, setScanOutput] = useState("Initializing scan...\n");
  const [xmlFile, setXmlFile] = useState(null);
  const [htmlFile, setHtmlFile] = useState(null);
  const [ip, setIp] = useState("Loading...");
  const [scanType, setScanType] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState("initializing");
  const outputEndRef = useRef(null);
  const [scanId, setScanId] = useState(null);
  const pollIntervalRef = useRef(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scanOutput]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("scan_id");
    setScanId(id);

    if (!id) {
      setScanOutput("Error: Missing scan ID.");
      setLoading(false);
      setScanStatus("error");
      return;
    }

    const fetchScanResults = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/api/scan-result/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        const data = response.data;
        console.log("Scan data:", data);

        setIp(data.ip || "Unknown");
        setScanType(data.scan_type || "Unknown");

        if (data.output) {
          setScanOutput(data.output);
          updateProgress(data.output);
        }

        if (data.status === "completed") {
          setLoading(false);
          setProgress(100);
          setScanStatus("completed");
          setXmlFile(data.xml_file);
          setHtmlFile(data.html_file);
          clearInterval(pollIntervalRef.current);
        }
      } catch (error) {
        console.error("Error fetching scan results:", error);
        if (error.response?.status === 401) {
          setScanOutput(prev => prev + "\nSession expired. Please log in again.");
          setScanStatus("error");
          clearInterval(pollIntervalRef.current);
        }
      }
    };

    // Initial fetch
    fetchScanResults();

    // Set up polling every 2 seconds
    pollIntervalRef.current = setInterval(fetchScanResults, 2000);

    return () => {
      clearInterval(pollIntervalRef.current);
    };
  }, [location.search]);

  const updateProgress = (output) => {
    if (output.includes("Nmap done")) {
      setProgress(100);
      setScanStatus("completed");
    } else if (output.includes("Service scan")) {
      setProgress(80);
      setScanStatus("service-detection");
    } else if (output.includes("Connect Scan Timing")) {
      setProgress(60);
      setScanStatus("port-scanning");
    } else if (output.includes("Initiating")) {
      setProgress(30);
      setScanStatus("scanning");
    }
  };

  const getStatusMessage = () => {
    switch (scanStatus) {
      case "initializing": return "Initializing scan...";
      case "scanning": return "Scanning target...";
      case "port-scanning": return "Scanning ports...";
      case "service-detection": return "Detecting services...";
      case "completed": return "Scan completed";
      case "error": return "Error occurred - check console for details";
      default: return "Scan in progress";
    }
  };

  return (
    <div>
      <div className="result">
        <NavBar />
        <div className="result-content">
          <h2>Scan Results</h2>
          <div className="scan-info">
            <p><strong>Target:</strong> {ip}</p>
            <p><strong>Scan Type:</strong> {scanType.toUpperCase()}</p>
            <p><strong>Status:</strong> {getStatusMessage()}</p>
          </div>

          {loading && (
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              <span>Progress: {progress}%</span>
            </div>
          )}

          <div className="output-container">
            <pre className="scan-output">
              {scanOutput}
              <div ref={outputEndRef} />
            </pre>
          </div>

          {!loading && (
            <div className="report-links">
              {xmlFile && (
                <a
                  href={`http://localhost:8000${xmlFile}`}
                  download={`nmap_scan_${ip}.xml`}
                  className="download-button"
                >
                  Download XML Report
                </a>
              )}
              {htmlFile && (
                <a
                  href={`http://localhost:8000${htmlFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-button"
                >
                  View HTML Report
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;