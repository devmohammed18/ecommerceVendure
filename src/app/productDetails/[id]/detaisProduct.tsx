'use client'
import { Product,} from '@/app/lib/type/vendure'
import React, { use, useState } from 'react'
import Image from 'next/image'
import { getLevel1Option } from './features/getLevel1Option'
import { getLevel2Options } from './features/getLevel2Options'
import { getSelectedVariants } from './features/getSelectedVarians'

import { useCartStore } from '@/app/store/cartstore'
import ButtonsLevel1 from './component/buttonLevel1'
import ButtonsLevel2 from './component/ButtonsLevel2'
import StatusStock from './component/statusStock'

function DetailsProduct({product}:{product :Product}) {

const {addItem}=useCartStore()
const items=useCartStore(state=>state.items)
console.log('items=====>',items)



const option=product.variants.map(v=>v.options.map(o=>o.code))    
//le valeur de niveau 1
const level1Options=getLevel1Option(product)

const level2Options=getLevel2Options(product,level1Options)

console.log('level2Options===================>',level2Options)
const getInitiaLevel2Options=():string[]=>{

    return level2Options
}
//function Button niveau 1
const handelLevel1Change=(v:string,index:number)=>{

   const newValuesNiveau2= option.filter(op=>op[0]===level1Options[index]).map(o=>o[1])
    //recuper les valeur de niveau 2
    setSelectedLevel1Index(index)
    
    //quand selction le prechaine valeur de premier niveau affivche les valuer e deuxieme niveau
    setSelectOptionsLevel2(newValuesNiveau2)
    setSelectedLevel2Index(0)
    setSelectedLevel1(v)
   
}

//const init=initialOptions()
const initialLevel2Options=getInitiaLevel2Options()
//selection le option level1
//const [selectOptions,setSelectOptions]=useState<string[]> (init)
const[selectedLevel1Index,setSelectedLevel1Index]=useState<number>(0)
//les valeur selection de niveau 2 selon la valeur de niveau 2
const [selectOptionsLevel2,setSelectOptionsLevel2]=useState<string[]>(initialLevel2Options)

const [selectedLevel2Index,setSelectedLevel2Index]=useState<number>(0)

//la valeur de niveau 1 selectionner
const [selectedLevel1,setSelectedLevel1]=useState<string>(level1Options[0])
//la valeur de niveau 2 selectionner
//const [selectedLevel2,setSelectedLevel2]=useState<string>(selectOptionsLevel2[0])
//function button niveau 2

const handelLevel2Change=(v:string,index:number)=>{
      setSelectedLevel2Index(index)
      //setSelectOptionsLevel2(level2Options)
   
}

const selectedVariant=getSelectedVariants(product,selectedLevel1,selectOptionsLevel2,selectedLevel2Index)
const stateStock=selectedVariant?.stockLevel
//Status Stock
 const isOutOfStock=!selectedVariant || stateStock==="OUT_OF_STOCK";
 const isAvailableStock=stateStock==="IN_STOCK"
 const isLowStock=stateStock==="LOW_STOCK"
//state stock
//const [stateStock,setStateStock]=useState<string>()

console.log('--------------------------------------------------------')
console.log('selectOptionsLevel2=====>',selectOptionsLevel2)

 const price=selectedVariant?.price??0
 const imageUrlVariant=selectedVariant?.featuredAsset?.preview
 const imageUrl=product.featuredAsset.preview
   




  return (
    
   
      <div className='w-full min-h-dvh  flex flex-col lg:flex-row items-stretch '>

          

        {/* image de product */}

        <div className='flex  items-center justify-center w-full lg:w-1/2 
                        h-full border-0 border-solid border-gray-600 py-4 '>
            <div className='w-[600px] aspect-square relative border-0 border-solid
               border-amber-700 ' >
            <Image 
             src={imageUrlVariant??imageUrl}
             alt={product.name}
             
             fill
             className="object-cover border rounded-lg"
            
            />
            </div>
        
        </div>

        {/* information the product */}
        <div className=' flex flex-col  items-center gap-5 py-4
                         w-full lg:w-1/2 h-full box-border border-0 border-solid
                         border-gray-600 px-4  ' >
            {/* name and price and description */}
            <div className='flex flex-col items-start  gap-1 '>

              <h1 className='text-md font-bold' >{selectedVariant?.name}</h1>
              <h2 className='text-md font-bold'>$ {(price/100).toFixed(2)}</h2> 
              <p className='text-wrap text-md text-justify font-extralight'>{product.description}</p>

            </div>  

            {/* groupeOption and Option */}
             
         
            {/* option:1  niveax 1*/}
        {product.optionGroups.length>0 &&
         <div className=' w-full flex flex-col items-center gap-3 '>

            <div  className={`w-full ml-5 `}>
                {/* optionGroupe */}
                <h1 className='text-md font-bold '> {product.optionGroups[0]?.name} </h1>
                 <ButtonsLevel1 product={product} level1Options={level1Options} 
                       handelLevel1Change={handelLevel1Change} 
                      selectedLevel1Index={selectedLevel1Index} />
              </div>
          </div>}

        {/* option:2 niveau 2 */}

         {product.optionGroups.length>1 &&
          selectOptionsLevel2.length>0 && 
          <div className=' w-full flex flex-col items-center gap-3 '>

            <div  className={`w-full ml-5 `}>
            
                <h1 className='text-md font-bold '> {product.optionGroups[1].name}</h1>
            
                {/* <div className='w-full flex flex-wrap items-center justify-start gap-2 mt-1  space-x-2.5 '>
                    {selectOptionsLevel2.map((v,index1)=>{
                  const variant=getSelectedVariants(product,selectedLevel1,selectOptionsLevel2,index1)
                 console.log("selectVariante dans le button :",variant)
                  const stateStock=variant?.stockLevel
                  const isOutOfStock1=!variant || stateStock==="OUT_OF_STOCK";
                  const isAvailableStock=stateStock==="IN_STOCK"
                  const isLowStock=stateStock==="LOW_STOCK"
                  console.log('selectVariant:',selectedVariant)

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
                 </div> */}
                <ButtonsLevel2 product={product} selectOptionsLevel2={selectOptionsLevel2} 
                        selectedLevel1={selectedLevel1} handelLevel2Change={handelLevel2Change} 
                         getSelectedVariants={getSelectedVariants} selectedLevel2Index={selectedLevel2Index}/>
            
            </div>

        

        
         </div>  
         }
        

          {/* status the stock */}
          <StatusStock isAvailableStock={isAvailableStock} isLowStock={isLowStock}
                       isOutOfStock={isOutOfStock} stateStock={stateStock} />
          {/* button Add */}
        
         <div className='w-4/5'>
            <button 
                
                 disabled={isOutOfStock}
                 onClick={()=>{
                    
                  if(!selectedVariant) return
                     addItem({
                     variant:selectedVariant,
                     quantity:1,
                     productImage:imageUrlVariant??imageUrl,
                     productName:product.name})}}
                  
                  className={`w-full h-12 border border-gray-200 bg-amber-100
                              rounded-lg 
                              transition-colors duration-300 
                              ${isOutOfStock?"bg-gray-100 cursor-not-allowed ":
                                 "hover:bg-amber-400 "}`}>
                  Add Cart 
            </button>
         </div>

        </div >
                
      </div>
    
  
  )
}

export default DetailsProduct
