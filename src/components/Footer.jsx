import { Link } from 'react-router-dom';
import { color, motion } from 'framer-motion';
import { FiInstagram, FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand & Social */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-6">
                            <span className="font-playfair text-3xl font-semibold">Girlies</span>
                            <span className="font-playfair text-3xl font-light italic text-[#D4AF37]">Luxe</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your one-stop beauty destination for makeup, wigs, nails, and lip gloss services.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: FiInstagram, href: 'https://instagram.com/girlies__luxe', label: 'Instagram' },
                                { icon: SiTiktok, href: 'https://tiktok.com/@girlies968', label: 'TikTok' }
                            ].map((social) => (
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
                        <h4 className="font-playfair text-lg mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#D4AF37]"></span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Services', path: '/services' },
                                { name: 'Portfolio', path: '/portfolio' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'Blog', path: '/blog' },
                                { name: 'Book Now', path: '/booking' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-playfair text-lg mb-6 relative inline-block">
                            Our Services
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#D4AF37]"></span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                'Bridal Makeup',
                                'Wig Services',
                                'Nail Services',
                                'Lip Gloss',
                                'Event Glam'
                            ].map((service) => (
                                <li key={service}>
                                    <span className="text-gray-400">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-playfair text-lg mb-6 relative inline-block">
                            Get in Touch
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#D4AF37]"></span>
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <FiMapPin className="text-[#D4AF37] mt-1 flex-shrink-0" />
                                <a
                                    href="https://www.google.com/maps?q=5.6068032,-0.1021721"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#D4AF37] transition-colors"
                                >
                                    Nungua Kantmato, Accra
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FiPhone className="text-[#D4AF37] flex-shrink-0" />
                                <span>0547510771</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FiClock className="text-[#D4AF37] flex-shrink-0" />
                                <span>Mon - Sat: 9AM - 6PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Girlies Luxe. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Designed by <span className="text-[#D4AF37] font-medium">kofiLartey</span> +233557655008
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="/privacy" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Privacy</a>
                            <a href="/terms" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
