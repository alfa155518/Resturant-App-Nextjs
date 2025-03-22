
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/actions/user";
import { toast } from "react-toastify";
export default function UseResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    // Get token and email from URL
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if ( token && email) {
      setFormData(prev => ({ ...prev, token,email }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await resetPasswordAction(formData);
      console.log(data);
      if (data.error) {
        toast.error(data.errorMessage);
      }
      if (data.user) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = "/register";
        }, 2000);
      }
    } catch (error) {
      toast.error(error.error);
    }
  };


   // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };


  return {
    formData,
    searchParams,
    handleChange,
    handleSubmit,
    containerVariants,
    itemVariants
  }

}