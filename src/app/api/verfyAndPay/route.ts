import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!)   
export const GET=async (req:NextRequest)=>{

console.log('--------------------------------------------------')
 const sessionId=req.nextUrl.searchParams.get('session_id') 
 console.log('Dans VerfyAndPay=====>',sessionId)
if(!sessionId){
    return NextResponse.json({paid:'false'})
}

try{

 const session=await stripe.checkout.sessions.retrieve(sessionId??'')
  
   return NextResponse.json({

       paid:session.payment_status==='paid',
       customer_email:session.customer_email,
       payment_intent:session.payment_intent,
})

}catch{
return NextResponse.json({paid:false})

}


}