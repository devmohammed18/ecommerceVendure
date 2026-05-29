// checkout/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartstore';
import { useRouter } from 'next/navigation';
import { client } from '../lib/apollo/client';
import { ADD_ITEM_ORDER, ATTACHER_ADRESS, CREATE_CUSTOMER, LOGOUT, SET_SHIPPING_METHOD } from '../lib/graphql/mutation/order';
import { from } from '@apollo/client';
import { Variable } from 'lucide-react';
import { GET_SHOPPING_METHODS } from '../lib/graphql/query/methodeShopping';

interface typeShoppingMethode{
  id :string
  name: string
  description: string
  price: number
  priceWithTax: number

}

const CheckoutPage = () => {
  const COUNTRIES = [
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'MA', name: 'Maroc' },
  { code: 'DZ', name: 'Algérie' },
  { code: 'TN', name: 'Tunisie' },
  { code: 'BE', name: 'Belgique' },
  { code: 'CH', name: 'Suisse' },
  { code: 'US', name: 'États-Unis' },
  { code: 'GB', name: 'Royaume-Uni' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'ES', name: 'Espagne' },
  { code: 'IT', name: 'Italie' },
  { code: 'PT', name: 'Portugal' },
  { code: 'NL', name: 'Pays-Bas' },
  { code: 'SE', name: 'Suède' },
  { code: 'NO', name: 'Norvège' },
  { code: 'AU', name: 'Australie' },
  { code: 'BR', name: 'Brésil' },
  { code: 'MX', name: 'Mexique' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'CM', name: 'Cameroun' },]

  const { items,clearCart } = useCartStore();
 
  const router = useRouter();
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   
  const [form, setForm] = useState({
    fullName: '',
    emailAdress:'',
    streetLine1: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    countryCode:''
 
  });

 const [shippingMethode,setShippingMethods]=useState<typeShoppingMethode[]>([])
const [selectedShipping, setSelectedShipping] = useState<string>('')
const [shippingPice,setShippingPrice]=useState<number>(0)
  useEffect(()=>{
    const fetchShoppingMethode= async()=>{
 //query Methode de shopping
   try{
      const {data}=await client.query({
                            query:GET_SHOPPING_METHODS,
                              fetchPolicy: 'network-only' // ✅ toujours récupérer depuis le serveur
                              })
   
     setShippingMethods(data.eligibleShippingMethods)
    console.log('shoppinMethodsData',data.eligibleShippingMethods)
   }catch(err){
    console.log(err)
   }

  
    } 
fetchShoppingMethode()

  },[])
   // console.log('shoppinMethodsData------>',shippingMethode)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit =async() => {
    // Validation simple
    if (!form.emailAdress||!form.fullName || !form.streetLine1 || !form.city || !form.postalCode) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
   // validation les frais de livraison
   if(!selectedShipping){
    setError('Veuillez selectionner une methode de livraison!!! ')
    return;
   }
   // setLoading(true);

    //Connect
    try{
        console.log('============================================')
        const [firstName,...lastNameParent]=form.fullName.trim().split(' ')
        const lastName=lastNameParent.join(' ')||firstName
        console.log('firstName',firstName)
        console.log('lastName',lastName)
          console.log('++++++++++++++++++++++++++++++++++')
     //connect le customer (login)    
      await  client.mutate({mutation:LOGOUT})
    // ajouter order  
   for(const item of items){  
       const {data}=await client.mutate({mutation:ADD_ITEM_ORDER,variables:{
        productVariableId:item.variant?.id,
        quantity:item.quantity
    }})
     console.log("data",data)
   }
   //add customer this Order
   const {data:customerData}= await client.mutate({mutation:CREATE_CUSTOMER,variables:{
    input1:{
     firstName,
     lastName,
     emailAddress:form.emailAdress, 
     phoneNumber:form.phoneNumber

    }
   }})
     console.log("customerData",customerData)
   //attache Adress avec son Customer

   const {data:attacheAdress}=await client.mutate({mutation:ATTACHER_ADRESS,variables:{
   input:{
        streetLine1:form.streetLine1,
        postalCode:form.postalCode,
        city:form.city,
        countryCode:form.countryCode
     
   }

   }})

   console.log('attacheAdress',attacheAdress)
  
//    const {data:resultShipping}=await client.mutate({mutation:SET_SHIPPING_METHOD,variables:{
//     id:selectedShipping
//    }})
  
//    console.log("resultShipping",resultShipping)
   clearCart();
    // router.push('/orderConfirmation');

    }catch(err){
        console.log(err)
    }

  
  };

  return (
    <div className='max-w-2xl mx-auto px-6 py-16'>
      <h1 className='text-2xl font-bold text-gray-800 mb-8'>Checkout</h1>

      {/* Résumé panier */}
      <div className='bg-gray-50 rounded-xl p-4 mb-8'>
        <h2 className='text-sm font-semibold text-gray-500 uppercase mb-4'>
          Résumé commande
        </h2>
        {items.map((item, index) => (
          <div key={index} className='flex justify-between text-sm text-gray-700 py-1'>
            <span>{item.productName} x{item.quantity}</span>
            <span>$ {((item.variant?.price ?? 0) * item.quantity / 100).toFixed(2)}</span>
          </div>
        ))}

        
        <div className='flex justify-between font-semibold text-gray-800 border-t border-gray-200 mt-3 pt-3'>
          <span>Total TTC</span>
          <span>
            $ {(items.reduce((acc, el) =>
              acc + ((el.variant?.priceWithTax ?? 0) * el.quantity), 0
            ) / 100).toFixed(2)}
          </span>
        </div>
         <div className='flex justify-between font-semibold text-gray-800  border-gray-200 mt-3 pt-3'>
          <span>FRAIS LIVRAISON</span>
          <span>
           $ {shippingPice.toFixed(2)}
          </span>
        </div> 
        
        <div className='flex justify-between font-semibold text-gray-800 border-t border-gray-200 mt-3 pt-3'>
          <span>Total TTC + LIVRAISON:</span>
          <span>
            $ {((items.reduce((acc, el) =>
              acc + (((el.variant?.priceWithTax) ?? 0) * el.quantity), 0
            ) / 100)+shippingPice).toFixed(2)}
          </span>
        </div>


      </div>

      {/* Formulaire adresse */}
      <div className='flex flex-col gap-4'>
        <h2 className='text-sm font-semibold text-gray-500 uppercase'>
          Adresse de livraison
        </h2>

        {[
          { name: 'fullName', placeholder: 'Nom complet' },
          { name: 'emailAdress', placeholder: 'Email Adress' },
          { name: 'streetLine1', placeholder: 'Adresse' },
          { name: 'city', placeholder: 'Ville' },
          { name: 'postalCode', placeholder: 'Code postal' },
          { name: 'phoneNumber', placeholder: 'Téléphone' },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
            className='border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-400'
          />
        ))}


          {/* ✅ Select pays */}
  <select
    name='countryCode'
    value={form.countryCode}
    onChange={(e) => setForm(prev => ({ ...prev, countryCode: e.target.value }))}
    className='border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-400'
  >
    <option value=''>-- Sélectionner un pays --</option>
    {COUNTRIES.map((country) => (
      <option key={country.code} value={country.code}>
        {country.name}
      </option>
    ))}
  </select>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
{/* ✅ Méthodes livraison */}
<h2 className='text-sm font-semibold text-gray-500 uppercase mt-4'>
  Méthode de livraison
</h2>

{shippingMethode.length === 0 ? (
  <p className='text-sm text-gray-400'>Chargement...</p>
) : (
  shippingMethode.map((method) => (
    <label
      key={method.id}
      className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer transition-colors
        ${selectedShipping === method.id
          ? 'border-amber-400 bg-amber-50'
          : 'border-gray-300 hover:border-amber-200'
        }`}
    >
      <div className='flex items-center gap-3'>
        <input
          type='radio'
          name='shippingMethod'
          value={method.id}
          checked={selectedShipping === method.id}
          onChange={() => {setSelectedShipping(method.id),setShippingPrice((method.priceWithTax/100))}}
          className='accent-amber-500'
        />
        <div>
          <p className='text-sm font-semibold text-gray-700'>
            {method.name}
          </p>
          {method.description && (
            <p className='text-xs text-gray-400'>
              {method.description}
            </p>
          )}
        </div>
      </div>
      <span className='text-sm font-semibold text-red-800'>
        $ {(method.priceWithTax / 100).toFixed(2)}
      </span>
    </label>
  ))
)}




        <button
          onClick={handleSubmit}
          disabled={loading || items.length === 0}
          className={`mt-4 py-3 rounded-xl text-white font-semibold transition-colors
            ${loading || items.length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600'
            }`}
        >
          {items.length === 0
            ? 'Panier vide'
            : loading
              ? 'Traitement...'
              : 'Confirmer la commande'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;