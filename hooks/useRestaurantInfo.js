import { RestaurantSettingsContext } from "@/store/RestaurantSettings";
import { useContext, useRef, useState } from "react";


export default function useRestaurantInfo() {

    // Restaurant settings info context
    const { restaurantInfo, setRestaurantInfo, handelUpdateRestaurantSettingsInfo } = useContext(RestaurantSettingsContext);

    // Edit states
    const [editingRestaurantInfo, setEditingRestaurantInfo] = useState(false);

    const fileInputRef = useRef(null);
    const [logoPreview, setLogoPreview] = useState(restaurantInfo.logo || '');

    // Handle restaurant info form submission
    const handleRestaurantInfoSubmit = (e) => {
        e.preventDefault();
        setEditingRestaurantInfo(false);
        handelUpdateRestaurantSettingsInfo(restaurantInfo);
    };

    // Handle file input change for logo
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const logoUrl = reader.result;
                setLogoPreview(logoUrl);
                // Store both the preview URL and the file object
                setRestaurantInfo({
                    ...restaurantInfo,
                    logo: logoUrl,
                    logoFile: file  // Store the file object
                });
            };
            reader.readAsDataURL(file);
        }
    };
    // Trigger file input click
    const handleLogoClick = () => {
        fileInputRef.current.click();
    };


    return [restaurantInfo, setRestaurantInfo, editingRestaurantInfo, setEditingRestaurantInfo, handleRestaurantInfoSubmit, handleLogoChange, handleLogoClick, logoPreview, fileInputRef];
}
