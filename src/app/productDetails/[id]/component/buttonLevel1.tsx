import { Product } from '@/app/lib/type/vendure';
import React from 'react'

interface ButtonsLevel1Props{
   product:Product;
   level1Options:string[];
   handelLevel1Change:(value:string,index:number)=>void;
   selectedLevel1Index:number 


}

function ButtonsLevel1({product,level1Options,handelLevel1Change,selectedLevel1Index}:ButtonsLevel1Props  ) {
  return (
          <div className='w-full flex flex-wrap items-center justify-start gap-2 mt-1  space-x-2.5 '>
                {/* option */}
                    {level1Options.map((v,index)=>(
                    <button  key={index} 
                                onClick={()=>{handelLevel1Change(v,index);}}
                                className={`w-20 h-10 border border-solid rounded-lg
                                           border-gray-500 text-sm p-2 hover:cursor-pointer hover:border-red-500 hover:border-2 transition-colors dureation-300
                                           ${level1Options[selectedLevel1Index]===v?"bg-red-600 ":""}`}>
                            {v}
                    </button>)) }
                </div>
            
            
          

        

      
  )
}

export default ButtonsLevel1
