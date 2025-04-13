"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaCalendarAlt, FaClock, FaMoneyBillWave, FaSpinner, FaCheck, FaTimes, FaTruck, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../../../src/css/profile-orders.module.css';

export default function ProfileOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Static order data
  const staticOrders = [
    {
      id: 'ORD-2023-001',
      date: '2023-12-10',
      time: '19:45',
      status: 'delivered',
      total: 78.50,
      payment_method: 'Credit Card',
      items: [
        {
          id: 1,
          name: 'Grilled Salmon',
          price: 24.99,
          quantity: 2,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/tvb79bc8id6zgixixhq4'
        },
        {
          id: 2,
          name: 'Caesar Salad',
          price: 12.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/jhmch4eohzhltgoxv1bt'
        },
        {
          id: 3,
          name: 'Tiramisu',
          price: 8.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/jtsvnf8nes1d8td73um3'
        }
      ]
    },
    {
      id: 'ORD-2023-002',
      date: '2023-11-25',
      time: '20:15',
      status: 'delivered',
      total: 56.75,
      payment_method: 'PayPal',
      items: [
        {
          id: 4,
          name: 'Beef Wellington',
          price: 34.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/ohvdvvzieftrjxxwtxxm'
        },
        {
          id: 5,
          name: 'Garlic Bread',
          price: 6.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/cxiliizfsbfj8wr2vzkq'
        },
        {
          id: 6,
          name: 'Chocolate Mousse',
          price: 7.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/zbatn7gakkshf7qq4gco'
        }
      ]
    },
    {
      id: 'ORD-2023-003',
      date: '2023-12-18',
      time: '13:30',
      status: 'processing',
      total: 42.25,
      payment_method: 'Credit Card',
      items: [
        {
          id: 7,
          name: 'Margherita Pizza',
          price: 18.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/jh4cfim95czivqfnkxlx'
        },
        {
          id: 8,
          name: 'Caprese Salad',
          price: 10.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/xaqudoiokcfynt9wsfkv'
        },
        {
          id: 9,
          name: 'Tiramisu',
          price: 8.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/gjcbirwv77cebshv4pso'
        }
      ]
    },
    {
      id: 'ORD-2023-004',
      date: '2023-12-05',
      time: '18:45',
      status: 'cancelled',
      total: 89.97,
      payment_method: 'Credit Card',
      items: [
        {
          id: 10,
          name: 'Lobster Thermidor',
          price: 49.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/wdtxild867yfbidsfpoi'
        },
        {
          id: 11,
          name: 'Truffle Fries',
          price: 12.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/dlnpombdmhmfl1nty366'
        },
        {
          id: 12,
          name: 'Crème Brûlée',
          price: 8.99,
          quantity: 3,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/eo5v5hmw6vo0mc5bj5n9'
        }
      ]
    },
    {
      id: 'ORD-2023-005',
      date: '2023-12-22',
      time: '21:00',
      status: 'out-for-delivery',
      total: 64.50,
      payment_method: 'PayPal',
      items: [
        {
          id: 13,
          name: 'Filet Mignon',
          price: 39.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/cqe9ck6bxgl6unuwty1o'
        },
        {
          id: 14,
          name: 'Mashed Potatoes',
          price: 8.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/usmixcrhsv4qxdzqllmp'
        },
        {
          id: 15,
          name: 'Cheesecake',
          price: 9.99,
          quantity: 1,
          image: 'https://res.cloudinary.com/duumkzqwx/image/upload/f_auto,q_auto/v1/laravel-restaurant/menu/j21mkdsqfm2rz5ixqr3z'
        }
      ]
    }
  ];
  
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setOrders(staticOrders);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <FaCheck className={styles.deliveredIcon} />;
      case 'processing':
        return <FaSpinner className={styles.processingIcon} />;
      case 'out-for-delivery':
        return <FaTruck className={styles.deliveryIcon} />;
      case 'cancelled':
        return <FaTimes className={styles.cancelledIcon} />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'out-for-delivery':
        return 'Out for Delivery';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };
  
  const closeOrderDetails = () => {
    setShowDetailsModal(false);
  };
  
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (activeFilter !== 'all' && order.status !== activeFilter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.name.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading your orders...</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className={styles.ordersContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2>Order History</h2>
      
      <div className={styles.orderControls}>
        <div className={styles.searchBox}>
          <FaSearch />
          <input 
            type="text" 
            name='search'
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filterButtons}>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'delivered' ? styles.active : ''}`}
            onClick={() => setActiveFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'processing' ? styles.active : ''}`}
            onClick={() => setActiveFilter('processing')}
          >
            Processing
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'out-for-delivery' ? styles.active : ''}`}
            onClick={() => setActiveFilter('out-for-delivery')}
          >
            Out for Delivery
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'cancelled' ? styles.active : ''}`}
            onClick={() => setActiveFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <FaShoppingBag className={styles.emptyIcon} />
          <h3>No orders found</h3>
          <p>
            {searchTerm 
              ? `No orders match your search for "${searchTerm}"`
              : `You don't have any ${activeFilter !== 'all' ? activeFilter : ''} orders yet.`
            }
          </p>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrders.map((order, index) => (
            <motion.div 
              key={order.id}
              className={styles.orderCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <h3>{order.id}</h3>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderDate}>
                      <FaCalendarAlt /> {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span className={styles.orderTime}>
                      <FaClock /> {order.time}
                    </span>
                    <span className={styles.orderTotal}>
                      <FaMoneyBillWave /> ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className={`${styles.orderStatus} ${styles[order.status]}`}>
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </div>
              </div>
              
              <div className={styles.orderItems}>
                {order.items.map(item => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={70}
                        height={70}
                        className={styles.foodImg}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4>{item.name}</h4>
                      <div className={styles.itemMeta}>
                        <span>${item.price.toFixed(2)}</span>
                        <span>×</span>
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                    <div className={styles.itemTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.orderFooter}>
                <div className={styles.orderPayment}>
                  <span>Payment Method:</span>
                  <strong>{order.payment_method}</strong>
                </div>
                <div className={styles.orderActions}>
                <button 
                    className={styles.viewDetailsButton}
                    onClick={() => openOrderDetails(order)}
                  >
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className={styles.reorderButton}>
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
       {/* Order Details Modal */}
       {showDetailsModal && selectedOrder && (
        <div className={styles.modalOverlay} onClick={closeOrderDetails}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeOrderDetails}>
              <FaTimes />
            </button>
            
            <div className={styles.modalHeader}>
              <h3>Order Details</h3>
              <div className={`${styles.orderStatus} ${styles[selectedOrder.status]}`}>
                {getStatusIcon(selectedOrder.status)}
                <span>{getStatusText(selectedOrder.status)}</span>
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
                    {new Date(selectedOrder.date).toLocaleDateString()} at {selectedOrder.time}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Payment Method:</span>
                  <span className={styles.summaryValue}>{selectedOrder.payment_method}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Status:</span>
                  <span className={styles.summaryValue}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
              </div>
              
              <div className={styles.orderItemsDetailed}>
                <h4>Order Items</h4>
                <div className={styles.itemsTable}>
                  <div className={styles.itemsTableHeader}>
                    <div className={styles.itemCol}>Item</div>
                    <div className={styles.priceCol}>Price</div>
                    <div className={styles.qtyCol}>Qty</div>
                    <div className={styles.totalCol}>Total</div>
                  </div>
                  
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className={styles.itemsTableRow}>
                      <div className={styles.itemCol}>
                        <div className={styles.itemImageLarge}>
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            width={80}
                            height={80}
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            className={styles.foodImgLarge}
                          />
                        </div>
                        <div className={styles.itemInfo}>
                          <h5>{item.name}</h5>
                        </div>
                      </div>
                      <div className={styles.priceCol}>${item.price.toFixed(2)}</div>
                      <div className={styles.qtyCol}>{item.quantity}</div>
                      <div className={styles.totalCol}>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.orderTotals}>
                <div className={styles.totalRow}>
                  <span>Subtotal:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Delivery Fee:</span>
                  <span>$0.00</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Tax:</span>
                  <span>${(selectedOrder.total * 0.1).toFixed(2)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Total:</span>
                  <span>${(selectedOrder.total * 1.1).toFixed(2)}</span>
                </div>
              </div>
              
              <div className={styles.deliveryInfo}>
                <h4>Delivery Information</h4>
                <div className={styles.deliveryAddress}>
                  <p>123 Main Street, Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
                
                {selectedOrder.status === 'delivered' && (
                  <div className={styles.deliveryTime}>
                    <p>Delivered on {new Date(selectedOrder.date).toLocaleDateString()} at {selectedOrder.time}</p>
                  </div>
                )}
                
                {selectedOrder.status === 'out-for-delivery' && (
                  <div className={styles.estimatedDelivery}>
                    <p>Estimated delivery: Today, between {selectedOrder.time} - {
                      (() => {
                        const [hours, minutes] = selectedOrder.time.split(':');
                        const estimatedHour = (parseInt(hours) + 1) % 24;
                        return `${estimatedHour}:${minutes}`;
                      })()
                    }</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}