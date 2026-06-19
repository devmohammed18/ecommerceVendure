// order-confirmation/page.tsx
'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '../lib/apollo/client';
import { ADD_PAYMENT_TO_ORDER } from '../lib/graphql/mutation/order';

interface DATA_VERFY_STRIPE{
       paid:boolean,
       customer_email:string,
       payment_intent:string,

}

const BodyOrderConfirmation = () => {

  const params=useSearchParams()
  const session_id=params.get('session_id')
  const orderCode=params.get('order')
  const [status,setStatus]=useState<'loading' | 'paid' | 'failed'>('loading') 
  const [email,setEmail]=useState<string>('')
   console.log('session_id:',session_id)
  // console.log('order',order)


useEffect(()=>{

const verfyAndPay=async()=>{

      if(!session_id){
        setStatus('failed')
      return
      }

      try{

      const res=await fetch(`api/verfyAndPay?session_id=${session_id}`)
      const data:DATA_VERFY_STRIPE=await res.json();

      if(!data.paid){
      setStatus('failed')
      return
      }

      setEmail(data.customer_email)
      console.log('session_id================>',session_id)
      console.log('data.customer_email=======>',data.customer_email)
      console.log("data.payment_intent=======>",data.payment_intent)

      const{ data:paymentData}=await client.mutate({mutation:ADD_PAYMENT_TO_ORDER,
              variables:{input:
                {method:'stripe',
                metadata:{session_id:session_id,
                          paymentIntent:data.payment_intent}
                  }
                
      }})

        console.log('payemntData============>',paymentData)
          if (paymentData?.addPaymentToOrder?.errorCode) {
          throw new Error(paymentData.addPaymentToOrder.message)
        }
      setStatus('paid')
      
      console.log('===============================>paymntData',paymentData)
      console.log('data===============================>status',status)


      }catch{
        console.log('err serve...................................r')
        setStatus('failed')
      }

}
verfyAndPay()
},[session_id])





       
  return (
    <div className='max-w-2xl mx-auto px-6 py-16 text-center'>

      {status === 'loading' && (
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin' />
          <p className='text-gray-500'>Finalisation de la commande...</p>
        </div>
      )}

      {status === 'paid' && (
        <div className='flex flex-col items-center gap-4'>
          <div className='text-6xl'>✅</div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Commande confirmée !
          </h1>
          {orderCode && (
            <div className='bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 mt-2'>
              <p className='text-sm text-gray-500'>Numéro de commande</p>
              <p className='text-lg font-bold text-amber-600'>{orderCode}</p>
            </div>
          )}
          {email && (
            <p className='text-sm text-gray-400'>
              Confirmation envoyée à <strong>{email}</strong>
            </p>
          )}
          <Link
            href='/'
            className='mt-4 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors'
          >
            Retour à la boutique
          </Link>
        </div>
      )}

      {status === 'failed' && (
        <div className='flex flex-col items-center gap-4'>
          <div className='text-6xl'>❌</div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Paiement échoué
          </h1>
          <Link
            href='/checkout'
            className='mt-4 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors'
          >
            Réessayer
          </Link>
        </div>
      )}

    </div>
  )







  // return (
  //   <div className='max-w-2xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6'>

  //     {/* Icône */}
  //     <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center'>
  //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
  //         strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-500">
  //         <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  //       </svg>
  //     </div>

  //     {/* Message */}
  //     <h1 className='text-3xl font-bold text-gray-800'>Commande confirmée !</h1>
  //     <p className='text-gray-500 text-base'>
  //       Merci pour votre commande. Nous la traitons dès maintenant.
  //     </p>

  //     {/* Boutons */}
  //     <div className='flex gap-4 mt-4'>
  //       <Link href='/'
  //         className='px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors'>
  //         Retour à l accueil
  //       </Link>
  //       <Link href='/productBySubcategory'
  //         className='px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:border-amber-400 hover:text-amber-500 transition-colors'>
  //         Continuer les achats
  //       </Link>
  //     </div>

  //   </div>
  // );
};

export default BodyOrderConfirmation;