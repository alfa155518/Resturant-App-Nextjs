"use client"
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { allCustomer, deleteCustomer, singleCustomer, updateCustomer } from '@/actions/adminCustomers';
import { toast } from 'react-toastify';
export const AdminManagementCustomersContext = createContext();
export function AdminManagementCustomersProvider({ children }) {
    // states
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [needRefresh, setNeedRefresh] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // get customers
    useEffect(() => {
        async function fetchCustomers() {
            const data = await allCustomer();
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            setCustomers(data.data);
        }
        fetchCustomers();
        router.refresh();
    }, [needRefresh])

    // get single customer
    const getSingleCustomer = async (customerId) => {
        const data = await singleCustomer(customerId);
        if (data.status === "error") {
            toast.error(data.message);
            return;
        }
        setSelectedCustomer(data.data);
        setNeedRefresh(!needRefresh);
    }

    // update customer
    const handelUpdateCustomer = async (customerId, customerData) => {
        setIsSubmitting(true);
        try {
            const data = await updateCustomer(customerId, customerData);
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            setNeedRefresh(!needRefresh);
        } finally {
            setIsSubmitting(false);
        }
    }

    // delete customer
    const handelDeleteCustomer = async (customerId) => {
        setIsSubmitting(true);
        try {
            const data = await deleteCustomer(customerId);
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            setNeedRefresh(!needRefresh);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Context value
    const value = {
        customers,
        selectedCustomer,
        getSingleCustomer,
        handelUpdateCustomer,
        handelDeleteCustomer,
        isSubmitting,
    };

    return (
        <AdminManagementCustomersContext.Provider value={value}>
            {children}
        </AdminManagementCustomersContext.Provider>
    )
}