'use client'

import { X } from 'lucide-react';


import SearchSuggetion from './searchSuggetion';
import SearchLoading from './searchLoading';
import CardProducts from './cardProducts';
import { SearchResultsProps } from '../../tyeps';







function SearchResulats( {produtPriceRange, setIsOpenSearchResults,loading}:SearchResultsProps  ) {
  
  return (
  <div className='w-full' >



    <div>

              {/* search Results drop Down  */}
        <div className=' w-full h-[480px] fixed top-0 right-0 
                        bg-white  z-10 border-0 
                        border-e-amber-200'>
              {/* button X close */}
            <X size={30} z={30} 
             onClick={()=>{setIsOpenSearchResults(false)}}
             className='absolute top-2 right-2 text-red-400 
             hover:cursor-pointer hover:text-red-700 transition-colors duration-300  ' />
          
          {/*  results the search */}

            <div className=' mt-5 h-full w-full flex justify-between items-center
                           justify-items-center border-0 border-green-500'>
               {/* bloc left de resultat de recherche */}
               <SearchSuggetion />
                {/* bloc rigth */}
                 <div className='overflow-y-auto py-2 h-96 w-4/5 mt-14 ' >
                     <h1 className='p-2 text-xl font-bold capitalize'>results the Search :</h1>
                     {/* card the products */}

                      {loading? 
                     <SearchLoading />
                     :<CardProducts productPriceRanges={produtPriceRange} setIsOpenSearchResults={setIsOpenSearchResults}  />
                     }
                 </div>   
            </div>
                 
     




        </div>

    </div>

      
       
    
 </div>
    
  )
}

export default SearchResulats



