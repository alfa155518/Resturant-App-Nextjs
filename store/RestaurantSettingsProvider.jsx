"use client"

import { getNotificationSettings, getOperatingHours, getPaymentMethods, getRestaurantSettingsInfo, updateNotificationSettings, updateOperatingHours, updatePaymentMethods, updateRestaurantSettingsInfo } from '@/actions/restaurantSettings';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const RestaurantSettingsContext = createContext();


export function RestaurantSettingsProvider({ children }) {

    // states
    const [restaurantInfo, setRestaurantInfo] = useState([]);
    const [operatingHours, setOperatingHours] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [notificationSettings, setNotificationSettings] = useState([]
        //     {
        //     new_order: false,
        //     order_status: false,
        //     new_reservation: false,
        //     reservation_reminder: false,
        //     new_review: false,
        //     low_inventory: false,
        //     daily_summary: false,
        //     weekly_summary: false,
        //     marketing_emails: false
        // }
    );

    // refresh state
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const router = useRouter();

    // Get restaurant settings info
    useEffect(() => {
        async function handelRestaurantSettingsInfo() {
            const data = await getRestaurantSettingsInfo();
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            setRestaurantInfo(data);
        }
        handelRestaurantSettingsInfo();
        router.refresh();
    }, [needsRefresh]);

    // Update restaurant settings info
    const handelUpdateRestaurantSettingsInfo = async (data) => {
        const updatedData = await updateRestaurantSettingsInfo(data);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        setRestaurantInfo(updatedData);
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
        }
        setNeedsRefresh(!needsRefresh);
    };

    // Get Operating Hours
    useEffect(() => {
        async function handelOperatingHours() {
            const data = await getOperatingHours();
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            setOperatingHours(data);
        }
        handelOperatingHours();
        router.refresh();
    }, [needsRefresh]);

    // Update Operating Hours
    const handelUpdateOperatingHours = async (data) => {
        const updatedData = await updateOperatingHours(data);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
        }
        setOperatingHours(updatedData.data);
        setNeedsRefresh(!needsRefresh);
    };

    // Get Payment Methods
    useEffect(() => {
        async function handelPaymentMethods() {
            const data = await getPaymentMethods();
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            setPaymentMethods(data);
        }
        handelPaymentMethods();
        router.refresh();
    }, [needsRefresh]);

    // Update Payment Methods
    const handelUpdatePaymentMethods = async (data) => {
        const updatedData = await updatePaymentMethods(data);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
        }
        setNeedsRefresh(!needsRefresh);
    };

    // Get Notification Settings
    useEffect(() => {
        async function handelNotificationSettings() {
            const response = await getNotificationSettings();
            if (response.status === "error") {
                toast.error(response.message);
                return;
            }
            // Only update if we have the data
            if (response.data) {
                setNotificationSettings(response.data);
            }
        }
        handelNotificationSettings();
        router.refresh();
    }, [needsRefresh]);

    // Update Notification Settings
    const handelUpdateNotificationSettings = async (data) => {
        const updatedData = await updateNotificationSettings(data);
        if (updatedData.status === "error") {
            toast.error(updatedData.message);
            return;
        }
        if (updatedData.status === "success") {
            toast.success(updatedData.message);
        }
        setNeedsRefresh(!needsRefresh);
    };

    // Context value
    const value = {
        restaurantInfo,
        setRestaurantInfo,
        handelUpdateRestaurantSettingsInfo,
        operatingHours,
        setOperatingHours,
        handelUpdateOperatingHours,
        paymentMethods,
        setPaymentMethods,
        handelUpdatePaymentMethods,
        notificationSettings,
        setNotificationSettings,
        handelUpdateNotificationSettings,
    };

    return (
        <RestaurantSettingsContext.Provider value={value}>
            {children}
        </RestaurantSettingsContext.Provider>
    );
}