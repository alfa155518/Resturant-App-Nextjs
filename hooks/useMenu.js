"use client"
import { MenuContext } from "@/store/MenuProvider";
import { UserContext } from "@/store/UserProvider";
import { useContext, useState } from "react";

export default function useMenu() {
  const { menuDishes, setPageNumber } = useContext(MenuContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const { favoriteProducts, handelAddFavoriteProduct } = useContext(UserContext);

  // Open & Close Dish Info
  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return [
    menuDishes,
    setPageNumber,
    selectedItem,
    openItemDetails,
    closeItemDetails,
    favoriteProducts,
    handelAddFavoriteProduct,
    containerVariants,
    itemVariants
  ]
}