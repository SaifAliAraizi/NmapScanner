import React from 'react';
import footer from '../../assets/footer.png';
import './Footer.styles.css';
import { links, contacts, socials } from '../../data';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  // Navigation Links
  const navLinks = links.map(({ link, id }) => (
    <li key={id}>
      <NavLink to={`/${link}`} className='footer-links'>
        {link.charAt(0).toUpperCase() + link.slice(1)}
      </NavLink>
    </li>
  ));

  // Contact Links
  const contactLinks = contacts.map(({ link, id, title }) => (
    <li key={id}>
      <a href={link} className='contact-links'>
        {title}
      </a>
    </li>
  ));

  // Social Links
  const socialLinks = socials.map(({ id, child, link }) => (
    <li key={id}>
      <a href={link} target='_blank' rel='noreferrer' className='social-links'>
        {child}
      </a>
    </li>
  ));

  return (
    <footer>
      <nav className='footer-container'>
        <div className='footer-photo-container'>
          <img src={footer} className='footer-photo' alt='logo' />
        </div>

        <ul className='grid-item-nav'>
          <p className='footer-title'>Navigation</p>
          {navLinks}
        </ul>

        <ul className='grid-item-contact'>
          <p className='footer-title'>Contact</p>
          <address>
            You may also want to visit us:
            <br />
            Nmap Scanner
            <br />
            📍 Address:
            <br />
            123 Main Street, UK
            <br />
            <br />
            <div className='contacts'>{contactLinks}</div>
          </address>
        </ul>

        <ul className='grid-item-socials'>
          <p className='footer-title'>Social Media</p>
          {socialLinks}
        </ul>
      </nav>

      <p className='copyright'>
        <a className='linkedin-link' target='_blank' href='https://www.linkedin.com/in/syed-saif-ali-shah-764971282/' rel='noreferrer'>
          Copyright &copy; {new Date().getFullYear()}{' '} nmapscanner.com, Syed Saif Ali Shah
        </a>
      </p>
    </footer>
  );
};

export default Footer;
