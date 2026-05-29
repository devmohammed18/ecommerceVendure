'use client'
import { useState } from 'react';
import { Product } from '@/app/lib/type/vendure';
import Image from 'next/image';

const DetailsProductv = ({ product }: { product: Product }) => {

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // 1. Tous les colors
  const colors = product.optionGroups.find(g => g.code === 'color')?.options ?? [];
  console.log('color==================>',colors)
  // 2. Sizes disponibles selon color choisie
  const sizes = product.variants
    .filter(v => v.options.some(o => o.code === selectedColor))
    .flatMap(v => v.options.filter(o => o.group.code === 'size'))
    .filter((o, i, self) => self.findIndex(s => s.code === o.code) === i);
console.log('size==========================>',sizes)
  // 3. Variant final
  const selectedVariant = product.variants.find(v =>
    v.options.some(o => o.code === selectedColor) &&
    v.options.some(o => o.code === selectedSize)
  ) ?? null;
console.log('selectedVariant///[[[[[[]]]]]]',selectedVariant)
  // 4. Image courante
  const currentImage = selectedVariant?.featuredAsset?.preview
    ?? product.featuredAsset.preview;

  const isOutOfStock = selectedVariant?.stockLevel === 'OUT_OF_STOCK';

  return (
    <div className='min-h-screen max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-16'>

      {/* Image */}
      <div className='relative w-full md:w-2/5 h-96 md:h-[500px] rounded-xl overflow-hidden border border-gray-200 bg-white'>
        <Image
          src={currentImage}
          alt={product.name}
          fill
          className='object-contain'
        />
      </div>

      {/* Informations */}
      <div className='w-full md:w-1/2 flex flex-col gap-6'>

        {/* Nom */}
        <h1 className='text-3xl font-bold text-gray-800'>{product.name}</h1>

        {/* Prix */}
        <span className='text-2xl font-semibold text-red-500'>
          {selectedVariant
            ? `$ ${selectedVariant.price / 100}`
            : `$ ${Math.min(...product.variants.map(v => v.price)) / 100} — $ ${Math.max(...product.variants.map(v => v.price)) / 100}`
          }
          {isOutOfStock && <span className='text-sm ml-2 text-red-400'>Out of Stock</span>}
        </span>

        {/* Description */}
        <p
          className='text-gray-600 text-base leading-relaxed'
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {/* Colors */}
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-semibold text-gray-500 uppercase'>
            Color {selectedColor && `— ${selectedColor}`}
          </span>
          <div className='flex flex-wrap gap-3'>
            {colors.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedColor(option.code);
                  setSelectedSize(null); // reset size
                }}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                  ${selectedColor === option.code
                    ? 'border-amber-500 text-amber-600 bg-amber-50'
                    : 'border-gray-300 text-gray-700 hover:border-amber-400'
                  }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes — seulement après color */}
        {selectedColor && (
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-semibold text-gray-500 uppercase'>
              Size {selectedSize && `— ${selectedSize}`}
            </span>
            <div className='flex flex-wrap gap-3'>
              {sizes.map(option => {
                const variant = product.variants.find(v =>
                  v.options.some(o => o.code === selectedColor) &&
                  v.options.some(o => o.code === option.code)
                );
                const outOfStock = variant?.stockLevel === 'OUT_OF_STOCK';

                return (
                  <button
                    key={option.id}
                    onClick={() => !outOfStock && setSelectedSize(option.code)}
                    disabled={outOfStock}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                      ${outOfStock
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                        : selectedSize === option.code
                          ? 'border-amber-500 text-amber-600 bg-amber-50'
                          : 'border-gray-300 text-gray-700 hover:border-amber-400'
                      }`}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bouton panier */}
        <button
          disabled={!selectedVariant || isOutOfStock}
          className={`mt-4 w-full py-3 rounded-xl text-white font-semibold transition-colors
            ${!selectedVariant || isOutOfStock
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600'
            }`}
        >
          {!selectedVariant
            ? 'Sélectionne une option'
            : isOutOfStock
              ? 'Rupture de stock'
              : 'Ajouter au panier'}
        </button>

      </div>
    </div>
  );
};

export default DetailsProductv;