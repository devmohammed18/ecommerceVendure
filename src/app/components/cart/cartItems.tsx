'use client'
import { useCartStore } from '@/app/store/cartstore'
import Link from 'next/link'
import { SlBasket } from "react-icons/sl";
import { GrCart } from "react-icons/gr";
const CartItems = () => {
    
const items=useCartStore(state=>state.items);
const totalItems=items.reduce((acc,i)=>acc+i.quantity,0)

  return (
     <Link href="/cart" className="relative text-gray-700 p-2 mr-2 text-gl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300">
        {/* <SlBasket /> */}
        <GrCart className='text-2xl font-bold'  />
        <span className='absolute flex items-center justify-center  w-6 h-6 rounded-full text-center border border-solid bg-red-600 text-white text-lg -top-1 -right-1 z-10 '>{totalItems}</span>
      </Link>
     
  )
}

export default CartItems