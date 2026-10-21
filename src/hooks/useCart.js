import { useEffect, useState } from 'react';
import {
  CART_STORAGE_KEY,
  parseStoredCart,
  addCartItem,
  changeCartQuantity,
  getCartTotals,
} from '../utils/cart';

function loadCart() {
  try {
    return parseStoredCart(localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    // Storage can be unavailable in restricted browsing environments.
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The bag remains usable in memory even when persistence is unavailable.
    }
  }, [items]);

  function addItem(product, quantity = 1, colorIndex = 0) {
    setItems((currentItems) => addCartItem(currentItems, product.id, quantity, colorIndex));
  }

  function changeQuantity(itemIndex, change) {
    setItems((currentItems) => changeCartQuantity(currentItems, itemIndex, change));
  }

  function removeItem(itemIndex) {
    setItems((currentItems) => currentItems.filter((_, index) => index !== itemIndex));
  }

  return { items, ...getCartTotals(items), addItem, changeQuantity, removeItem };
}
