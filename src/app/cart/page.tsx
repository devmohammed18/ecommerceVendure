'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '../store/cartstore';
import { ProductVariant } from '../lib/type/vendure';
import DeleteCart from './deleteCart';
import Link from 'next/link'

const CartPage = () => {
const {items,deleteItem,incriment,decriment,totals,totalsWithTax}=useCartStore()
//const arrtotale=items.map(el=>el.variant?.price??0*el.quantity)
console.log('------------------------------------------------------------------------------')
console.log("totals-------------------------------------->",totals())
console.log(items)

  const [quantities, setQuantities] = useState({
    line1: 1,
    line2: 1,
    line3: 1,
  });

  const handleQuantityChange = (
    key: 'line1' | 'line2' | 'line3',
    value: string
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          
          {/* Header */}
         
         
        {items.length<=0?
           <header className="text-center">
               <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Cart Vide
                </h1>
          </header>
        : <div>
            {/* heder */}
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
              </h1>
           </header>
            
            {/* Items */}
             <div className="mt-8">
            <ul className="space-y-4">

              {/* ITEM 1 */}

             {items.map((item,index)=>(
               
               <li key={index} className="flex items-center gap-4">
                <Image
                  src={item.productImage??""}
                  alt={item.productName??''}
                  width={64}
                  height={64}
                  className="size-16 rounded-sm object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">
                    {item.productName}
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Size:</dt>{' '}
                      <dd className="inline">{item.variant?.options[0]?.name}</dd>
                    </div>
                    <div>
                      <dt className="inline">price:</dt>{' '}
                      <dd className="inline">{item.variant?.price} $ <span>{item.variant?.taxRateApplied?.value}</span></dd>
                    </div>
                    <div>
                      <dt className="inline">Color:</dt>{' '}
                      <dd className="inline"></dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">

                 
                 {/* incriment la Quantity */}
                  <button onClick={()=>incriment(item.variant?.id)} 
                       className='  text-gray-600 p-2 transition hover:bg-gray-400 
                       hover:cursor-pointer'>
                       +
                  </button>
                   {/* Quantity */}
                  <form>
                    <label htmlFor="Line1Qty" className="sr-only">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange('line1', e.target.value)
                      }
                      id="Line1Qty"
                      className="h-8 w-12 rounded-sm border border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </form>
                  {/* decriment la quantity */}
                   <button onClick={()=>decriment(item.variant?.id,item.quantity)}
                   className='text-gray-600 p-2 transition hover:bg-gray-400
                              hover:cursor-pointer' >
                      -
                   </button>

                  {/* Remove */}
                  <button

                  onClick={()=>{deleteItem(item?.variant?.id)}}
                    type="button"
                    className="text-gray-600 transition hover:text-red-600"
                  >
                    <span className="sr-only">Remove item</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
               </li>


             )) }

             

            </ul>

            {/* Totals */}
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">

                <dl className="space-y-0.5 text-sm text-gray-700">

                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>$ {(totals()/100).toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>$ {((totalsWithTax()-totals())/100).toFixed(2)} </dd>
                  </div>

                   <div className="flex justify-between">
                    <dt>total with tax</dt>
                    <dd>$ {(totalsWithTax()/100).toFixed(2)}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-£20</dd>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <dt>Total</dt>
                    <dd>£200</dd>
                  </div>
                </dl>

                {/* Discount badge */}
                <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="-ms-1 me-1.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3"
                      />
                    </svg>

                    <p className="text-xs whitespace-nowrap">
                      2 Discounts Applied
                    </p>
                  </span>
                </div>

                {/* Checkout */}
                <div className="flex justify-end">
                 <Link 
                  href='/checkOut'
                 className='block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600'>
                     CheckOut
                 </Link>

                </div>

              </div>
            </div>

             </div>

          </div>  }


        </div>
      </div>
    </section>
  );
};

export default CartPage;