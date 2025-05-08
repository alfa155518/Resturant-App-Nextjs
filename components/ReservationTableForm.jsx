
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaTimes,
  FaCalendarDay,
} from "react-icons/fa";

import useTables from "@/hooks/useTables";

const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const RESERVATION_TIMES = [
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" }
];

export default function ReservationTableForm({
  styles,
  setIsFormVisible,
  isFormVisible,
  fadeInAndHover,
  selectedTable,
  setSelectedTable,
}) {

  const [
    , , , , , , , , , , ,
    reservationFormState,
    handleInputChange,
    handleReserveTable,
    closeReservationForm
  ] = useTables(setIsFormVisible, setSelectedTable);



  return (
    <motion.div
      id="reservationForm"
      className={`${styles.reservationSection} ${isFormVisible ? styles.visible : ""
        }`}
      initial="hidden"
      animate={isFormVisible ? "visible" : "hidden"}
      variants={fadeInAndHover}>
      {selectedTable && (
        <>
          <button
            className={styles.closeButton}
            onClick={closeReservationForm}
            aria-label="Close reservation form">
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
                value={reservationFormState.date}
                onChange={handleInputChange}
                required
                name="date"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Day of the Week Selector */}
            <div className={styles.formGroup}>
              <label htmlFor="day">
                <FaCalendarDay className={styles.inputIcon} />
                Day of the Week
              </label>
              <select
                value={reservationFormState.day}
                id="day"
                onChange={handleInputChange}
                required
                name="day">
                <option value="">Select a day</option>
                {DAYS_OF_WEEK.map((dayOption) => (
                  <option key={dayOption} value={dayOption}>
                    {dayOption}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="time">
                <FaClock className={styles.inputIcon} />
                Time
              </label>
              <select
                value={reservationFormState.time}
                id="time"
                onChange={handleInputChange}
                required
                name="time">
                <option value="">Select a time</option>
                {RESERVATION_TIMES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
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
                value={reservationFormState.guests}
                name="guests"
                onChange={handleInputChange}
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
              onClick={(e) => handleReserveTable(e, selectedTable.id)}
            >
              Confirm Reservation
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
}
