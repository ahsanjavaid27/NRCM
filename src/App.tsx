import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import SpecialtiesPage from './pages/Specialties';
import AboutPage from './pages/About';
import HowItWorksPage from './pages/HowItWorks';
import ResourcesPage from './pages/Resources';
import FaqPage from './pages/FAQ';
import ContactPage from './pages/Contact';
import RequestAQuotePage from './pages/RequestAQuote';
import NotFoundPage from './pages/NotFound';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import ServiceDetailRoute from './pages/services/ServiceDetailRoute';
import ResourceDetailRoute from './pages/resources/ResourceDetailRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailRoute />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ResourceDetailRoute />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-a-quote" element={<RequestAQuotePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
