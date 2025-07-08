"use client"


import { addNewBlog, getAllBlog } from '@/actions/adminBlog';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create the context
export const AdminBlogContext = createContext();


export function AdminBlogProvider({ children }) {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const router = useRouter();

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
        const result = await addNewBlog(newBlog);
        if (result.status === "error") {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
        setNeedsRefresh(!needsRefresh);
        setIsSubmitting(false);
    };

    // Context value
    const value = {
        blogPosts,
        setBlogPosts,
        handleAddNewBlog,
        isSubmitting,
    };

    return (
        <AdminBlogContext.Provider value={value}>
            {children}
        </AdminBlogContext.Provider>
    );
}