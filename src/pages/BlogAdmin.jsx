import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiX, FiSave, FiArrowLeft, FiPlay } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';

const BlogAdmin = () => {
    const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        images: [],
        videos: []
    });

    const categories = ['Makeup', 'Hair Care', 'Lip Care', 'Nails', 'Skincare', 'Events', 'Tips & Tricks'];

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'girliesluxe057') {
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    // Show login form if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="pt-24 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full mx-4"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                            <span className="text-3xl">🔒</span>
                        </div>
                        <h2 className="font-playfair text-2xl text-gray-900 mb-2">Admin Login</h2>
                        <p className="text-gray-500">Enter your password to access the blog admin</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field text-center"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {authError && (
                            <p className="text-red-500 text-sm text-center">{authError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-full gold-gradient text-white font-medium"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/blog" className="text-[#D4AF37] hover:underline text-sm">
                            ← Back to Blog
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Add image to array
    const addImage = (url) => {
        if (url && !formData.images.includes(url)) {
            setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
        }
    };

    // Remove image from array
    const removeImage = (index) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    // Add video to array
    const addVideo = (url) => {
        if (url && !formData.videos.includes(url)) {
            setFormData(prev => ({ ...prev, videos: [...prev.videos, url] }));
        }
    };

    // Remove video from array
    const removeVideo = (index) => {
        setFormData(prev => ({ ...prev, videos: prev.videos.filter((_, i) => i !== index) }));
    };
    const openCloudinaryWidget = () => {
        setIsUploading(true);

        if (window.cloudinary) {
            const widget = window.cloudinary.createUploadWidget({
                cloudName: 'djjgkezui', // Replace with your Cloudinary cloud name
                uploadPreset: 'blog_images', // Replace with your unsigned upload preset
                sources: ['local', 'url', 'camera'],
                multiple: false,
                folder: 'blog_images',
                styles: {
                    palette: {
                        window: "#FFFFFF",
                        windowBorder: "#D4AF37",
                        tabIcon: "#D4AF37",
                        menuIcons: "#D4AF37",
                        textDark: "#000000",
                        textLight: "#FFFFFF",
                        link: "#D4AF37",
                        action: "#D4AF37",
                        inactiveTabIcon: "#555555",
                        error: "#F44235",
                        inProgress: "#D4AF37",
                        complete: "#20B238",
                        sourceBg: "#F4F4F4"
                    }
                }
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    addImage(result.info.secure_url);
                    setIsUploading(false);
                } else if (error) {
                    console.error('Cloudinary error:', error);
                    setIsUploading(false);
                }
            });

            widget.open();
        } else {
            // Fallback: allow manual URL input
            setIsUploading(false);
            alert('Cloudinary widget not loaded. Please enter image URL manually or refresh the page.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || formData.images.length === 0) {
            alert('Please fill in required fields (title, category, and at least one image)');
            return;
        }

        if (editingBlog) {
            updateBlog(editingBlog.id, formData);
        } else {
            addBlog(formData);
        }

        resetForm();
        navigate('/blog');
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            category: blog.category,
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            images: blog.images || (blog.image ? [blog.image] : []),
            videos: blog.videos || []
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            deleteBlog(id);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            excerpt: '',
            content: '',
            images: [],
            videos: []
        });
        setEditingBlog(null);
        setIsEditing(false);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50">
            {/* Header */}
            <section className="py-12 bg-white shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link to="/blog" className="text-[#D4AF37] hover:underline flex items-center gap-2 mb-2">
                                <FiArrowLeft /> Back to Blog
                            </Link>
                            <h1 className="font-playfair text-3xl md:text-4xl text-gray-900">
                                Blog <span className="italic text-[#D4AF37]">Admin</span>
                            </h1>
                            <p className="text-gray-500 mt-2">Create, edit, and manage your blog posts</p>
                        </div>
                        <button
                            onClick={() => { resetForm(); setIsEditing(true); }}
                            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-white font-medium hover:bg-[#B8962E] transition-colors"
                        >
                            <FiPlus /> New Post
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container-custom">
                    {/* Form Section */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl shadow-lg p-8 mb-12"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-playfair text-2xl">
                                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="input-field"
                                        placeholder="Enter blog title"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">
                                        Excerpt (Short Description)
                                    </label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="input-field min-h-[100px]"
                                        placeholder="Brief description of the blog post..."
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">
                                        Full Content
                                    </label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="input-field min-h-[200px]"
                                        placeholder="Write your full blog content here..."
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">
                                        Images <span className="text-red-500">*</span> (at least one)
                                    </label>
                                    <div className="flex flex-col md:flex-row gap-4 items-start">
                                        <div className="flex-1">
                                            {/* Uploaded Images */}
                                            {formData.images.length > 0 && (
                                                <div className="grid grid-cols-3 gap-3 mb-4">
                                                    {formData.images.map((img, idx) => (
                                                        <div key={idx} className="relative">
                                                            <img src={img} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(idx)}
                                                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                            >
                                                                <FiX size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                                <FiImage className="mx-auto text-gray-400 text-4xl mb-4" />
                                                <p className="text-gray-500 mb-4">Upload images for your blog post</p>
                                                <button
                                                    type="button"
                                                    onClick={openCloudinaryWidget}
                                                    disabled={isUploading}
                                                    className="px-6 py-2 bg-[#D4AF37] text-white rounded-full hover:bg-[#B8962E] transition-colors disabled:opacity-50"
                                                >
                                                    {isUploading ? 'Uploading...' : 'Add Images'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                Or Enter Image URL
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="url"
                                                    id="imageUrl"
                                                    className="input-field flex-1"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const url = document.getElementById('imageUrl').value;
                                                        if (url) addImage(url);
                                                        document.getElementById('imageUrl').value = '';
                                                    }}
                                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Video Upload */}
                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm font-medium">
                                        Videos (Optional)
                                    </label>

                                    {/* Uploaded Videos */}
                                    {formData.videos.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            {formData.videos.map((vid, idx) => (
                                                <div key={idx} className="relative bg-gray-200 rounded-lg p-4">
                                                    <p className="text-sm text-gray-600">Video {idx + 1}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeVideo(idx)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                    >
                                                        <FiX size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            id="videoUrl"
                                            className="input-field flex-1"
                                            placeholder="https://example.com/video.mp4 or YouTube/Vimeo link"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const url = document.getElementById('videoUrl').value;
                                                if (url) addVideo(url);
                                                document.getElementById('videoUrl').value = '';
                                            }}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                                        >
                                            Add Video
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 rounded-full gold-gradient text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                                    >
                                        <FiSave />
                                        {editingBlog ? 'Update Post' : 'Publish Post'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Blog Posts List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                                        >
                                            <FiEdit2 size={16} className="text-[#D4AF37]" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                                        >
                                            <FiTrash2 size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs font-medium rounded-full">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-playfair text-lg text-gray-900 mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    {blog.excerpt && (
                                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                            {blog.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{blog.date}</span>
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="text-[#D4AF37] hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {blogs.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg mb-4">No blog posts yet</p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-8 py-3 rounded-full bg-[#D4AF37] text-white font-medium hover:bg-[#B8962E] transition-colors"
                            >
                                Create Your First Post
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogAdmin;
