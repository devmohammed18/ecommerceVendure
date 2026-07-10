import React from 'react'
import { SearchModalProps } from '../tyeps'





function SearchModel({search,setSearch}:SearchModalProps) {

  
const handelChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    setSearch(e.target.value)
     console.log("search1",search)
  }

  return (
    <div>
              {/* ovrelay */}
    <div className='w-full h-full fixed top-0 right-0 left-0 z-5
            bg-gray-500 opacity-40' >
    </div>
    {/* inpt Search */}
     <input

      value={search}
      onChange={(e)=>handelChange(e)}
        type="text"
        placeholder="Rechercher..."
        className={`z-40 w-80 lg:w-3/5 fixed top-10 right-1/2 translate-x-1/2  
                    px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-gray-500
           
        }`} />
    </div>
  )
}

export default SearchModel
