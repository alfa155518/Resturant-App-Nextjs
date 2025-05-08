import { tablesData } from "@/actions/tables";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { reserveTable } from "@/actions/profile";
import { toast } from "react-toastify";

export default function useTables(setIsFormVisible, onTableSelect) {

  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTable, setModalTable] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    async function getTables() {
      const { data } = await tablesData(currentPage);
      setTables(data);
      router.refresh();
    };
    getTables();
  }, [currentPage, pathname, needsRefresh])


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



  // Reservation Form State
  const [reservationFormState, setReservationFormState] = useState({
    date: "",
    time: "",
    guests: 2,
    day: 2
  });


  // Handel Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationFormState({
      ...reservationFormState,
      [name]: name === "guests" ? parseInt(value) : value
    });
  };


  // Handel Reserve Table
  const handelReserveTable = async (e, tableId) => {
    e.preventDefault();

    let reserveResult = await reserveTable(reservationFormState, tableId);

    if (reserveResult.status === "error") {
      // Check if errors.message is an object with field validation errors
      if (reserveResult.errors.message && typeof reserveResult.errors.message === 'object') {
        // Get only the first validation error
        const validationFields = Object.keys(reserveResult.errors.message);

        if (validationFields.length > 0) {
          // Get the first field with an error
          const firstField = validationFields[0];
          const fieldErrors = reserveResult.errors.message[firstField];

          if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
            // Display only the first error
            toast.error(`${fieldErrors[0]}`);
          }
        }
      } else if (reserveResult.errors.message) {
        // Direct message
        toast.error(reserveResult.errors.message);
      } else {
        // Check for nested field errors
        const errorFields = Object.keys(reserveResult.errors);
        if (errorFields.length > 0) {
          // Get the first field error
          const firstField = errorFields[0];
          const errorMessage = Array.isArray(reserveResult.errors[firstField])
            ? reserveResult.errors[firstField][0]
            : reserveResult.errors[firstField];
          toast.error(`${errorMessage}`);
        } else {
          // Fallback error message
          toast.error('An error occurred during reservation');
        }
      }
    }

    if (reserveResult.status === "success") {
      toast.success(reserveResult.message);
      // Close the form after successful reservation
      closeReservationForm();
    }
    setNeedsRefresh(!needsRefresh);
  }


  // Close Reservation Form
  const closeReservationForm = () => {
    setIsFormVisible(false);
    onTableSelect(null);
  };



  return [
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
    modalVariants,
    reservationFormState,
    handleInputChange,
    handelReserveTable,
    closeReservationForm,
  ]
}