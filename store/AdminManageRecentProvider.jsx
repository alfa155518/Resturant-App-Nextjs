"use client"


import getRecentItems from '@/actions/adminRecent';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const AdminManageRecentContext = createContext();


export function AdminManageRecentProvider({ children }) {

    const [recentItems, setRecentItems] = useState([])



    useEffect(() => {
        async function getRecentData() {
            const data = await getRecentItems()
            if (data.data.status === "error") {
                toast.error(data.message);
                return;
            }
            setRecentItems(data.data);
        }
        getRecentData()
    }, [])


    // Static data for the dashboard
    const statsCardData = {
        totalRevenue: 125680,
        totalOrders: 1458,
        totalCustomers: 892,
        averageRating: 4.7
    }

    const value = {
        recentItems,
        statsCardData
    }

    return (<AdminManageRecentContext.Provider value={value}>
        {children}
    </AdminManageRecentContext.Provider>
    )
}


