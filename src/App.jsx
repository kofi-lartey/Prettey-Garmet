import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogAdmin from './pages/BlogAdmin';
import BlogPost from './pages/BlogPost';

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-admin" element={<BlogAdmin />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollToTopOnRouteChange />
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
};

export default App;
