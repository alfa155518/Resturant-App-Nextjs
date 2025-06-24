"use client";

import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { AdminManageReservationsContext } from "@/store/AdminManagementReservationsProvider";
import { useContext, useState } from "react";

export default function useAdminReservations() {

    // Admin Management Reservations Context
    const { reservations, handelUpdateReservation, handelDeleteReservation } = useContext(AdminManageReservationsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingReservation, setEditingReservation] = useState(null);



    // Ensure reservations is an array before filtering
    const reservationsList = Array.isArray(reservations) ? reservations : [];

    // Filter reservations based on search term, date, and status filters
    const filteredReservations = reservationsList.filter(reservation => {
        if (!reservation || !reservation.user || !reservation.table) return false;

        const searchTermLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === '' ||
            (reservation.user.name?.toLowerCase()?.includes(searchTermLower)) ||
            (reservation.user.email?.toLowerCase()?.includes(searchTermLower)) ||
            (reservation.table.table_number?.toLowerCase()?.includes(searchTermLower));

        const matchesStatus = statusFilter === 'All' ||
            reservation.status?.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });
    // Edit reservation
    const startEditingReservation = (reservation) => {
        setEditingReservation({ ...reservation });
    };

    // Save edited reservation
    const saveEditedReservation = () => {
        let targetReservation = reservations.find(reservation => reservation.id === editingReservation.id);
        targetReservation = editingReservation;
        handelUpdateReservation(targetReservation.id, targetReservation);
        setEditingReservation(null);
    };

    // Delete reservation
    const deleteReservation = (reservationId) => {
        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete this reservation?`,
            onConfirm: () => {
                handelDeleteReservation(reservationId);
                if (editingReservation && editingReservation.id === reservationId) {
                    setEditingReservation(null);
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



    // Group reservations by date
    const groupedReservations = filteredReservations.reduce((groups, reservation) => {
        const date = reservation.reservation_date.split('T')[0]; // Get just the date part
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(reservation);
        return groups;
    }, {});

    return [
        reservations,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        startEditingReservation,
        editingReservation,
        setEditingReservation,
        saveEditedReservation,
        deleteReservation,
        groupedReservations,
    ]

}
