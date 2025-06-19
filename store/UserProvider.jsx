"use client";

import { addFavoriteProduct, cancelReservation, getFavoriteProducts, removeFavoriteProduct, reservations, userCheckoutProducts } from "@/actions/profile";
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
  const [userReservations, setUserReservations] = useState([]);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [activeFilterReservation, setActiveFilterReservation] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsReservationModal, setShowDetailsReservationModal] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);



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
    router.refresh()
  }, [pathname, needsRefresh]);

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

  // Get user Reservations
  useEffect(() => {
    async function getUserReservations() {
      const data = await reservations();
      setUserReservations(data);
    }
    getUserReservations();
    router.refresh()
  }, [pathname, needsRefresh]);

  // Filter Reservations
  const filteredReservations = userReservations?.filter((reservation) => {
    if (activeFilterReservation === "all") return true;
    return reservation.status === activeFilterReservation;
  });


  // Show a warning toast for cancellation confirmation
  const handelCancelReservation = async (id) => {
    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to cancel this reservation?</p>
        <div>
          <button
            onClick={() => {
              toast.dismiss(toastId);
              confirmCancelReservation(id);
            }}
            style={{
              marginRight: '10px',
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            No, Keep
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };


  // Confirm Cancellation
  const confirmCancelReservation = async (id) => {
    const data = await cancelReservation(id);

    if (data.status === "success") {
      toast.success(data.message);
    }

    if (data.status === "error") {
      toast.error(data.message);
    }

    setNeedsRefresh(!needsRefresh);
  }

  // Open Reservation Details function
  const openDetailsReservationModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailsReservationModal(true);
  };

  // Close Reservation Details function
  const closeDetailsReservationModal = () => {
    setShowDetailsReservationModal(false);
  };


  // ###############################
  // Get favorite products
  useEffect(() => {
    async function handelGetFavoriteProducts() {
      const data = await getFavoriteProducts();
      setFavoriteProducts(data);
    }
    handelGetFavoriteProducts();
    router.refresh()
  }, [pathname, needsRefresh]);

  // Add favorite product
  const handelAddFavoriteProduct = async (productId) => {
    const data = await addFavoriteProduct(productId);
    setFavoriteProducts(data);
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "info") {
      toast.info(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
    setNeedsRefresh(!needsRefresh);
  }

  // Remove favorite product
  const handelRemoveFavoriteProduct = async (productId) => {
    const data = await removeFavoriteProduct(productId);
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "info") {
      toast.info(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
    setNeedsRefresh(!needsRefresh);
  }

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
    userReservations,
    setUserReservations,
    setNeedsRefresh,
    setActiveFilterReservation,
    activeFilterReservation,
    filteredReservations,
    selectedReservation,
    setSelectedReservation,
    showDetailsReservationModal,
    setShowDetailsReservationModal,
    handelCancelReservation,
    openDetailsReservationModal,
    closeDetailsReservationModal,
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
    favoriteProducts,
    setFavoriteProducts,
    handelAddFavoriteProduct,
    handelRemoveFavoriteProduct,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
