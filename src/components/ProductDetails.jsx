import React, { useState } from 'react';
import { X, Plus, Minus, Check, Truck, Package, Star } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { MAX_QUANTITY } from '../utils/cart';

const COLOR_NAMES = ['Natural', 'Earth', 'Clay'];

export default function ProductDetails({ product, initialColor = 0, onAddToCart, onClose }) {
  const [colorIndex, setColorIndex] = useState(initialColor);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <button className="modal-close" aria-label="Close product details" onClick={onClose}>
        <X />
      </button>
      <img className="detail-image" src={product.image} alt={product.name} />
      <div className="detail-copy">
        <span className="eyebrow">{product.category}</span>
        <h2 id="product-title">{product.name}</h2>
        <div className="detail-rating">
          <Star size={14} fill="currentColor" /> {product.rating}{' '}
          <span>({product.reviews} reviews)</span>
        </div>
        <div className="detail-price">
          {formatCurrency(product.price)} <span>USD</span>
        </div>
        <p>{product.description}</p>
        <div className="material">{product.material}</div>
        <div className="color-label">Color — {COLOR_NAMES[colorIndex]}</div>
        <div className="detail-swatches">
          {product.colors.map((color, index) => (
            <button
              className={colorIndex === index ? 'selected' : ''}
              style={{ background: color }}
              key={color}
              onClick={() => setColorIndex(index)}
              aria-label={`Select ${COLOR_NAMES[index]} color`}
            >
              {colorIndex === index && <Check size={16} />}
            </button>
          ))}
        </div>
        <div className="detail-add">
          <div className="quantity">
            <button
              disabled={quantity === 1}
              aria-label="Decrease quantity"
              onClick={() => setQuantity(quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button
              disabled={quantity === MAX_QUANTITY}
              aria-label="Increase quantity"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
          <button className="primary" onClick={() => onAddToCart(product, quantity, colorIndex)}>
            Add to bag — {formatCurrency(product.price * quantity)} <Plus size={17} />
          </button>
        </div>
        <div className="detail-benefit">
          <Truck size={17} /> Worldwide delivery · Free shipping over $100
        </div>
        <div className="detail-benefit">
          <Package size={17} /> Thoughtfully packed, ready for everyday life
        </div>
      </div>
    </div>
  );
}
