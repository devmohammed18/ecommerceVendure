import { Product } from "@/app/lib/type/vendure"


// recuper la
export const getSelectedVariants =(product:Product,selectedLevel1:string,selectOptionsLevel2:string[],selectedLevel2Index:number)=>{

        console.log('variants===>',product.variants)
        const selectedVariant=product.variants.find(v=>{
             //aucun niveau
             if(product.optionGroups.length===0){
       
                return true
             }
            //niveau 1
            const codeLeve1 = v.options[0]?.code;
           
            if(product.optionGroups.length===1){

                return selectedLevel1===codeLeve1
            }
            // naiveau 2
            const codeLeve2 = v.options[1]?.code;
    //     console.log('selectedLevel1',selectedLevel1)    
       console.log('slevel2[level2Index]nnnn',selectOptionsLevel2[selectedLevel2Index])
      // console.log('selectOptionsLevel2 nnnn',selectedOptionlevel2[level2Index])     
    return (selectedLevel1===codeLeve1 && selectOptionsLevel2[selectedLevel2Index]===codeLeve2)
                    

             
        })

  return selectedVariant

}







// export const getVariant=(product:Product,selectOptions:Record<number,Record<string,string>>)=>{
  
 
//   const  variantFin=product.variants.find(option=>{
  
//     const codes=option.options.map(o=>o.code)
//       console.log('codes===============>',codes)
//     if(product.optionGroups.length===0) return true

//     return product.optionGroups.every((_,index)=>(codes[index]===selectOptions[index][0])
// )
  
 
//   })

//     return variantFin

// }

// export const getVariant =(product:Product,options:string[][])=>{

//         const variantFin=product.variants.find(v=>{
//             const code= v.options.map(o=>o.code)
//               if(product.optionGroups.length===0){
//                 return true
//             }
//             for(let i=0;i<product.optionGroups.length;i++){
//                  console.log('compae forr========>',code[i],"===",options[i][0])
//                 if (code[i]!=options[i][0]){
//                     console.log('compareeee========>',code[i],"!=",options[i][0])
//                     return false
//                 } 
//             }
//            return true
            
//         })

//   return variantFin

// }