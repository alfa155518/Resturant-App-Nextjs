"use client"

import { allBlog, likeBlog, dislikeBlog, getSingleBlog, addComment } from '@/actions/blog';
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
    const [blogPost, setBlogPost] = useState([]);
    const [blogPostId, setBlogPostId] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Comment Form
    const [formData, setFormData] = useState({
        comment: '',
        name: ''
    });
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

    // Get Single Blog
    useEffect(() => {
        async function fetchBlogPost() {
            const blogPost = await getSingleBlog(blogPostId);
            setBlogPost(blogPost.data);
        }
        fetchBlogPost();
    }, [blogPostId, needsRefresh]);


    // Submit Comment
    const handleCommentSubmit = async (e, blogId, formData) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await addComment(blogId, formData);
        if (result.status === "error") {
            toast.error(result.message);
            return;
        }
        toast.success(result.message);
        setIsSubmitting(false);
        setFormData({
            comment: '',
            name: ''
        });
        setNeedsRefresh(!needsRefresh);

    }

    // Value for Context
    const value = {
        blogPosts,
        handleLikeBlog,
        handleDislikeBlog,
        blogPost,
        setBlogPostId,
        relatedPosts,
        setRelatedPosts,
        handleCommentSubmit,
        isSubmitting,
        formData,
        setFormData,
        userId: user.id,
    }
    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
}
