import { useCallback, useContext, useMemo, useState } from 'react';
import { AdminManagementCustomersContext } from '@/store/AdminManagementCustomersProvider';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
export default function useAdminManageCustomers() {
    // admin customers context
    const { customers, selectedCustomer, getSingleCustomer, handelUpdateCustomer, handelDeleteCustomer } = useContext(AdminManagementCustomersContext);

    // states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);


    // Filter customers based on search term and status filter
    const filteredCustomers = useMemo(() => {
        // Early return if no customers to filter
        if (!customers || !customers.length) return [];

        // Convert search term to lowercase once
        const searchTermLower = searchTerm.toLowerCase();

        return customers.filter(customer => {
            // Check if customer matches search term
            const matchesSearch =
                (customer.name?.toLowerCase().includes(searchTermLower)) ||
                (customer.email?.toLowerCase().includes(searchTermLower)) ||
                (customer.phone?.includes(searchTerm));

            // Check if customer matches status filter
            const matchesStatus =
                statusFilter === 'All' ||
                (statusFilter === '1' && customer.is_active === 1) ||
                (statusFilter === '0' && customer.is_active === 0);

            return matchesSearch && matchesStatus;
        });
    }, [customers, searchTerm, statusFilter]);

    // Edit customer
    const startEditingCustomer = (customer) => {
        setEditingCustomer({
            id: customer.id || '',
            name: customer.name || '',
            email: customer.email || '',
            phone: customer.phone || '',
            address: customer.address || '',
            status: customer.status || 'Active',
            role: customer.role || '',
            is_active: customer.is_active !== undefined ? customer.is_active : 1
        });
    };

    // Save edited customer
    const saveEditedCustomer = async () => {
        const targetCustomer = customers.find(customer => customer.id === editingCustomer.id);
        await handelUpdateCustomer(targetCustomer.id, editingCustomer);
        setEditingCustomer(null);
    };

    // Delete customer
    const deleteCustomer = (customerId) => {
        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete this customer?`,
            onConfirm: async () => {
                await handelDeleteCustomer(customerId);
                if (selectedCustomer && selectedCustomer.id === customerId) {
                    setShowCustomerDetails(false);
                }
                if (editingCustomer && editingCustomer.id === customerId) {
                    setEditingCustomer(null);
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


    // View customer details
    const viewCustomerDetails = useCallback((customer) => {
        getSingleCustomer(customer.id);
        setShowCustomerDetails(true);
    }, [getSingleCustomer]);

    return [
        // State
        customers,
        selectedCustomer,
        searchTerm,
        statusFilter,
        editingCustomer,
        showCustomerDetails,
        filteredCustomers,

        // Actions
        setSearchTerm,
        setStatusFilter,
        setEditingCustomer,
        setShowCustomerDetails,
        viewCustomerDetails,
        startEditingCustomer,
        saveEditedCustomer,
        deleteCustomer
    ]
}
