
import { contactUs } from '@/actions/contactUs';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
export default function useContact() {
    // State
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    // Handle Input Change
    const handleChange = useCallback(async (e) => {
        const { name, value } = e.target;
        return setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, [setFormData]);

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await contactUs(formData);
            if (result.status === "success") {
                toast.success("Message sent successfully");
            } else {
                toast.error(result.message);
            }
        } finally {
            setLoading(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        };
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Animation Variants
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        containerVariants,
        itemVariants
    };
}
