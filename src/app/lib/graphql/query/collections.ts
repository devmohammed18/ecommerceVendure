import { gql } from "@apollo/client";

export const GET_COLLECTIONS=gql`query GetCategories {
      collections {
        items {
          id
          name
          slug
          parent {
            id
            name}
          children{
            id 
            name}
        }

        
      }
    }


`

export const GET_CATEGORIE_CHILDREN=gql`

query GetCategoryChildren($id: ID!) {
  collection(id: $id) {
    id
    name
    slug
    children {
      id
      name
     
    }
  }
}
`

export const GET_PRODUCT = gql`
query GetProducts {
  products {
    items {
      id
      name
      slug
      description
      
      featuredAsset{
        preview
      }
      variants
      {
        price
      }  

    }
  }
}
`
export const GET_PRODUCT_DETAILS=gql`
query GetProductDetails($id:ID!)
{product(id:$id){
      id
      name
      description
      featuredAsset{
        id
        preview
      }
      variants{
        id
        name
        price
        featuredAsset{
          id
          preview
        }
        taxRateApplied{
          value
        }
      }

  }

}
`



//requepere les produits de sous categorie
export const GET_PRODUCT_BY_SUBCATEGORY=gql`
query GetProductsByCollection($collectionId:ID){
  collection(id:$collectionId){
    name
    productVariants{
      items{
        product{
          id
          name
          slug
          description
          featuredAsset{
            id
            preview
          }
          
          variants{
            price
            
          }
          
        }
      }
    }
  }
}
`



   const GET_PRODUCT_BY_SUBCATEGORY1=gql`
       query GetProductsCollection($collectionId: ID!) {
    search(input: { collectionId: $collectionId }) {
      items {
        productId
        productName
        slug
        description
        productAsset {
          preview
        }
      }
    }
  }
     `






export const GET_PRODUCT_DETAILS1=gql`
 query GetProductDetails($id: ID!) {
    product(id: $id) {
      # Informations de base du produit
      id
      name
      description
      slug
      
      # Image principale du produit
      featuredAsset {
        id
        preview      # URL pour affichage (redimensionnée)
        source       # URL originale haute résolution
        name
        mimeType
      }
      
      # Toutes les images du produit (pour galerie)
      assets {
        id
        preview
        source
        name
        mimeType
      }
      


      

      # 🔥 GROUPES D'OPTIONS AU NIVEAU PRODUIT
      # Ces groupes définissent quelles options sont disponibles
      optionGroups {
        id
        code         # Ex: "size", "color", "material" 
        name         # Ex: "Taille", "Couleur", "Matière"
        options {    # Toutes les valeurs possibles pour ce groupe
          id
          code       # Ex: "small", "red", "cotton"
          name       # Ex: "Petit", "Rouge", "Coton"
        }
      }
      
      # 🔥 VARIANTES (COMBINATIONS RÉELLES)
      # Chaque variante = une combinaison spécifique d'options
      variants {
        id
        name         # Ex: "T-shirt Rouge Petit"
        sku          # Code produit unique
        price        # Prix HT en centimes
        priceWithTax # Prix TTC en centimes
        stockLevel   # Quantité en stock
        
        # Image spécifique à cette variante
        featuredAsset {
          id
          preview
          source
        }
        
        # 🔥 OPTIONS DE CETTE VARIANTE
        # La combinaison exacte d'options pour cette variante
        options {
          id
          code
          name
          groupId      # ID du groupe parent
          group {      # Détails du groupe parent
            id
            code
            name
          }
        }
        
        # Informations additionnelles
        # enabled      # Si la variante est active
        # trackInventory # Si le stock est suivi
      }
      
      # Métadonnées du produit (catégories, tags, etc.)
      # facetValues {
      #   id
      #   name
      #   code
      #   facet {
      #     id
      #     name
      #     code
      #   }
      # }
      
      # Collections auxquelles appartient le produit
      # collections {
      #   id
      #   name
      #   slug
      # }
    }
  }
    `
    