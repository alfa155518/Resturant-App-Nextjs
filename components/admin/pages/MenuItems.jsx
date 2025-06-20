"use client";

import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import styles from '../../../src/css/admin-menuItems.module.css';
import { AdminMenuContext } from '@/store/AdminMenuProvider';
import Pagination from '@/components/ui/pagination';
import Item from '@/app/(pages)/admin/menu/Item';
import ModalAddItem from '@/app/(pages)/admin/menu/ModalAddItem';
import ModalEditItem from '@/app/(pages)/admin/menu/ModalEditItem';
import { toast } from 'react-toastify';

export default function MenuItems() {

  const { menu, setMenu, handelUpdateMenu, setPageNumber, handelAddItem, handelDeleteItem } = useContext(AdminMenuContext);
  // console.log(menu)

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
  const filteredItems = menu?.items?.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Add new menu item
  const submitAddItem = () => {
    const itemToAdd = {
      ...newItem,
      price: parseFloat(newItem.price)
    };

    // setMenu([...menu?.items, itemToAdd]);
    handelAddItem(itemToAdd);
    setShowAddItemModal(false);
    setNewItem({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      calories: 0,
      rating: 3.0,
      prepTime: '15 min',
      dietary: [],
      ingredients: [],
      stock: 5,
      featured: false,
      available: true,
    });
  };

  // Edit menu item
  const startEditingItem = (item) => {
    setEditingItem({ ...item });

  };

  // Save edited menu item
  const saveEditedItem = () => {
    handelUpdateMenu(editingItem.id, editingItem);
    setEditingItem(null);
  };

  // Delete menu item with confirmation toast
  const deleteItem = (itemId) => {
    const itemToDelete = menu?.items?.find(item => item.id === itemId);

    toast.warning(
      <div>
        <p>Are you sure you want to delete "{itemToDelete?.name}"?</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={() => {
              toast.dismiss();
              handelDeleteItem(itemId);
              if (editingItem && editingItem.id === itemId) {
                setEditingItem(null);
              }
            }}
            style={{
              background: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
        style: { width: '100%' }
      }
    );
  };

  // Toggle featured status
  const toggleFeatured = (itemId) => {
    let featuredItem = menu?.items?.find(item => item.id === itemId);
    featuredItem.featured = !featuredItem.featured;
    handelUpdateMenu(itemId, featuredItem);
  };

  // Toggle availability status
  const toggleAvailability = (itemId) => {
    let availabilityItem = menu?.items?.find(item => item.id === itemId);
    availabilityItem.available = !availabilityItem.available;
    handelUpdateMenu(itemId, availabilityItem);
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
          {menu?.items?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>No menu items found.</p>
            </motion.div>
          ) : (
            <>
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
                      {menu?.items?.map(item => (
                        <option key={item.id} value={item.category}>
                          {item.category}
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
            </>
          )}

          <div className={styles.menuItemsGrid}>
            <Item styles={styles} filteredItems={filteredItems} startEditingItem={startEditingItem} toggleFeatured={toggleFeatured} toggleAvailability={toggleAvailability} deleteItem={deleteItem} />
          </div>

          {/* Add New Item Modal */}
          <ModalAddItem styles={styles} showAddItemModal={showAddItemModal} setShowAddItemModal={setShowAddItemModal} newItem={newItem} setNewItem={setNewItem} menu={menu} submitAddItem={submitAddItem} />

          {/* Pagination */}
          {
            menu?.items?.length > 0 ?
              <Pagination
                currentPage={menu?.current_page}
                totalPages={menu?.last_page}
                onPageChange={setPageNumber}
              />
              :
              null
          }

          {/* Edit Item Modal */}
          <ModalEditItem styles={styles} editingItem={editingItem} setEditingItem={setEditingItem} menu={menu} saveEditedItem={saveEditedItem} />
        </motion.div>
      </div>
    </div>
  );
}
