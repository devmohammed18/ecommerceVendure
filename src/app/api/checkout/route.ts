
// import { ITEMS } from "@/app/checkOut/page";
// import { NextRequest,NextResponse } from "next/server";
// import Stripe from 'stripe'


// const stripe =new Stripe(process.env.STRIPE_SECRET_KEY!)
// export const POST=async(req:NextRequest)=>{

// const {email,orderCode,items,shippingName,shippingPrice,amount}= await req.json()

// // // {  
// // //     //Article

// // //     ...items.map((item:ITEMS)=>({

// // //          price_data:{
// // //             currency:'CAD',
// // //             product_data:{
// // //                  name:item.productName?? 'product',
// // //              },

// // //           unit_amount:Math.round((item.productPriceTax?? 0 )*100),
          
// // //          },
// // //         quantity:item.quantity,

// // //     }) ),
   
// // //     //Livraison
// // //     // price_data:{
        
// // //     //   currency:'CAD',
// // //     //   product_data:{
// // //     //     name:`Livraison-${shippingName}`
// // //     //   },
// // //     //     unit_amount:shippingPrice,
        
// // //     // },
    
    
// // // }

// // // ],
// try{

// const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'payment',
//     customer_email: email,
//     line_items: [
//       // Produits détaillés
//       ...items.map((item: ITEMS) => ({
//         price_data: {
//           currency: 'CAD',
//           product_data: { name: item.productName ?? 'Produit' },
//           unit_amount: item.productPriceTax ?? 0,
//         },
//         quantity: item.quantity,
//       })),
//       // Livraison
//       ...([{
//         price_data: {
//           currency: 'CAD',
//           product_data: { name: `Livraison — ${shippingName ?? 'Standard'}` },
//           unit_amount: shippingPrice,
//         },
//         quantity: 1,
//       }] ),
//     ],

// success_url:`${process.env.NEXT_PUBLIC_BASE_URL}/orderConfirmation?session_id={CHECKOUT_SESSION_ID}&order=${orderCode}`,
// cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,

// metadata:{
//   orderCode,
//   amount
// },

// })
 

// return NextResponse.json({url:session.url})

// }catch(err){return NextResponse.json({err})}




// }

import { ITEMS } from "@/app/checkOut/page";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

export const POST = async (req: NextRequest) => {
  try {
    // ✅ Stripe initialisé DANS la fonction, pas au niveau module
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe key manquante' }, { status: 500 })
    }
    const stripe = new Stripe(stripeKey)

    const { email, orderCode, items, shippingName, shippingPrice } = await req.json()

    // ✅ Logs pour debug
    console.log('stripe key présente:', !!stripeKey)
    console.log('baseUrl:', process.env.NEXT_PUBLIC_BASE_URL)
    console.log('shippingPrice reçu:', shippingPrice)
    console.log('items reçus:', items)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        ...items.map((item: ITEMS) => ({
          price_data: {
            currency: 'CAD',
            product_data: { name: item.productName ?? 'Produit' },
            unit_amount: Math.round(item.productPriceTax ?? 0), // déjà en centimes depuis Vendure
          },
          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: 'CAD',
            product_data: { name: `Livraison — ${shippingName ?? 'Standard'}` },
            unit_amount: Math.round(shippingPrice), // déjà en centimes depuis Vendure
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orderConfirmation?session_id={CHECKOUT_SESSION_ID}&order=${orderCode}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: { orderCode },
    })

    return NextResponse.json({ url: session.url })

  } catch (err) {
    // ✅ Log l'erreur complète pour Vercel Logs
    console.error('Stripe error complet:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}