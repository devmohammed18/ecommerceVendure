// import { GET_COLLECTIONS } from '@/app/lib/graphql/query/collections';
// import { serverClient } from '@/app/lib/apollo/server-client';
// import { CollectionsResponse } from '@/app/lib/type/vendure';
// import SubCategory from './subcategory';

// export default async function Category() {
// //affiche touts les categories
//   const { data } = await serverClient.query<CollectionsResponse>({
//     query: GET_COLLECTIONS,
//   });

// //affiche just les categorie parent ( Racine )
// const rootCategories = data?.collections.items.filter(
//     (cat) => cat.parent?.name === '__root_collection__'
//   );

//   return <SubCategory rootCategory={rootCategories} />;
// }
