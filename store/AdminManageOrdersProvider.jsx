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
        const data = await updateOrder(orderId, orderData);
        if (data.status === "error") {
            toast.error(data.message);
            return;
        }
        toast.success(data.message);
        setNeedRefresh(!needRefresh);
    };

    // delete single order
    const handleDeleteOrder = async (orderId) => {
        const data = await deleteOrder(orderId);
        if (data.status === "error") {
            toast.error(data.message);
            return;
        }
        toast.success(data.message);
        setNeedRefresh(!needRefresh);
    };

    // Context value
    const contextValue = useMemo(() => ({
        orders,
        setOrders,
        handleUpdateOrder,
        handleDeleteOrder,
    }), [orders, handleUpdateOrder, handleDeleteOrder]);
    // const contextValue = {
    //     orders,
    //     setOrders,
    //     handleUpdateOrder,
    //     handleDeleteOrder,
    // };


    return (
        <AdminManageOrdersContext.Provider value={contextValue}>
            {children}
        </AdminManageOrdersContext.Provider>
    );
}