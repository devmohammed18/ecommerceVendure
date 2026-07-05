
// ProductDetails.tsx
// import { serverClient } from "@/app/lib/apollo/server-client";
// import { GET_PRODUCT_DETAILS1 } from "@/app/lib/graphql/query/collections";
// import { ProductDetailsResponse } from '@/app/lib/type/vendure'

// import DetailsProduct from "./detailsProduct";


// export default async function ProductDetails({params}:{params:Promise<{id:string}>}) {
//   const productId = (await params).id;

//   // Récupération des données côté serveur
//   const { data } = await serverClient.query<ProductDetailsResponse>({
//     query: GET_PRODUCT_DETAILS1,
//     variables: { id: productId },
//   });

//   const product = data.product;
//   console.log('detail product ----------->',product)
//   if (!product) {
//     return <p className="text-center py-10 text-red-500">Produit introuvable</p>;
//   }

  
//   return <DetailsProduct product={product}/>
 


// }
import { serverClient } from '@/app/lib/apollo/server-client'
import {  GET_PRODUCT_DETAILS1 } from '@/app/lib/graphql/query/collections'
import React from 'react'
import DetaisProducttt from './detaisProducttt'
import DetailsProduct from './detailsProduct'
import { Product, ProductDetailsResponse } from '@/app/lib/type/vendure'

// async function page({params,searchParams}:
//   {params:Promise<{id:string}>,searchParams:Promise<{name:string}>} ) {

 async function page({params}:
  {params:Promise<{id:string}>} ) {

  const {id}=await params
  //const {name}=await searchParams
 const {data}=await serverClient.query<ProductDetailsResponse>({query:GET_PRODUCT_DETAILS1,variables:{id:id}})
 const product=data.product
  console.log("data=======================>",data.product)

  console.log("iid============================>",id)
 // console.log("nom============================>",name)
  return (
    <div>
      <DetaisProducttt  product={product}  />
      {/* <DetailsProduct product={product} /> */}
    </div>
  )
}

export default page
