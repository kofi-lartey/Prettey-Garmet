import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { stats, testimonials } from '../data/testimonials';
import { serviceCategories } from '../data/services';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    const videos = [
        'https://res.cloudinary.com/djjgkezui/video/upload/v1772193702/NIGERIAN_TRADITIONAL_BRIDAL_LOOK_YORUBA_BRIDE_EDITION_nigerianmakeupartist_makeuptutorial_480p_czg7nf.mp4',
        'https://res.cloudinary.com/djjgkezui/video/upload/v1772290578/New_pixie_glueless_wig_install_wigs_720p_eqxkvw.mp4',
        'https://res.cloudinary.com/djjgkezui/video/upload/v1772290581/the_texture_on_these_nails_is_SO_cool_diy_gel_nail_tutorial_nails_tutorial_nailart_diy_1080p_dnamiu.mp4',
        'https://res.cloudinary.com/djjgkezui/video/upload/v1772290584/brown_lip_liner_clear_lip_gloss_combo_fentybeauty_shortsfeed_shortvideo_shorts_shortviral_1080p_a8hmwb.mp4'
    ];

    const posterImages = [
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80',
        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=80',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80',
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1920&q=80'
    ];

    const sliderImages = [
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80',
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1920&q=80',
        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=80'
    ];

    // Cycle through videos every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [videos.length]);

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen">
                {/* Video Background */}
                {videos.map((video, index) => (
                    <video
                        key={index}
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'}`}
                        poster={posterImages[index] || posterImages[0]}
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                ))}

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
                            Beauty & Wellness Studio
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6"
                    >
                        Girlies <span className="italic text-[#D4AF37]">Luxe</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-white/90 text-lg md:text-xl max-w-xl mb-10"
                    >
                        Your one-stop beauty destination for makeup, nails, lip gloss, and hair services. Look stunning, feel confident.
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

                {/* Video Indicators */}
                <div className="absolute bottom-8 right-8 z-10 flex gap-2">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentVideoIndex
                                ? 'bg-[#D4AF37] w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Switch to video ${index + 1}`}
                        />
                    ))}
                </div>
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
                            Explore our collection of stunning styles across all our beauty services
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

            {/* Services Categories */}
            <section className="py-20 bg-gradient-to-r from-[#FFF5F8] via-[#FFF9F5] to-[#F5F5FF]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 block">
                            What We Offer
                        </span>
                        <h2 className="section-title">Our Beauty Services</h2>
                        <p className="section-subtitle">
                            From head to toe, we've got you covered with our comprehensive beauty services
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {serviceCategories.filter(cat => cat.id !== 'all').map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to="/services">
                                    <motion.div
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg text-center h-full"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B76E79]/20 flex items-center justify-center">
                                            {category.id === 'makeup' && (
                                                <span className="text-2xl">💄</span>
                                            )}
                                            {category.id === 'lipgloss' && (
                                                <span className="text-2xl">💋</span>
                                            )}
                                            {category.id === 'nails' && (
                                                <span className="text-2xl">💅</span>
                                            )}
                                            {category.id === 'hair' && (
                                                <span className="text-2xl">👩‍🦱</span>
                                            )}
                                        </div>
                                        <h3 className="font-playfair text-xl text-gray-900 mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            Explore services
                                        </p>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:gap-4 transition-all"
                        >
                            View All Services
                            <FiArrowRight />
                        </Link>
                    </motion.div>
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
                                        <CountUp value={stat.value} suffix={stat.suffix} enableScrollSpy={statsInView} />
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
                            Book your appointment today and let us create a look that makes you feel confident, beautiful, and ready to shine. All beauty services in one place!
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
const CountUp = ({ value, suffix, enableScrollSpy }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!enableScrollSpy) return;

        setHasStarted(true);
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, enableScrollSpy]);

    const displayValue = hasStarted ? count : 0;

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayValue >= 1000 ? `${(displayValue / 1000).toFixed(0)}K` : displayValue}{suffix}
        </motion.span>
    );
};

export default Home;
