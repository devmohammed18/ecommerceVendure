import React from 'react'
import { MdAccountBox } from "react-icons/md"
import Link from 'next/link'
function MyAccount() {
  return (
    
   <div className=' w-full h-12  px-2 border-b-2 border-0 border-solid border-b-gray-800'>
         <div className=' flex items-center justify-end '>
             <Link href="/account" className="w-max flex justify-end  items-center  text-gray-700 p-2 text-3xl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all duration-300">
                 <MdAccountBox  />
                 <span className='text-lg text-gray-800 capitalize'>
                    mon compte
                 </span>
             </Link>
         </div>
          
        
    </div>
  )
}

export default MyAccount