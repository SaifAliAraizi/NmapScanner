import React from "react";
import "../Documentation/Documentation.styles.css";
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/Footer";
import { documentationContent } from "../../data";

const Documentation = () => {
  return (
    <div>
      <div className="documentation-page">
        <NavBar />
        <div className="documentation-content">
          <h1>{documentationContent.title}</h1>
          <p>{documentationContent.description}</p>

          <h2>Scan Types</h2>
          {documentationContent.scanTypes.map((scan, index) => (
            <div key={index} className="doc-scan-section">
              <h3>{scan.title}</h3>
              <p>{scan.description}</p>
              <pre>
                <code>{scan.command}</code>
              </pre>
              <p><strong>Usage:</strong> {scan.usage}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;
