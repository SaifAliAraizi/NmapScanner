import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { EventSourcePolyfill } from 'event-source-polyfill';
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
  const eventSourceRef = useRef(null);
  const outputEndRef = useRef(null);

  // Auto-scroll to bottom of output
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scanOutput]);

  useEffect(() => {
    const scanId = new URLSearchParams(location.search).get("scan_id");
    if (!scanId) {
      setScanOutput("Error: Missing scan ID.");
      setLoading(false);
      return;
    }

    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/scan-result/${scanId}/`);

        setIp(response.data.ip || "Unknown");
        setScanType(response.data.scan_type || "Unknown");

        if (response.data.status === "completed") {
          handleCompletedScan(response.data);
        } else {
          if (response.data.output) {
            setScanOutput(response.data.output);
            updateProgress(response.data.output);
          }
          startSSEConnection(scanId);
        }
      } catch (error) {
        console.error("Initial fetch error:", error);
        setScanOutput(prev => prev + "\nError: Failed to connect to scan service.");
        setLoading(false);
        setScanStatus("error");
      }
    };

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

    const startSSEConnection = (scanId) => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSourcePolyfill(
        `http://localhost:8000/api/scan-result/${scanId}/`,
        {
          headers: {
            'Accept': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: false,
          heartbeatTimeout: 60000,
          retryInterval: 5000
        }
      );

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("SSE connection established");
        setScanStatus("connected");
        setScanOutput(prev => prev + "\nConnected to scan service...");
      };

      eventSource.onmessage = (event) => {
        const newData = event.data.trim();
        if (!newData) return;

        setScanOutput(prev => {
          const updatedOutput = prev + newData + '\n';
          updateProgress(updatedOutput);
          return updatedOutput;
        });
      };

      eventSource.addEventListener('complete', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.status === "completed") {
            eventSource.close();
            setProgress(100);
            setScanStatus("completed");
            fetchFinalResult(scanId);
          }
        } catch (e) {
          console.error("Error parsing complete event:", e);
        }
      });

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        setScanStatus("error");
        if (eventSource.readyState === EventSourcePolyfill.CLOSED) {
          setScanOutput(prev => prev + "\nConnection lost. Reconnecting...");
          setTimeout(() => fetchInitialData(), 2000);
        }
      };
    };

    const fetchFinalResult = async (scanId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/scan-result/${scanId}/`);
        handleCompletedScan(response.data);
      } catch (error) {
        console.error("Final fetch error:", error);
        setScanOutput(prev => prev + "\nFailed to load final results.");
        setLoading(false);
      }
    };

    const handleCompletedScan = (data) => {
      setScanOutput(data.output || "Scan completed with no output");
      setXmlFile(data.xml_file);
      setHtmlFile(data.html_file);
      setLoading(false);
      setProgress(100);
      setScanStatus("completed");
    };

    fetchInitialData();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [location.search]);

  const getStatusMessage = () => {
    switch (scanStatus) {
      case "initializing": return "Initializing scan...";
      case "connected": return "Connected to scan service";
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