'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Menu, X } from 'lucide-react';

import SubCategory from './category/subcategory';

import { Category} from '@/app/lib/type/vendure';


export default function MobileMenu({rootCategory}:{rootCategory:Category[]}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (

   // desc en haut vers le bas  
  //    className={`
  //         md:hidden
  //         fixed top-0 left-0
  //         w-full 
  //         h-dvh
  //         bg-white
  //         z-20
  //       overflow-hidden
  //         transform transition-all duration-700 ease-in-out

  //         ${
  //           mobileOpen
  //             ? " translate-y-0  "
  //             : "-translate-y-[200%]  "
  //         }
              
  // `}

    <div className='relative'>

      {/* overlay */}
      
      {mobileOpen && ( 
          <div className='fixed w-full h-dvh top-0 left-0 opacity-65 bg-black z-20' >
         </div>)}

        {/* buttom menu */}
         <button className={`lg:hidden relative  `} onClick={() => {setMobileOpen(!mobileOpen)}}>
              <Menu size={24} className='absolute -top-20' />
         </button>
       {/* fixed top-28 left-0  w-2/3     ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"    */}
       {/* Drawer */}
        <nav className={`
          fixed top-0 left-0 w-4/5 h-dvh z-30 bg-white
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen?'translate-x-0':'-translate-x-full'}`} >
            {/* Button X */}
            <div className='flex items-center justify-end'>

               <button onClick={()=>setMobileOpen(!mobileOpen)}
                  className='p-3 flex items-center justify-end ' >

                  <X size={24}  />
                </button>
            </div>
             {/* lien Accieul */}
             <div className=''>

                  <Link href="/" 
                      className="border-b-2 border-gray-100 block px-4 py-3 text-gray-700 font-bold
                     hover:bg-gray-100">
                      Accueil
                  </Link>

                  <SubCategory isMobile={true} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} rootCategory={rootCategory} />
             </div> 
        </nav>
        
         
    </div>
  );
}
0