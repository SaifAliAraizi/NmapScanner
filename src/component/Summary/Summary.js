import React from "react";
import "../Summary/Summary.styles.css";
import { documentationContent } from "../../data";

const Summary = ({ scanType }) => {
  if (!scanType) return null; // Don't show empty space when no scan is selected

  // Find matching scan based on title, since scanType is 'tcp', 'udp', 'full'
  const scanData = documentationContent.scanTypes.find(scan =>
    scan.title.toLowerCase().includes(scanType)
  );

  return (
    <div className="documentation-page">
      <div className="documentation-content">
        <h1>{documentationContent.title}</h1>
        <p>{documentationContent.description}</p>

        <h2>Selected Scan Type</h2>
        {scanData ? (
          <div className="doc-scan-section">
            <h3>{scanData.title}</h3>
            <p>{scanData.description}</p>
            <pre>
              <code>{scanData.command}</code>
            </pre>
            <p><strong>Usage:</strong> {scanData.usage}</p>
          </div>
        ) : (
          <p className="error-message">No matching scan type found.</p>
        )}
      </div>
    </div>
  );
};

export default Summary;
