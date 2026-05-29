// order-confirmation/page.tsx
'use client'
import Link from 'next/link';

const OrderConfirmation = () => {
  return (
    <div className='max-w-2xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6'>

      {/* Icône */}
      <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      {/* Message */}
      <h1 className='text-3xl font-bold text-gray-800'>Commande confirmée !</h1>
      <p className='text-gray-500 text-base'>
        Merci pour votre commande. Nous la traitons dès maintenant.
      </p>

      {/* Boutons */}
      <div className='flex gap-4 mt-4'>
        <Link href='/'
          className='px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors'>
          Retour à l accueil
        </Link>
        <Link href='/productBySubcategory'
          className='px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:border-amber-400 hover:text-amber-500 transition-colors'>
          Continuer les achats
        </Link>
      </div>

    </div>
  );
};

export default OrderConfirmation;