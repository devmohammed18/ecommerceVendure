import React from 'react'
import { Search } from "lucide-react"

function SearchButton({setIsOpenSearchResults}:
                   {setIsOpenSearchResults:React.Dispatch<React.SetStateAction<boolean>>}  ) {
  return (
    <button 
          onClick={()=>setIsOpenSearchResults(true)}
           className="w-32 px-4 py-1 flex items-center justify-between 
           border-2 border-solid lg:rounded-md  lg:mr-3 border-gray-100  lg:px-3 
           lg:py-2 text-gray-700 p-2 text-gl font-bold
           hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300
        " >
       
            <Search  className="w-7 h-7 p-1 border-2 rounded-full text-center
               hover:cursor-pointer hover:bg-gray-500 font-bold " />
            <span className="capitalize " >
                 search
            </span>
       
     </button>
  )
}

export default SearchButton
