
import { motion } from 'framer-motion';
import { FiX, FiCheck, FiDollarSign, FiUpload } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';
export default function ModalEditItem({ styles, editingItem, setEditingItem, saveEditedItem, categories }) {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState('');

    // Clean up object URL on unmount
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setEditingItem(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    return (
        editingItem && (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className={styles.menuItemModal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={styles.modalHeader}>
                        <h3>Edit Menu Item</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setEditingItem(null)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.modalContent}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Item Name</label>
                            <input
                                type="text"
                                value={editingItem.name}
                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                name='name'
                                id='name'
                                autoComplete='name'
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="category">Category</label>
                                <select
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    name='category'
                                    id='category'
                                // autoComplete='category'
                                >
                                    {categories.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="price">Price ($)</label>
                                <div className={styles.priceInput}>
                                    <FiDollarSign className={styles.inputIcon} />
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editingItem.price}
                                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                                        name='price'
                                        id='price'
                                        autoComplete='price'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                value={editingItem.description}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                rows="3"
                                name='description'
                                autoComplete='description'
                                id='description'
                            ></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Menu Image</label>
                            <div className={styles.imageInput}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <input
                                    type="text"
                                    value={editingItem.image?.name || ''}
                                    readOnly
                                    placeholder="Select an image"
                                    className={styles.fileNameInput}
                                    onClick={triggerFileInput}
                                />
                                <button
                                    type="button"
                                    className={styles.uploadBtn}
                                    onClick={triggerFileInput}
                                >
                                    <FiUpload className={styles.uploadIcon} />
                                    Browse
                                </button>
                            </div>
                            {(imagePreview || editingItem.image) && (
                                <div className={styles.imagePreview}>
                                    <img
                                        src={imagePreview || editingItem.image}
                                        alt={editingItem.name || 'Preview'}
                                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="editFeatured"
                                        checked={editingItem.featured}
                                        onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                                        name='featured'
                                        autoComplete='featured'
                                    />
                                    <label htmlFor="editFeatured">Featured Item</label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="editAvailable"
                                        checked={editingItem.available}
                                        onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                                        name='available'
                                        autoComplete='available'
                                    />
                                    <label htmlFor="editAvailable">Available</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setEditingItem(null)}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={saveEditedItem}
                        >
                            <FiCheck /> Save Changes
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}