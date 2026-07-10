// type de categories /component menu-bar
// tyepe component subcategory.tsx
export interface PropsSubCategory {
  rootCategory: Category[];
  isMobile:boolean
  setMobileOpen?:React.Dispatch<React.SetStateAction<boolean>>
 // onClos:()=>void

}
//type Component categoryDropDown.tsx
export interface PropsCategryDropDown{
  setOpenCategoryId:React.Dispatch<React.SetStateAction<string|null>>;
  cat:Category;
  subCategories:Record<string, Category>;
  isMobile:boolean;
  setMobileOpen?:React.Dispatch<React.SetStateAction<boolean>>;

}



export interface CollectionsResponse{

    collections:{
    items:Category[]
}
 
}

// type de subcategories /componet menu-children
export interface CollectionResponse{
    collection:Category
}
export interface ProductDetailsResponse{
    product:Product
}

export interface SubCategory{
id:string;
name:string;

}
export interface Category{

  id: string;
  name:string;
  slug:string;
  parent:{ id:string|null;name:string;}|null;
 
  children:SubCategory[];

   }
// type products 

// Types pour les données

 

export interface ProductOption{
    id:string
          code:string
          name:string
          groupId:string  
          stockLevel:string   
          group:{      
            id:string
            name:string
            code:string
            
          }
}

export interface TaxRate {
  id: string
  name: string
  value: number
  enabled: boolean
}

export interface ProductVariant{
    
    id:string
    name:string
    sku:string
    price:number
    priceWithTax:number // Prix TTC en centimes
    stockLevel:string  // Quantité en stock
    options:ProductOption[]
    taxRateApplied:TaxRate

    //C’est la première image visible par l’utilisateur
    featuredAsset:{
        id:string
        preview:string
        source:string
       
       
}}

//un groupe d’options pour un produit
export interface ProductOptionGroup{

    id:string
    code:string         // Ex: "size", "color", "material" 
    name:string              //Ex: "Taille", "Couleur", "Matière"
    options:{    // Toutes les valeurs possibles pour ce groupe
        id:string
        code:string       // Ex: "small", "red", "cotton"
        name:string       // Ex: "Petit", "Rouge", "Coton"
    }[]

    
}

// Une seule image principale de Produit
export interface ProductFeaturedAsset{
      id:string
      preview:string
      source:string
}
//(Liste toutes les images du produit)
export interface ProductAsset{
    id:string
        preview:string
        source:string
        name:string
        mimeType:string
}

//lien entre Product et FacetValue==(valeur (ex: Rouge))(utilise pour les filtre)
export interface ProductFacetValuse{
       id:string
        name:string
        code:string
        facet:{
          id:string
          name:string
          code:string
        }

}
export interface Product {
  id: string
  name: string
  slug:string
  description:string
  featuredAsset:ProductFeaturedAsset

       //Toutes les images du produit (pour galerie)
   assets :ProductAsset[]
   
   optionGroups:ProductOptionGroup[]
   variants:ProductVariant[]
       //  Métadonnées du produit (catégories, tags, etc.)
   facetValues: ProductFacetValuse[]
      
      //Collections auxquelles appartient le produit
      collections:{
        id:string
        name:string
        slug:string
      }[]
}
// type de ProductBySubcategorie
export interface ProductSearch {
  productId: string
  productName: string
  slug:string
  description:string
  productAsset:{
    id:string
    preview:string
  }
}
//le système qui permet de rechercher et filtrer les produits 
//par Ex :mot-clé (“nike”, “t-shirt”) ou Filtrer par facettes (couleur, marque…)
//ou par prix ou Paginer les produit
export interface SearchData{
    search:{
        items:ProductSearch[]
    }
}
export interface ProductsData {
  products: {
    items: Product[]
  }
}

