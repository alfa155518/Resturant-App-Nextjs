
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiImage, FiSave } from 'react-icons/fi';
export default function EditBlogModal({ styles, currentPost, setCurrentPost, setShowEditPostModal, handleEditPost }) {
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
                                <button className={styles.uploadBtn}>
                                    <FiImage /> Upload
                                </button>
                            </div>
                            {currentPost.image && (
                                <div className={styles.imagePreview}>
                                    <Image src={currentPost.image || "/images/default-favorite.png"} alt={currentPost.title} priority width={250} height={250} />
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
                        className={styles.saveBtn}
                        onClick={handleEditPost}
                    >
                        <FiSave /> Update Post
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}