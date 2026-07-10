'use client'


import React, { useEffect, useState } from "react"

import { useDebounce } from "@/app/lib/hooks/useDebounce"




import { ProductPriceRanges, SearchProducts } from "../tyeps"
import { loadSearchResults } from "../features/loadSearchResults"
import SearchResulats from "./searchResulats/searchResulats"
import SearchModel from "./searchModal"
import SearchButton from "./searchButton"




function BarSearch() {
  // open end close barSearch
  const [isOpenSearchResults,setIsOpenSearchResults]=useState<boolean>(false)
  //le mot de recherche
  const [search,setSearch]=useState<string>('')
  //debounce Search
  const {debounceSearch}=useDebounce(search,300)
  // les resulta the serch (products)
  const [searchProducts,setSearchProducts]=useState<SearchProducts[]>([])

  const [error,setError]=useState<string>('')
  //loading attand la fin de la recharche
  const [loading,setLoading]=useState<boolean>(false)
  
  // 
   



 
  // console.log("debounce===",debounceSearch)
  // console.log("search=====",search)

   useEffect(()=>{

        if(!debounceSearch.trim()){
        setSearchProducts([])
        return
        }

        let isCancled:boolean=false
        setLoading(true)
      

        const LoadData=async ()=>{
            try{
                const searchProdus=await loadSearchResults(debounceSearch) 
                if(!isCancled){
                  setSearchProducts(searchProdus)
                  }
  
            }catch{if(!isCancled) setError("error de serveur") }
            finally{ if(!isCancled) setLoading(false) }     
                
                } 
                
        LoadData()

   
 
  //console.log('search======================>',searchProducts)
  return ()=>{ isCancled=true }
   },[debounceSearch])

  const seen=new Set()
  //const prices=searchProducts.map(item=>item.price.value)

  const productPricrRanges=searchProducts.map(item=>({
  productName:item.productName,
  min:Math.min(item.price.value),
  max:Math.max(item.price.value),
  url:item.productAsset.preview
  }))
 //console.log("pricr===================>",productPricrRanges)
 const produtPriceRange=Object.values(searchProducts.reduce<Record<number,ProductPriceRanges>>((acc,item)=>
  
  {
   
    const productId=Number(item.productId)
    
   if(!acc[productId]){

    acc[productId]={
     productId:item.productId,
     productName:item.productName,
     productUrl:item.productAsset.preview,
     minPrice:item.price.value,
     maxPrice:item.price.value
   
   }
  }else{
    acc[productId].minPrice=Math.min(acc[productId].minPrice,item.price.value)
    acc[productId].maxPrice=Math.max(acc[productId].maxPrice,item.price.value)
  }


  return acc
  },
 
 
 {}))
  
 
  //console.log("produtPriceRange=====>",produtPriceRange)

    // recuper just les name the product
  // const product=searchProducts.map(item=>item.productName).filter(v=>{
  //  if(seen.has(v)) return false
  //  seen.add(v) 
  //  return true 

  // })
 //recuper le  produt complet avec son name et image the protuct
 
  const productsSansDouble=searchProducts.filter(product=>{
    if(seen.has(product.productName)) return false
    seen.add(product.productName)
    return true
  })

 // console.log('Name Product',productsSansDouble)
  return (
    
<>  

{ !isOpenSearchResults && 
  <SearchButton  setIsOpenSearchResults={setIsOpenSearchResults} /> }

  {isOpenSearchResults &&  

  <div >
    
    <SearchModel search={search} setSearch={setSearch}/>
        
    <SearchResulats setIsOpenSearchResults={setIsOpenSearchResults} produtPriceRange={produtPriceRange} loading={loading} />

  </div>}

     
     </>
   
  
  )
}

export default BarSearch