
'use client'
import { ApolloClient,createHttpLink,from, InMemoryCache } from "@apollo/client";

import { ApolloProvider } from '@apollo/client'



// connexion à Vendure Shop API
const httpLink =createHttpLink({
  // Vendure 2025 utilise typiquement le port 3000 avec /shop-api
  uri: process.env.NEXT_PUBLIC_VENDURE_GRAPHQL_URL ,
  // || 'https://backendvendureecommerce.onrender.com/shop-api' ,
  credentials: 'include', // ✅ Important pour les cookies de session
  // Headers requis pour Vendure
  headers: {
    'Content-Type': 'application/json',
  }
  }
  )

//crée le client GraphQL
export const client=new ApolloClient({
link:from([httpLink]),
cache:new InMemoryCache({})

})

export function ApolloWrapper({children}:{children:React.ReactNode}) {
  return (
    <ApolloProvider  client={client}>

      {children}

    </ApolloProvider>
  )
}

