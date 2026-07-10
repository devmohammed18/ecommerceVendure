import React from 'react'
import { ProductPriceRanges } from '../../tyeps'
import Image from 'next/image'
import Link from 'next/link'

export interface CardProductProps{
  
  productPriceRanges:ProductPriceRanges[]  
  setIsOpenSearchResults:React.Dispatch<React.SetStateAction<boolean>>  
}

function CardProducts({productPriceRanges,setIsOpenSearchResults}:CardProductProps) {
  return (
   <div 
      className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-1 px-1 gap-2
                            justify-items-start  border-0 border-b-orange-950' >
                       { productPriceRanges.map((item,index)=>(
                       <Link href={`/productDetails/${item.productId}`} 
                             onClick={()=>setIsOpenSearchResults(false)}
                             key={index} 
                             className='  h-64 flex flex-col items-start justify-between 
                                        border-2 p-1 border-gray-600 rounded-md shadow-sm 
                                        hover:cursor-pointer hover:shadow-lg transition-shadow duration-300  ' >
                          {/* image the product */}
                          <div  className=' w-44  h-52  '>
                              <div className='relative w-full h-full  ' >
                                <Image 
                                  src={item.productUrl??null}
                                  alt={item.productName}                    
                                  fill
                                  className='object-cover border rounded-lg '

                                />
                              </div>
                          </div>
                          {/* name the product */}
                          <div className=''>
                            <h1 className='capitalize text-md font-light ' >{item.productName}</h1>
                            <p >
                              {item.maxPrice===item.minPrice? 
                                  `${((item.maxPrice)/100).toFixed(2)} $` :
                                  `${((item.minPrice)/100).toFixed(2)} $ - ${((item.maxPrice)/100).toFixed(2)} $`}
                            </p>
                          </div>
                       </Link> 
                      
                      ))}
   </div> 
  )
}

export default CardProducts
