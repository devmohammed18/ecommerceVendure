'use client'
import { useEffect, useState } from "react"


export const useDebounce=(search:string ,delay:number)=>{
const [debounceSearch,setDebounceSearch]=useState<string>("")

useEffect(()=>{

 const times=setTimeout(()=>{
setDebounceSearch(search)
 },delay)   

 return ()=>clearTimeout(times)

},[search,delay])

return{debounceSearch}
} 