import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiTwitter, FiSend } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: FiMapPin,
            title: 'Studio Address',
            details: ['123 Beauty Lane', 'New York, NY 10001'],
            color: 'bg-[#F8E1E7]'
        },
        {
            icon: FiPhone,
            title: 'Phone',
            details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
            color: 'bg-[#F7E7CE]'
        },
        {
            icon: FiMail,
            title: 'Email',
            details: ['hello@luxebeauty.com', 'book@luxebeauty.com'],
            color: 'bg-[#E8DED5]'
        },
        {
            icon: FiClock,
            title: 'Studio Hours',
            details: ['Mon - Sat: 9AM - 7PM', 'Sunday: By Appointment'],
            color: 'bg-[#F8E1E7]'
        }
    ];

    const socials = [
        { icon: FiInstagram, label: 'Instagram', href: '#' },
        { icon: FiFacebook, label: 'Facebook', href: '#' },
        { icon: FiTwitter, label: 'Twitter', href: '#' }
    ];

    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <section className="py-20 bg-gradient-to-b from-[#FFF9F5] to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 block">
                            Get In Touch
                        </span>
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
                            Contact <span className="italic text-[#D4AF37]">Us</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl"
                        >
                            <h2 className="font-playfair text-2xl mb-6">Send Us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-600 mb-2 text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 mb-2 text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-600 mb-2 text-sm font-medium">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 mb-2 text-sm font-medium">Event Date</label>
                                        <input
                                            type="date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleChange}
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="input-field min-h-[150px] resize-none"
                                        placeholder="Tell us about your event and what you're looking for..."
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-full gold-gradient text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <FiSend />
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Info Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-2xl shadow-lg"
                                    >
                                        <div className={`w-12 h-12 rounded-full ${info.color} flex items-center justify-center mb-4`}>
                                            <info.icon className="text-[#D4AF37]" size={22} />
                                        </div>
                                        <h3 className="font-playfair text-lg mb-2">{info.title}</h3>
                                        {info.details.map((detail, i) => (
                                            <p key={i} className="text-gray-500 text-sm">{detail}</p>
                                        ))}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-r from-[#333] to-[#444] p-8 rounded-3xl text-white"
                            >
                                <h3 className="font-playfair text-xl mb-4">Follow Us</h3>
                                <p className="text-white/70 mb-6">
                                    Stay updated with our latest looks and beauty tips
                                </p>
                                <div className="flex gap-4">
                                    {socials.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] transition-colors"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* WhatsApp Button */}
                            <motion.a
                                href="https://wa.me/15551234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 bg-[#25D366] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <div>
                                    <p className="font-semibold">Quick Chat</p>
                                    <p className="text-white/70 text-sm">Click to start a conversation</p>
                                </div>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] bg-gray-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    title="Studio Location"
                />
            </section>
        </div>
    );
};

export default Contact;
