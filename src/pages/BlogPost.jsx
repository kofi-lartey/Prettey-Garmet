import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowLeft, FiArrowRight, FiPlay, FiImage, FiYoutube } from 'react-icons/fi';
import useBlogs from '../hooks/useBlogs';

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Component to render content with embedded YouTube videos
const ContentRenderer = ({ content }) => {
    if (!content) return null;

    // Split content by YouTube links
    const parts = content.split(/(https?:\/\/[^\s]+\.(?:youtube\.com|youtu\.be)[^\s]*)/gi);

    return (
        <div className="space-y-4">
            {parts.map((part, index) => {
                const youtubeId = getYouTubeId(part);

                if (youtubeId) {
                    return (
                        <div key={index} className="my-8">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    title="YouTube video"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    );
                }

                // Regular text content
                return part.split('\n').map((line, i) => (
                    <p key={`${index}-${i}`} className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {line}
                    </p>
                ));
            })}
        </div>
    );
};

const BlogPost = () => {
    const { id } = useParams();
    const { getBlog } = useBlogs();
    const blog = getBlog(id);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!blog) {
        return (
            <div className="pt-24 pb-20 min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-playfair text-2xl mb-4">Blog Post Not Found</h2>
                    <Link to="/blog" className="text-[#D4AF37] hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const images = blog.images || (blog.image ? [blog.image] : []);
    const videos = blog.videos || [];
    const hasMedia = images.length > 0 || videos.length > 0;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            {/* Header */}
            <section className="py-12 bg-gradient-to-b from-[#FFF9F5] to-white">
                <div className="container-custom">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline mb-8"
                    >
                        <FiArrowLeft /> Back to Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase">
                            {blog.category}
                        </span>
                        <h1 className="font-playfair text-3xl md:text-5xl text-gray-900 mt-4 mb-6">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-500">
                            <span className="flex items-center gap-2">
                                <FiCalendar /> {blog.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <FiUser /> {blog.author}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Media Gallery */}
            {hasMedia && (
                <section className="py-8">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            {/* Main Media Display */}
                            <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                {images.length > 0 ? (
                                    <>
                                        <img
                                            src={images[currentImageIndex]}
                                            alt={blog.title}
                                            className="w-full h-full object-contain"
                                        />
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                                >
                                                    <FiArrowLeft />
                                                </button>
                                                <button
                                                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                                >
                                                    <FiArrowRight />
                                                </button>
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                    {images.map((_, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setCurrentImageIndex(idx)}
                                                            className={`w-3 h-3 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-[#D4AF37]' : 'bg-white/70'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : videos.length > 0 && (
                                    <video
                                        src={videos[0]}
                                        controls
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>

                            {/* Thumbnails */}
                            {(images.length > 1 || videos.length > 0) && (
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={`img-${idx}`}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors ${idx === currentImageIndex ? 'border-[#D4AF37]' : 'border-transparent opacity-70'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                    {videos.map((vid, idx) => (
                                        <button
                                            key={`vid-${idx}`}
                                            className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-200 border-2 border-transparent opacity-70 hover:opacity-100 flex items-center justify-center"
                                        >
                                            <FiPlay size={24} className="text-gray-500" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="py-8">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        {blog.excerpt && (
                            <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-[#D4AF37] pl-6">
                                {blog.excerpt}
                            </p>
                        )}
                        <div className="prose prose-lg max-w-none">
                            {blog.content ? (
                                <ContentRenderer content={blog.content} />
                            ) : (
                                <p className="text-gray-500">No content available for this post.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts / Back */}
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#D4AF37] text-white font-medium hover:bg-[#B8962E] transition-colors"
                        >
                            <FiArrowLeft /> View All Posts
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPost;
