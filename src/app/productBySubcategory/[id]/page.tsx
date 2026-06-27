

import { serverClient } from "@/app/lib/apollo/server-client"
import { GET_PRODUCT_BY_SUBCATEGORY } from "@/app/lib/graphql/query/collections"
import { CollectionResponse, Product, ProductSearch, SearchData } from "@/app/lib/type/vendure"
import Link from "next/link"
import { gql } from "@apollo/client"
import Image from "next/image"
async function ProductBySubCategory({params}: {params:Promise<{ id:string }>}) {
    const collectionId= ( await params).id
   // const id=params.id
    console.log('params:',collectionId)
    
 interface ProductByCategory{

  collection:{name:string;
  productVariants:{
    items:{
     product:{
          id:number;  
          name:string;
          slug:string;
          description:string;
          featuredAsset:{
            id:string;
            preview:string;
          }
          
          variants:{
            price:number;
            
          }[]
          }
  }[]}
}



 }   
 
 interface Product_Min_Max_Price{
  nameProduct:string
  min:number
  max:number
 }
const {data}=await serverClient.query<ProductByCategory>({query:GET_PRODUCT_BY_SUBCATEGORY ,variables:{collectionId}})
console.log('ddddddddddddddddddddattttt',data)
//const products=data.collection.productVariants.items?? [];
// ✅ Dédupliquer — plusieurs variantes = même produit

//data.collection.productVariants.items.map(item=>console.log('price====>',item.product.variants[0].price))
const seen = new Set()
const products = data.collection.productVariants.items
  .map((item) => item.product)
  .filter((product) => {
    if (seen.has(product.name)) return false
    seen.add(product.name)
    return true
  })


// calcule le nim et le max de chaque product
// const productWithMinPrice=():Product_Min_Max_Price=>{

//  products.map((item)=>({
//      nameProduct:item.name,
//       min1:(Math.min(...item.variants.map(p=>p.price))/100).toFixed(2),
//       max1:(Math.max(...item.variants.map(p=>p.price))/100).toFixed(2),
//  })) 
//  return {nameProduct,min1,max1}
 
// }
// const {nameProduct,min1,max1}=productWithMinPrice()
  
// console.log("min======>",min1)

// const productWithMinPrice = () => {
//   return products.map(item => ({
//     nameProduct: item.name,
//     min1: (Math.min(...item.variants.map(p => p.price)) / 100).toFixed(2),
//     max1: (Math.max(...item.variants.map(p => p.price)) / 100).toFixed(2),
//   }));
// };

// const result = productWithMinPrice();

// console.log('resulttttttt=============>',result);

// const min=(Math.min(...products.flatMap(item=>item.variants.map(p=>p.price)))/100).toFixed(2)
// const max=(Math.max(...products.flatMap(item=>item.variants.map(p=>p.price)))/100).toFixed(2)
 
const productsWithPrice = products.map(product => ({
  nameProduct:product.name,
  min: (Math.min(...product.variants.map(v => v.price)) / 100).toFixed(2),
  max: (Math.max(...product.variants.map(v => v.price)) / 100).toFixed(2),
}));


console.log("productsWithPrice=======>",productsWithPrice )

const variant=products.map(item=>item.variants)
console.log('variante=====>',variant)
const price=variant.map(v=>v.map(p=>p.price))

console.log('prace========>',price)
//products.map(product=>console.log("image====>",product.featuredAsset.preview))

  return (
    
  <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Produits de la sous-catégorie
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">Aucun produit trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product,index:number) => (
              
              <Link
                href={`/productDetails/${product.id}`}
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-4 flex flex-col items-center text-center"
                >
                <div className="w-64 mx-auto" >
                    <div className="w-64 h-60 relative mb-4">
                      {product.featuredAsset.preview ? (
                        <Image
                          src={product.featuredAsset.preview}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                          Aucune image
                        </div>
                      )}
                    </div>

                  {/* name Product */}
                  <h2 className="text-sm text-left font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  {/* price Product */}

                    <h2 className="text-sm text-left text-red-800" >
                      {productsWithPrice[index].min==productsWithPrice[index].max? `${productsWithPrice[index].min} $` :`${productsWithPrice[index].min} $ - ${productsWithPrice[index].max} $`}
                    </h2>

                </div>    
               
              </Link>
            ))}
          </div>
        )}

        
      </div>

    </section>
  )
}

export default ProductBySubCategory
