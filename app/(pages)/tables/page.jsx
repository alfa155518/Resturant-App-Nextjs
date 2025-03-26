"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaUsers, FaClock, FaUtensils, FaTimes, FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "../../../src/css/tables.module.css";

export default function Tables() {
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [tablesPerPage] = useState(4);
  
  // Existing states
  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTable, setModalTable] = useState(null);
  
  const modalRef = useRef(null);

  // Animation variants
  const fadeInAndHover = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    rest: { 
      scale: 1,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  // Table data
  const tables = [
    { 
      id: 1, 
      name: "Romantic Corner", 
      capacity: 2, 
      image: "/images/table.png",
      description: "Perfect for couples, this intimate table offers a cozy atmosphere with soft lighting and privacy.",
      features: ["Window View", "Private", "Candlelit"],
      details: "Our most requested table for anniversaries and date nights. Located in a quiet corner of the restaurant with dimmed lighting and a view of our garden. Each table comes with complimentary champagne for special occasions."
    },
    { 
      id: 2, 
      name: "Family Table", 
      capacity: 6, 
      image: "/images/table.png",
      description: "Spacious seating for families and groups, located in our vibrant main dining area.",
      features: ["Kid-Friendly", "Spacious", "Central Location"],
      details: "A perfect setting for family gatherings. The table is designed to accommodate high chairs and booster seats for children. Located near our dessert display, which is always a hit with the little ones!"
    },
    { 
      id: 3, 
      name: "Garden View", 
      capacity: 4, 
      image: "/images/table.png",
      description: "Enjoy your meal with a beautiful view of our garden terrace and natural lighting.",
      features: ["Garden View", "Natural Light", "Semi-Private"],
      details: "Experience dining with nature as your backdrop. This table offers panoramic views of our award-winning garden terrace. Perfect for lunch or early dinner when natural light fills the space."
    },
    { 
      id: 4, 
      name: "Chef's Table", 
      capacity: 8, 
      image: "/images/table.png",
      description: "Premium experience with a direct view of our kitchen. Watch our chefs prepare your meal.",
      features: ["Kitchen View", "Premium Experience", "Special Menu Options"],
      details: "Our exclusive Chef's Table offers a unique dining experience where you can watch our culinary team in action. Includes a special tasting menu with wine pairings and personal interaction with our head chef."
    },{ 
      id: 5, 
      name: "Terrace Lounge", 
      capacity: 4, 
      image: "/images/table.png",
      description: "Al fresco dining with comfortable lounge seating and city views.",
      features: ["Outdoor", "Lounge Seating", "City View"],
      details: "Our terrace lounge offers a relaxed dining experience with plush seating and panoramic city views. Heaters and blankets are available for cooler evenings, making this a year-round favorite."
    },
    { 
      id: 6, 
      name: "Private Dining Room", 
      capacity: 10, 
      image: "/images/table.png",
      description: "Exclusive space for private gatherings with personalized service.",
      features: ["Private Room", "Custom Menu", "AV Equipment"],
      details: "Perfect for business meetings or special celebrations, our private dining room offers complete privacy with dedicated staff. Includes a large screen for presentations and custom menu options."
    },
    { 
      id: 7, 
      name: "Waterfront Table", 
      capacity: 6, 
      image: "/images/table.png",
      description: "Stunning waterfront views with elegant table settings.",
      features: ["Water View", "Sunset Spot", "Premium Location"],
      details: "Located at the edge of our dining area with unobstructed views of the waterfront. This table is perfectly positioned to enjoy spectacular sunsets while dining on our finest cuisine."
    },
    { 
      id: 8, 
      name: "Wine Cellar Table", 
      capacity: 4, 
      image: "/images/table.png",
      description: "Intimate dining surrounded by our extensive wine collection.",
      features: ["Wine Cellar", "Temperature Controlled", "Sommelier Service"],
      details: "Dine among thousands of wine bottles in our temperature-controlled cellar. Includes personal sommelier service to help pair the perfect wines with your meal selections."
    }
  ];

  
  // Calculate pagination values
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;
  const currentTables = tables.slice(indexOfFirstTable, indexOfLastTable);
  const totalPages = Math.ceil(tables.length / tablesPerPage);

  // Pagination handler
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top of tables grid
      document.getElementById('tablesGrid').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setIsFormVisible(true);
    
    // Scroll to reservation form
    setTimeout(() => {
      document.getElementById('reservationForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const handleInfoClick = (e, table) => {
    e.stopPropagation(); // Prevent triggering the table selection
    setModalTable(table);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the reservation submission
    alert(`Reservation submitted for ${selectedTable.name} on ${date} at ${time} for ${guests} guests`);
  };

  // Close modal when clicking outside
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Make sure this function is properly defined
  const closeReservationForm = () => {
    setIsFormVisible(false);
    setSelectedTable(null);
  };

  return (
    <div className={styles.tablesContainer}>
      {/* Hero Section */}
      <motion.div 
        className={styles.heroSection}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeInAndHover} className={styles.title}>
          Reserve Your Perfect Table
        </motion.h1>
        <motion.p variants={fadeInAndHover} className={styles.subtitle}>
          Choose from our carefully designed seating arrangements for your perfect dining experience
        </motion.p>
      </motion.div>

      {/* Tables Grid */}
      <motion.div 
        id="tablesGrid"
        className={styles.tablesGrid}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {currentTables.map((table, index) => (
          <motion.div
            key={table.id}
            className={`${styles.tableCard} ${selectedTable?.id === table.id ? styles.selected : ''}`}
            variants={fadeInAndHover}
            initial="rest"
            whileHover="hover"
            animate={selectedTable?.id === table.id ? "hover" : "rest"}
            onClick={() => handleTableSelect(table)}
          >
              <div className={styles.tableImageContainer}>
              <Image
                src={table.image}
                alt={table.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0 && currentPage === 1}
                className={styles.tableImage}
              />
              <div className={styles.tableCapacity}>
                <FaUsers /> <span>{table.capacity}</span>
              </div>
              <button 
                className={styles.infoButton}
                onClick={(e) => handleInfoClick(e, table)}
                aria-label="View table details"
              >
                <FaInfoCircle />
              </button>
            </div>
            <div className={styles.tableInfo}>
              <h2 className={styles.tableName}>{table.name}</h2>
              <p className={styles.tableDescription}>{table.description}</p>
              <div className={styles.tableFeatures}>
                {table.features.map((feature, index) => (
                  <span key={index} className={styles.feature}>
                    <FaUtensils className={styles.featureIcon} />
                    {feature}
                  </span>
                ))}
              </div>
              <button className={styles.selectButton}>
                {selectedTable?.id === table.id ? 'Selected' : 'Select Table'}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
{/* Add Pagination Component */}
{totalPages > 1 && (
        <motion.div 
          className={styles.pagination}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.activePage : ''}`}
                onClick={() => paginate(i + 1)}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button 
            className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </motion.div>
      )}
      {/* Reservation Form */}
      <motion.div 
        id="reservationForm"
        className={`${styles.reservationSection} ${isFormVisible ? styles.visible : ''}`}
        initial="hidden"
        animate={isFormVisible ? "visible" : "hidden"}
        variants={fadeInAndHover}
      >
        {selectedTable && (
          <>
            <button className={styles.closeButton} onClick={closeReservationForm} aria-label="Close reservation form">
              <FaTimes />
            </button>
            
            <h3 className={styles.reservationTitle}>
              Reserve {selectedTable.name}
            </h3>
            <form onSubmit={handleSubmit} className={styles.reservationForm}>
              <div className={styles.formGroup}>
                <label htmlFor="data">
                  <FaCalendarAlt className={styles.inputIcon} />
                  Date
                </label>
                <input
                  type="date"
                  id="data"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="time">
                  <FaClock className={styles.inputIcon} />
                  Time
                </label>
                <select
                  value={time}
                  id="time"
                  onChange={(e) => setTime(e.target.value)}
                  required
                  name="time"
                >
                  <option value="">Select a time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="guests">
                  <FaUsers className={styles.inputIcon} />
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  id="guests"
                  max={selectedTable.capacity}
                  value={guests}
                  name="guests"
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  required
                />
                <span className={styles.capacityNote}>
                  Max capacity: {selectedTable.capacity}
                </span>
              </div>
              
              <motion.button 
                type="submit" 
                className={styles.reserveButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Confirm reservation"
              >
                Confirm Reservation
              </motion.button>
            </form>
          </>
        )}
      </motion.div>

      {/* Additional Information */}
      <motion.div 
        className={styles.infoSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInAndHover} className={styles.infoTitle}>
          Dining Experience Information
        </motion.h2>
        
        <div className={styles.infoGrid}>
          <motion.div variants={fadeInAndHover} className={styles.infoCard}>
            <h3>Reservation Policy</h3>
            <p>Reservations can be made up to 30 days in advance. We hold tables for 15 minutes past the reservation time.</p>
          </motion.div>
          
          <motion.div variants={fadeInAndHover} className={styles.infoCard}>
            <h3>Special Occasions</h3>
            <p>Let us know if you're celebrating a special occasion, and we'll make your experience even more memorable.</p>
          </motion.div>
          
          <motion.div variants={fadeInAndHover} className={styles.infoCard}>
            <h3>Large Groups</h3>
            <p>For parties of 8 or more, please contact us directly for special arrangements and menu options.</p>
          </motion.div>
          
          <motion.div variants={fadeInAndHover} className={styles.infoCard}>
            <h3>Dietary Needs</h3>
            <p>We accommodate all dietary restrictions. Please inform us when making your reservation.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Table Info Modal */}
      <AnimatePresence>
        {showModal && modalTable && (
          <div className={styles.modalOverlay} onClick={handleModalClick}>
            <motion.div 
              className={styles.modal}
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
              
              <div className={styles.modalImageContainer}>
                <Image
                  src={modalTable.image}
                  alt={modalTable.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.modalImage}
                />
              </div>
              
              <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{modalTable.name}</h2>
                
                <div className={styles.modalInfo}>
                  <div className={styles.modalCapacity}>
                    <FaUsers /> <span>Capacity: {modalTable.capacity} guests</span>
                  </div>
                  
                  <div className={styles.modalFeatures}>
                    <h3>Features:</h3>
                    <ul>
                      {modalTable.features.map((feature, index) => (
                        <li key={index}>
                          <FaUtensils className={styles.featureIcon} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.modalDescription}>
                    <h3>Description:</h3>
                    <p>{modalTable.description}</p>
                  </div>
                  
                  <div className={styles.modalDetails}>
                    <h3>Additional Details:</h3>
                    <p>{modalTable.details}</p>
                  </div>
                </div>
                
                <motion.button 
                  className={styles.modalReserveButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleTableSelect(modalTable);
                    closeModal();
                  }}
                >
                  Reserve This Table
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}