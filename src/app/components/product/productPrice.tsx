import { Product } from '@/app/lib/type/vendure';
import React from 'react'

function ProductPrice({product}:{product:Product}) {
 
const min = (Math.min(...product.variants.map(v => v.price)) / 100).toFixed(2);
 const max = (Math.max(...product.variants.map(v => v.price)) / 100).toFixed(2);

  const cont = Math.min(
  ...product.variants.map((v) => {
    console.log('table valus :',v.price);
    return v.price;
  })
);
console.log('cont===================>',cont)
  return (
    
            
              <span className="text-sm  text-red-500 ">
                
                 {min === max ? `${min} $` : `${min} $ - ${max} $`}
                
              </span>
    
            

    
  )
}

export default ProductPrice
