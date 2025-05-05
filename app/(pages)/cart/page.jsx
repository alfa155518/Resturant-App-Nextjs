"use client";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaLock } from "react-icons/fa";
import styles from "../../../src/css/cart.module.css";
import { CartContext } from "@/store/CartProvider";
export default function Cart() {
  const {
    cartItems,
    plusProductQuantity,
    minusProductQuantity,
    removeItemFromCart,
    containerVariants,
    itemVariants,
    handelProceedCheckout,
  } = useContext(CartContext);

  // State for promo code
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // State for delivery option
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [deliveryFee, setDeliveryFee] = useState(5.99);

  // State for order notes
  const [orderNotes, setOrderNotes] = useState("");

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate tax (assuming 8%)
  const tax = subtotal * 0.08;

  // Calculate total
  const total =
    subtotal +
    tax +
    (deliveryOption === "delivery" ? deliveryFee : 0) -
    discount;

  // Handle promo code application
  const handleApplyPromo = () => {
    // Simple promo code validation
    if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert("Invalid promo code");
    }
  };

  // Handle delivery option change
  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  // Empty cart check
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className={styles.cartPageContainer}>
      <motion.div
        className={styles.cartHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className={styles.headerContent}>
          <h1>Your Cart</h1>
          <p>
            {isCartEmpty
              ? "Your cart is empty"
              : `${cartItems.length} item ${
                  cartItems.length > 1 ? "s" : ""
                } in your cart`}
          </p>
        </div>
      </motion.div>

      <div className={styles.cartContent}>
        {isCartEmpty ? (
          <motion.div
            className={styles.emptyCartContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <div className={styles.emptyCartImage}>
              <Image
                src="/images/empty-cart.webp"
                alt="Empty Cart"
                width={200}
                height={200}
                priority
              />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link href="/menu">
              <motion.button
                className={styles.continueShoppingBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <FaArrowLeft /> Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className={styles.cartContentGrid}>
            <motion.div
              className={styles.cartItemsContainer}
              variants={containerVariants}
              initial="hidden"
              animate="visible">
              <h2>Order Items</h2>

              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.cartItem}
                  variants={itemVariants}
                  layout>
                  <div className={styles.itemImageContainer}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className={styles.itemImage}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.product.name}</h3>
                    <p className={styles.itemDescription}>
                      {item.product.description}
                    </p>
                    <div className={styles.itemPrice}>
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                      <motion.button
                        onClick={() =>
                          minusProductQuantity(item.menu_id, --item.quantity)
                        }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity">
                        <FaMinus />
                      </motion.button>
                      <span>{item.quantity}</span>
                      <motion.button
                        onClick={() => {
                          plusProductQuantity(item.menu_id, ++item.quantity);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Increase quantity">
                        <FaPlus />
                      </motion.button>
                    </div>
                    <div className={styles.itemTotal}>
                      ${item.total.toFixed(2)}
                    </div>
                    <motion.button
                      className={styles.removeItemBtn}
                      onClick={() => removeItemFromCart(item.menu_id)}
                      whileHover={{ scale: 1.1, color: "#f44336" }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove item">
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              <div className={styles.cartActions}>
                <Link href="/menu">
                  <motion.button
                    className={styles.continueShoppingBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <FaArrowLeft /> Continue Shopping
                  </motion.button>
                </Link>
              </div>

              <motion.div
                className={styles.orderNotesContainer}
                variants={itemVariants}>
                <h3>Special Instructions</h3>
                <textarea
                  placeholder="Add notes about your order (allergies, special requests, etc.)"
                  value={orderNotes}
                  name="orderNotes"
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className={styles.orderNotes}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.orderSummaryContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <div className={styles.orderSummary}>
                <h2>Order Summary</h2>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className={styles.deliveryOptions}>
                  <h3>Delivery Options</h3>
                  <div className={styles.deliveryOptionButtons}>
                    <button
                      className={`${styles.deliveryOptionBtn} ${
                        deliveryOption === "delivery" ? styles.active : ""
                      }`}
                      onClick={() => handleDeliveryOptionChange("delivery")}>
                      Delivery (${deliveryFee.toFixed(2)})
                    </button>
                    <button
                      className={`${styles.deliveryOptionBtn} ${
                        deliveryOption === "pickup" ? styles.active : ""
                      }`}
                      onClick={() => handleDeliveryOptionChange("pickup")}>
                      Pickup (Free)
                    </button>
                  </div>
                </div>

                {deliveryOption === "delivery" && (
                  <div className={styles.summaryRow}>
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                <div className={styles.promoCodeContainer}>
                  <h3>Promo Code</h3>
                  <div className={styles.promoInputGroup}>
                    <input
                      type="text"
                      name="promoCode"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <motion.button
                      onClick={handleApplyPromo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={promoApplied}>
                      {promoApplied ? "Applied" : "Apply"}
                    </motion.button>
                  </div>
                  {promoApplied && (
                    <div className={styles.promoApplied}>
                      Promo code applied: 20% off
                    </div>
                  )}
                </div>

                {discount > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <motion.button
                  className={styles.checkoutBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handelProceedCheckout()}>
                  Proceed to Checkout
                </motion.button>

                <div className={styles.paymentMethods}>
                  <h3>We Accept</h3>
                  <div className={styles.paymentIcons}>
                    <Image
                      src="/images/visa.webp"
                      alt="Visa"
                      width={40}
                      height={25}
                    />
                    <Image
                      src="/images/mastercard.webp"
                      alt="Mastercard"
                      width={40}
                      height={25}
                    />
                    <Image
                      src="/images/paypal.webp"
                      alt="PayPal"
                      width={40}
                      height={25}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.secureCheckout}>
                <div className={styles.secureIcon}>
                  <FaLock size={16} />
                </div>
                <p>Secure Checkout</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <motion.div
        className={styles.recommendedSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}>
        <h2>You Might Also Like</h2>
        <div className={styles.recommendedItems}>
          {[1, 2, 3, 4].map((id) => (
            <motion.div
              key={id}
              className={styles.recommendedItem}
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              <div className={styles.recommendedImageContainer}>
                <Image
                  src={`/images/feature/create-grilled-salmon-dish.png`}
                  alt={`Recommended Item ${id}`}
                  width={150}
                  height={150}
                  className={styles.recommendedImage}
                />
              </div>
              <h3>Delicious Dish {id}</h3>
              <p>${(15.99 + id).toFixed(2)}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
export const dynamic = "force-dynamic";
