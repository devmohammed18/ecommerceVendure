import { client } from "@/app/lib/apollo/client"
import { SEARCH_PRODUCTS } from "@/app/lib/graphql/query/searchProducts"
import { SearchProducts, SearchResponse } from "../tyeps"


export const loadSearchResults =async(term:string)=>{

    
     const {data}=await client.query<SearchResponse>({query:SEARCH_PRODUCTS,variables:{
        input:{term:term}
     }})
    
      const searchProduct:SearchProducts[]=data.search.items
      return searchProduct


} 