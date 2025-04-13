"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPlus, FaTrash, FaEdit, FaSpinner, FaFileInvoice, FaHistory, FaCheck, FaRegCreditCard } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../../../src/css/profile-billing.module.css';

export default function ProfileBilling() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('payment-methods');
  const [showAddCard, setShowAddCard] = useState(false);
  
  // Static payment methods data
  const staticPaymentMethods = [
    {
      id: 1,
      type: 'visa',
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '09/25',
      cardholderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      cardNumber: '•••• •••• •••• 5555',
      expiryDate: '12/24',
      cardholderName: 'John Doe',
      isDefault: false
    }
  ];
  
  // Static billing history data
  const staticBillingHistory = [
    {
      id: 'INV-2023-001',
      date: '2023-12-10',
      amount: 78.50,
      status: 'paid',
      description: 'Dinner Order #ORD-2023-001',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'INV-2023-002',
      date: '2023-11-25',
      amount: 56.75,
      status: 'paid',
      description: 'Dinner Order #ORD-2023-002',
      paymentMethod: 'PayPal'
    },
    {
      id: 'INV-2023-003',
      date: '2023-12-18',
      amount: 42.25,
      status: 'pending',
      description: 'Dinner Order #ORD-2023-003',
      paymentMethod: 'Mastercard •••• 5555'
    },
    {
      id: 'INV-2023-004',
      date: '2023-12-05',
      amount: 89.97,
      status: 'refunded',
      description: 'Dinner Order #ORD-2023-004 (Cancelled)',
      paymentMethod: 'Visa •••• 4242'
    }
  ];
  
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setPaymentMethods(staticPaymentMethods);
      setBillingHistory(staticBillingHistory);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSetDefaultCard = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };
  
  const handleDeleteCard = (id) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    }
  };
  
  const handleAddCard = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to your payment processor
    // For this demo, we'll just add a mock card
    const newCard = {
      id: Date.now(),
      type: 'visa',
      cardNumber: '•••• •••• •••• 1234',
      expiryDate: '01/26',
      cardholderName: 'John Doe',
      isDefault: false
    };
    
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
  };
  
  const getCardIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'visa':
        return '/images/payment/visa.svg';
      case 'mastercard':
        return '/images/payment/mastercard.svg';
      case 'amex':
        return '/images/payment/amex.svg';
      default:
        return '/images/payment/generic-card.svg';
    }
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid':
        return <span className={`${styles.statusBadge} ${styles.paid}`}><FaCheck /> Paid</span>;
      case 'pending':
        return <span className={`${styles.statusBadge} ${styles.pending}`}><FaSpinner /> Pending</span>;
      case 'refunded':
        return <span className={`${styles.statusBadge} ${styles.refunded}`}><FaHistory /> Refunded</span>;
      default:
        return null;
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading your billing information...</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className={styles.billingContainer}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2>Billing & Payments</h2>
      
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'payment-methods' ? styles.active : ''}`}
          onClick={() => setActiveTab('payment-methods')}
        >
          <FaCreditCard /> Payment Methods
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'billing-history' ? styles.active : ''}`}
          onClick={() => setActiveTab('billing-history')}
        >
          <FaFileInvoice /> Billing History
        </button>
      </div>
      
      {activeTab === 'payment-methods' && (
        <div className={styles.paymentMethodsContainer}>
          <div className={styles.sectionHeader}>
            <h3>Your Payment Methods</h3>
            <button 
              className={styles.addButton}
              onClick={() => setShowAddCard(!showAddCard)}
            >
              {showAddCard ? 'Cancel' : <><FaPlus /> Add New Card</>}
            </button>
          </div>
          
          {showAddCard && (
            <motion.div 
              className={styles.addCardForm}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <form onSubmit={handleAddCard}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardholderName">Cardholder Name</label>
                    <input type="text" id="cardholderName" placeholder="John Doe" required />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Card Number</label>
                    <div className={styles.cardNumberInput}>
                      <FaRegCreditCard />
                      <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required />
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveButton}>Save Card</button>
                </div>
              </form>
            </motion.div>
          )}
          
          {paymentMethods.length === 0 ? (
            <div className={styles.emptyState}>
              <FaCreditCard className={styles.emptyIcon} />
              <h3>No payment methods</h3>
              <p>You haven't added any payment methods yet.</p>
              <button 
                className={styles.addFirstButton}
                onClick={() => setShowAddCard(true)}
              >
                <FaPlus /> Add Your First Card
              </button>
            </div>
          ) : (
            <div className={styles.cardsList}>
              {paymentMethods.map((method) => (
                <div key={method.id} className={styles.cardItem}>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardBrand}>
                      <Image 
                        src={getCardIcon(method.type)} 
                        alt={method.type}
                        width={40}
                        height={30}
                      />
                    </div>
                    <div className={styles.cardDetails}>
                      <h4>{method.cardNumber}</h4>
                      <div className={styles.cardMeta}>
                        <span>Expires {method.expiryDate}</span>
                        <span>{method.cardholderName}</span>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className={styles.defaultBadge}>Default</span>
                    )}
                  </div>
                  <div className={styles.cardActions}>
                    {!method.isDefault && (
                      <button 
                        className={styles.setDefaultButton}
                        onClick={() => handleSetDefaultCard(method.id)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button 
                      className={styles.editButton}
                      aria-label="Edit card"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDeleteCard(method.id)}
                      aria-label="Delete card"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'billing-history' && (
        <div className={styles.billingHistoryContainer}>
          <div className={styles.sectionHeader}>
            <h3>Billing History</h3>
          </div>
          
          {billingHistory.length === 0 ? (
            <div className={styles.emptyState}>
              <FaFileInvoice className={styles.emptyIcon} />
              <h3>No billing history</h3>
              <p>You don't have any billing records yet.</p>
            </div>
          ) : (
            <div className={styles.billingTable}>
              <div className={styles.tableHeader}>
                <div className={styles.invoiceId}>Invoice ID</div>
                <div className={styles.invoiceDate}>Date</div>
                <div className={styles.invoiceDesc}>Description</div>
                <div className={styles.invoiceAmount}>Amount</div>
                <div className={styles.invoiceStatus}>Status</div>
                <div className={styles.invoiceActions}>Actions</div>
              </div>
              
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className={styles.tableRow}>
                  <div className={styles.invoiceId}>{invoice.id}</div>
                  <div className={styles.invoiceDate}>{new Date(invoice.date).toLocaleDateString()}</div>
                  <div className={styles.invoiceDesc}>
                    <div>{invoice.description}</div>
                    <div className={styles.paymentMethod}>{invoice.paymentMethod}</div>
                  </div>
                  <div className={styles.invoiceAmount}>${invoice.amount.toFixed(2)}</div>
                  <div className={styles.invoiceStatus}>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <div className={styles.invoiceActions}>
                    <button className={styles.viewButton}>View</button>
                    <button className={styles.downloadButton}>Download</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}