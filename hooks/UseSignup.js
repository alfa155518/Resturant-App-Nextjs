import { useState } from "react";
import { signupUser } from "@/actions/user";
import { toast } from 'react-toastify';
const UseSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Photo Change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

// Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await signupUser(formData);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(`${data.message} go to login`);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        avatar: null
      });
      setPhotoPreview(null);
    }
  };

  
   // Animation variants
   const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  
  return {
    formData,
    handleChange,
    handleSubmit,
    photoPreview,
    handlePhotoChange,
    handleSubmit,
    containerVariants,
    itemVariants
  };
};
export default UseSignup;