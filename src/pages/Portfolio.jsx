import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn } from 'react-icons/fi';
import { portfolioItems, portfolioFilters } from '../data/portfolio';

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);

    const filteredItems = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter);

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
                            Our Work
                        </span>
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
                            Portfolio <span className="italic text-[#D4AF37]">Gallery</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Explore our collection of stunning looks across makeup, lip gloss, nails, and hair services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Buttons */}
            <section className="py-8 bg-white sticky top-20 z-30 border-b">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-3">
                        {portfolioFilters.map((filter) => (
                            <motion.button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id
                                    ? 'bg-[#D4AF37] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                                    }`}
                            >
                                {filter.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Masonry Gallery */}
            <section className="py-16">
                <div className="container-custom">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="break-inside-avoid group cursor-pointer"
                                    onClick={() => setLightboxImage(item)}
                                >
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Content */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                                                <FiZoomIn className="text-white text-2xl" />
                                            </div>
                                            <h3 className="font-playfair text-xl text-white text-center px-4">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/70 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            onClick={() => setLightboxImage(null)}
                        >
                            <FiX size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-5xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightboxImage.image}
                                alt={lightboxImage.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                <h3 className="font-playfair text-2xl text-white">{lightboxImage.title}</h3>
                                <p className="text-white/70">{lightboxImage.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
