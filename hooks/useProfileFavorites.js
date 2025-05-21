"use client";

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/store/UserProvider';

export default function useProfileFavorites() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { favoriteProducts, handelRemoveFavoriteProduct } = useContext(UserContext);

  useEffect(() => {
    // Set loading state while we wait for favoriteProducts to be populated
    if (favoriteProducts && favoriteProducts.length > 0) {
      setLoading(false);
    }
  }, [favoriteProducts]);

  // Convert favoriteProducts to array if it's an object with numeric keys
  const favoriteProductsArray = Array.isArray(favoriteProducts) 
    ? favoriteProducts 
    : Object.values(favoriteProducts || {});

  // Extract unique categories from favorite products
  const categories = ['all'];
  favoriteProductsArray.forEach(item => {
    if (item?.product?.category && !categories.includes(item.product.category)) {
      categories.push(item.product.category);
    }
  });

  // Filter favorites by category and search term
  const filteredFavorites = favoriteProductsArray.filter(item => {
    const product = item.product;

    // Filter by category
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return {
    loading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    favoriteProducts,
    favoriteProductsArray,
    filteredFavorites,
    categories,
    handelRemoveFavoriteProduct,
    fadeIn
  };
}
