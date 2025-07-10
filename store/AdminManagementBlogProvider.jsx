"use client"


import { addNewBlog, deleteBlog, getAllBlog, updateBlog } from '@/actions/adminBlog';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create the context
export const AdminBlogContext = createContext();


export function AdminBlogProvider({ children }) {
    // state
    const [blogPosts, setBlogPosts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showEditPostModal, setShowEditPostModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [previewPost, setPreviewPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author_name: '',
        category: '',
        tags: '',
        status: 'published'
    });

    // get all blogs
    useEffect(() => {
        async function fetchBlogs() {
            const blogs = await getAllBlog();
            if (blogs.status === "error") {
                toast.error(blogs.message);
                return;
            }
            setBlogPosts(blogs.data);
        }
        fetchBlogs();
    }, [needsRefresh])


    // Add New Blog
    const handleAddNewBlog = async (newBlog) => {
        setIsSubmitting(true);
        try {
            const result = await addNewBlog(newBlog);
            if (result.status === "error") {
                toast.error(result.message);
                setIsSubmitting(false);
                return;
            }

            toast.success(result.message);
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Update Blog
    const handleUpdateBlog = async (postId, updatedBlog) => {
        setIsSubmitting(true);
        try {
            const result = await updateBlog(postId, updatedBlog);
            if (result.status === "error") {
                toast.error(result.message);
                setIsSubmitting(false);
                return;
            }
            toast.success(result.message);
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete Blog
    const handleDeleteBlog = async (postId) => {
        setIsSubmitting(true);
        try {
            const result = await deleteBlog(postId);
            if (result.status === "error") {
                toast.error(result.message);
                setIsSubmitting(false);
                return;
            }
            toast.success(result.message);
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };
    // Context value
    const value = {
        blogPosts,
        handleAddNewBlog,
        handleUpdateBlog,
        handleDeleteBlog,
        isSubmitting,
        searchTerm,
        categoryFilter,
        statusFilter,
        showAddPostModal,
        showEditPostModal,
        showPreviewModal,
        currentPost,
        previewPost,
        newPost,
        setSearchTerm,
        setCategoryFilter,
        setStatusFilter,
        setShowAddPostModal,
        setShowEditPostModal,
        setShowPreviewModal,
        setCurrentPost,
        setPreviewPost,
        setNewPost
    };

    return (
        <AdminBlogContext.Provider value={value}>
            {children}
        </AdminBlogContext.Provider>
    );
}