// app/components/ShowProduct.tsx

import Image from "next/image";
import { serverClient } from "../lib/apollo/server-client";
import { GET_PRODUCT } from "../lib/graphql/query/collections";
import type { ProductsData, Product, ProductVariant } from "../lib/type/vendure";
import Link from "next/link";

export default async function ShowProduct() {
  const { data } = await serverClient.query<ProductsData>({
    query: GET_PRODUCT,
  });

  const products = data?.products.items ?? [];
  console.log("product>>>>>>>>>>>>>>>>>>>>>>>>>>>>..",products)
   
  const variants=products.map((product=>(product.variants.map(variant=>variant.price))))
  console.log("variants........................",variants)
  console.log("min price:",Math.min(...variants[0]))
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Produits</h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-4 flex flex-col items-center text-center"
              >
                <div className="w-full h-40 relative mb-4">
                  {product.featuredAsset?.preview ? (
                    <Link className="hover:cursor-pointer" href={`/productDetails/${product.id}` }>
                           <Image
                      src={product.featuredAsset.preview}
                      alt={product.name}
                      fill
                      className="object-contain rounded"
                    />

                    </Link>
                   
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      Aucune image
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {/* {product.description || "Pas de description."} */}
                   <span className="text-sm text-red-500 mt-1">
                {(() => {
                  const min = (Math.min(...product.variants.map(v => v.price)) / 100).toFixed(2);
                  const max = (Math.max(...product.variants.map(v => v.price)) / 100).toFixed(2);
                  return min === max ? `${min} $` : `${min} $ - ${max} $`;
                })()}
              </span>
                    

                 
                    

                 
                  {/* {variants.map((variant,index:number)=>
                  
                  
                   (<h3 key={index} className="text-sm text-red-500 mt-1"> {Math.min(...variant) } </h3> )
                
                )
                  
                  } */}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
