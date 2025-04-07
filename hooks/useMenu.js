"use client"
import { MenuContext } from "@/store/MenuProvider";
import { useContext, useState } from "react";

export default function useMenu() {
  const {menuDishes,setPageNumber} = useContext(MenuContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);


  // Open & Close Dish Info
  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };


  // Add to Cart
  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    // Show toast notification
    alert(`Added ${item.name} to cart!`);
  };
  
  // Add to favorites
  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
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
    favorites,
    toggleFavorite,
    handleAddToCart,
    containerVariants,
    itemVariants
  ]
}