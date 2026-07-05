import { arrayBuffer } from 'node:stream/consumers';
import React from 'react'

function Loading() {
  return (
     <div className='w-full min-h-dvh  flex flex-col lg:flex-row items-stretch '>
    
              
    
            {/* image de product */}
    
            <div className='flex  items-center justify-center w-full lg:w-1/2 
                            h-full border-0 border-solid border-gray-600 py-4 '>
                <div className='w-[600px] aspect-square bg-gray-200 animate-pulse ' >
               
                </div>
            
            </div>
    
            {/* information the product */}
            <div className=' flex flex-col  items-center gap-5 py-4
                             w-full lg:w-1/2 h-full box-border border-0 border-solid
                             border-gray-600 px-4  ' >
                {/* name and price and description */}
                <div className='w-full flex flex-col items-start  gap-1 '>
    
                  <h1 className='h-4 w-1/5 bg-gray-200 animate-pulse aspect-square text-md font-bold' ></h1>
                  <h2 className='h-4 w-1/5  bg-gray-200 animate-pulse aspect-square text-md font-bold'></h2> 
                  <p className='h-30 w-4/5 boder border-gray-200 bg-gray-200 animate-pulse aspect-square text-wrap text-md text-justify font-extralight'></p>
    
                </div>  
    
                {/* groupeOption and Option */}
                 
             
                {/* option:1  niveax 1*/}
           
            <div className=' w-full flex flex-col items-center gap-3 '>
    
                <div  className={`w-full ml-5 `}>
                    {/* optionGroupe */}
                    <h1 className='text-md font-bold '>  </h1>
                    <div className='w-full flex flex-wrap items-center justify-start gap-2 mt-1  space-x-2.5 '>
                    {/* option */}
                        {Array.from({length:4}).map((_,index)=>(
                        <button  key={index} 
                                    
                                    className={`w-20 h-10 border border-solid rounded-lg bg-gray-200 animate-pulse
                                              
                                               `}>
                               
                        </button>)) }
                    </div>
                
                
                </div>
    
            
    
            </div>
    
            {/* option:2 niveau 2 */}
    
            
              
              <div className=' w-full flex flex-col items-center gap-3 '>
    
                <div  className={`w-full ml-5 `}>
                
                    <h1 className='w-1/5 h-4 bg-gray-200 animate-pulse '> </h1>
                
                    <div className='w-full flex flex-wrap items-center justify-start gap-2 mt-1  space-x-2.5 '>
                        {Array.from({length:4}).map((_,index1)=>{
                     

                     return(
                        <div key={index1} className='flex flex-col gap-4'>
                            <button className={`w-20  h-10 bg-gray-200 animate-pulse border border-solid rounded-lg`}>
                           </button>

                        </div> 
                        
                    
                    )
                        
                    }) 
                        
                        
                        
                        }
                     </div>
                 
                
                </div>
    
            
    
            
            </div>
     
              {/* status the stock */}
              <div className='w-full flex items-center justify-start gap-2' >
                <h1 className='h-4 w-1/5 bg-gray-200 animate-pulse text-md mt-4 font-bold'></h1>
                 {<p className= {`h-4 w-1/5 bg-gray-200 animate-pulse text-md font-bold mt-4 ' }    `}>
                 </p> }
              </div>
              {/* button Add */}
             <div className='w-4/5'>
                <button    className={`w-3/5 h-12 border border-gray-200   `}>
                      Add Cart 
                </button>
             </div>
    
            </div >
                    
          </div>
  )
}

export default Loading
