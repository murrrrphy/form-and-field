import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/data/products.js';
import {
  parseStoredCart,
  addCartItem,
  changeCartQuantity,
  getCartTotals,
} from '../src/utils/cart.js';
import { filterProducts, ALL_CATEGORIES } from '../src/utils/catalog.js';

const defaultFilters = {
  category: ALL_CATEGORIES,
  query: '',
  sortOrder: 'featured',
  underPriceLimit: false,
  showSavedOnly: false,
  savedIds: [],
};

test('existing stored bags remain compatible and invalid entries are ignored', () => {
  assert.deepEqual(
    parseStoredCart('[{"id":1,"qty":2,"color":1},{"id":999,"qty":1},{"id":2,"qty":0}]'),
    [{ id: 1, qty: 2, color: 1 }],
  );
  assert.deepEqual(parseStoredCart('invalid JSON'), []);
  assert.deepEqual(parseStoredCart('{}'), []);
  assert.equal(parseStoredCart('[{"id":1,"qty":120,"color":0}]')[0].qty, 99);
});

test('same variant merges while different colors stay separate', () => {
  const initial = addCartItem([], 1, 2, 0);
  const merged = addCartItem(initial, 1, 3, 0);
  assert.equal(merged[0].qty, 5);
  assert.equal(initial[0].qty, 2);
  assert.equal(addCartItem(merged, 1, 1, 1).length, 2);
  assert.equal(addCartItem(merged, 1, 100, 0)[0].qty, 99);
});

test('quantity updates remove zero-quantity lines and cap maximum quantity', () => {
  assert.deepEqual(changeCartQuantity([{ id: 1, qty: 1, color: 0 }], 0, -1), []);
  assert.equal(changeCartQuantity([{ id: 1, qty: 99, color: 0 }], 0, 1)[0].qty, 99);
});

test('shipping threshold and multi-line totals match the storefront', () => {
  assert.deepEqual(getCartTotals([{ id: 1, qty: 2, color: 0 }]), {
    itemCount: 2,
    subtotal: 48,
    shipping: 8,
    total: 56,
  });
  assert.deepEqual(
    getCartTotals([
      { id: 3, qty: 1, color: 0 },
      { id: 7, qty: 1, color: 0 },
    ]),
    { itemCount: 2, subtotal: 100, shipping: 0, total: 100 },
  );
  assert.equal(getCartTotals([{ id: 1, qty: 5, color: 0 }]).total, 120);
});

test('search, category, price and favorites compose together', () => {
  assert.deepEqual(
    filterProducts(products, { ...defaultFilters, query: 'MUG' }).map((p) => p.id),
    [1],
  );
  assert.deepEqual(
    filterProducts(products, {
      ...defaultFilters,
      category: 'Home & Living',
      underPriceLimit: true,
      showSavedOnly: true,
      savedIds: [2, 7],
    }).map((p) => p.id),
    [2],
  );
  assert.equal(filterProducts(products, { ...defaultFilters, query: 'no matches' }).length, 0);
});

test('sorting uses a copy and retains featured order', () => {
  const before = products.map((p) => p.id);
  const sorted = filterProducts(products, { ...defaultFilters, sortOrder: 'low' });
  assert.equal(sorted[0].price, 22);
  assert.equal(sorted.at(-1).price, 68);
  assert.deepEqual(
    products.map((p) => p.id),
    before,
  );
  assert.equal(filterProducts(products, { ...defaultFilters, sortOrder: 'new' })[0].id, 3);
});
