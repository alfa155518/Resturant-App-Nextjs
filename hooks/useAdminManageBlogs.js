import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { AdminBlogContext } from "@/store/AdminManagementBlogProvider";
import { useContext, useMemo } from "react";



export default function useAdminManageBlogs() {

    //Admin Blog Context
    const {
        blogPosts,
        handleAddNewBlog,
        handleUpdateBlog,
        handleDeleteBlog,
        searchTerm,
        isSubmitting,
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
        setNewPost } = useContext(AdminBlogContext);

    // Unique categories from blog posts
    const categories = [...new Set(blogPosts.map(post => post.category))];

    // Filter blog posts based on search term, category, and status filters
    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author_name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
            const matchesStatus = statusFilter === 'All' || post.status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [blogPosts, searchTerm, categoryFilter, statusFilter]);

    // Add new blog post
    const handleAddPost = () => {
        const tagsArray = newPost.tags.split(',').map(tag => tag.trim());

        const postToAdd = {
            ...newPost,
            created_at: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString().split('T')[0],
            tags: tagsArray,
        };

        handleAddNewBlog(postToAdd);
        setShowAddPostModal(false);
        setNewPost({
            title: '',
            excerpt: '',
            content: '',
            image: '',
            author_name: '',
            category: '',
            tags: '',
            status: 'published'
        });
    };

    // Edit blog post
    const handleEditPost = (postId) => {
        let updatedPost = { ...currentPost };

        // Convert tags string to array if it's a string
        if (typeof updatedPost.tags === 'string') {
            updatedPost.tags = updatedPost.tags.split(',').map(tag => tag.trim());
        }

        handleUpdateBlog(postId, updatedPost);

        setShowEditPostModal(false);
        setCurrentPost(null);
    };

    // Delete blog post
    const handleDeletePost = (postId) => {
        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete this blog post?`,
            onConfirm: async () => {
                await handleDeleteBlog(postId);
                if (currentPost && currentPost.id === postId) {
                    setCurrentPost(null);
                }
            },
            confirmText: 'Delete',
            confirmButtonStyle: {
                background: '#ff4444',
            },
            cancelButtonStyle: {
                background: '#6c757d',
            }
        });
        confirmDelete.show();

    };

    // Preview a blog post
    const handlePreviewPost = (post) => {
        setPreviewPost(post);
        setShowPreviewModal(true);
    };

    // Start editing a post
    const startEditingPost = (post) => {
        // Convert tags array to comma-separated string for editing
        const postForEdit = {
            ...post,
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags
        };
        setCurrentPost(postForEdit);
        setShowEditPostModal(true);
    };

    return [
        categories,
        filteredPosts,
        handlePreviewPost,
        startEditingPost,
        handleAddPost,
        handleEditPost,
        handleDeletePost,
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
        setNewPost,
        isSubmitting,
        blogPosts,
        statusFilter,
        categoryFilter,
        searchTerm,
    ]
}