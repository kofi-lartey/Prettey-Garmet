import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    const instagramImages = [
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&q=80',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80'
    ];

    const socialLinks = [
        { icon: FiInstagram, href: '#', label: 'Instagram' },
        { icon: FiFacebook, href: '#', label: 'Facebook' },
        { icon: FiTwitter, href: '#', label: 'Twitter' }
    ];

    return (
        <footer className="bg-gray-900 text-white pt-20 pb-8">
            {/* Floating gradient background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="floating-gradient w-96 h-96 bg-[#D4AF37]/10 -bottom-20 -left-20" />
                <div className="floating-gradient w-80 h-80 bg-[#B76E79]/10 top-40 right-20" />
            </div>

            <div className="container-custom relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <span className="font-playfair text-3xl font-semibold">Luxe</span>
                            <span className="font-playfair text-3xl font-light italic text-[#D4AF37]">Beauty</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Creating beautiful memories one face at a time. Professional makeup services tailored to enhance your natural beauty.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-playfair text-xl mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Services', 'Portfolio', 'Contact', 'Book Now'].map((link) => (
                                <li key={link}>
                                    <Link
                                        to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-playfair text-xl mb-6">Services</h4>
                        <ul className="space-y-3">
                            {['Bridal Makeup', 'Engagement Makeup', 'Birthday Glam', 'Photoshoot Makeup', 'Everyday Soft Glam'].map((service) => (
                                <li key={service}>
                                    <span className="text-gray-400">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-playfair text-xl mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <FiMapPin className="text-[#D4AF37] mt-1 flex-shrink-0" />
                                <span>123 Beauty Lane<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FiPhone className="text-[#D4AF37] flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FiMail className="text-[#D4AF37] flex-shrink-0" />
                                <span>hello@luxebeauty.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Instagram Preview */}
                <div className="mb-16">
                    <h4 className="font-playfair text-xl mb-6 text-center">Follow Us @LuxeBeauty</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {instagramImages.map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                            >
                                <img
                                    src={img}
                                    alt={`Instagram ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <FiInstagram className="text-white text-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © 2026 Luxe Beauty Studio. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
