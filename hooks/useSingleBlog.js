import { useState } from "react";
export default function useSingleBlog(setFormData) {
    // Share Options
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle Comment Form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return {
        showShareOptions,
        setShowShareOptions,
        handleChange,
        isSubmitting,
        setIsSubmitting
    };
}
