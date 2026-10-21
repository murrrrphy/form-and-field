import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, X, Plus, Minus, Check } from 'lucide-react';
import { products } from '../data/products';
import { formatCurrency } from '../utils/currency';
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY } from '../utils/cart';

export default function CartDrawer({
  items,
  itemCount,
  subtotal,
  shipping,
  total,
  onChangeQuantity,
  onRemoveItem,
  onClose,
  onShop,
}) {
  const [checkout, setCheckout] = useState(false);
  return (
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-heading">
        <h2 id="cart-title">
          Your bag <span>({itemCount})</span>
        </h2>
        <button aria-label="Close bag" onClick={onClose}>
          <X />
        </button>
      </div>
      {checkout ? (
        <div className="checkout-message">
          <div className="success-circle">
            <Check size={30} />
          </div>
          <div className="eyebrow">LOOKING GOOD</div>
          <h2>
            Your everyday upgrade
            <br />
            is all lined up.
          </h2>
          <p>
            This is a demo store, so no payment is taken and no order is placed. Your {itemCount}{' '}
            {itemCount === 1 ? 'item is' : 'items are'} still saved in your bag.
          </p>
          <button className="primary" onClick={() => setCheckout(false)}>
            Back to your bag <ArrowRight size={16} />
          </button>
        </div>
      ) : items.length ? (
        <>
          <div className="shipping-progress">
            <p>
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                'Your order qualifies for free shipping!'
              ) : (
                <>
                  You’re <strong>{formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> away
                  from free shipping.
                </>
              )}
            </p>
            <div>
              <span
                style={{ width: Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100) + '%' }}
              />
            </div>
          </div>
          <div className="cart-items">
            {items.map((item, index) => {
              const product = products.find((product) => product.id === item.id);
              return (
                <div className="cart-item" key={`${item.id}-${item.color}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <span className="cart-color">
                      <i style={{ background: product.colors[item.color] || product.colors[0] }} />{' '}
                      Color {item.color + 1}
                    </span>
                    <div className="cart-item-bottom">
                      <div className="quantity">
                        <button
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() => onChangeQuantity(index, -1)}
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.qty}</span>
                        <button
                          disabled={item.qty >= MAX_QUANTITY}
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() => onChangeQuantity(index, 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <strong>{formatCurrency(product.price * item.qty)}</strong>
                    </div>
                  </div>
                  <button
                    className="remove-item"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => onRemoveItem(index)}
                  >
                    <X size={15} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}</span>
            </div>
            <div className="total-row">
              <span>Estimated total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <p>USD · Taxes, if applicable, are not included.</p>
            <button className="primary" onClick={() => setCheckout(true)}>
              Continue to demo checkout <ArrowRight size={18} />
            </button>
            <span className="demo-note">A little preview. No real payment required.</span>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={40} />
          <h3>A little room for good things.</h3>
          <p>Your bag is empty. Let’s find your new everyday favorite.</p>
          <button
            className="primary"
            onClick={() => {
              onClose();
              onShop();
            }}
          >
            Explore the collection <ArrowRight size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}
