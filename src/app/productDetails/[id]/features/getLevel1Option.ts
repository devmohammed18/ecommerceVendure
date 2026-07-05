import { Product } from "@/app/lib/type/vendure";

export const getLevel1Option=(product:Product):string[]=>{
//suprime les variable repeter

const option=product.variants.map(v=>v.options[0]?.code)
if(option.length===0){
  return[]
}
const optionNoNRepeter=[... new Set(option)]
//for(let i=0;i<option.length;i++) return 

return optionNoNRepeter
}