'use client'

import { useState } from 'react'
import Image from "next/image";
import { Product, ProductVariant } from '@/app/lib/type/vendure'

export function ProductDetailsClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );

  // Image par défaut (première variante avec image ou image du produit)
  const defaultImage = product.variants?.find((v: ProductVariant) => v.featuredAsset?.preview)?.featuredAsset?.preview || 
                      product.featuredAsset?.preview;

  // Image actuelle à afficher
  const currentImage = selectedVariant?.featuredAsset?.preview || defaultImage;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{product.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image principale à gauche */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md h-96 bg-white border rounded-lg shadow-sm">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={selectedVariant?.name || product.name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Aucune image disponible
              </div>
            )}
          </div>
        </div>

        {/* Variants/Tailles au centre */}
        <div className="space-y-6">
          {/* Prix de toutes les variantes */}
          {/* <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Prix</h2>
            {product.variants?.length > 0 ? (
              <div className="space-y-2">
                {product.variants.map((variant: ProductVariant, index: number) => (
                  <div
                    key={variant.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-800">{variant.name}</span>
                    <span className="text-lg font-bold text-blue-600">
                      {(variant.price / 100).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun prix disponible</p>
            )}
          </div> */}

          {/* Tailles */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Tailles disponibles:</h2>
            {product.variants?.length > 0 ? (
              
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant: ProductVariant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded-lg transition duration-200 font-medium ${
                      selectedVariant?.id === variant.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {variant.options.map(op=>op.name)}
                  </button>
                ))}
              </div>
            
          
          ) : (
              <p className="text-gray-500">Aucune taille disponible</p>
            )}
          </div>
        </div>

        {/* Informations du variant sélectionné à droite */}
        <div className="space-y-6">
          {/* Nom du produit variant sélectionné */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Produit sélectionné</h2>
            {selectedVariant ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedVariant.name}
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {(selectedVariant.price / 100).toFixed(2)} €
                </p>
                {selectedVariant.sku && (
                  <p className="text-sm text-gray-500 mt-2">
                    SKU: {selectedVariant.sku}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 p-4 border border-gray-200 rounded-lg">
                Sélectionnez une taille pour voir les détails
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Images du produit variant */}
          {selectedVariant && product.assets && product.assets.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Images du variant</h2>
              <div className="grid grid-cols-2 gap-2">
                {product.assets.map((asset, index: number) => (
                  <div
                    key={asset.id}
                    className="relative w-full h-24 bg-white border rounded-lg shadow-sm"
                  >
                    <Image
                      src={asset.preview}
                      alt={`${selectedVariant.name} - ${asset.name || index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}