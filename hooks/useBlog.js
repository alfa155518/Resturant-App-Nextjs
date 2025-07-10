import { useState, useMemo } from "react";
export default function useBlog(blogPosts) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [visiblePosts, setVisiblePosts] = useState(6);

    // Get unique categories from blog posts
    const categories = useMemo(() =>
        ['All', ...new Set(blogPosts?.map(post => post.category) || [])],
        [blogPosts]
    );

    // Filter posts based on search term and active category
    const filteredPosts = useMemo(() => {
        if (!blogPosts) return [];

        const lowerSearchTerm = searchTerm.toLowerCase();

        return blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(lowerSearchTerm) ||
                post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));

            const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [blogPosts, searchTerm, activeCategory]);

    // Load more posts
    const loadMore = () => {
        setVisiblePosts(prev => prev + 3);
    };

    return {
        searchTerm,
        setSearchTerm,
        activeCategory,
        setActiveCategory,
        visiblePosts,
        categories,
        filteredPosts,
        loadMore,
    };
}