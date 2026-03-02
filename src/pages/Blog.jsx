import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight, FiEdit3, FiPlay, FiImage } from 'react-icons/fi';
import useBlogs from '../hooks/useBlogs';

const Blog = () => {
    const { blogs } = useBlogs();

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            {/* Header */}
            <section className="py-20 bg-gradient-to-b from-[#FFF9F5] to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 block">
                            Our Blog
                        </span>
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
                            Beauty <span className="italic text-[#D4AF37]">Insights</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Tips, trends, and tutorials from the experts at Girlies Luxe
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts */}
            {blogs.length > 0 ? (
                <section className="py-16">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <Link to={`/blog/${post.id}`} className="block">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={post.images?.[0] || post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="px-4 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#D4AF37] font-medium">
                                                    {post.category}
                                                </span>
                                                {post.videos?.length > 0 && (
                                                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium flex items-center gap-1">
                                                        <FiPlay size={12} /> Video
                                                    </span>
                                                )}
                                                {post.images?.length > 1 && (
                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-600 flex items-center gap-1">
                                                        <FiImage size={12} /> {post.images.length}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-6">
                                        <Link to={`/blog/${post.id}`}>
                                            <h3 className="font-playfair text-xl text-gray-900 mb-3 line-clamp-2 hover:text-[#D4AF37] transition-colors">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        {post.excerpt && (
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-gray-400 text-sm">
                                            <span className="flex items-center gap-1">
                                                <FiCalendar size={14} />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FiUser size={14} />
                                                {post.author}
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                /* Coming Soon Banner */
                <section className="py-16 bg-gradient-to-r from-[#D4AF37]/10 via-[#B76E79]/10 to-[#D4AF37]/10">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center bg-white rounded-3xl p-12 shadow-lg max-w-3xl mx-auto"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                                <span className="text-4xl">💫</span>
                            </div>
                            <h2 className="font-playfair text-3xl text-gray-900 mb-4">
                                Something Beautiful is Coming
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                We're working on creating amazing content for you. Stay tuned for beauty tips, trends, tutorials, and more!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/booking"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#D4AF37] text-white font-medium hover:bg-[#B8962E] transition-colors"
                                >
                                    Book Now
                                    <FiArrowRight />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] font-medium hover:bg-[#D4AF37] hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Admin Link */}
            <section className="py-8">
                <div className="container-custom">
                    <div className="text-center">
                        <Link
                            to="/blog-admin"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                        >
                            <FiEdit3 />
                            Manage Blog Posts
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 bg-gray-900">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="font-playfair text-3xl text-white mb-4">
                            Be the First to Know
                        </h2>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto">
                            Subscribe to our newsletter and get the latest beauty tips and trends delivered to your inbox!
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-full bg-[#D4AF37] text-white font-medium hover:bg-[#B8962E] transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
