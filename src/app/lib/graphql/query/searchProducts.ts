import { gql } from "@apollo/client";

export const SEARCH_PRODUCTS=gql`query search($input:SearchInput!){
  search(input:$input){
    items{
      productId
      productName
      productAsset {
      preview
     }
   
      price{
        ...on SinglePrice{
          value
        }
        
      }
      
      
    }
    
  }
  
  
}
`