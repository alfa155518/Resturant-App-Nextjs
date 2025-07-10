import { useState } from 'react';
import { addReview } from '@/actions/profile';
import { toast } from 'react-toastify';
export default function useUserReviews() {
    const [formData, setFormData] = useState({
        client_name: '',
        client_email: '',
        rating: 0,
        review: ''
    });
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle Rating Change
    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await addReview(formData);
            if (result.status === 'error') {
                toast.error(result.message);
                return;
            }
            setIsSubmitting(false);
            toast.success(result.message);
            setFormData({
                client_name: '',
                client_email: '',
                rating: 0,
                review: ''
            });

        } finally {
            setIsSubmitting(false);
            setFormData({
                client_name: '',
                client_email: '',
                rating: 0,
                review: ''
            });
        }
    };

    return {
        formData,
        handleChange,
        handleRatingChange,
        handleSubmit,
        isSubmitting,
        hover,
        setHover
    };

}