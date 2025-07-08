import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/actions/user";
import { toast } from "react-toastify";
import { Suspense } from "react";

export function useResetPasswordContent() {
  // This is the actual hook logic
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    try {
      const data = await resetPasswordAction(formData);
      if (data.error) {
        setError(data.errorMessage);
        toast.error(data.errorMessage);
      }
      if (data.user) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = "/register";
        }, 2000);
      }
    } catch (error) {
      setError(error.error);
      toast.error(error.error);
    } finally {
      setIsLoading(false);
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
    handleChange,
    handleSubmit,
    isLoading,
    error,
    containerVariants,
    itemVariants
  }
}

export default function UseResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordWrapper />
    </Suspense>
  );
}

function ResetPasswordWrapper() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    containerVariants,
    itemVariants
  } = useResetPasswordContent();

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    containerVariants,
    itemVariants
  };
}