import React, { useCallback, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import Modal from './components/Modal';
import BrandStory from './components/BrandStory';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { useCart } from './hooks/useCart';
import { useCatalog } from './hooks/useCatalog';
import { useToast } from './hooks/useToast';
import { ALL_CATEGORIES } from './utils/catalog';

export default function App() {
  const cart = useCart();
  const catalog = useCatalog();
  const toast = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [productSelection, setProductSelection] = useState(null);

  const closeModal = useCallback(() => {
    setCartOpen(false);
    setProductSelection(null);
  }, []);

  function openCart() {
    setProductSelection(null);
    setCartOpen(true);
    toast.dismiss();
  }

  function openProduct(product, colorIndex = 0) {
    setProductSelection({ product, colorIndex });
  }

  function addToCart(product, quantity = 1, colorIndex = 0) {
    cart.addItem(product, quantity, colorIndex);
    toast.notify(`${product.name} added to your bag`);
  }

  function browseCategory(category = ALL_CATEGORIES) {
    catalog.setCategory(category);
    catalog.setShowSavedOnly(false);
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Header
        onShop={browseCategory}
        itemCount={cart.itemCount}
        showSavedOnly={catalog.showSavedOnly}
        setShowSavedOnly={catalog.setShowSavedOnly}
        setSortOrder={catalog.setSortOrder}
        onOpenCart={openCart}
        query={catalog.query}
        setQuery={catalog.setQuery}
      />
      <main>
        <Hero onShop={browseCategory} />
        <ProductCatalog
          catalog={catalog}
          savedIds={catalog.savedIds}
          onToggleSaved={catalog.toggleSaved}
          onOpenProduct={openProduct}
          onAddToCart={addToCart}
        />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
      {toast.message && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast.message}
          <button onClick={openCart}>
            View bag <ArrowRight size={14} />
          </button>
        </div>
      )}
      {(cartOpen || productSelection) && (
        <Modal onClose={closeModal}>
          {cartOpen ? (
            <CartDrawer
              items={cart.items}
              itemCount={cart.itemCount}
              subtotal={cart.subtotal}
              shipping={cart.shipping}
              total={cart.total}
              onChangeQuantity={cart.changeQuantity}
              onRemoveItem={cart.removeItem}
              onClose={closeModal}
              onShop={browseCategory}
            />
          ) : (
            <ProductDetails
              product={productSelection.product}
              initialColor={productSelection.colorIndex}
              onAddToCart={addToCart}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </>
  );
}
