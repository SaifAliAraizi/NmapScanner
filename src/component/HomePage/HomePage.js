import React from 'react';
import NavBar from '../NavBar/NavBar';
import Hero from '../Hero/Hero';
import Summary from '../Summary/Summary';
import UsefulLinks from '../Links/UseFulLinks';
import Footer from '../Footer/Footer';
import './HomePage.styles.css';

const HomePage = () => {
  return (
    <div className="container">
      <NavBar />
      <Hero />
      <Summary />
      <UsefulLinks />
      <Footer />
    </div>
  );
};

export default HomePage;
