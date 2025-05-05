"use client";

import { userCheckoutProducts } from "@/actions/profile";
import { logoutUser } from "@/actions/user";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import orderStyles from "../src/css/profile-orders.module.css";
import { FaSpinner, FaCheck, FaTimes, FaTruck } from "react-icons/fa";
// Create the context
export const UserContext = createContext();

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [token, setUserToken] = useState(null);
  const [checkoutHistory, setCheckoutHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const router = useRouter();
  const userData = Cookies.get("user");
  const userToken = Cookies.get("userToken");
  const pathname = usePathname();

  // Set User By Token
  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData));
      setUserToken(userToken);
    }
  }, [userData]);

  // Submit Logout user
  const submitLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = await logoutUser();

      if (data) {
        toast.error(data.error);
      }
      if (data.status == "error") {
        toast.error(data.message);
      }

      if (data.status === "success") {
        setUser([]);
        setUserToken(null);
        toast.success(data.message);
        setTimeout(() => {
          router.push("/register");
        }, 2000);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Get Checkout Products
  useEffect(() => {
    async function getCheckoutProducts() {
      const data = await userCheckoutProducts();
      setCheckoutHistory(data);
    }
    getCheckoutProducts();
  }, [pathname]);

  // Open Order Details function
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // close Order Details function
  const closeOrderDetails = () => {
    setShowDetailsModal(false);
  };

  // Status Text for Checkout products
  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "processing":
        return "Processing";
      case "out-for-delivery":
        return "Out for Delivery";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  // Status Icon for Checkout products
  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <FaCheck className={orderStyles.deliveredIcon} />;
      case "processing":
        return <FaSpinner className={orderStyles.processingIcon} />;
      case "out-for-delivery":
        return <FaTruck className={orderStyles.deliveryIcon} />;
      case "cancelled":
        return <FaTimes className={orderStyles.cancelledIcon} />;
      default:
        return null;
    }
  };

  // Filter checkouts Product by status
  const filteredOrders = checkoutHistory.items?.filter((order) => {
    if (
      activeFilter !== "all" &&
      order.checkout.payment_status !== activeFilter
    ) {
      return false;
    }

    // Filter checkouts Product by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return order.product_name.toLowerCase().includes(searchLower);
    }
    return true;
  });

  // Context value
  const value = {
    user,
    setUser,
    token,
    setUserToken,
    userData,
    userToken,
    submitLogout,
    isLoading,
    searchTerm,
    setSearchTerm,
    showDetailsModal,
    openOrderDetails,
    closeOrderDetails,
    selectedOrder,
    getStatusText,
    filteredOrders,
    activeFilter,
    setActiveFilter,
    getStatusIcon,
    checkoutHistory,
    setCheckoutHistory,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
