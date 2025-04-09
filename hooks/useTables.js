import { tablesData } from "@/actions/tables";
import { useEffect, useState } from "react";

export default function useTables() {

  const [tables, setTables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTable, setModalTable] = useState(null);



  useEffect(() => {
    async function getTables() {
      const { data } = await tablesData(currentPage);
      setTables(data);
    }
    getTables();
  }, [currentPage])

  // console.log(tables)



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
  
  
  return[
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
  ]
}