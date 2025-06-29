import { useContext, useState, useMemo, useCallback } from 'react';
import { AdminManageOrdersContext } from '@/store/AdminManageOrdersProvider';
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";


export default function useAdminManageOrders() {
    // Admin Manage Orders Context
    const { orders, handleUpdateOrder, handleDeleteOrder } = useContext(AdminManageOrdersContext);

    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = orders && orders?.length % 2 === 0 ? orders?.length / 2 : 5;

    // Memoize toggleView
    const toggleView = useCallback(() => {
        setShowAll(prev => !prev);
    }, []);


    // Filter orders based on search term and status filter
    const filteredOrders = useMemo(() => {
        return orders?.filter(order => {
            const matchesSearch =
                order?.id?.toString().includes(searchTerm) ||
                order?.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || order?.delivery_status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const displayedOrders = showAll ? filteredOrders : filteredOrders.slice(0, initialDisplayCount);


    // View order details
    const viewOrderDetails = useCallback((order) => {
        setSelectedOrder(order);
        setShowOrderDetails(true);
    }, []);

    // Edit order
    const startEditingOrder = useCallback((order) => {
        setEditingOrder({ ...order });
    }, []);

    // Save edited order
    const saveEditedOrder = useCallback(async (orderId, orderStatus) => {
        await handleUpdateOrder(orderId, orderStatus);
        setEditingOrder(null);
    }, [handleUpdateOrder]);

    // Delete order
    const deleteOrder = useCallback(async (orderId) => {
        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete this order?`,
            onConfirm: async () => {
                await handleDeleteOrder(orderId);
                if (selectedOrder && selectedOrder.id === orderId) {
                    setShowOrderDetails(false);
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
    }, [handleDeleteOrder, selectedOrder]);

    // Return values
    return {
        orders,
        initialDisplayCount,
        searchTerm,
        statusFilter,
        selectedOrder,
        showOrderDetails,
        editingOrder,
        showAll,
        displayedOrders,
        toggleView,
        viewOrderDetails,
        startEditingOrder,
        saveEditedOrder,
        deleteOrder,
        setSearchTerm,
        setStatusFilter,
        setShowOrderDetails,
        setEditingOrder,
    }
}