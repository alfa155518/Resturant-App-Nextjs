"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiImage, FiDollarSign, FiTag, FiInfo } from 'react-icons/fi';
import styles from '../../../src/css/admin-menuItems.module.css';

export default function MenuItems() {
  // Sample menu categories
  const categories = [
    { id: 1, name: 'Appetizers' },
    { id: 2, name: 'Main Courses' },
    { id: 3, name: 'Pasta & Risotto' },
    { id: 4, name: 'Seafood' },
    { id: 5, name: 'Desserts' },
    { id: 6, name: 'Beverages' },
  ];

  // Sample menu items data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Truffle Pasta', category: 'Pasta & Risotto', price: 24.50, description: 'Homemade pasta with black truffle, mushrooms, and parmesan cream sauce', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/jhmch4eohzhltgoxv1bt', featured: true, available: true },
    { id: 2, name: 'Wagyu Steak', category: 'Main Courses', price: 42.00, description: 'Premium Wagyu beef steak with roasted vegetables and red wine reduction', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/zbatn7gakkshf7qq4gco', featured: true, available: true },
    { id: 3, name: 'Seafood Paella', category: 'Seafood', price: 32.00, description: 'Traditional Spanish rice dish with assorted seafood, saffron, and vegetables', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/cqe9ck6bxgl6unuwty1o', featured: true, available: true },
    { id: 4, name: 'Chocolate Souffle', category: 'Desserts', price: 14.50, description: 'Warm chocolate souffle with vanilla ice cream and berry compote', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/cems7hbk2djca407c3lw', featured: true, available: true },
    { id: 5, name: 'Caesar Salad', category: 'Appetizers', price: 12.00, description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/f1vjrkijipzuwmij5uio', featured: false, available: true },
    { id: 6, name: 'Lobster Bisque', category: 'Appetizers', price: 16.50, description: 'Creamy lobster soup with cognac and fresh herbs', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/shiq6asliz7gxgcq0spf', featured: false, available: true },
    { id: 7, name: 'Grilled Salmon', category: 'Seafood', price: 28.00, description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/hrlkuumnpexksxuvssdl', featured: false, available: true },
    { id: 8, name: 'Tiramisu', category: 'Desserts', price: 11.00, description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/c5j4zbigtfdpemtvijw2', featured: false, available: true },
    { id: 9, name: 'Risotto ai Funghi', category: 'Pasta & Risotto', price: 22.00, description: 'Creamy risotto with wild mushrooms, white wine, and parmesan', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/oarjw9vekrywu6pj3xeg', featured: false, available: true },
    { id: 10, name: 'Craft Beer', category: 'Beverages', price: 8.50, description: 'Selection of local craft beers', image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/rtbj51rczml6kalojgsz', featured: false, available: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    image_public_id: '',
    calories: 0,
    rating: 3.0,
    prepTime: '15 min',
    dietary: [],
    ingredients: [],
    stock: 5,
    available: true,
    popular: false,
    featured: false
  });

  // Filter menu items based on search term and category filter
  const filteredItems = menuItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Add new menu item
  const handleAddItem = () => {
    const itemToAdd = {
      ...newItem,
      id: menuItems.length + 1,
      price: parseFloat(newItem.price)
    };

    setMenuItems([...menuItems, itemToAdd]);
    setShowAddItemModal(false);
    setNewItem({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      featured: false,
      available: true
    });
  };

  // Edit menu item
  const startEditingItem = (item) => {
    setEditingItem({ ...item });
  };

  // Save edited menu item
  const saveEditedItem = () => {
    setMenuItems(menuItems.map(item =>
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  // Delete menu item
  const deleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
      if (editingItem && editingItem.id === itemId) {
        setEditingItem(null);
      }
    }
  };

  // Toggle featured status
  const toggleFeatured = (itemId) => {
    setMenuItems(menuItems.map(item =>
      item.id === itemId ? { ...item, featured: !item.featured } : item
    ));
  };

  // Toggle availability status
  const toggleAvailability = (itemId) => {
    setMenuItems(menuItems.map(item =>
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className={styles.adminDashboard}>

      <div className={styles.dashboardContent}>

        <motion.div
          className={styles.menuItemsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.menuItemsHeader}>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.sectionName}
            >
              Menu Items
            </motion.h3>
            <div className={styles.actions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name='search'
                />
              </div>

              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  name='category'
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={styles.exportBtn}
                onClick={() => setShowAddItemModal(true)}
              >
                <FiPlus /> Add Item
              </button>
            </div>
          </div>

          <div className={styles.menuItemsGrid}>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                className={styles.menuItemCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.menuItemImage}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemBadges}>
                    {item.featured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}
                    {!item.available && (
                      <span className={styles.unavailableBadge}>Unavailable</span>
                    )}
                  </div>
                </div>
                <div className={styles.menuItemContent}>
                  <div className={styles.menuItemHeader}>
                    <h3>{item.name}</h3>
                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                  </div>
                  <p className={styles.category}>{item.category}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.menuItemActions}>
                  <button
                    className={`${styles.toggleBtn} ${item.featured ? styles.active : ''}`}
                    onClick={() => toggleFeatured(item.id)}
                    title={item.featured ? "Remove from featured" : "Add to featured"}
                  >
                    <FiTag /> {item.featured ? "Featured" : "Feature"}
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${item.available ? styles.available : styles.unavailable}`}
                    onClick={() => toggleAvailability(item.id)}
                    title={item.available ? "Mark as unavailable" : "Mark as available"}
                  >
                    <FiInfo /> {item.available ? "Available" : "Unavailable"}
                  </button>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editBtn}
                      onClick={() => startEditingItem(item)}
                      title="Edit Item"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteItem(item.id)}
                      title="Delete Item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add New Item Modal */}
          {showAddItemModal && (
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
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
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
                    <label htmlFor="image">Image URL</label>
                    <div className={styles.imageInput}>
                      <FiImage className={styles.inputIcon} />
                      <input
                        type="text"
                        value={newItem.image}
                        onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                        placeholder="Enter image URL or upload"
                        name='image'
                        id='image'
                        autoComplete='image'
                      />
                      <button className={styles.uploadBtn}>Upload</button>
                    </div>
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
                      value={JSON.stringify(newItem.dietary, null, 2)}
                      onChange={(e) => {
                        try {
                          setNewItem({ ...newItem, dietary: JSON.parse(e.target.value) });
                        } catch (error) {
                          console.error('Invalid JSON:', error);
                        }
                      }}
                      name='dietary'
                      id='dietary'
                      placeholder="Enter dietary information">
                    </textarea>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                      value={JSON.stringify(newItem.ingredients, null, 2)}
                      onChange={(e) => setNewItem({ ...newItem, ingredients: JSON.parse(e.target.value) })}
                      name='ingredients'
                      id='ingredients'
                      placeholder="Enter ingredients as JSON array"
                      rows="4"
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
                    onClick={handleAddItem}
                    disabled={!newItem.name || !newItem.category || !newItem.price}
                  >
                    <FiCheck /> Add Item
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Edit Item Modal */}
          {editingItem && (
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
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
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
                    <label htmlFor="image">Image URL</label>
                    <div className={styles.imageInput}>
                      <FiImage className={styles.inputIcon} />
                      <input
                        type="text"
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        name='image'
                        autoComplete='image'
                        id='image'
                      />
                      <button className={styles.uploadBtn}>Upload</button>
                    </div>
                    {editingItem.image && (
                      <div className={styles.imagePreview}>
                        <img src={editingItem.image} alt={editingItem.name} />
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
          )}
        </motion.div>
      </div>
    </div>
  );
}
