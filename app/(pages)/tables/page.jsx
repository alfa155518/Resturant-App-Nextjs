"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUsers, FaUtensils, FaTimes, FaInfoCircle, FaTimesCircle, FaTools, FaLock, FaRegCheckCircle } from "react-icons/fa";
import styles from "../../../src/css/tables.module.css";
import Pagination from "@/components/ui/pagination";
import useTables from "@/hooks/useTables";
import ReservationTableForm from "@/components/ReservationTableForm";
import TableModel from "@/components/TableModel";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Tables() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  // Custom Hook
  const [
    tables,
    setCurrentPage,
    selectedTable,
    setSelectedTable,
    showModal,
    setShowModal,
    modalTable,
    setModalTable,
    fadeInAndHover,
    staggerContainer,
    modalVariants,] = useTables();


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
    e.stopPropagation();
    setModalTable(table);
    setShowModal(true);
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
      {
        tables < 1 ? <LoadingSpinner /> :
        <>
      <motion.div
      id="tablesGrid"
        className={styles.tablesGrid}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        { tables.tables?.map((table, index) => (
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
                priority={index < 3}
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
              <div className={`${styles.statusBadge} ${styles[table.status]}`}>
                {table.status === 'active' && <FaRegCheckCircle />}
                {table.status === 'inactive' && <FaTimesCircle />}
                {table.status === 'maintenance' && <FaTools />}
                {table.status === 'reserved' && <FaLock />}
                <span>{table.status}</span>
              </div>
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
              <button
                className={`${styles.selectButton} ${styles[`button${table.status}`]}`}
                disabled={table.status !== 'active'}
                >
                {table.status === 'active' && (selectedTable?.id === table.id ? 'Selected' : 'Select Table')}
                {table.status === 'inactive' && 'Not Available'}
                {table.status === 'maintenance' && 'Under Maintenance'}
                {table.status === 'reserved' && 'Reserved'}
              </button>
            </div>
          </motion.div>
        ))
         
        }
      </motion.div>
      {/* Pagination */}
      <Pagination
        currentPage={tables.current_page} totalPages={tables.last_page} onPageChange={setCurrentPage}
      />
      </>
    }
      {/* Reservation Form */}
      {
        selectedTable && <ReservationTableForm styles={styles} isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} fadeInAndHover={fadeInAndHover} selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
      }


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
      <TableModel
        styles={styles}
        showModal={showModal}
        setShowModal={setShowModal}
        modalTable={modalTable}
        modalVariants={modalVariants}
        setSelectedTable={setSelectedTable}
        setIsFormVisible={setIsFormVisible}
      />
    </div>
  );
}