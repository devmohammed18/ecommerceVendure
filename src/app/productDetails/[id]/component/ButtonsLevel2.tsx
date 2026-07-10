import { Product, ProductVariant } from '@/app/lib/type/vendure'
import React from 'react'
interface ButtonsLevel2Props{
product:Product;
selectOptionsLevel2:string[];
selectedLevel1:string;

getSelectedVariants:(
    product:Product,
    selectedLevel1:string,
    selectOptionsLevel2:string[],
    index1:number)=>ProductVariant|undefined;

handelLevel2Change:(value:string,index:number)=>void;
selectedLevel2Index:number

}
function ButtonsLevel2({product,selectOptionsLevel2,selectedLevel1,
           getSelectedVariants,handelLevel2Change,selectedLevel2Index}:ButtonsLevel2Props) {
  return ( <div className='w-full flex flex-wrap items-center justify-start gap-2 mt-1  space-x-2.5 '>
                      {selectOptionsLevel2.map((v,index1)=>{
                    const variant=getSelectedVariants(product,selectedLevel1,selectOptionsLevel2,index1)
                   console.log("selectVariante dans le button :",variant)
                    const stateStock=variant?.stockLevel
                    const isOutOfStock1=!variant || stateStock==="OUT_OF_STOCK";
                    const isAvailableStock=stateStock==="IN_STOCK"
                    const isLowStock=stateStock==="LOW_STOCK"
                    
  
                    console.log("stateStock",stateStock)
                     
  
                   return(
                      <div key={index1} className='flex flex-col gap-4'>
                      <button 
                          disabled={isOutOfStock1}
                          onClick={()=>{handelLevel2Change(v,index1)}}
                            className={`w-20  h-10 border border-solid rounded-lg
                                              border-gray-500 text-sm p-2  transition-colors dureation-300 
                                             
                                              
                                                ${isOutOfStock1?"bg-gray-100 text-gray-400 cursor-not-allowed border hover:border-gray-400 line-through":
                                                 selectOptionsLevel2[selectedLevel2Index]===v?"bg-red-600": "hover:cursor-pointer  hover:border-red-500 hover:border-2"}  }`}>
                                  {v}
                       </button>
                     
                      </div> 
                      
                  
                  )
                      
                  }) 
                      
                      
                      
                      }
                   
                   
         </div> )

                    }
export default ButtonsLevel2
