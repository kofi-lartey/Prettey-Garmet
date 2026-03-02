import { useState, useEffect } from 'react';

const STORAGE_KEY = 'girlies_luxe_blogs';

const defaultBlogs = [
    {
        id: 1,
        title: "Top 10 Bridal Makeup Trends for 2026",
        category: "Makeup",
        excerpt: "Discover the latest bridal makeup trends that are taking over weddings this year...",
        content: "Full blog content goes here...",
        images: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80"],
        videos: [],
        date: "2026-03-01",
        author: "Girlies Luxe"
    },
    {
        id: 2,
        title: "How to Care for Your Lace Front Wig",
        category: "Hair Care",
        excerpt: "Learn the essential tips and tricks to keep your lace front wig looking flawless...",
        content: "Full blog content goes here...",
        images: ["https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"],
        videos: [],
        date: "2026-02-28",
        author: "Girlies Luxe"
    },
    {
        id: 3,
        title: "The Art of Lip Gloss: Finding Your Perfect Shade",
        category: "Lip Care",
        excerpt: "Finding the perfect lip gloss shade can transform your entire look...",
        content: "Full blog content goes here...",
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"],
        videos: [],
        date: "2026-02-25",
        author: "Girlies Luxe"
    }
];

export const useBlogs = () => {
    const [blogs, setBlogs] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error('Error parsing blogs from localStorage:', e);
                }
            }
        }
        return defaultBlogs;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    }, [blogs]);

    const addBlog = (blog) => {
        const newBlog = {
            ...blog,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            author: "Girlies Luxe"
        };
        setBlogs(prev => [newBlog, ...prev]);
        return newBlog;
    };

    const updateBlog = (id, updatedBlog) => {
        setBlogs(prev => prev.map(blog =>
            blog.id === id ? { ...blog, ...updatedBlog } : blog
        ));
    };

    const deleteBlog = (id) => {
        setBlogs(prev => prev.filter(blog => blog.id !== id));
    };

    const getBlog = (id) => {
        return blogs.find(blog => blog.id === parseInt(id));
    };

    return {
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getBlog
    };
};

export default useBlogs;
