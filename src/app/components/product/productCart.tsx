import { Product} from '@/app/lib/type/vendure'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from './productPrice'
function ProductCart({product}:{product:Product} ) {

  return (

  <Link
      // href={`/productDetails/${product.id}?name=${product?.name}`}
      href={`/productDetails/${product.id}`}
      className=" w-full  p-4   hover:brightness-90 transition-all duration-300 "
    >
       <div className='w-64 mx-auto'>
         <div className="w-64 h-60 relative mb-4  ">
        {product.featuredAsset?.preview ? (
          <Image
            src={product.featuredAsset.preview}
            alt={product.name}
            fill
            className="object-cover  rounded"
          />
          

        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Aucune image
          </div>
        )}

       
      </div>

       <h3 className="text-lg font-semibold  text-left text-gray-800">
        {product.name}
      </h3>
         {/* price The product */}
     <div className='text-left'>
            <ProductPrice product={product} />
     </div>
       

      </div>

      
  </Link>

    // <div className='w-full flex flex-col items-center justify-center' >
    //       <div className="w-full h-40 relative mb-4">
    //               {product.featuredAsset?.preview ? (
    //                 <Link className="hover:cursor-pointer" href={`/productDetails/${product.id}` }>
    //                        <Image
    //                   src={product.featuredAsset.preview}
    //                   alt={product.name}
    //                   fill
    //                   className="object-contain rounded"
    //                 />

    //                 </Link>
                   
    //               ) : (
    //                 <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
    //                   Aucune image
    //                 </div>
    //               )}
    //               {/* name The product */}
                 
    //      </div>

    //      <h3 className="text-lg font-semibold text-gray-800">
    //               {product.name}
    //      </h3>
    // </div>
        
                
            
  )
}

export default ProductCart