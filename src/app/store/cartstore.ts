import {create} from 'zustand' 
import { ProductVariant } from '../lib/type/vendure';

interface CartItem{
variant:ProductVariant|null;
quantity:number;
productName:string|undefined;
productImage:string|undefined;

}
interface CartStore{
items:CartItem[]


incriment:(idItem:string|undefined)=>void
decriment:(idItem:string|undefined,quantity:number)=>void
addItem:(item:CartItem)=>void
deleteItem:(idItem:string|undefined)=>void
clearCart:()=>void
totals:()=>number
totalsWithTax:()=>number
}

export const useCartStore=create<CartStore>((set,get)=>({
    
    items:[],
    //ajout item
    addItem:(item)=>{
       const Existe=get().items.find(el=>el.variant?.id===item.variant?.id)
        if(Existe){
                set(state=>({
                        items:state.items.map((el)=>{
                        if(el.variant?.id===Existe.variant?.id)
                                {return {...el,quantity:el.quantity+1 }}
                                return el  }) }))            
            }else{
            set(state=>({items:[...state.items,item]}))
            } 
          }, 

 //Delete Product

    deleteItem:(idItem)=>{   
     set(state=>( {items:state.items.filter(el=>el.variant?.id!=idItem)}))  },   
   //incriment    
    incriment:(idItem)=>{
     set(state=>({items:state.items.map(el=>(
        el.variant?.id===idItem
        ?{...el,quantity:el.quantity+1}
    
        :el
     

   ))}))
    
    },
    //Decriment
     decriment:(idItem,quantity)=>{
        
        if(quantity<=1){
        return  set(state=>({items:state.items.filter(el=>el.variant?.id!=idItem)}))
        }
        
        set(state=>({items:state.items.map(el=>(
      
                el.variant?.id===idItem
                ?
                {...el,quantity:el.quantity-1}
                :el

     )


    )}))

  
}, 

 totals:()=>{
   return get().items.reduce((total,el)=>total+((el.variant?.price??0)*el.quantity),0)
},
totalsWithTax:()=> {
    return get().items.reduce((totalWithTax,el)=>totalWithTax+((el.variant?.priceWithTax??0)*el.quantity),0)
},
//Clean
clearCart:()=>{
    set(({items:[]}))
}


  //methode Add Product 1
    //  set(state=>({items:state.items.map(el=>
    //  (
    //        el.variant?.id===Existe.variant?.id
    //        ?{...el,quantity:el.quantity+el.quantity} 
    //        :el

    //  )
        


    //  )}))



 




}));

//fonction add item in cart