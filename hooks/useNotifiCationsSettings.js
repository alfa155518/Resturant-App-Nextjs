import { RestaurantSettingsContext } from "@/store/RestaurantSettings";
import { useContext } from "react";



export default function useNotificationSettings() {
    // notification Settings context
    const { notificationSettings, setNotificationSettings, handelUpdateNotificationSettings } = useContext(RestaurantSettingsContext);

    // Toggle notification setting
    const toggleNotification = (key) => {
        const updatedSettings = {
            ...notificationSettings,
            [key]: !notificationSettings[key],
        };
        setNotificationSettings(updatedSettings);
        handelUpdateNotificationSettings(updatedSettings);
    };

    return [
        notificationSettings,
        toggleNotification,
    ]
}