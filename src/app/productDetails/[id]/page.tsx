
// ProductDetails.tsx
import { serverClient } from "@/app/lib/apollo/server-client";
import { GET_PRODUCT_DETAILS1 } from "@/app/lib/graphql/query/collections";
import { ProductDetailsResponse } from '@/app/lib/type/vendure'
import { ProductDetailsClient } from './productDetailsClient' // Import du composant client
import DetailsProduct from "./detailsProduct";
import DetailsProductv from "./detailsProductv";

export default async function ProductDetails({params}:{params:Promise<{id:string}>}) {
  const productId = (await params).id;

  // Récupération des données côté serveur
  const { data } = await serverClient.query<ProductDetailsResponse>({
    query: GET_PRODUCT_DETAILS1,
    variables: { id: productId },
  });

  const product = data.product;
  console.log('detail product ----------->',product)
  if (!product) {
    return <p className="text-center py-10 text-red-500">Produit introuvable</p>;
  }

  // Passer les données au composant client
  //return <ProductDetailsClient product={product} />;
  return <DetailsProduct product={product}/>
  //return <DetailsProductv product={product}/>


// import { serverClient } from "@/app/lib/apollo/server-client";
// import { GET_PRODUCT_DETAILS1 } from "@/app/lib/graphql/query/collections";
// import Image from "next/image";
//  import { ProductDetailsResponse } from '@/app/lib/type/vendure'



// export default async function ProductDetails({params}:{params:Promise<{id:string}>}) {
//   const productId =(await params).id;

//   const { data } = await serverClient.query<ProductDetailsResponse>({
//     query: GET_PRODUCT_DETAILS1,
//     variables: { id: productId },
//   });

//   const product = data.product;
//    data.product?.variants.map((v)=>console.log("variabelllll====",v.name))
//   if (!product) {
//     return <p className="text-center py-10 text-red-500">Produit introuvable</p>;
//   }

//   return (
//     <section className="max-w-5xl mx-auto px-4 py-10 bg-white">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">{product.name}</h1>

//       <p className="text-gray-700 mb-8">{product.description}</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {product.variants?.length>0 ?product.variants?.map((variant,index:number) => (
//           <div
//             key={index}
//             className="border rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-gray-50 p-4"
//           >
//             <div className="relative w-full h-48 mb-4 bg-white">
//               {variant.featuredAsset?.preview ? (
//                 <Image
//                   src={variant.featuredAsset.preview}
//                   alt={variant.name}
//                   fill
//                   className="object-contain"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   Aucune image
//                 </div>
//               )}
//             </div>

//             <h3 className="text-md font-medium text-gray-800">{variant.name}</h3>
//             <p className="text-sm text-gray-600">
//               Prix : {(variant.price / 100).toFixed(2)} €
//             </p>
//           </div>
//         )):(<p>Aucune variante disponible</p>)}
//       </div>
//     </section>
//   );
// }
}