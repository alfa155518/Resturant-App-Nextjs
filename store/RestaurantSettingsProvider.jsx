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
    const [notificationSettings, setNotificationSettings] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // refresh state
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const router = useRouter();

    // Get restaurant settings info
    useEffect(() => {
        async function handelRestaurantSettingsInfo() {
            const data = await getRestaurantSettingsInfo();
            setRestaurantInfo(data);
        }
        handelRestaurantSettingsInfo();
        router.refresh();
    }, [needsRefresh]);

    // Update restaurant settings info
    const handelUpdateRestaurantSettingsInfo = async (data) => {
        setIsSubmitting(true);
        try {
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
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get Operating Hours
    useEffect(() => {
        async function handelOperatingHours() {
            const data = await getOperatingHours();
            setOperatingHours(data);
        }
        handelOperatingHours();
        router.refresh();
    }, [needsRefresh]);

    // Update Operating Hours
    const handelUpdateOperatingHours = async (data) => {
        setIsSubmitting(true);
        try {
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
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get Payment Methods
    useEffect(() => {
        async function handelPaymentMethods() {
            const data = await getPaymentMethods();
            setPaymentMethods(data);
        }
        handelPaymentMethods();
        router.refresh();
    }, [needsRefresh]);

    // Update Payment Methods
    const handelUpdatePaymentMethods = async (data) => {
        setIsSubmitting(true);
        try {
            const updatedData = await updatePaymentMethods(data);
            if (updatedData.status === "error") {
                toast.error(updatedData.message);
                return;
            }
            if (updatedData.status === "success") {
                toast.success(updatedData.message);
            }
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get Notification Settings
    useEffect(() => {
        async function handelNotificationSettings() {
            const response = await getNotificationSettings();
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
        setIsSubmitting(true);
        try {
            const updatedData = await updateNotificationSettings(data);
            if (updatedData.status === "error") {
                toast.error(updatedData.message);
                return;
            }
            if (updatedData.status === "success") {
                toast.success(updatedData.message);
            }
            setNeedsRefresh(!needsRefresh);
        } finally {
            setIsSubmitting(false);
        }
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
        isSubmitting,
    };

    return (
        <RestaurantSettingsContext.Provider value={value}>
            {children}
        </RestaurantSettingsContext.Provider>
    );
}