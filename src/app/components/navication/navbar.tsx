import Link from 'next/link';
import Category from './category';
import MobileMenu from './mobilemenu'; // Client Component
import { useCartStore } from '@/app/store/cartstore';
import CartItems from '../cart/cartItems';


export default function NavBar() {


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">Boutique</Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Accueil</Link>
          <Link href='/test'>Test</Link>
          <Link href='/test1'>Test1</Link>
          <Category />
          
           <CartItems />
          <Link href="/account" className="text-gray-700 hover:text-blue-600 transition">Mon Compte</Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
