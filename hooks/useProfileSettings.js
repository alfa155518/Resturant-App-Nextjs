import { changePassword , changePersonalData} from "@/actions/auth";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useProfileSettings() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  // Password Form Data
  const [passwordFormData, setPasswordFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  
  // Handel Password Input  Change
  const handlePasswordInputChange = (e) => {
    const { name, value} = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value
    });
  };

  // Handel Change Password 
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const data = await changePassword(passwordFormData)
    if (typeof data?.message === 'object' && data.message !== null) {
      const errorMessages = {};
      let firstErrorDisplayed = false;

      Object.keys(data.message).forEach(field => {
        if (Array.isArray(data.message[field]) && data.message[field].length > 0) {
          // Get the first error message for the field
          const firstErrorMessage = data.message[field][0];
          errorMessages[field] = firstErrorMessage;

          // Display only the first error message encountered using toast
          if (!firstErrorDisplayed) {
            toast.error(firstErrorMessage);
            firstErrorDisplayed = true; // Prevent further toasts in this submission
          }
        }
      });
    } else if (typeof data?.message === 'string' && data?.status == "success") {
      toast.success(data.message);
      setPasswordFormData({
        current_password: '',
        password: '',
        password_confirmation: '',
      });
    } else {
      toast.error(data?.message);
    }
  }

      // Personal Form Data
    const [previewImage, setPreviewImage] = useState(null);
  const [personalFormData, setPersonaFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: '',
    avatar: null
  });

  // Handel Personal Info Input Change
  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonaFormData(prevData => ({ 
      ...prevData,
      [name]: value 
    }));
  };

  // Handel Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setPersonaFormData(prev => ({
          ...prev,
          avatar: file
        }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handel Personal Info Submit
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = await changePersonalData(personalFormData);
    if (updatedUserData?.status == "success") {
      toast.success(updatedUserData.message);
      Cookies.set('user', JSON.stringify(updatedUserData.user), {
        expires: 360,
      })
    } else {
      toast.error(updatedUserData?.message);
    }

    if (typeof updatedUserData?.message === 'object' && updatedUserData.message !== null) {
      const errorMessages = {};
      let firstErrorDisplayed = false;
      
      Object.keys(updatedUserData.message).forEach(field => {
        if (Array.isArray(updatedUserData.message[field]) && updatedUserData.message[field].length > 0) {
          // Get the first error message for the field
          const firstErrorMessage = updatedUserData.message[field][0];
          errorMessages[field] = firstErrorMessage;

          // Display only the first error message encountered using toast
          if (!firstErrorDisplayed) {
            toast.error(firstErrorMessage);
            firstErrorDisplayed = true; // Prevent further toasts in this submission
          }
        }
      });
    }
  }


  // Animation Styles
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return [
    isClient,
    passwordFormData,
    handlePasswordInputChange,
    handlePasswordSubmit,
    previewImage,
    setPreviewImage,
    personalFormData,
    setPersonaFormData,
    handlePersonalInputChange,
    handleImageChange,
    handlePersonalInfoSubmit,
    fadeIn
  ]
}