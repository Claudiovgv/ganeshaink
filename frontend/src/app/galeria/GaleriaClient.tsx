'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  category: string;
  src: string;
  alt: string;
}

export default function GaleriaClient({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: string[];
}) {
  const [active, setActive] = useState('Todos');
  const filtered = active === 'Todos' ? items : items.filter((i) => i.category === active);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded text-sm transition-colors ${
              active === cat
                ? 'bg-gold text-bg-primary font-semibold'
                : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-text-secondary">
          <p className="text-lg mb-2">Sem imagens nesta categoria ainda.</p>
          <p className="text-sm">Adiciona imagens a <code className="text-gold">public/images/gallery/</code></p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-lg overflow-hidden border border-gold-border bg-bg-card aspect-square relative"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
