
import { ITEMS } from "@/app/checkOut/page";
import { NextRequest,NextResponse } from "next/server";
import Stripe from 'stripe'


const stripe =new Stripe(process.env.STRIPE_SECRET_KEY!)
export const POST=async(req:NextRequest)=>{

const {email,orderCode,items,shippingName,shippingPrice,amount}= await req.json()

// // {  
// //     //Article

// //     ...items.map((item:ITEMS)=>({

// //          price_data:{
// //             currency:'CAD',
// //             product_data:{
// //                  name:item.productName?? 'product',
// //              },

// //           unit_amount:Math.round((item.productPriceTax?? 0 )*100),
          
// //          },
// //         quantity:item.quantity,

// //     }) ),
   
// //     //Livraison
// //     // price_data:{
        
// //     //   currency:'CAD',
// //     //   product_data:{
// //     //     name:`Livraison-${shippingName}`
// //     //   },
// //     //     unit_amount:shippingPrice,
        
// //     // },
    
    
// // }

// // ],

const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [
      // Produits détaillés
      ...items.map((item: ITEMS) => ({
        price_data: {
          currency: 'CAD',
          product_data: { name: item.productName ?? 'Produit' },
          unit_amount: item.productPriceTax ?? 0,
        },
        quantity: item.quantity,
      })),
      // Livraison
      ...([{
        price_data: {
          currency: 'CAD',
          product_data: { name: `Livraison — ${shippingName ?? 'Standard'}` },
          unit_amount: shippingPrice,
        },
        quantity: 1,
      }] ),
    ],

success_url:`${process.env.NEXT_PUBLIC_BASE_URL}/orderConfirmation?session_id={CHECKOUT_SESSION_ID}&order=${orderCode}`,
cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,

metadata:{
  orderCode,
  amount
},

})

return NextResponse.json({url:session.url})

}
