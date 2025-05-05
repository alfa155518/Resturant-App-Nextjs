import { UserContext } from "@/store/UserProvider";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
export default function OrderControls({ styles }) {
  const { searchTerm, setSearchTerm, activeFilter, setActiveFilter } =
    useContext(UserContext);
  return (
    <div className={styles.orderControls}>
      <div className={styles.searchBox}>
        <FaSearch />
        <input
          type="text"
          name="search"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "all" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("all")}>
          All Orders
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "paid" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("paid")}>
          Paid
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "processing" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("processing")}>
          Processing
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "out-for-delivery" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("out-for-delivery")}>
          Out for Delivery
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "cancelled" ? styles.active : ""
          }`}
          onClick={() => setActiveFilter("cancelled")}>
          Cancelled
        </button>
      </div>
    </div>
  );
}
