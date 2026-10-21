import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowUpRight, X, Heart, Menu } from 'lucide-react';
import { categories } from '../data/products';

export default function Header({
  onShop,
  itemCount,
  showSavedOnly,
  setShowSavedOnly,
  setSortOrder,
  onOpenCart,
  query,
  setQuery,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateToShop = (category) => {
    setMenuOpen(false);
    onShop(category);
  };
  return (
    <>
      <div className="announcement">
        <span>Thoughtful essentials. Worldwide delivery.</span>
        <span>
          Free shipping on orders $100+ <ArrowUpRight size={12} />
        </span>
      </div>
      <header>
        <a className="wordmark" href="#" aria-label="Avelune home">
          AVELUNE<span>OBJECTS FOR EVERYDAY</span>
        </a>
        <nav>
          <button onClick={() => navigateToShop()} className="nav-active">
            Shop all
          </button>
          <button
            onClick={() => {
              setSortOrder('new');
              navigateToShop();
            }}
          >
            New arrivals <span className="nav-dot" />
          </button>
          <button onClick={() => navigateToShop('Home & Living')}>Home & living</button>
          <a href="#our-story">Our story</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>
            <Search />
          </button>
          <button
            className="saved-header"
            aria-label="View saved products"
            onClick={() => {
              setShowSavedOnly(!showSavedOnly);
              document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Heart fill={showSavedOnly ? 'currentColor' : 'none'} />
          </button>
          <button
            className="bag-button"
            aria-label={`Shopping bag, ${itemCount} items`}
            onClick={onOpenCart}
          >
            <ShoppingBag />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{itemCount}</span>
          </button>
          <button
            className="mobile-menu"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-nav">
          {categories.map((categoryName) => (
            <button key={categoryName} onClick={() => navigateToShop(categoryName)}>
              {categoryName}
            </button>
          ))}
        </div>
      )}
      {searchOpen && (
        <div className="search-bar">
          <Search size={20} />
          <input
            autoFocus
            aria-label="Search products"
            placeholder="Find your next everyday favorite…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <button
            aria-label="Close search"
            onClick={() => {
              setSearchOpen(false);
              setQuery('');
            }}
          >
            <X />
          </button>
        </div>
      )}
    </>
  );
}
