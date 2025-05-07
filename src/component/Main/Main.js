import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import ResultPage from '../../pages/Result/Result';
import AboutPage from '../../pages/About/About';
import DocumentationPage from '../../pages/Documentation/Documentation';
import ContactPage from '../../pages/ContactUs/ContactUs';
import LoginPage from '../../pages/Login/Login';
import SignupPage from '../../pages/SignUp/SignUp';
import ScanForm from '../../pages/ScanForm/ScanForm';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/scanform" element={<ScanForm />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default Main;
