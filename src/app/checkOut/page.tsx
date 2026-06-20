

// 'use client'

// import { useEffect, useState } from 'react';

// import { useCartStore } from '../store/cartstore';
// import { useRouter } from 'next/navigation';
// import { client } from '../lib/apollo/client';
// import { ADD_ITEM_ORDER, ATTACHER_ADRESS, CREATE_CUSTOMER, LOGOUT, SET_SHIPPING_METHOD } from '../lib/graphql/mutation/order';
// import { from } from '@apollo/client';
// import { Variable } from 'lucide-react';
// import { GET_SHOPPING_METHODS } from '../lib/graphql/query/methodeShopping';

// interface typeShoppingMethode{
//   id :string
//   name: string
//   description: string
//   price: number
//   priceWithTax: number

// }

// const CheckoutPage = () => {

//   const COUNTRIES = [
//   { code: 'CA', name: 'Canada' },
//   { code: 'FR', name: 'France' },
//   { code: 'MA', name: 'Maroc' },
//   { code: 'DZ', name: 'Algérie' },
//   { code: 'TN', name: 'Tunisie' },
//   { code: 'BE', name: 'Belgique' },
//   { code: 'CH', name: 'Suisse' },
//   { code: 'US', name: 'États-Unis' },
//   { code: 'GB', name: 'Royaume-Uni' },
//   { code: 'DE', name: 'Allemagne' },
//   { code: 'ES', name: 'Espagne' },
//   { code: 'IT', name: 'Italie' },
//   { code: 'PT', name: 'Portugal' },
//   { code: 'NL', name: 'Pays-Bas' },
//   { code: 'SE', name: 'Suède' },
//   { code: 'NO', name: 'Norvège' },
//   { code: 'AU', name: 'Australie' },
//   { code: 'BR', name: 'Brésil' },
//   { code: 'MX', name: 'Mexique' },
//   { code: 'SN', name: 'Sénégal' },
//   { code: 'CI', name: "Côte d'Ivoire" },
//   { code: 'CM', name: 'Cameroun' },]

//   const { items,clearCart } = useCartStore();
 
//   const router = useRouter();
 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
   
//   const [form, setForm] = useState({
//     fullName: '',
//     emailAdress:'',
//     streetLine1: '',
//     city: '',
//     postalCode: '',
//     phoneNumber: '',
//     countryCode:''
 
//   });

// const [shippingMethode,setShippingMethods]=useState<typeShoppingMethode[]>([])
// const [selectedShipping, setSelectedShipping] = useState<string>('')
// const [shippingPice,setShippingPrice]=useState<number>(0)
 
// useEffect(()=>{
//     const fetchShoppingMethode= async()=>{
//  //query Methode de shopping
//    try{
    
//     //logout

//     // await client.mutate(({mutation:LOGOUT}))
    
//     //create order

//       for(const item of items){
//       const {data}= await client.mutate({mutation:ADD_ITEM_ORDER,variables:{productVariableId:item.variant?.id,quantity:item.quantity}})
//       console.log("data pour activer methode de livrison :",data)
//       }


//      //affiche la methode de livraison

//       const {data}=await client.query({
//                             query:GET_SHOPPING_METHODS,
//                             fetchPolicy: 'network-only' // ✅ toujours récupérer depuis le serveur
//                               })
   
//      setShippingMethods(data.eligibleShippingMethods)
//     console.log('shoppinMethodsData',data.eligibleShippingMethods)
//    }catch(err){
//     console.log(err)
//    }

  
//     } 
// fetchShoppingMethode()

//   },[])
//    // console.log('shoppinMethodsData------>',shippingMethode)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit =async() => {
//     // Validation simple
//     if (!form.emailAdress||!form.fullName || !form.streetLine1 || !form.city || !form.postalCode) {
//       setError('Veuillez remplir tous les champs.');
//       return;
//     }
//    // validation les frais de livraison
//    if(!selectedShipping){
//     setError('Veuillez selectionner une methode de livraison!!! ')
//     return;
//    }
//    // setLoading(true);

//     //Connect
//     try{
//         console.log('============================================')
//         const [firstName,...lastNameParent]=form.fullName.trim().split(' ')
//         const lastName=lastNameParent.join(' ')||firstName
//         console.log('firstName',firstName)
//         console.log('lastName',lastName)
//           console.log('++++++++++++++++++++++++++++++++++')
//      //connect le customer (login)  

//   //    await  client.mutate({mutation:LOGOUT})

//     // ajouter order  

//   //  for(const item of items){  
//   //      const {data}=await client.mutate({mutation:ADD_ITEM_ORDER,variables:{
//   //       productVariableId:item.variant?.id,
//   //       quantity:item.quantity
//   //   }})
//   //    console.log("data",data)
//   //  }

//    //add customer this Order
//    const {data:customerData}= await client.mutate({mutation:CREATE_CUSTOMER,variables:{
//     input1:{
//      firstName,
//      lastName,
//      emailAddress:form.emailAdress, 
//      phoneNumber:form.phoneNumber

//     }
//    }})
//      console.log("customerData",customerData)
//    //attache Adress avec son Customer

//    const {data:attacheAdress}=await client.mutate({mutation:ATTACHER_ADRESS,variables:{
//    input:{
//         streetLine1:form.streetLine1,
//         postalCode:form.postalCode,
//         city:form.city,
//         countryCode:form.countryCode
     
//    }

//    }})

//    console.log('attacheAdress',attacheAdress)
  
// //    const {data:resultShipping}=await client.mutate({mutation:SET_SHIPPING_METHOD,variables:{
// //     id:selectedShipping
// //    }})
  
// //    console.log("resultShipping",resultShipping)
//    clearCart();
//     // router.push('/orderConfirmation');

//     }catch(err){
//         console.log(err)
//     }

  
//   };

//   return (
//     <div className='max-w-2xl mx-auto px-6 py-16'>
//       <h1 className='text-2xl font-bold text-gray-800 mb-8'>Checkout</h1>

//       {/* Résumé panier */}
//       <div className='bg-gray-50 rounded-xl p-4 mb-8'>
//         <h2 className='text-sm font-semibold text-gray-500 uppercase mb-4'>
//           Résumé commande
//         </h2>
//         {items.map((item, index) => (
//           <div key={index} className='flex justify-between text-sm text-gray-700 py-1'>
//             <span>{item.productName} x{item.quantity}</span>
//             <span>$ {((item.variant?.price ?? 0) * item.quantity / 100).toFixed(2)}</span>
//           </div>
//         ))}

        
//         <div className='flex justify-between font-semibold text-gray-800 border-t border-gray-200 mt-3 pt-3'>
//           <span>Total TTC</span>
//           <span>
//             $ {(items.reduce((acc, el) =>
//               acc + ((el.variant?.priceWithTax ?? 0) * el.quantity), 0
//             ) / 100).toFixed(2)}
//           </span>
//         </div>
//          <div className='flex justify-between font-semibold text-gray-800  border-gray-200 mt-3 pt-3'>
//           <span>FRAIS LIVRAISON</span>
//           <span>
//            $ {shippingPice.toFixed(2)}
//           </span>
//         </div> 
        
//         <div className='flex justify-between font-semibold text-gray-800 border-t border-gray-200 mt-3 pt-3'>
//           <span>Total TTC + LIVRAISON:</span>
//           <span>
//             $ {((items.reduce((acc, el) =>
//               acc + (((el.variant?.priceWithTax) ?? 0) * el.quantity), 0
//             ) / 100)+shippingPice).toFixed(2)}
//           </span>
//         </div>


//       </div>

//       {/* Formulaire adresse */}
//       <div className='flex flex-col gap-4'>
//         <h2 className='text-sm font-semibold text-gray-500 uppercase'>
//           Adresse de livraison
//         </h2>

//         {[
//           { name: 'fullName', placeholder: 'Nom complet' },
//           { name: 'emailAdress', placeholder: 'Email Adress' },
//           { name: 'streetLine1', placeholder: 'Adresse' },
//           { name: 'city', placeholder: 'Ville' },
//           { name: 'postalCode', placeholder: 'Code postal' },
//           { name: 'phoneNumber', placeholder: 'Téléphone' },
//         ].map((field) => (
//           <input
//             key={field.name}
//             name={field.name}
//             placeholder={field.placeholder}
//             value={form[field.name as keyof typeof form]}
//             onChange={handleChange}
//             className='border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-400'
//           />
//         ))}


//           {/* ✅ Select pays */}
//   <select
//     name='countryCode'
//     value={form.countryCode}
//     onChange={(e) => setForm(prev => ({ ...prev, countryCode: e.target.value }))}
//     className='border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-400'
//   >
//     <option value=''>-- Sélectionner un pays --</option>
//     {COUNTRIES.map((country) => (
//       <option key={country.code} value={country.code}>
//         {country.name}
//       </option>
//     ))}
//   </select>

//         {error && <p className='text-red-500 text-sm'>{error}</p>}
// {/* ✅ Méthodes livraison */}
// <h2 className='text-sm font-semibold text-gray-500 uppercase mt-4'>
//   Méthode de livraison
// </h2>

// {shippingMethode.length === 0 ? (
//   <p className='text-sm text-gray-400'>Chargement...</p>
// ) : (
//   shippingMethode.map((method) => (
//     <label
//       key={method.id}
//       className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer transition-colors
//         ${selectedShipping === method.id
//           ? 'border-amber-400 bg-amber-50'
//           : 'border-gray-300 hover:border-amber-200'
//         }`}
//     >
//       <div className='flex items-center gap-3'>
//         <input
//           type='radio'
//           name='shippingMethod'
//           value={method.id}
//           checked={selectedShipping === method.id}
//           onChange={() => {setSelectedShipping(method.id),setShippingPrice((method.priceWithTax/100))}}
//           className='accent-amber-500'
//         />
//         <div>
//           <p className='text-sm font-semibold text-gray-700'>
//             {method.name}
//           </p>
//           {method.description && (
//             <p className='text-xs text-gray-400'>
//               {method.description}
//             </p>
//           )}
//         </div>
//       </div>
//       <span className='text-sm font-semibold text-red-800'>
//         $ {(method.priceWithTax / 100).toFixed(2)}
//       </span>
//     </label>
//   ))
// )}




//         <button
//           onClick={handleSubmit}
//           disabled={loading || items.length === 0}
//           className={`mt-4 py-3 rounded-xl text-white font-semibold transition-colors
//             ${loading || items.length === 0
//               ? 'bg-gray-300 cursor-not-allowed'
//               : 'bg-amber-500 hover:bg-amber-600'
//             }`}
//         >
//           {items.length === 0
//             ? 'Panier vide'
//             : loading
//               ? 'Traitement...'
//               : 'Confirmer la commande'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;



// app/checkout/page.tsx

// app/checkout/page.tsx (version corrigée)
// app/checkout/page.tsx
'use client'

import { useState } from 'react';
import { useCartStore } from '../store/cartstore';
import { client } from '../lib/apollo/client';
import { 
  ADD_ITEM_ORDER, 
  ATTACHER_ADRESS, 
  CREATE_CUSTOMER, 
  SET_SHIPPING_METHOD,
 
  LOGOUT,
  TRANSITION_ORDER,
} from '../lib/graphql/mutation/order';
import { GET_SHIPPING_METHODS } from '../lib/graphql/query/methodeShopping';
import { GET_ACTIVE_ORDER } from '../lib/graphql/query/order';
export interface ITEMS{
  productName?:string,
  productPriceTax?:number ,
  quantity:number

}
interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  priceWithTax: number;
}

interface AddressForm {
  fullName: string;
  emailAddress: string;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  countryCode: string;
}

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
  { code: 'CM', name: 'Cameroun' },
];

const CheckoutPage = () => {
  const { items, clearCart, totalsWithTax } = useCartStore();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string>('');
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [addressSet, setAddressSet] = useState(false);

  const [form, setForm] = useState<AddressForm>({
    fullName: '',
    emailAddress: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    countryCode: '',
  });

  const subtotal = totalsWithTax() / 100;
  const totalWithShipping = subtotal + shippingPrice;
  console.log('items======>',items)
  console.log('selectdShopinng',selectedShippingId)
  // const itemsStripe:ITEMS[]=items.map(item=>{
  //      return {
  //       productName:item.variant?.name,
  //       productPriceTax:item.variant?.priceWithTax ,
  //       quantity:item.quantity}

  //     })
  //   console.log("productStripe=====>",itemsStripe)
  //   console.log('order==========>',`ORDER-${Date.now()}`)
  // ─── Handlers ────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);

    // Si l'utilisateur modifie l'adresse, on réinitialise
    if (addressSet) {
      setAddressSet(false);
      setShippingMethods([]);
      setSelectedShippingId('');
      setShippingPrice(0);
    }
  };

  // Bouton "Valider mon adresse" :
  // 1. Crée l'order en ajoutant les items
  // 2. Attache l'adresse
  // 3. Charge les méthodes de livraison
  const handleSetAddress = async () => {

    if (!form.streetLine1 || !form.city || !form.postalCode || !form.countryCode) {
      setError("Veuillez remplir tous les champs d'adresse obligatoires");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {

      await client.mutate({mutation:LOGOUT})

      // 1. Ajouter les items → crée l'order dans Vendure
      for (const item of items) {
        if (!item.variant?.id) continue;
      const orderr=  await client.mutate({
          mutation: ADD_ITEM_ORDER,
          variables: {
            productVariantId: item.variant.id,
            quantity: item.quantity,
          },
        });
        console.log('orderrr===================>',orderr)
      }

      // 2. Attacher l'adresse de livraison
     const addresss= await client.mutate({
        mutation: ATTACHER_ADRESS,
        variables: {
          input: {
            streetLine1: form.streetLine1,
            streetLine2: form.streetLine2 || undefined,
            postalCode: form.postalCode,
            city: form.city,
            countryCode: form.countryCode,
          },
        },
      });

      // 3. Charger les méthodes de livraison éligibles
      const { data } = await client.query({
        query: GET_SHIPPING_METHODS,
        fetchPolicy: 'network-only',
      });

      const methods = data?.eligibleShippingMethods || [];
      setShippingMethods(methods);
      console.log('addresss===============>',addresss)
     console.log('methode=====================>',methods)
     console.log('selectedShippingId=====>',selectedShippingId) 

      if (methods.length === 0) {
        setError('Aucune méthode de livraison disponible pour cette adresse');
      } else {
        setAddressSet(true);
      }
      
   






    } catch (err) {
      console.error(err);
      setError("Erreur lors de la validation de l'adresse");
    } finally {
      setLoading(false);
    }
  };

  //lable de frais de livraison(radio)
  const handleShippingChange = (methodId: string, priceWithTax: number) => {
    setSelectedShippingId(methodId);
    setShippingPrice(priceWithTax / 100);
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.emailAddress) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (!addressSet) {
      setError("Veuillez d'abord valider votre adresse de livraison");
      return;
    }
    if (!selectedShippingId) {
      setError('Veuillez sélectionner une méthode de livraison');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.emailAddress)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parts = form.fullName.trim().split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ') || firstName;

      // 1. Créer le customer
      await client.mutate({
        mutation: CREATE_CUSTOMER,
        variables: {
          input1: {
            firstName,
            lastName,
            emailAddress: form.emailAddress,
            phoneNumber: form.phoneNumber || undefined,
          },
        },
      });

      // 2. Méthode de livraison
      await client.mutate({
        mutation: SET_SHIPPING_METHOD,
        variables: { id: selectedShippingId },
      });

      // 3. Adresse de facturation
      // try {
      //   await client.mutate({
      //     mutation: SET_BILLING_ADDRESS,
      //     variables: {
      //       input: {
      //         streetLine1: form.streetLine1,
      //         streetLine2: form.streetLine2 || undefined,
      //         postalCode: form.postalCode,
      //         city: form.city,
      //         countryCode: form.countryCode,
      //       },
      //     },
      //   });
      // } catch (billingErr) {
      //   console.warn('Adresse de facturation non définie:', billingErr);
      // }

      // ✅ Étape 4 — Vérifier état avant transition
    const {data:activeOrder}=await client.query(
      {query:GET_ACTIVE_ORDER,fetchPolicy:"network-only"})
     
    if(activeOrder?.activeOrder?.state==="AddingItems"){
       console.log("activeOrder===========================>",activeOrder.activeOrder.code)
       
       // ✅ Transition ArrangingPayment
        const {data:ArrangingPayment} = await client.mutate({
        mutation: TRANSITION_ORDER,
        variables: { state: 'ArrangingPayment' }
        })
  
       console.log('ArrangingPayment=================>',ArrangingPayment)
      
       
 
    }else if (activeOrder?.activeOrder?.state === 'ArrangingPayment') {
      // ✅ Déjà dans le bon état
      console.log('✅ Déjà en ArrangingPayment')}else{
     setError(`verifier l etat de trasition satut c est differant de :AddingItems }`)
     return
    }
     
       
       
    //stripe   
   // preper les information de la commande pour envoyer a Stripe
       //1- le name method shipping selection
       const methodeShipping=shippingMethods.filter(methode=>methode.id===selectedShippingId) 
       console.log('ShippingName======>',methodeShipping[0]?.name)
      //2-itemsStripe
      const itemsStripe:ITEMS[]=items.map(item=>{
       return {
        productName:item.variant?.name,
        productPriceTax:item.variant?.priceWithTax ,
        quantity:item.quantity}

      })
    console.log("productStripe=====>",itemsStripe)

      // connect avec stripe
      try{
          const res=await fetch('api/checkout',{
          
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
              amount:totalWithShipping,
              email:form.emailAddress,
              shippingName:methodeShipping[0]?.name,
              shippingPrice:methodeShipping[0].price,
              items:itemsStripe,
              orderCode: activeOrder?.activeOrder?.code ,

              })

          })

        const {url}= await res.json()


        if(url){
            
            clearCart()
            window.location.href=url
        }

  
      }catch{
       console.log('probleme Serveur....................')
      }





   
    



   //3-order


   
     

       
      // clearCart();
      // router.push('/orderConfirmation');

    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────

  // if (items.length === 0) {
  //   return (
  //     <div className='max-w-2xl mx-auto px-6 py-16 text-center'>
  //       <h1 className='text-2xl font-bold text-gray-800 mb-4'>Panier vide</h1>
  //       <p className='text-gray-600 mb-6'>Ajoutez des produits avant de commander.</p>
  //       <button
  //         onClick={() => router.push('/shop')}
  //         className='bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600'
  //       >
  //         Voir les produits
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 md:py-16'>
      <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8'>Finaliser ma commande</h1>

      <div className='grid md:grid-cols-2 gap-8'>
        {/* ── Colonne gauche ── */}
        
        <div className='space-y-6'>
          {/* Formulaire adresse */}
          <div className='bg-white rounded-xl border border-gray-200 p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Informations de livraison
            </h2>

            <div className='space-y-4'>
              <input type='text' name='fullName' placeholder='Nom complet *'
                value={form.fullName} onChange={handleInputChange} disabled={loading}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />

              <input type='email' name='emailAddress' placeholder='Email *'
                value={form.emailAddress} onChange={handleInputChange} disabled={loading}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />

              <input type='text' name='streetLine1' placeholder='Adresse *'
                value={form.streetLine1} onChange={handleInputChange} disabled={loading}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />

              <input type='text' name='streetLine2' placeholder='Adresse (ligne 2)'
                value={form.streetLine2} onChange={handleInputChange} disabled={loading}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />

              <div className='grid grid-cols-2 gap-4'>
                <input type='text' name='city' placeholder='Ville *'
                  value={form.city} onChange={handleInputChange} disabled={loading}
                  className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />

                <input type='text' name='postalCode' placeholder='Code postal *'
                  value={form.postalCode} onChange={handleInputChange} disabled={loading}
                  className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />
              </div>

              <input type='tel' name='phoneNumber' placeholder='Téléphone (optionnel)'
                value={form.phoneNumber} onChange={handleInputChange} disabled={loading}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400' />

              <select name='countryCode' value={form.countryCode}
                onChange={handleInputChange} disabled={loading}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400'>
                <option value=''>-- Sélectionner un pays * --</option>
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            {!addressSet ? (
              <button
                onClick={handleSetAddress}
                disabled={loading || !form.streetLine1 || !form.city || !form.postalCode || !form.countryCode}
                className='w-full mt-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 enabled:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
              >
                {loading ? 'Validation...' : 'Valider mon adresse'}
              </button>
            ) : (
              <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-green-600 text-sm flex items-center gap-2'>
                  <span>✅</span> Adresse validée
                </p>
              </div>
            )}
          </div>

          {/* Méthodes de livraison */}
          {addressSet && (
            <div className='bg-white rounded-xl border border-gray-200 p-6'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Mode de livraison</h2>
              <div className='space-y-3'>
                {shippingMethods.map((method) => (
                   <label
                    key={method.id}
                    className={`flex justify-between items-center border rounded-lg px-4 py-3 cursor-pointer transition-all
                      ${selectedShippingId === method.id
                        ? 'border-amber-400 bg-amber-50 shadow-sm'
                        : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50/50'
                      }`}
                  >
                    <div  className='flex items-center gap-3'>
                      <input type='radio' name='shippingMethod' value={method.id}
                        checked={selectedShippingId === method.id}
                        onChange={() => handleShippingChange(method.id, method.priceWithTax)}
                        className='accent-amber-500' />
                     
                      <div>
                        <p className='font-medium text-gray-800'>{method.name}</p>
                        {/* <p className='text-sm text-gray-500'>{method.description}</p> */}
                        {/* {method.description && (
                          <p className='text-sm text-gray-500'>{method.description}</p>
                        )} */}
                      </div>

                    </div>
                    <span className='font-semibold text-amber-600'>
                      ${(method.priceWithTax / 100).toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Colonne droite : récapitulatif ── */}
        <div className='bg-gray-50 rounded-xl p-6 h-fit sticky top-8'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>Récapitulatif</h2>

          <div className='space-y-2 mb-4'>
            {items.map((item, index) => (
              <div key={index} className='flex justify-between text-gray-600 py-1'>
                <span className='text-sm'>
                  {item.productName}
                  {item.variant?.name && ` (${item.variant.name})`}
                  {' '}x{item.quantity}
                </span>
                <span className='font-medium'>
                  ${((item.variant?.priceWithTax ?? 0) * item.quantity / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className='border-t border-gray-200 pt-3 space-y-2'>
            <div className='flex justify-between text-gray-600'>
              <span>Sous-total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-gray-600'>
              <span>Livraison</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200'>
              <span>Total TTC</span>
              <span className='text-amber-600'>${totalWithShipping.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !addressSet || !selectedShippingId}
            className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all
              ${loading || !addressSet || !selectedShippingId
                ? 'bg-gray-300 cursor-not-allowed opacity-50'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg'
              }`}
          >
            {loading ? 'Traitement en cours...' : 'Commance le paiement'}
          </button>

          {!addressSet && (
            <p className='text-xs text-gray-400 text-center mt-2'>
              Veuillez d abord valider votre adresse
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;