"use client"

import { getReservations, updateReservation, deleteReservation } from '@/actions/adminReservations';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const AdminManageReservationsContext = createContext();

export function AdminManagementReservationsProvider({ children }) {
    const [reservations, setReservations] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const router = useRouter();

    // Fetch menu data
    useEffect(() => {
        async function handelMenuData() {
            const items = await getReservations();
            if (items.status === "error") {
                toast.error(items.message);
                return;
            }
            setReservations(items.data);
        }
        handelMenuData();
        router.refresh();
    }, [needsRefresh]);


    // Update Reservation
    const handelUpdateReservation = async (reservationId, reservationData) => {
        const updatedData = await updateReservation(reservationId, reservationData);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
            setReservations(updatedData.data);
            setNeedsRefresh(!needsRefresh);
        }
    };

    // Delete Reservation
    const handelDeleteReservation = async (reservationId) => {
        const deletedData = await deleteReservation(reservationId);
        if (deletedData.status === "error") {
            toast.error(deletedData.message);
            return;
        }
        if (deletedData.status === "success") {
            toast.success(deletedData.message);
            setNeedsRefresh(!needsRefresh);
        }
    };

    // Context value
    const value = {
        reservations,
        handelUpdateReservation,
        handelDeleteReservation,
    }

    return (
        <AdminManageReservationsContext.Provider value={value}>
            {children}
        </AdminManageReservationsContext.Provider>
    )
}