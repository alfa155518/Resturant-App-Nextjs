import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { AdminMenuContext } from "@/store/AdminMenuProvider";
import { useContext, useState } from "react";


export default function useAdminMenu() {
    // Admin Menu Context
    const { menu, handelUpdateMenu, setPageNumber, handelAddItem, handelDeleteItem } = useContext(AdminMenuContext);

    // states
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const categories = [
        "appetizers",
        "entrees",
        "desserts",
        "drinks",
        "sides",
        "salads",
        "soups",
        "beverages",
        "specials",
        "kids",
    ]

    // new item state
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

    // Add new menu item
    const submitAddItem = () => {
        const itemToAdd = {
            ...newItem,
            price: parseFloat(newItem.price)
        };

        // Add new item to menu
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


    // Delete menu item with confirmation dialog
    const deleteItem = (itemId) => {
        const itemToDelete = menu?.items?.find(item => item.id === itemId);

        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete "${itemToDelete?.name}"?`,
            onConfirm: () => {
                handelDeleteItem(itemId);
                if (editingItem && editingItem.id === itemId) {
                    setEditingItem(null);
                }
            },
            confirmText: 'Delete',
            confirmButtonStyle: {
                background: '#ff4444',
            },
            cancelButtonStyle: {
                background: '#6c757d',
            }
        });
        confirmDelete.show();
    };
    return [
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
        toggleAvailability
    ]
}