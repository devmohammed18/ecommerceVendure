

import { serverClient } from "@/app/lib/apollo/server-client"
import { ProductSearch, SearchData } from "@/app/lib/type/vendure"

import { gql } from "@apollo/client"
import Image from "next/image"
async function ProductBySubCategory({params}: {params:Promise<{ id:string }>}) {
    const collectionId= ( await params).id
   // const id=params.id
    console.log('params:',collectionId)
    const GET_PRODUCT_BY_SUBCATEGORY=gql`
       query GetProductsCollection($collectionId: ID!) {
    search(input: { collectionId: $collectionId }) {
      items {
        productId
        productName
        slug
        description
        productAsset {
          preview
        }
      }
    }
  }
     `

const {data}=await serverClient.query<SearchData>({query:GET_PRODUCT_BY_SUBCATEGORY ,variables:{collectionId}})
console.log('ddddddddddddddddddddattttt',data.search.items

)
const products=data.search.items ?? [];

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
            {products.map((product: ProductSearch,index:number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-4 flex flex-col items-center text-center"
              >
                <div className="w-full h-40 relative mb-4">
                  {product.productAsset?.preview ? (
                    <Image
                      src={product.productAsset.preview}
                      alt={product.productName}
                      fill
                      className="object-contain rounded"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      Aucune image
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description || "Pas de description."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductBySubCategory
