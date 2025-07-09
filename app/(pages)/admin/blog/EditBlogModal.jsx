
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiImage, FiSave } from 'react-icons/fi';
import { useRef, useEffect, useState } from 'react';
export default function EditBlogModal({ styles, currentPost, setCurrentPost, setShowEditPostModal, handleEditPost }) {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState('');

    // Set initial preview if image is a URL
    useEffect(() => {
        if (currentPost?.image && typeof currentPost.image === 'string') {
            setImagePreview(currentPost.image);
        }
        return () => {
            // Cleanup object URL to prevent memory leaks
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [currentPost?.image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Update the current post with the file
            setCurrentPost(prev => ({
                ...prev,
                image: file, // Store the file object
                imageUrl: previewUrl // Store preview URL for display
            }));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };
    return (
        <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={styles.blogModal}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.modalHeader}>
                    <h3>Edit Blog Post</h3>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setShowEditPostModal(false)}
                    >
                        <FiX />
                    </button>
                </div>

                <div className={styles.modalContent}>
                    <form className={styles.formWrapper}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.formLabel}>Title</label>
                            <input
                                type="text"
                                value={currentPost.title}
                                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                name="title"
                                autoComplete='title'
                                id="title"
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="excerpt" className={styles.formLabel}>Excerpt</label>
                            <textarea
                                value={currentPost.excerpt}
                                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                name="excerpt"
                                autoComplete='excerpt'
                                id="excerpt"
                                rows="2"
                                className={styles.formTextarea}
                            ></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="content" className={styles.formLabel}>Content</label>
                            <textarea
                                value={currentPost.content}
                                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                name="content"
                                autoComplete='content'
                                id="content"
                                rows="10"
                                className={styles.formTextarea}
                            ></textarea>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="author_name" className={styles.formLabel}>Author</label>
                                <input
                                    type="text"
                                    value={currentPost.author_name}
                                    onChange={(e) => setCurrentPost({ ...currentPost, author_name: e.target.value })}
                                    name="author_name"
                                    autoComplete='author_name'
                                    id="author_name"
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="category" className={styles.formLabel}>Category</label>
                                <input
                                    type="text"
                                    value={currentPost.category}
                                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                                    name="category"
                                    autoComplete='category'
                                    id="category"
                                    className={styles.formInput}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="tags" className={styles.formLabel}>Tags</label>
                            <input
                                type="text"
                                value={currentPost.tags}
                                onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value })}
                                name="tags"
                                autoComplete='tags'
                                id="tags"
                                placeholder="Enter tags separated by commas 'one','two','three'"
                                className={styles.formInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="image" className={styles.formLabel}>Featured Image URL</label>
                            <div className={styles.imageInputContainer}>
                                <input
                                    type="text"
                                    value={currentPost.image}
                                    onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                                    name="image"
                                    autoComplete='image'
                                    id="image"
                                    className={styles.formInput}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    id="image-upload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <button
                                    type="button"
                                    className={styles.uploadBtn}
                                    onClick={triggerFileInput}
                                >
                                    <FiImage /> Choose Image
                                </button>
                            </div>
                            {imagePreview && (
                                <div className={styles.imagePreview}>
                                    <Image
                                        src={imagePreview}
                                        alt={currentPost.title || 'Preview'}
                                        width={250}
                                        height={250}
                                        style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }}
                                        onLoad={() => {
                                            // Revoke the object URL to free up memory
                                            if (imagePreview.startsWith('blob:')) {
                                                URL.revokeObjectURL(imagePreview);
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="status" className={styles.formLabel}>Status</label>
                            <select
                                value={currentPost.status}
                                onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value })}
                                name="status"
                                autoComplete='status'
                                id="status"
                                className={styles.formSelect}
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div className={styles.modalFooter}>
                    <button
                        className={styles.cancelBtn}
                        onClick={() => setShowEditPostModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={styles.saveBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            handleEditPost(currentPost.id);
                        }}
                    >
                        <FiSave /> Update Post
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}