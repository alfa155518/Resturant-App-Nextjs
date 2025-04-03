"use client"
// import { getMenu } from "@/actions/menu";
import { useEffect, useState } from "react";

export default function useMenu() {
  const [menuDishes, setMenuDishes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);


  async function getMenu(pageNumber = 1) {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/menu?page=${pageNumber}`, {
        method: 'GET',
        cache: 'no-store',
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`Failed to fetch menu: ${res.status} - ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  }

  // get menu dishes
  useEffect(() => {
    async function handelMenu()  {
      let data = await getMenu(pageNumber);
      setMenuDishes(data);
    }
    handelMenu();
  },[pageNumber])


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
    pageNumber,
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