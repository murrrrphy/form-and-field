import { useState } from 'react';
import { products } from '../data/products';
import { ALL_CATEGORIES, filterProducts } from '../utils/catalog';

export function useCatalog() {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');
  const [underPriceLimit, setUnderPriceLimit] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState([]);

  function toggleSaved(productId) {
    setSavedIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  }

  function resetFilters() {
    setCategory(ALL_CATEGORIES);
    setQuery('');
    setUnderPriceLimit(false);
    setShowSavedOnly(false);
  }

  const visibleProducts = filterProducts(products, {
    category,
    query,
    sortOrder,
    underPriceLimit,
    showSavedOnly,
    savedIds,
  });

  return {
    category,
    setCategory,
    query,
    setQuery,
    sortOrder,
    setSortOrder,
    underPriceLimit,
    setUnderPriceLimit,
    showSavedOnly,
    setShowSavedOnly,
    savedIds,
    toggleSaved,
    resetFilters,
    visibleProducts,
  };
}
