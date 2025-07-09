import { motion } from 'framer-motion';
import { FiX, FiImage, FiSave, FiUpload } from 'react-icons/fi';
import { useRef, useState } from 'react';

export default function AddBlogModal({ styles, newPost, setNewPost, setShowAddPostModal, handleAddPost }) {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setNewPost({ ...newPost, image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        (
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
                        <h3>Create New Blog Post</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowAddPostModal(false)}
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
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    placeholder="Enter post title"
                                    name="title"
                                    autoComplete='title'
                                    id="title"
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="excerpt" className={styles.formLabel}>Excerpt</label>
                                <textarea
                                    value={newPost.excerpt}
                                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                                    placeholder="Enter a short excerpt or summary"
                                    rows="2"
                                    name="excerpt"
                                    autoComplete='excerpt'
                                    id="excerpt"
                                    className={styles.formTextarea}
                                ></textarea>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="content" className={styles.formLabel}>Content</label>
                                <textarea
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    placeholder="Enter post content (HTML supported)"
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
                                        value={newPost.author_name}
                                        onChange={(e) => setNewPost({ ...newPost, author_name: e.target.value })}
                                        placeholder="Enter author name"
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
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                        placeholder="Enter post category"
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
                                    value={newPost.tags}
                                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                    placeholder="Enter tags separated by commas 'one','two','three"
                                    name="tags"
                                    autoComplete='tags'
                                    id="tags"
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="image" className={styles.formLabel}>Featured Image</label>
                                <div className={styles.imageInputContainer}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="image"
                                        name="image"
                                    />
                                    <input
                                        type="text"
                                        value={newPost.image?.name || ''}
                                        readOnly
                                        placeholder="No file chosen"
                                        className={styles.formInput}
                                    />
                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className={styles.uploadBtn}
                                    >
                                        <FiUpload /> Choose File
                                    </button>
                                </div>
                                {imagePreview && (
                                    <div className={styles.imagePreview}>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '200px',
                                                marginTop: '10px',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="status" className={styles.formLabel}>Status</label>
                                <select
                                    value={newPost.status}
                                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                                    name="status"
                                    autoComplete='status'
                                    id="status"
                                    className={styles.formSelect}
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setShowAddPostModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={handleAddPost}
                            disabled={!newPost.title || !newPost.content || !newPost.author_name || !newPost.category || !newPost.tags || !newPost.status || !newPost.image || !newPost.excerpt}
                        >
                            <FiSave /> Save Post
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}