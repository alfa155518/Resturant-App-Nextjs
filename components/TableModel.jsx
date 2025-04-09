import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { FaUsers, FaUtensils, FaTimes } from "react-icons/fa";
export default function TableModel({
  styles, 
  modalVariants,
  showModal,
  setShowModal,
  modalTable,
  setSelectedTable,
  setIsFormVisible
}) {

  const modalRef = useRef(null);

  const closeModal = () => {
    setShowModal(false);
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


  // Close modal when clicking outside
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (

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
  )

}