'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Category from './category/category';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (


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
        
        
       {/* fixed top-28 left-0  w-2/3     ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"    */}
        <nav className={`
          fixed top-0 left-0 w-2/3 h-dvh z-20 bg-white
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen?'translate-x-0':'-translate-x-full'}`} >
           <div className='mt-20'>
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Accueil</Link>
          {/* <Category /> */}
           </div> 
        </nav>
        
          <button className="lg:hidden relative  z-50" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} className='absolute -top-20 left-0' /> : <Menu size={24} className='absolute -top-20 left-0' />}
         </button>
    </div>
  );
}
