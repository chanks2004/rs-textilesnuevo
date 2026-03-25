import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { TShirtsPage } from './pages/TShirtsPage';
import { HoodiesPage } from './pages/HoodiesPage';
import { HatsPage } from './pages/HatsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/tshirts" element={<TShirtsPage />} />
          <Route path="/hoodies" element={<HoodiesPage />} />
          <Route path="/hats" element={<HatsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
