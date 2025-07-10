"use client"

import { addItem, deleteItem, getMenu, updateMenu } from '@/actions/adminMenu';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const AdminMenuContext = createContext();

export function AdminMenuProvider({ children }) {
    const [menu, setMenu] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Fetch menu data
    useEffect(() => {
        async function handelMenuData() {
            const items = await getMenu(pageNumber);
            if (items.status === "error") {
                toast.error(items.message);
                return;
            }
            setMenu(items.data);
        }
        handelMenuData();
        router.refresh();
    }, [needsRefresh, pageNumber]);

    // Update menu item
    const handelUpdateMenu = async (itemId, data) => {
        setIsSubmitting(true);
        try {
            const updatedData = await updateMenu(itemId, data);
            if (updatedData.status === "error") {
                toast.error(updatedData.message);
                return;
            }
            if (updatedData.status === "success") {
                toast.success(updatedData.message);
            }
            setMenu(updatedData.data);
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add new menu item
    const handelAddItem = async (data) => {
        setIsSubmitting(true);
        try {
            const addedData = await addItem(data);
            if (addedData.status === "error") {
                toast.error(addedData.message);
                return;
            }
            if (addedData.status === "success") {
                toast.success(addedData.message);
            }
            setMenu(addedData.data);
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete menu item
    const handelDeleteItem = async (itemId) => {
        setIsSubmitting(true);
        try {
            const deletedData = await deleteItem(itemId);
            if (deletedData.status === "error") {
                toast.error(deletedData.message);
                return;
            }
            if (deletedData.status === "success") {
                toast.success(deletedData.message);
            }
            setMenu(deletedData.data);
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Context value
    const value = {
        menu,
        handelUpdateMenu,
        handelAddItem,
        handelDeleteItem,
        setPageNumber,
        isSubmitting,
    };
    return (
        <AdminMenuContext.Provider value={value}>
            {children}
        </AdminMenuContext.Provider>
    );
}


