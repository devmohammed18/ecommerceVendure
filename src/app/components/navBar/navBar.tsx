import Link from 'next/link';
import Category from './category/category';
import MobileMenu from './mobilemenu'; // Client Component

import CartItems from '../cart/cartItems';

import BarSearch from './barSearch';
import MyAccount from './myAccount';



export default function NavBar() {


  return (
    <header className=" bg-white shadow-md sticky top-0 z-50">
         {/* top Bar */}
        
         <MyAccount /> 
          {/* main navigation */}
         <div className=" relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
             {/* 1er div ==>pour le touts le mode lg et 2emme Mobile==> por mobile et 3eme ==>commun lg et mobile  */}
              <div className='hidden lg:flex items-center justify-center' >
                  <Link href="/" className=" text-xl font-bold text-gray-800 pr-3.5">
                      Boutique 
                     <span>|</span>
                  </Link>
                  <Link href="/" className="text-gray-700 p-2 text-gl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300">Accueil</Link>
                  {/* <Link href='/test'>Test</Link>
                  <Link href='/test1'>Test1</Link> */}
                  <Category />
              </div>
       
             <MobileMenu />
              <div className=" w-full lg:w-96  flex items-center justify-between lg:justify-end ">
                   
                    
                     <Link href="/" className="lg:hidden  flex items-center justify-between space-x-1 p-2 text-xl font-bold text-gray-800  ">
                              <h1>Boutique</h1>
                              <span>|</span>
                        </Link>
                    <div className='w-56 sm:w-80  lg:w-80 lg:gap-6  flex items-center justify-between  '>
                      
                      {/* bar Search */}
                        <BarSearch />
                        <CartItems />
                    </div>  
                 
              </div>

              
         </div>
    </header>
  );
}
