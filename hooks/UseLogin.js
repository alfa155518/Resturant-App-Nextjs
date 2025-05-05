"use client"
import { useState } from "react";
import { loginUser } from "@/actions/user";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
const UseLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


// Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await loginUser(formData);
    if ( data.error || (data.message.startsWith('User not found') || data.message.startsWith('Password Not'))) {
      toast.error(data.message || "Login failed.");
    } else {
      toast.success(data.message || "Login successful!");
      setFormData({
        email: "",
        password: "",
      });
        // Set cookies
        Cookies.set('user', JSON.stringify(data.user),{
          expires:360,
        });
        Cookies.set('userToken', data.token,{
          expires:360,
        });
      router.push('/');
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
    handleSubmit,
    containerVariants,
    itemVariants
  };
};
export default UseLogin;