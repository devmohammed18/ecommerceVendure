'use client'
import { useCartStore } from '@/app/store/cartstore'
import Link from 'next/link'

const CartItems = () => {
    
const items=useCartStore(state=>state.items);
const totalItems=items.reduce((acc,i)=>acc+i.quantity,0)

  return (
     <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition">Panier<span className='text-red-600 text-2xl'>{totalItems}</span></Link>
  )
}

export default CartItems