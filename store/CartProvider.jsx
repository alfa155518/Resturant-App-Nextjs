"use client";

import {
  addProductInCart,
  getCartItems,
  ProceedToCheckout,
  removeItem,
  updateQuantity,
  verifyPayment,
} from "@/actions/cart";

import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create the context
export const CartContext = createContext();

// Provider component
export function CartProvider({ children }) {
  let user = Cookies.get("user") || 1;
  const [cartItems, setCartItems] = useState([]);
  const { id } = JSON.parse(user);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [attributes, setAttributes] = useState({
    extraSauce: 0,
    doublePortion: 0,
  });
  const pathname = usePathname();

  // Save Payment Details in Cookies
  const [paymentDetails, setPaymentDetails] = useState(() => {
    const savedPayments = Cookies.get("paymentDetails");
    return savedPayments ? JSON.parse(savedPayments) : [];
  });

  const searchParams = useSearchParams();

  // State for cart items
  const [items, setItems] = useState([
    {
      userId: id,
      quantity: 1,
      attributes: [],
    },
  ]);

  // Get Product In Cart
  useEffect(() => {
    async function getItems() {
      const items = await getCartItems();
      setCartItems(items);
    }
    getItems();
    router.refresh();
  }, [pathname, needsRefresh]);

  // Add Product To Cart
  async function handleAddToCart(product) {
    const attributesTotal = attributes.extraSauce + attributes.doublePortion;
    const newItem = {
      userId: id,
      menuId: product.id,
      quantity: 1,
      price: (product.price + attributesTotal).toFixed(2),
      attributes: [JSON.stringify(attributes)],
    };

    setItems([newItem]);
    try {
      setIsLoading(true);
      const data = await addProductInCart(newItem);
      if (data.cartItems) {
        toast.success(data.message);
      }
      if (data.status === "error") {
        toast.error(data.message);
      }
      setNeedsRefresh(!needsRefresh);
    } finally {
      setIsLoading(false);
      setAttributes({
        extraSauce: 0,
        doublePortion: 0,
      });
    }
  }

  // Handel Plus Product Quantity
  const plusProductQuantity = async (productId, updatedQuantity) => {
    await updateQuantity(productId, updatedQuantity);
    setNeedsRefresh(!needsRefresh);
  };

  // Handel Minus Product Quantity
  const minusProductQuantity = async (productId, updatedQuantity) => {
    await updateQuantity(productId, updatedQuantity);
    setNeedsRefresh(!needsRefresh);
  };

  // Handel Delete Item From Product
  const removeItemFromCart = async (productId) => {
    const data = await removeItem(productId);
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.success(data.message);
    }
    setNeedsRefresh(!needsRefresh);
  };

  // Go To Checkout
  const handelProceedCheckout = async () => {
    const data = await ProceedToCheckout(cartItems);
    toast.error(data.message);
    window.location.href = data.data.url;
  };

  // handel Success Payment
  useEffect(() => {
    if (pathname === "/cart/payment/success") {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        toast.error("Missing session ID.");
        return;
      }

      const handelVerifyPayment = async () => {
        try {
          const data = await verifyPayment(sessionId);

          if (data.status === "error") {
            toast.error(data.message);
            return;
          }
          if (data.error) {
            toast.error(data.error);
          } else {
            // Check if payment already exists in array by comparing a unique identifier (like order ID)
            const newPaymentData = data.data;
            const paymentExists = paymentDetails.some(
              (payment) => payment.session_id === newPaymentData.session_id
            );

            if (!paymentExists) {
              const updatedPayments = [...paymentDetails, newPaymentData];
              setPaymentDetails(updatedPayments);
              // Save to cookies
              Cookies.set("paymentDetails", JSON.stringify(updatedPayments), {
                expires: 7,
              });
              toast.success("Payment verified successfully!");
            } else {
              toast.info("This payment was already processed.");
            }
          }
        } catch (err) {
          console.error("Verify payment error:", err);
          toast.error("Failed to verify payment.");
        }
      };

      handelVerifyPayment();
    }
  }, [searchParams, router, pathname]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Context value
  const value = {
    cartItems,
    handleAddToCart,
    isLoading,
    setAttributes,
    plusProductQuantity,
    minusProductQuantity,
    removeItemFromCart,
    containerVariants,
    itemVariants,
    paymentDetails,
    setNeedsRefresh,
    needsRefresh,
    router,
    handelProceedCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
