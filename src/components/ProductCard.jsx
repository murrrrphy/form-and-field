import React from 'react';
import { Plus, Heart, Star } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function ProductCard({
  product,
  savedIds,
  onToggleSaved,
  onOpenProduct,
  onAddToCart,
}) {
  return (
    <article className="product-card" key={product.id}>
      <div className="product-image">
        <button
          className="product-photo"
          onClick={() => onOpenProduct(product)}
          aria-label={`View ${product.name}`}
        >
          <img src={product.image} alt={product.name} loading="lazy" />
        </button>
        {product.tag && (
          <span className={`product-tag ${product.tag === 'NEW' ? 'new-tag' : ''}`}>
            {product.tag}
          </span>
        )}
        <button
          className={`save-button ${savedIds.includes(product.id) ? 'is-saved' : ''}`}
          onClick={() => onToggleSaved(product.id)}
          aria-label={`${savedIds.includes(product.id) ? 'Unsave' : 'Save'} ${product.name}`}
        >
          <Heart size={17} fill={savedIds.includes(product.id) ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" onClick={() => onAddToCart(product)}>
          <Plus size={16} /> Add to bag
        </button>
      </div>
      <div className="product-category">{product.category}</div>
      <div className="product-name">
        <button onClick={() => onOpenProduct(product)}>{product.name}</button>
        <span>{formatCurrency(product.price)}</span>
      </div>
      <div className="swatches">
        {product.colors.map((color, index) => (
          <button
            key={color}
            style={{ background: color }}
            aria-label={`View ${product.name} color ${index + 1}`}
            onClick={() => onOpenProduct(product, index)}
          />
        ))}
        <span>{product.colors.length} colors</span>
        <span className="product-rating">
          <Star size={11} fill="currentColor" />
          {product.rating}
        </span>
      </div>
    </article>
  );
}
