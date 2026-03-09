import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLoading } from '../context/LoadingContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleRouteChange = () => {
            stopLoading();
        };
        handleRouteChange();
    }, [location, stopLoading]);

    const handleNavClick = (e, path) => {
        // Always trigger loading for better UX
        startLoading();
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Shop Lip Gloss', path: '/booking?product=19' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
        { name: 'Book Now', path: '/booking', isButton: true }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-transparent'
                    }`}
            >
                <div className={`container-custom ${isScrolled ? 'py-4' : 'py-6'}`}>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg ${isScrolled ? 'ring-2 ring-[#D4AF37]' : 'ring-2 ring-white/50'}`}>
                                <img
                                    src="https://res.cloudinary.com/djjgkezui/image/upload/v1772716606/IMG-20260302-WA0015_plfqzv.jpg"
                                    alt="Girlies Luxe"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className={`font-playfair text-xl md:text-2xl font-semibold ${isScrolled ? 'text-[#333]' : 'text-white'
                                }`}>
                                Girlies
                            </span>
                            <span className={`font-playfair text-xl md:text-2xl font-light italic ${isScrolled ? 'text-[#D4AF37]' : 'text-[#F5E6C8]'
                                }`}>
                                Luxe
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    className={`font-medium transition-colors duration-300 ${link.isButton
                                        ? 'px-6 py-2.5 rounded-full gold-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300'
                                        : `${isScrolled ? 'text-gray-700 hover:text-[#D4AF37]' : 'text-white/90 hover:text-white'}`
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`md:hidden p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                        >
                            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false);
                                            handleNavClick(e, link.path);
                                        }}
                                        className={`font-playfair text-3xl transition-colors duration-300 ${link.isButton
                                            ? 'px-8 py-3 rounded-full gold-gradient text-white'
                                            : 'text-gray-700 hover:text-[#D4AF37]'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
