// lib/apollo-server-client.ts
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const serverClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_VENDURE_GRAPHQL_URL || 'http://localhost:10000/shop-api',
    fetch,
  }),
  cache: new InMemoryCache(),
});
