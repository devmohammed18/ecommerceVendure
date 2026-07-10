export interface SearchResponse{
search:{
  items:SearchProducts[]
}}

export interface SearchProducts{

   productId:string;
      productName:string;
      productAsset: {
      preview:string
     }
   
      price:{value:number}
    }


export interface  ProductPriceRanges{
  productId:string
  productName:string;
  productUrl:string;
  minPrice:number;
  maxPrice:number;

}

export interface SearchResultsProps{
produtPriceRange:ProductPriceRanges[]
setIsOpenSearchResults:React.Dispatch<React.SetStateAction<boolean>>
loading:boolean
}

export interface SearchModalProps{
search:string;

setSearch:React.Dispatch<React.SetStateAction<string>>
}