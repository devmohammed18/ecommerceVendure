// app/components/ShowProduct.tsx

import { serverClient } from "../../lib/apollo/server-client";
import { GET_PRODUCT } from "../../lib/graphql/query/collections";
import type { ProductsData, Product} from "../../lib/type/vendure";

import ProductCart from "./productCart";


export default async function ShowProduct() {
  const { data } = await serverClient.query<ProductsData>({
    query: GET_PRODUCT,
  });

  const products = data?.products.items ?? [];
  console.log("product>>>>>>>>>>>>>>>>>>>>>>>>>>>>..",products)
   
 products.map(product=>(console.log('image:',product.featuredAsset.preview)))

  const variants=products.map((product=>(product.variants.map(variant=>variant.price))))
  console.log("variants........................",variants)
  console.log("min price:",Math.min(...variants[0]))
  return (
    <section className=" bg-gray-50">

       <div className="w-full h-96 flex items-center justify-center bg-black text-3xl text-center text-amber-100 border border-solid border-amber-300 " >
           <h1>Boutique </h1> 
       </div>


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

                {/*cart  product   */}
                 <ProductCart product={product} />
                 
                

             
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
