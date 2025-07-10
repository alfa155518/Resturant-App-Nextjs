"use client"

import { getOrders, updateOrder, deleteOrder } from "@/actions/adminOrders";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';

export const AdminManageOrdersContext = createContext();
export function AdminManageOrdersProvider({ children }) {
    // states
    const [orders, setOrders] = useState([]);
    const router = useRouter();
    const [needRefresh, setNeedRefresh] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // get orders
    useEffect(() => {
        async function fetchOrders() {
            const data = await getOrders();
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            setOrders(data.data);
        }
        fetchOrders();
        router.refresh();
    }, [needRefresh]);

    // update order
    const handleUpdateOrder = async (orderId, orderData) => {
        setIsSubmitting(true);
        try {
            const data = await updateOrder(orderId, orderData);
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            setNeedRefresh(!needRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // delete single order
    const handleDeleteOrder = async (orderId) => {
        setIsSubmitting(true);
        try {
            const data = await deleteOrder(orderId);
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            setNeedRefresh(!needRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Context value
    const contextValue = useMemo(() => ({
        orders,
        setOrders,
        handleUpdateOrder,
        handleDeleteOrder,
        isSubmitting,
    }), [orders, handleUpdateOrder, handleDeleteOrder, isSubmitting]);


    return (
        <AdminManageOrdersContext.Provider value={contextValue}>
            {children}
        </AdminManageOrdersContext.Provider>
    );
}