"use client";
import { useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';

import styles from '../../../../src/css/singleBlog.module.css';
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaArrowLeft,
} from 'react-icons/fa';

import { BlogContext } from '@/store/BlogProvider';
import { formatDate } from '@/utils/dateUtils';
import SkeletonBlog from './SkeletonBlog';
import BlogSidebar from './BlogSidebar';
import BlogContent from './BlogContent';
import useSingleBlog from '@/hooks/useSingleBlog';

export default function SingleBlog() {
  const router = useRouter();
  const params = useParams();

  // Blog Context
  const { userId, blogPost, blogPosts, setBlogPostId, handleLikeBlog, handleDislikeBlog, setRelatedPosts, relatedPosts, handleCommentSubmit, formData, setFormData, isSubmitting } = useContext(BlogContext);

  // Single Blog Custom Hook
  const { showShareOptions, setShowShareOptions, handleChange } = useSingleBlog(setFormData);

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      setBlogPostId(parseInt(params.singleBlog));
      // Random Blog Post between 0-10
      const randomCount = Math.floor(Math.random() * 11);
      const RandomRelatedPosts = blogPosts.slice(0, randomCount);
      setRelatedPosts(RandomRelatedPosts);
    };
    fetchBlogPost();
  }, [params.singleBlog]);

  // Skeleton Blog Loading
  if (!blogPost || blogPost.length === 0) {
    return <SkeletonBlog />;
  }

  return (
    <div className={styles.blogContainer}>
      {/* Header with back button */}
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <FaArrowLeft /> Back to Blog
        </button>
        <h1>{blogPost.title}</h1>
        <div className={styles.meta}>
          <span><FaUser /> {blogPost.author_name}</span>
          <span><FaCalendarAlt /> {formatDate(blogPost.created_at)}</span>
          <span><FaTag /> {blogPost.category}</span>
        </div>
      </header>

      {/* Main content */}
      <BlogContent styles={styles} blogPost={blogPost} handleLikeBlog={handleLikeBlog} handleDislikeBlog={handleDislikeBlog} userId={userId} setShowShareOptions={setShowShareOptions} showShareOptions={showShareOptions} handleCommentSubmit={handleCommentSubmit} formData={formData} handleChange={handleChange} isSubmitting={isSubmitting} />

      {/* Sidebar with related posts */}
      <BlogSidebar styles={styles} relatedPosts={relatedPosts} />
    </div>
  );
}
