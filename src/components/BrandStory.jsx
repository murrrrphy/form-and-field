import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { photo } from '../data/products';

export default function BrandStory() {
  return (
    <section className="story" id="our-story">
      <img
        src={photo('photo-1449247709967-d4461a6a6103', 1000)}
        alt="Natural materials and greenery in a peaceful home"
        loading="lazy"
      />
      <div>
        <div className="eyebrow">A MORE CONSIDERED EVERYDAY</div>
        <h2>
          Surround yourself
          <br />
          with things that <em>matter.</em>
        </h2>
        <p>
          We believe the things we bring into our lives should earn their place. Useful, beautiful,
          and made with care — our collection celebrates the quiet joy in everyday moments.
        </p>
        <a href="#shop">
          Find your everyday essentials <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
