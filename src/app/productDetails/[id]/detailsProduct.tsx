'use client'
import { Product, ProductVariant } from '@/app/lib/type/vendure'
import { useCartStore } from '@/app/store/cartstore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

 const DetailsProduct = ({product}:{product:Product}) => {

    // 1. Trier les groupes — color en premier
    const {addItem}=useCartStore();
    const items=useCartStore(state=>state.items)
    console.log("items[]",items)
  const sortGroupes=[...product.optionGroups]?.sort((a,b)=>{
   if (a.code==='color') return -1;
   if (b.code==='color') return 1;
   return 0;


  })
 
 const colorGroups=sortGroupes[0]?.name??[];
 const sizeGroups=sortGroupes[1]?.name??[];

  // 2. Colors disponibles
 const colors=sortGroupes[0]?.options.map(option=>option?.code)??[]
       
 const [selectColor,setSelectColor]=useState(colors[0]??'')
  console.log("sortGroupes[0]",sortGroupes[0])
  console.log("color===================>",colors)
 
//3  Variants filtrés par color
const variantByColor=product?.variants?.filter(variant=>variant?.options.some(option=>option?.group.code===sortGroupes[0]?.code && option?.code===selectColor))
//4 Sizes disponibles selon color
const variantFin=variantByColor?.map(v=>{return{...v, options:v?.options.filter(
                                          option=>option?.group?.code===sortGroupes[1]?.code)}})
 
 const [selectSize,setSelectSize]=useState<ProductVariant|null>(null)  
 
  const isOutOfStock= variantFin.length>0 ?selectSize?.stockLevel==="OUT_OF_STOCK"
                                          :product.variants[0]?.stockLevel==="OUT_OF_STOCK"                               
//une aure fonction il faire le mem role de fonction 1 et 2
const result = product.variants
  .filter(v =>
    v.options.some(
      o => o.group.code === "color" && o.code === selectColor
    )
  )
  .map(v => ({
    size: v.options.find(o => o.group.code === "size")?.name,
    sizeCode: v.options.find(o => o.group.code === "size")?.code,
    price: v.price,
    
    name: v.name,
  })); 


console.log('product..................>',product)
console.log('varinatBySelect..........>',variantByColor)
console.log("variantFin ............>",variantFin)

console.log("result..................>",result)
// Image courante
const CurrentImage=variantFin[0]?.featuredAsset?.preview??product.featuredAsset.preview

const ImagePrincipal=product?.featuredAsset?.preview;

console.log("CurrentImage#############################>",CurrentImage)
console.log("image#####################",ImagePrincipal)

const handleSelectColor=(color :string)=>{

setSelectColor(color)
setSelectSize(variantFin[0])
}

//le size selectionner
const handleSelectSize=(id:number)=>{

  
  setSelectSize(variantFin[id])

}


useEffect(()=>{
  if(variantFin.length>0){
   setSelectSize(variantFin[0])
  }
console.log(selectColor) 
console.log('',selectSize)

},
[selectColor])

  return (
  // min-h-screen max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-16'
    <div className='min-h-screen max-w-6xl mx-auto flex flex-row gap-10  border border-solid    bg-gray-100' >
       
       
        {/*************         Image Praicipale     **************************/}
 {/* relative w-full md:w-2/5 h-96 md:h-[500px] rounded-xl overflow-hidden border border-gray-200 bg-white'       */}
        <div className='relative  mt-16 h-auto w-2/5 box-content border border-solid bg-gray-100' >

        <Image 
             src={CurrentImage}
             alt={product.name}
             fill
             className='object-contain'
        />


       
        
          
        
        
         </div>
       
       
       
       {/* les information sur le produt */}
        <div className='h-full  mt-16 w-1/2 flex flex-col gap-6 px-6 border  border-solid bg-gray-100'>
        
        {/* nom */}
         <h3 className='text-3xl font-bold text-gray-800 '>{product.name}</h3>
           {selectSize?<span className='text-2xl font-semibold text-red-500'>
                           {`$ ${selectSize?.price/100}`}
                       </span>
                       : <span className='text-2xl font-semibold text-red-500'>
                             {`$ ${product.variants[0].price/100}`}
                        </span>
                      
                      }
            
            {/* Description */}
         <p className='text-base leading-relaxed' >{product.description}</p>
        
        

        <div className='flex flex-col gap-6'>

              <div className='flex flex-col gap-2'>
                
                  {/* Nom du groupe colorGroupe='color' */}
                  <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                    {colorGroups}
                  </span>




                  

                  {/* Options color  */}
                  <div className='flex flex-wrap gap-3'>
                    { colors.map((color,index) => (
                     
                   <button
                       onClick={()=>{ handleSelectColor(color) }}
                        key={index}
                       
                        className={`px-4 py-2 rounded-lg border ${ color===selectColor? 'border-amber-50 text-sm text-amber-100 bg-amber-600'  :'border-gray-300 text-sm font-medium text-gray-700'}
                                      hover:border-amber-500 hover:text-amber-400 transition-colors`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>

                   {/* Nom du groupe */}
                 
             <div className='flex flex-col gap-4'>
                  
                   {/* Nom du groupe sizeGroups='size' */}
                  <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                    {sizeGroups}
                  </span>

                  <div className='flex flex-wrap gap-3'>
                    

                    { variantFin.map((v,index)=> v.options.map((option,index1)=>{
                      
                       const outOfStock=v?.stockLevel==="OUT_OF_STOCK"
                        const isSelected=selectSize?.id===v.id 
                         
                       // console.log()
// 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
// 'border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-400'
                     
                   return(<button 
                              key={index}
                              disabled={outOfStock}
                              onClick={()=>handleSelectSize(index)}
                              
  
                             // className={`px-4 py-2 rounded-lg border ${selectSize?.options[index1].code===option.code?'border-amber-50 text-sm text-amber-100 bg-amber-600':'border-gray-300 text-sm font-medium text-gray-700'} hover:border-amber-500 hover:text-amber-400 transition-colors`}
                             className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                                    ${
                                      outOfStock?
                                      'border-amber-300 text-gray-300 cursor-not-allowed line-through'
                                      :!isSelected?
                                        'border-amber-300 text-gray-700 bg-gray-100 hover:cursor-pointer'
                                       :'border-amber-500 text-amber-100 bg-amber-600 hover:cursor-pointer '}
                                       
                                       `}
                            
                            >
                            {option.code}
                      </button>) 
                      

                     }
                  
                  
                  
                  
                  )
                       
                    ) }
                  </div>



             </div>
         {/******* button de Panier **********/}
           
           {/*  'bg-gray-300 text-gray-400 cursor-not-allowed' */}
            
            
            <button
                 onClick={()=>{addItem({
                     variant: (product?.variants[0].options.length===0)? product.variants[0]:selectSize,
                     quantity:1,
                     productName:(product?.variants[0].options.length===0)? product?.name
                      : selectSize?.name,
                     productImage:(product?.variants[0].options.length===0)? product?.featuredAsset?.preview 
                     :(selectSize?.featuredAsset?.preview===undefined)?
                        product?.featuredAsset?.preview 
                     :selectSize?.featuredAsset?.preview,


                 })}}
                  className={`h-12 border rounded-2xl font-semibold transition-colors

                    ${isOutOfStock
                      ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-600"} `}
                >
                  Ajouter Panier
          </button>
                  
                   {/* <button className=' h-12 border rounded-2xl text-gray-700 border-gray-300 bg-gray-100 hover:border-amber-400 hover:text-amber-400 transition-colors ' >  Add    </button> */}
              </div>
           
        </div>
        







         {/* <div className=''>
           
           {product.optionGroups.map((optionGroup,index1)=>(
              <div key={index1} className='flex flex-col gap-2' >
                  <span className='mt-4'>{optionGroup.name}</span>
             
                  <div className='text-gray-600 border border-solid  flex justify-start flex-wrap gap-4 space-x-4'  >
                        
                        {optionGroup.options.map((option,index)=>(
                          <button key={index}>{option.code}</button>
                           
                        ))}

              
                  </div>
             </div>

            

           ))}
          
          </div> */}

          {/* 
          
           <div className='flex flex-col gap-6'>

            {[...product.optionGroups]
              .sort((a, b) => {
          if (a.code === 'color') return -1;
          if (b.code === 'color') return 1;
          return 0;
              })
              .map((optionGroup) => (
              <div key={optionGroup.id} className='flex flex-col gap-2'>
                
                  
                  <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                    {optionGroup.name}
                  </span>

                  
                  <div className='flex flex-wrap gap-3'>
                    { optionGroup.options.map((option) => (
                   <button
                        key={option.id}
                        className='px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-amber-500 hover:text-amber-600 transition-colors'
                      >
                        {option.code}
                      </button>
                    ))}
                  </div>

              </div>
            ))}
        </div>
          
          
          
          
          */}



          {/* recupere les donne de size */}
          {/* <div className='text-gray-600 border border-solid  flex justify-start flex-wrap gap-4 space-x-4'  >
            
            {product.variants.map((variant,index)=>(variant.options.map((option)=>(

                 <button onClick={()=>handleSelectVariant(index)} key={index} className={ `w-20 h-10 b text-lg    
                  ${selectProductVariant.id===variant.id?'bg-red-900 hover:cursor-pointer' :'bg-gray-400 hover:cursor-pointer '} `  }>{option.code}</button>

                 ))))}


          </div> */}

         
         </div>

    </div>



  )
}
export default DetailsProduct