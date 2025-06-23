"use client"

import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/actions/adminTeam';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const AdminManageTeamContext = createContext();

export function AdminManageTeamProvider({ children }) {
    // State
    const [teamMembers, setTeamMembers] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const router = useRouter();

    // Fetch menu data
    useEffect(() => {
        async function handelMenuData() {
            const items = await getTeamMembers();
            if (items.status === "error") {
                toast.error(items.message);
                return;
            }
            setTeamMembers(items.data);
        }
        handelMenuData();
        router.refresh();
    }, [needsRefresh]);

    // Update team member
    const handelUpdateTeamMember = async (member) => {
        const updatedData = await updateTeamMember(member);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
            setNeedsRefresh(!needsRefresh);
        }
    };


    // Add team member
    const handelAddTeamMember = async (member) => {
        const addedData = await addTeamMember(member);
        if (addedData.status === "error") {
            toast.error(addedData.message);
            return;
        }
        if (addedData.status === "success") {
            toast.success(addedData.message);
            setNeedsRefresh(!needsRefresh);
        }
    };

    // Delete team member
    const handelDeleteTeamMember = async (id) => {
        const deletedData = await deleteTeamMember(id);
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
        teamMembers,
        setTeamMembers,
        handelAddTeamMember,
        handelUpdateTeamMember,
        handelDeleteTeamMember,
    }
    return (
        <AdminManageTeamContext.Provider value={value}>
            {children}
        </AdminManageTeamContext.Provider>
    )
}