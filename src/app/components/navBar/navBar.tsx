import Link from 'next/link';

import MobileMenu from './mobilemenu'; // Client Component

import CartItems from '../cart/cartItems';

import BarSearch from './barSearch';
import MyAccount from './myAccount';
import { serverClient } from '@/app/lib/apollo/server-client';
import { GET_COLLECTIONS } from '@/app/lib/graphql/query/collections';
import { CollectionsResponse } from '@/app/lib/type/vendure';
import SubCategory from './category/subcategory';



export default async function NavBar() {
const {data}=await serverClient.query<CollectionsResponse>({query:GET_COLLECTIONS})
const rootCategories = data?.collections.items.filter(
    (cat) => cat.parent?.name === '__root_collection__'
  ) ?? [];
  return (
    <header className=" bg-white shadow-md sticky top-0 z-50">
         {/* top Bar */}
        
         <MyAccount /> 
          {/* main navigation */}
         <div className=" relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
             {/* 1er div ==>pour le touts le mode lg et 2emme Mobile==> por mobile et 3eme ==>commun lg et mobile  */}
              {/* descktop */}
              <div className='hidden lg:flex items-center justify-center' >
                  <Link href="/" className=" border-r-2 border-gray-600   text-xl font-bold text-gray-800 pr-3.5 mr-1">
                      Boutique 
                     
                  </Link>
                  <Link href="/" className={`border-2 border-solid lg:rounded-md  lg:mr-3 border-gray-100  lg:px-3 lg:py-2 text-gray-700 p-2 text-gl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300 `}>Accueil</Link>
                  {/* <Link href='/test'>Test</Link>
                  <Link href='/test1'>Test1</Link> */}

                  {/* isMobile:false pour Desck Lg */}
                  <SubCategory  isMobile={false} rootCategory={rootCategories}  />
              </div>
              {/* Menu Mobile Haumborger*/}
              <MobileMenu rootCategory={rootCategories} />
              {/* commun log et bsr search et panie */}
              <div className=" w-full lg:w-96  flex items-center justify-between lg:justify-end ">
                   
                    {/* logo */}
                     <Link href="/" className={`lg:hidden  flex items-center justify-between space-x-1 p-2 text-xl font-bold text-gray-800 `} >
                              <h1>Boutique</h1>
                              <span>|</span>
                    </Link>
                     {/* bar Search and Cart */}
                    <div className='w-56 sm:w-80  lg:w-80 lg:gap-6  flex items-center justify-between  '>
                        <BarSearch />           
                        <CartItems />
                    </div>  
                 
              </div>

              
         </div>
    </header>
  );
}
