import { UserContext } from "@/store/UserProvider";
import Image from "next/image";
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
export default function OrderDetailsModal({ styles }) {
  const {
    showDetailsModal,
    closeOrderDetails,
    selectedOrder,
    getStatusText,
    getStatusIcon,
    checkoutHistory,
  } = useContext(UserContext);
  return (
    showDetailsModal &&
    selectedOrder && (
      <div className={styles.modalOverlay} onClick={closeOrderDetails}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={closeOrderDetails}>
            <FaTimes />
          </button>

          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h3>Order Details</h3>
            <div
              className={`${styles.orderStatus} ${
                styles[selectedOrder.checkout.payment_status]
              }`}>
              {getStatusIcon(selectedOrder.checkout.payment_status)}
              <span>
                {getStatusText(selectedOrder.checkout.payment_status)}
              </span>
            </div>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.orderSummary}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Order ID:</span>
                <span className={styles.summaryValue}>{selectedOrder.id}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Date:</span>
                <span className={styles.summaryValue}>
                  {new Date(
                    selectedOrder.checkout?.payment_date
                  ).toLocaleDateString()}{" "}
                  at {selectedOrder.checkout?.payment_date}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Payment Method:</span>
                <span className={styles.summaryValue}>
                  {selectedOrder.checkout.payment_method}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Status:</span>
                <span className={styles.summaryValue}>
                  {getStatusText(selectedOrder.checkout.payment_status)}
                </span>
              </div>
            </div>

            {/* Checkout History Item Content*/}
            <div className={styles.orderItemsDetailed}>
              <h4>Order Items</h4>
              <div className={styles.itemsTable}>
                <div className={styles.itemsTableHeader}>
                  <div className={styles.itemCol}>Item</div>
                  <div className={styles.priceCol}>Price</div>
                  <div className={styles.qtyCol}>Qty</div>
                  <div className={styles.totalCol}>Total</div>
                </div>
                {checkoutHistory.items?.map((item) => (
                  <div key={item.id} className={styles.itemsTableRow}>
                    <div className={styles.itemCol}>
                      <div className={styles.itemImageLarge}>
                        <Image
                          src={item.image}
                          alt={item.product_name}
                          width={80}
                          height={80}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          className={styles.foodImgLarge}
                        />
                      </div>
                      <div className={styles.itemInfo}>
                        <h5>{item.product_name}</h5>
                      </div>
                    </div>
                    <div className={styles.priceCol}>${item.price}</div>
                    <div className={styles.qtyCol}>{item.quantity}</div>
                    <div className={styles.totalCol}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total Values */}
            <div className={styles.orderTotals}>
              <div className={styles.totalRow}>
                <span>Subtotal:</span>
                <span>${selectedOrder.price * selectedOrder.quantity}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Delivery Fee:</span>
                <span>$0.00</span>
              </div>
              <div className={styles.totalRow}>
                <span>Tax:</span>
                <span>
                  $
                  {(selectedOrder.price * selectedOrder.quantity * 0.1).toFixed(
                    2
                  )}
                </span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total:</span>
                <span>
                  $
                  {(selectedOrder.price * selectedOrder.quantity * 1.1).toFixed(
                    2
                  )}
                </span>
              </div>
            </div>

            {/* Order Delivery Info */}
            <div className={styles.deliveryInfo}>
              <h4>Delivery Information</h4>
              <div className={styles.deliveryAddress}>
                <p>123 Main Street, Apt 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>

              {selectedOrder.status === "paid" && (
                <div className={styles.deliveryTime}>
                  <p>
                    Paid on{" "}
                    {new Date(
                      selectedOrder.checkout?.payment_date
                    ).toLocaleDateString()}{" "}
                    at {selectedOrder.checkout?.payment_date}
                  </p>
                </div>
              )}

              {selectedOrder.status === "out-for-delivery" && (
                <div className={styles.estimatedDelivery}>
                  <p>
                    Estimated delivery: Today, between{" "}
                    {selectedOrder.checkout?.payment_date} -{" "}
                    {(() => {
                      const [hours, minutes] =
                        selectedOrder.checkout?.payment_date.split(":");
                      const estimatedHour = (parseInt(hours) + 1) % 24;
                      return `${estimatedHour}:${minutes}`;
                    })()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
