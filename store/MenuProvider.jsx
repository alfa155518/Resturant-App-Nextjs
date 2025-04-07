"use client"

import { createContext, useState, useEffect } from 'react';
import { getMenu } from '@/actions/menu';

// Create the context
export const MenuContext = createContext();


// Provider component
export function MenuProvider({ children }) {
  const [menuDishes, setMenuDishes] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch menu data
  useEffect(() => {
    async function fetchMenuData() {
      
      try {
        const data = await getMenu(pageNumber);
        setMenuDishes(data);
        
        // Process menu items to add missing properties
        if (data?.data?.dishes) {
          data.data.dishes.forEach(item => {
            if (!item.rating) item.rating = (4 + Math.random()).toFixed(1);
            if (!item.prepTime) item.prepTime = `${Math.floor(Math.random() * 20) + 10} min`;
            if (!item.calories) item.calories = Math.floor(Math.random() * 500) + 200;
            if (!item.dietary) item.dietary = [];
            if (!item.ingredients) item.ingredients = [];
          });
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    }
    
    fetchMenuData();
  }, [pageNumber]);

  // Context value
  const value = {
    menuDishes,
    setPageNumber,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}