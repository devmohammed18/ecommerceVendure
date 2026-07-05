import { Product } from "@/app/lib/type/vendure"

export const getLevel2Options=(product:Product,level1Options:string[])=>{
    const option=product.variants.map(v=>v.options.map(o=>o.code)) 

    return option.filter(op=>op[0]===level1Options[0]).map(o=>o[1])

}