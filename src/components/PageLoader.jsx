import { motion } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

const PageLoader = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-white via-[#faf8f5] to-[#F5E6C8]"
        >
            <div className="flex flex-col items-center gap-6">
                {/* Animated Logo with glow and float */}
                <motion.div
                    animate={{
                        rotate: 360,
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        y: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                        scale: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                    className="relative"
                >
                    {/* Glow effect */}
                    <motion.div
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(212, 175, 55, 0.3)',
                                '0 0 40px rgba(212, 175, 55, 0.5)',
                                '0 0 20px rgba(212, 175, 55, 0.3)',
                            ],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-28 h-28 md:w-36 md:h-36 rounded-full"
                    >
                        <img
                            src="https://res.cloudinary.com/djjgkezui/image/upload/v1772716606/IMG-20260302-WA0015_plfqzv.jpg"
                            alt="Girlies Luxe"
                            className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-[#D4AF37]"
                        />
                    </motion.div>

                    {/* Outer ring animation */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute inset-[-8px] rounded-full border-2 border-[#D4AF37] border-dashed"
                    />
                </motion.div>

                {/* Loading text with shimmer */}
                <div className="relative overflow-hidden">
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="flex items-center gap-1"
                    >
                        <span className="text-[#D4AF37] text-2xl font-light tracking-widest">
                            L
                        </span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="text-gray-700 text-lg font-medium"
                        >
                            o
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                            className="text-gray-700 text-lg font-medium"
                        >
                            a
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="text-gray-700 text-lg font-medium"
                        >
                            d
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                            className="text-gray-700 text-lg font-medium"
                        >
                            i
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="text-gray-700 text-lg font-medium"
                        >
                            n
                        </motion.span>
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.5 }}
                            className="text-gray-700 text-lg font-medium"
                        >
                            g
                        </motion.span>
                        <span className="text-[#D4AF37] text-2xl font-light tracking-widest">
                            .
                        </span>
                    </motion.div>

                    {/* Shimmer line */}
                    <motion.div
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"
                    />
                </div>

                {/* Decorative dots */}
                <div className="flex gap-2 mt-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                backgroundColor: ['#D4AF37', '#F5E6C8', '#D4AF37'],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                            }}
                            className="w-2 h-2 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PageLoader;
