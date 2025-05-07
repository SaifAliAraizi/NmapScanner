//SOCIAL ICONS
import { FaFacebook,FaTwitter, FaInstagram} from 'react-icons/fa';

// LINKS FOR NAVBAR
export const links = [
  {
    id: 2,
    link: 'home',
  },
  {
    id: 2,
    link: 'about',
  },
  {
    id: 3,
    link: 'result',
  },
  {
    id: 4,
    link: 'documentation',
  },
  {
    id: 5,
    link: 'contact',
  },
  {
    id: 6,
    link: 'login',
  },
  {
    id: 7,
    link: 'signup',
  },
];

// LINKS FOR NAVBAR
export const reglinks = [
  {
    id: 1,
    link: 'login',
  },
  {
    id: 2,
    link: 'signup',
  },
];

export const authLinks = [
  { link: "home", id: 1 },
  { link: "about", id: 2 },
  { link: "documentation", id: 3 },
  { link: "contact", id: 4 },
  { link: "logout", id: 5 }
];

export const unauthLinks = [
  { link: "home", id: 1 },
  { link: "about", id: 2 },
  { link: "documentation", id: 3 },
  { link: "contact", id: 4 },
  { link: "login", id: 5 },
  { link: "signup", id: 6 }
];

// Documentation Content
export const documentationContent = {
  title: "Nmap Scanner Documentation",
  description: "Nmap (Network Mapper) is a free and open-source tool for network discovery and security auditing. It is widely used for network inventory, managing service upgrade schedules, and monitoring host or service uptime.",
  scanTypes: [
    {
      title: "TCP Scan",
      description: "A TCP scan (-sT) establishes a full connection with each target port. It is useful when SYN scans are not possible due to restrictions.",
      command: "nmap -sT <target-ip>",
      usage: "Suitable for scanning when you have full network access."
    },
    {
      title: "UDP Scan",
      description: "A UDP scan (-sU) is used to check open UDP ports on a target. Since UDP is connectionless, this scan is slower than TCP scans.",
      command: "nmap -sU <target-ip>",
      usage: "Useful for detecting services like DNS, SNMP, and DHCP."
    },
    {
      title: "Full Scan",
      description: "A full scan performs a comprehensive analysis, scanning all 65,535 ports using TCP and gathering extensive details.",
      command: "nmap -sT -T4 -sV -O -p 1-65535 -vv <target-ip> -oX myScan.xml",
      usage: "Recommended for in-depth security audits."
    }
  ]
};

// FOOTER CONTACT
export const contacts = [
  {
    id: 1,
    link: 'tel:+5511234567',
    title: '📞 Phone: (555) 123-4567',
  },
  {
    id: 2,
    link: 'mailto:littlemon@bookings.com',
    title: '✉️ Email: contact@littlelemon.com',
  },
];

// FOOTER SOCIAL LINKS
export const socials = [
  {
    id: 1,
    child: <FaFacebook size={30} />,
    link: 'https://facebook.com/NmapScans',
  },
  {
    id: 2,
    child: <FaInstagram size={30} />,
    link: 'https://linkedin.com/company/NmapScans',
  },
  {
    id: 4,
    child: <FaTwitter size={30} />,
    link: 'https://github.com/NmapScans',
  },
];
