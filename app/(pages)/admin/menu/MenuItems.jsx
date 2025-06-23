"use client";
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import styles from '../../../../src/css/admin-menuItems.module.css';
import Pagination from '@/components/ui/pagination';
import Item from '@/app/(pages)/admin/menu/Item';
import ModalAddItem from '@/app/(pages)/admin/menu/ModalAddItem';
import ModalEditItem from '@/app/(pages)/admin/menu/ModalEditItem';
import useAdminMenu from '@/hooks/useAdminMenu';
import Skeleton from 'react-loading-skeleton';

export default function MenuItems() {

  // Use Admin Menu Custom Hook
  const [
    menu,
    categories,
    filteredItems,
    setPageNumber,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    showAddItemModal,
    setShowAddItemModal,
    editingItem,
    setEditingItem,
    startEditingItem,
    saveEditedItem,
    setNewItem,
    newItem,
    submitAddItem,
    deleteItem,
    toggleFeatured,
    toggleAvailability] = useAdminMenu();

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
            <Skeleton height={200} />
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
                      {categories.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
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
            {/* Item */}
            <Item styles={styles} filteredItems={filteredItems} startEditingItem={startEditingItem} toggleFeatured={toggleFeatured} toggleAvailability={toggleAvailability} deleteItem={deleteItem} />
          </div>

          {/* Add New Item Modal */}
          <ModalAddItem styles={styles} showAddItemModal={showAddItemModal} setShowAddItemModal={setShowAddItemModal} newItem={newItem} setNewItem={setNewItem} categories={categories} submitAddItem={submitAddItem} />

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
          <ModalEditItem styles={styles} editingItem={editingItem} setEditingItem={setEditingItem} saveEditedItem={saveEditedItem} categories={categories} />
        </motion.div>
      </div>
    </div>
  );
}
