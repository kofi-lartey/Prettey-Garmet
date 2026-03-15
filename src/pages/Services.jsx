import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheck, FiArrowRight } from 'react-icons/fi';
import { services, serviceCategories } from '../data/services';

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    // Check if a service is a lip gloss product (to show Order instead of Book)
    const isLipGloss = (service) => service.category === 'lipgloss';

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
                            Our Services
                        </span>
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
                            Luxury <span className="italic text-[#D4AF37]">Beauty</span> Services
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Discover our full range of professional beauty services - from stunning makeup to luxurious nail care, custom lip gloss, and expert wig services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* NB Note */}
            <section className="py-4 bg-amber-50">
                <div className="container-custom">
                    <p className="text-center text-amber-800 text-sm font-medium">
                        <span className="font-bold">NB:</span> Prices may differ based on your location. Contact us for a quote.
                    </p>
                </div>
            </section>

            {/* Filter */}
            <section className="py-8 sticky top-20 bg-white/90 backdrop-blur-md z-30 border-b">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-3">
                        {serviceCategories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-[#D4AF37] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                                    }`}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="container-custom">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredServices.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card group"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="font-playfair text-2xl text-gray-900">
                                                {service.name}
                                            </h3>
                                            {service.price ? (
                                                <span className="text-[#D4AF37] font-semibold text-xl">
                                                    GH₵{service.price}
                                                </span>
                                            ) : (
                                                <span className="text-[#D4AF37] font-semibold text-sm">
                                                    {service.note || 'Contact for pricing'}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-500 mb-4">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                            <FiClock />
                                            <span>{service.duration}</span>
                                        </div>

                                        {/* Includes */}
                                        <div className="mb-6">
                                            <p className="text-sm text-gray-400 mb-2">Includes:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {service.includes.map((item, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-3 py-1 bg-[#F8E1E7] text-gray-600 rounded-full"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Link
                                            to={isLipGloss(service) ? `/booking?product=${service.id}` : `/booking?service=${service.id}`}
                                            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] font-medium transition-all duration-300 hover:bg-[#D4AF37] hover:text-white group-hover:shadow-lg"
                                        >
                                            {isLipGloss(service) ? 'Order Now' : 'Book Now'}
                                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[#FFF9F5]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title">Why Choose Girlies Luxe?</h2>
                        <p className="section-subtitle">
                            We believe in delivering an exceptional experience every time
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Premium Products',
                                description: 'We use only the finest luxury beauty brands to ensure your look lasts all day and night.',
                                icon: '✨'
                            },
                            {
                                title: 'All-in-One Beauty',
                                description: 'From makeup to nails, lip gloss to wigs - get all your beauty needs in one place.',
                                icon: '💕'
                            },
                            {
                                title: 'Relaxing Experience',
                                description: 'Enjoy a pampering session in our beautiful studio while we create your perfect look.',
                                icon: '🌸'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 bg-white rounded-2xl shadow-lg"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-playfair text-xl mb-3">{item.title}</h3>
                                <p className="text-gray-500">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
