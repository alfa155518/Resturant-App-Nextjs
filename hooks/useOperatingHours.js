import { RestaurantSettingsContext } from "@/store/RestaurantSettingsProvider";
import { useContext, useState } from "react";

export default function useOperatingHours() {

    const [editingHours, setEditingHours] = useState(false);

    // operating hours context
    const {
        operatingHours,
        setOperatingHours,
        handelUpdateOperatingHours
    } = useContext(RestaurantSettingsContext);

    // Handle operating hours form submission
    const handleHoursSubmit = (e) => {
        // e.preventDefault();
        setEditingHours(false);
        handelUpdateOperatingHours(operatingHours);
    };

    // Update operating hours
    const updateHours = (id, field, value) => {
        const updatedHours = operatingHours.map(hour =>
            hour.id === id
                ? { ...hour, [field]: value }
                : hour
        );
        setOperatingHours(updatedHours);
    };

    return [
        editingHours,
        setEditingHours,
        operatingHours,
        handleHoursSubmit,
        updateHours
    ];
}