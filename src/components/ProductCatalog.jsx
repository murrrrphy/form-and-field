import React, { useState } from 'react';
import { Search, ArrowRight, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { categories, products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductCatalog({
  catalog,
  savedIds,
  onToggleSaved,
  onOpenProduct,
  onAddToCart,
}) {
  const {
    category,
    setCategory,
    query,
    setQuery,
    sortOrder,
    setSortOrder,
    showSavedOnly,
    setShowSavedOnly,
    underPriceLimit,
    setUnderPriceLimit,
    visibleProducts,
  } = catalog;
  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <section id="shop" className="shop-section">
      <div className="section-heading">
        <div>
          <div className="eyebrow">THE EVERYDAY EDIT</div>
          <h2>
            Find your new favorites<span>.</span>
          </h2>
        </div>
        <p>
          Simple things, thoughtfully selected.
          <br />A little something for every part of your day.
        </p>
      </div>
      <div className="shop-toolbar">
        <div className="category-tabs">
          {categories.map((categoryName) => (
            <button
              className={category === categoryName ? 'active' : ''}
              onClick={() => {
                setCategory(categoryName);
                setShowSavedOnly(false);
              }}
              key={categoryName}
            >
              {categoryName}
              {categoryName === 'All essentials' && <span>{products.length}</span>}
            </button>
          ))}
        </div>
        <button
          className={`filter-button ${filtersOpen ? 'active' : ''}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={16} /> Filters
          {underPriceLimit && <span className="filter-dot" />}
        </button>
      </div>
      {filtersOpen && (
        <div className="filter-panel">
          <label>
            <Search size={16} />
            <input
              placeholder="Search essentials…"
              aria-label="Filter by product name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={underPriceLimit}
              onChange={(event) => setUnderPriceLimit(event.target.checked)}
            />{' '}
            Under $50
          </label>
          <label>
            <input
              type="checkbox"
              checked={showSavedOnly}
              onChange={(event) => setShowSavedOnly(event.target.checked)}
            />{' '}
            Saved favorites
          </label>
          <button onClick={catalog.resetFilters}>Reset filters</button>
        </div>
      )}
      <div className="results-row">
        <span>
          {showSavedOnly ? 'Your saved favorites · ' : ''}
          {visibleProducts.length} thoughtfully chosen essentials{query && ` for “${query}”`}
        </span>
        <label>
          Sort by:{' '}
          <select
            aria-label="Sort products"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
          <ChevronDown size={13} />
        </label>
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            savedIds={savedIds}
            onToggleSaved={onToggleSaved}
            onOpenProduct={onOpenProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {!visibleProducts.length && (
        <div className="empty-state">
          <Search size={34} />
          <h3>No essentials found</h3>
          <p>Try another search or make a little more room in your filters.</p>
          <button className="primary" onClick={catalog.resetFilters}>
            Explore all essentials <ArrowRight size={16} />
          </button>
        </div>
      )}
      <div className="collection-end">
        <span>Fewer things. Better choices.</span>
        <span>Made for the way you live.</span>
      </div>
    </section>
  );
}
