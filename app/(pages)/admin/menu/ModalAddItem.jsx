
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiX, FiCheck, FiDollarSign, FiUpload } from 'react-icons/fi';
export default function ModalAddItem({ styles, showAddItemModal, setShowAddItemModal, newItem, setNewItem, categories, submitAddItem }) {

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
            setNewItem(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        showAddItemModal && (
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
                        <h3>Add New Menu Item</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowAddItemModal(false)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.modalContent}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Item Name</label>
                            <input
                                type="text"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                placeholder="Enter item name"
                                name='name'
                                id='name'
                                autoComplete='name'
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="category">Category</label>
                                <select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    name='category'
                                    id='category'
                                    autoComplete='category'
                                >
                                    <option value="" disabled>Select category</option>
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
                                        value={newItem.price}
                                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                        placeholder="0.00"
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
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                placeholder="Enter item description"
                                rows="3"
                                name='description'
                                id='description'
                                autoComplete='description'
                            ></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="image">Image</label>
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
                                    value={newItem.image?.name || ''}
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
                            {(imagePreview || newItem.image) && (
                                <div className={styles.imagePreview}>
                                    <img
                                        src={imagePreview || newItem.image}
                                        alt={newItem.name || 'Preview'}
                                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="calories">Calories</label>
                                <input
                                    type="number"
                                    value={newItem.calories}
                                    onChange={(e) => setNewItem({ ...newItem, calories: parseInt(e.target.value) })}
                                    name='calories'
                                    id='calories'
                                    min="0"
                                    placeholder="Calories"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    value={newItem.stock}
                                    onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })}
                                    name='stock'
                                    id='stock'
                                    min="0"
                                    placeholder="Stock"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="number"
                                value={newItem.rating}
                                onChange={(e) => setNewItem({ ...newItem, rating: parseFloat(e.target.value) })}
                                name='rating'
                                id='rating'
                                min="1"
                                max="5"
                                step="0.1"
                                placeholder="Rating (1-5)"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="prepTime">Prep Time</label>
                            <input
                                type="text"
                                value={newItem.prepTime}
                                onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
                                name='prepTime'
                                id='prepTime'
                                placeholder="e.g., 15 min"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="dietary">Dietary Information</label>
                            <textarea

                                value={newItem.dietary}
                                onChange={(e) => setNewItem({ ...newItem, dietary: e.target.value })}

                                name='dietary'
                                id='dietary'
                                placeholder='Enter dietary information like Gluten-free, Dairy-free, Vegan, Vegetarian etc.'
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea
                                value={newItem.ingredients}
                                onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}

                                name='ingredients'
                                id='ingredients'
                                placeholder='Enter ingredients like ingredient1, ingredient2 etc.'
                                rows="4"
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={newItem.featured}
                                        onChange={(e) => setNewItem({ ...newItem, featured: e.target.checked })}
                                        name='featured'
                                        autoComplete='featured'
                                    />
                                    <label htmlFor="featured">Featured Item</label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="available"
                                        checked={newItem.available}
                                        onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                                        name='available'
                                        autoComplete='available'
                                    />
                                    <label htmlFor="available">Available</label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="popular"
                                        checked={newItem.popular}
                                        onChange={(e) => setNewItem({ ...newItem, popular: e.target.checked })}
                                        name='popular'
                                        autoComplete='popular'
                                    />
                                    <label htmlFor="popular">Popular Item</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => setShowAddItemModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={submitAddItem}
                            disabled={!newItem.name || !newItem.category || !newItem.price}
                        >
                            <FiCheck /> Add Item
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    )
}