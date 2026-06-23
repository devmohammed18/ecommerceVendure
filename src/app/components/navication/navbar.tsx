import Link from 'next/link';
import Category from './category';
import MobileMenu from './mobilemenu'; // Client Component
import { MdAccountBox } from "react-icons/md";
import CartItems from '../cart/cartItems';


export default function NavBar() {


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
         
        <div className='flex justify-end items-start  w-full h-12 mr-2 border-b-2 border-solid border-b-gray-800'>
       
          <Link href="/account" className="flex justify-center items-center  text-gray-700 p-2 text-3xl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300"><MdAccountBox  /><span className='text-lg text-gray-800'>mon compte</span></Link>
          </div>
           
         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className='flex items-center justify-center' >
          <Link href="/" className="text-xl font-bold text-gray-800 pr-3.5">Boutique <span>|</span></Link>
          <Link href="/" className="text-gray-700 p-2 text-gl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300">Accueil</Link>
          {/* <Link href='/test'>Test</Link>
          <Link href='/test1'>Test1</Link> */}
          <Category />
          
        </div>
       
         
        <div className="hidden md:flex items-center space-x-8">
              <input
      type="text"
      placeholder="Rechercher..."
      className="w-96  rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
           <CartItems />
            
          
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
