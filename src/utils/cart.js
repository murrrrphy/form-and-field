import { products } from '../data/products.js';

// Keep the original key so returning visitors retain their bags after the rebrand.
export const CART_STORAGE_KEY = 'ff-cart';
export const MAX_QUANTITY = 99;
export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 8;

export function parseStoredCart(serializedCart) {
  try {
    const storedItems = JSON.parse(serializedCart || '[]');
    if (!Array.isArray(storedItems)) return [];

    return storedItems
      .filter(
        (item) =>
          products.some((product) => product.id === item.id) &&
          Number.isInteger(item.qty) &&
          item.qty > 0,
      )
      .map((item) => ({ ...item, qty: Math.min(item.qty, MAX_QUANTITY) }));
  } catch {
    return [];
  }
}

// The stored shape stays unchanged so existing visitors keep their shopping bags.
export function addCartItem(items, productId, quantity = 1, colorIndex = 0) {
  const existingItem = items.find((item) => item.id === productId && item.color === colorIndex);
  if (!existingItem) return [...items, { id: productId, qty: quantity, color: colorIndex }];

  return items.map((item) =>
    item === existingItem ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + quantity) } : item,
  );
}

export function changeCartQuantity(items, itemIndex, change) {
  return items
    .map((item, index) =>
      index === itemIndex ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + change) } : item,
    )
    .filter((item) => item.qty > 0);
}

export function getCartTotals(items) {
  const itemCount = items.reduce((count, item) => count + item.qty, 0);
  const subtotal = items.reduce((total, item) => {
    const product = products.find((product) => product.id === item.id);
    return total + product.price * item.qty;
  }, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { itemCount, subtotal, shipping, total: subtotal + shipping };
}
