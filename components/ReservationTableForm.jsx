
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaUsers, FaClock, FaTimes } from "react-icons/fa";
export default function ReservationTableForm({ styles, setIsFormVisible, isFormVisible, fadeInAndHover, selectedTable,
  setSelectedTable }) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const closeReservationForm = () => {
    setIsFormVisible(false);
    setSelectedTable(null);
  };

  return (

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
          <form className={styles.reservationForm}>
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
  );

}