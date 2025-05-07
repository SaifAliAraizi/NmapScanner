import React, { useState } from 'react';
import axios from 'axios';

const ScanForm = () => {
  const [ip, setIp] = useState('');
  const [scanType, setScanType] = useState('tcp');
  const [output, setOutput] = useState('');
  const [xmlLink, setXmlLink] = useState('');
  const [htmlLink, setHtmlLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    setOutput('');
    setXmlLink('');
    setHtmlLink('');

    try {
      const response = await axios.post('http://localhost:8000/api/scan/', {
        ip,
        scanType,
      });

      setOutput(response.data.output);
      setXmlLink(response.data.xmlFile);
      setHtmlLink(response.data.htmlFile);
    } catch (error) {
      setOutput(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Nmap Scanner</h2>

      <div className="mb-4">
        <label className="block mb-1">Target IP</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="e.g., 192.168.1.1"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Scan Type</label>
        <select
          className="w-full border p-2 rounded"
          value={scanType}
          onChange={(e) => setScanType(e.target.value)}
        >
          <option value="tcp">TCP</option>
          <option value="udp">UDP</option>
          <option value="full">Full (TCP + UDP)</option>
        </select>
      </div>

      <button
        onClick={handleScan}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Scanning...' : 'Start Scan'}
      </button>

      {output && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Scan Output:</h3>
          <pre className="bg-gray-900 text-white p-4 rounded max-h-[400px] overflow-auto">
            {output}
          </pre>

          <div className="mt-4 flex gap-4">
            {xmlLink && (
              <a
                href={xmlLink}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Download XML
              </a>
            )}
            {htmlLink && (
              <a
                href={htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
              >
                View HTML Report
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanForm;
