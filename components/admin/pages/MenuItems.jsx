"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiImage, FiDollarSign, FiTag, FiInfo } from 'react-icons/fi';
import Sidebar from '../Sidebar';
import Header from '../Header';
import styles from './MenuItems.module.scss';

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
    { id: 1, name: 'Truffle Pasta', category: 'Pasta & Risotto', price: 24.50, description: 'Homemade pasta with black truffle, mushrooms, and parmesan cream sauce', image: '/images/menu/pasta.jpg', featured: true, available: true },
    { id: 2, name: 'Wagyu Steak', category: 'Main Courses', price: 42.00, description: 'Premium Wagyu beef steak with roasted vegetables and red wine reduction', image: '/images/menu/steak.jpg', featured: true, available: true },
    { id: 3, name: 'Seafood Paella', category: 'Seafood', price: 32.00, description: 'Traditional Spanish rice dish with assorted seafood, saffron, and vegetables', image: '/images/menu/paella.jpg', featured: true, available: true },
    { id: 4, name: 'Chocolate Souffle', category: 'Desserts', price: 14.50, description: 'Warm chocolate souffle with vanilla ice cream and berry compote', image: '/images/menu/dessert.jpg', featured: true, available: true },
    { id: 5, name: 'Caesar Salad', category: 'Appetizers', price: 12.00, description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese', image: '/images/menu/salad.jpg', featured: false, available: true },
    { id: 6, name: 'Lobster Bisque', category: 'Appetizers', price: 16.50, description: 'Creamy lobster soup with cognac and fresh herbs', image: '/images/menu/soup.jpg', featured: false, available: true },
    { id: 7, name: 'Grilled Salmon', category: 'Seafood', price: 28.00, description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables', image: '/images/menu/salmon.jpg', featured: false, available: true },
    { id: 8, name: 'Tiramisu', category: 'Desserts', price: 11.00, description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream', image: '/images/menu/tiramisu.jpg', featured: false, available: true },
    { id: 9, name: 'Risotto ai Funghi', category: 'Pasta & Risotto', price: 22.00, description: 'Creamy risotto with wild mushrooms, white wine, and parmesan', image: '/images/menu/risotto.jpg', featured: false, available: true },
    { id: 10, name: 'Craft Beer', category: 'Beverages', price: 8.50, description: 'Selection of local craft beers', image: '/images/menu/beer.jpg', featured: false, available: true },
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
    featured: false,
    available: true
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
      <Sidebar />

      <div className={styles.dashboardContent}>
        <Header />

        <motion.div
          className={styles.menuItemsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.menuItemsHeader}>
            <h2>Menu Items</h2>
            <div className={styles.menuActions}>
              <div className={styles.searchBar}>
                <FiSearch className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search menu items..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className={styles.filterContainer}>
                <FiFilter className={styles.filterIcon} />
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
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
                className={styles.addItemBtn}
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
                    <label>Item Name</label>
                    <input 
                      type="text" 
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Category</label>
                      <select 
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
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
                      <label>Price ($)</label>
                      <div className={styles.priceInput}>
                        <FiDollarSign className={styles.inputIcon} />
                        <input 
                          type="number" 
                          step="0.01"
                          min="0"
                          value={newItem.price}
                          onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea 
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      placeholder="Enter item description"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Image URL</label>
                    <div className={styles.imageInput}>
                      <FiImage className={styles.inputIcon} />
                      <input 
                        type="text" 
                        value={newItem.image}
                        onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                        placeholder="Enter image URL or upload"
                      />
                      <button className={styles.uploadBtn}>Upload</button>
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <div className={styles.checkboxGroup}>
                        <input 
                          type="checkbox" 
                          id="featured"
                          checked={newItem.featured}
                          onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
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
                          onChange={(e) => setNewItem({...newItem, available: e.target.checked})}
                        />
                        <label htmlFor="available">Available</label>
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
                    <label>Item Name</label>
                    <input 
                      type="text" 
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Category</label>
                      <select 
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Price ($)</label>
                      <div className={styles.priceInput}>
                        <FiDollarSign className={styles.inputIcon} />
                        <input 
                          type="number" 
                          step="0.01"
                          min="0"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea 
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Image URL</label>
                    <div className={styles.imageInput}>
                      <FiImage className={styles.inputIcon} />
                      <input 
                        type="text" 
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
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
                          onChange={(e) => setEditingItem({...editingItem, featured: e.target.checked})}
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
                          onChange={(e) => setEditingItem({...editingItem, available: e.target.checked})}
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
