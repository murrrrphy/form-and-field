import React from 'react';
import { ArrowUpRight, Truck, Package, Leaf } from 'lucide-react';
import { photo } from '../data/products';

export default function Hero({ onShop }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> LESS, BUT BETTER
          </div>
          <h1>
            Good things.
            <br />
            For everyday
            <br />
            <em>living.</em>
          </h1>
          <p>
            Considered essentials for your home and beyond.
            <br className="desktop-break" /> Made to be used, loved, and lived with.
          </p>
          <button className="primary" onClick={() => onShop()}>
            Explore the collection <ArrowUpRight size={18} />
          </button>
          <div className="hero-foot">
            <span className="little-line" /> Thoughtfully chosen. Beautifully simple.
          </div>
        </div>
        <div className="hero-image">
          <img
            src={photo('photo-1600210492486-724fe5c67fb0', 1800)}
            alt="Warm, sunlit living room with natural textures and thoughtfully selected furniture"
            fetchPriority="high"
          />
          <div className="image-label">
            <span>THE ART OF SLOW LIVING</span>
            <span>Collection No. 04 — 2026</span>
          </div>
          <button
            className="hero-image-button"
            onClick={() => onShop('Home & Living')}
            aria-label="Explore home and living"
          >
            <ArrowUpRight />
          </button>
          <div className="image-pagination">
            <span /> <span /> <span />
          </div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Our commitments">
        <span>
          <Leaf /> Thoughtfully made
        </span>
        <span>
          <Package /> Quality that lasts
        </span>
        <span>
          <Truck /> Shipped worldwide
        </span>
        <span className="trust-note">Little things. A better everyday.</span>
      </section>
    </>
  );
}
