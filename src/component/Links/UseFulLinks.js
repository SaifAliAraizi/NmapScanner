import React from 'react';
import './UseFulLinks.styles.css';

const links = [
  { name: "Simulate DDoS Attack Online", url: "https://ddosattack.online" },
  { name: "Online Nikto Scanner", url: "https://nikto.online" },
  { name: "Static Application Security Testing", url: "https://sast.online" },
  { name: "Nmap (nmap.org)", url: "https://nmap.org" },
];

const UsefulLinks = () => {
  return (
    <section className="useful-links">
      <h3>Useful Links</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsefulLinks;
