
export default function FilterReservationButtons({ styles, activeFilterReservation, setActiveFilterReservation }) {
    return (
        <div className={styles.filterButtons}>
            <button
                className={`${styles.filterButton} ${activeFilterReservation === "all" ? styles.active : ""
                    }`}
                onClick={() => setActiveFilterReservation("all")}>
                All
            </button>
            <button
                className={`${styles.filterButton} ${activeFilterReservation === "confirmed" ? styles.active : ""
                    }`}
                onClick={() => setActiveFilterReservation("confirmed")}>
                Confirmed
            </button>
            <button
                className={`${styles.filterButton} ${activeFilterReservation === "pending" ? styles.active : ""
                    }`}
                onClick={() => setActiveFilterReservation("pending")}>
                Pending
            </button>
            <button
                className={`${styles.filterButton} ${activeFilterReservation === "cancelled" ? styles.active : ""
                    }`}
                onClick={() => setActiveFilterReservation("cancelled")}>
                Cancelled
            </button>
        </div>
    )
}