import './About.styles.css';
import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/Footer";

const About = () => {
  return (
    <div>
      <div className='About-page'>
        <NavBar />
        <section name='about' className='about'>
          <div className='about-container'>
            <h1 className='about-title'>Namp Scanner</h1>
            <h2 className='about-subtitle'>London</h2>
            <p className='about-text'>
              Nmap (Network Mapper) is a free and open-source tool for network discovery and security auditing. It is widely used for network inventory, managing service upgrade schedules, and monitoring host or service uptime. <br />
              <br />
              Nmap supports various scanning techniques to identify hosts, services, and security vulnerabilities in a network.
            </p>
          </div>
          <div className='about-image-container'>
            <div className='about-container-one'>
              <img
                src={about2}
                alt='Mario and Adrian 1'
                className='about-image-one'
              />
            </div>
            <div className='about-container-two'>
              <img
                src={about1}
                alt='Mario and Adrian 2'
                className='about-image-two'
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
