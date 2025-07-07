"use client"

import { allBlog, likeBlog, dislikeBlog } from '@/actions/blog';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create the context
export const BlogContext = createContext();


// Provider component
export function BlogProvider({ children }) {
    const [blogPosts, setBlogPosts] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    const router = useRouter();
    const userData = Cookies.get('user');
    const user = JSON.parse(userData || '{}');

    // Get All Blogs
    useEffect(() => {
        async function fetchBlogPosts() {
            const blogPosts = await allBlog();
            if (blogPosts.status === "error") {
                toast.error(blogPosts.message);
                return;
            }
            setBlogPosts(blogPosts.data);
        }
        fetchBlogPosts();
        router.refresh();
    }, [needsRefresh]);

    // Submit Like Blog
    const handleLikeBlog = async (blogId) => {
        const result = await likeBlog(blogId);
        if (result.status === "error") {
            toast.error(result.message);
            return;
        }
        setNeedsRefresh(!needsRefresh);
    }

    // Submit Dislike Blog
    const handleDislikeBlog = async (blogId) => {
        const result = await dislikeBlog(blogId);
        if (result.status === "error") {
            toast.error(result.message);
            return;
        }
        setNeedsRefresh(!needsRefresh);
    }

    // Value for Context
    const value = {
        blogPosts,
        handleLikeBlog,
        handleDislikeBlog,
        userId: user.id
    }
    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
}
