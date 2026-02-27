import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { stats, testimonials } from '../data/testimonials';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
    const sliderImages = [
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1920&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80'
    ];

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80"
                >
                    <source src="https://res.cloudinary.com/djjgkezui/video/upload/v1772193702/NIGERIAN_TRADITIONAL_BRIDAL_LOOK_YORUBA_BRIDE_EDITION_nigerianmakeupartist_makeuptutorial_480p_czg7nf.mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

                {/* Floating gradients */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D4AF37]/20 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#B76E79]/20 blur-[80px]" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block text-[#F5E6C8] text-sm tracking-[0.3em] uppercase mb-4">
                            Professional Makeup Artist
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6"
                    >
                        Luxe <span className="italic text-[#D4AF37]">Beauty</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-white/90 text-lg md:text-xl max-w-xl mb-10"
                    >
                        Enhancing your natural beauty with luxury makeup services tailored to make you look and feel extraordinary.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link to="/booking" className="btn-primary text-white">
                            Book Appointment
                        </Link>
                        <Link to="/portfolio" className="btn-secondary border-white text-white hover:bg-white hover:text-gray-900">
                            View Portfolio
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-white/70 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Image Slider Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">Our Signature Looks</h2>
                        <p className="section-subtitle">
                            Explore our collection of stunning makeup styles crafted for every occasion
                        </p>
                    </motion.div>

                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        className="pb-12"
                    >
                        {sliderImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
                                >
                                    <img
                                        src={img}
                                        alt={`Look ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="font-playfair text-xl">Bridal Glam</h3>
                                        <p className="text-white/80 text-sm">View Details</p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-20 bg-gradient-to-r from-[#F8E1E7] via-[#FFF9F5] to-[#F7E7CE]">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="font-playfair text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                                    {statsInView ? (
                                        <CountUp value={stat.value} suffix={stat.suffix} />
                                    ) : (
                                        <>0{stat.suffix}</>
                                    )}
                                </div>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title">What Our Clients Say</h2>
                        <p className="section-subtitle">
                            Real stories from our beautiful clients
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card p-8"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FiStar key={i} className="text-[#D4AF37] fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.event}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#333] via-[#444] to-[#333] relative overflow-hidden">
                <div className="floating-gradient w-96 h-96 bg-[#D4AF37]/20 -top-20 -left-20" />
                <div className="floating-gradient w-80 h-80 bg-[#B76E79]/20 bottom-0 right-0" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
                            Ready to Feel <span className="text-[#D4AF37] italic">Beautiful</span>?
                        </h2>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                            Book your appointment today and let us create a look that makes you feel confident, beautiful, and ready to shine.
                        </p>
                        <Link
                            to="/booking"
                            className="inline-flex items-center gap-2 btn-primary text-white"
                        >
                            Book Your Session
                            <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

// Counter animation component
const CountUp = ({ value, suffix }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}{suffix}
        </motion.span>
    );
};

export default Home;
