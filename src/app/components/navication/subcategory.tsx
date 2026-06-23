'use client';

import React, { useState,useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Category, CollectionResponse } from '@/app/lib/type/vendure';
import { GET_CATEGORIE_CHILDREN } from '@/app/lib/graphql/query/collections';
import Link from 'next/link';


interface Props {
  rootCategory: Category[];
}

export default function SubCategory({ rootCategory }: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const [loadedData, setLoadedData] = useState<Record<string, CollectionResponse['collection']>>(
    {}
  );
 

  const [fetchChildren] = useLazyQuery<CollectionResponse>(GET_CATEGORIE_CHILDREN);

  console.log("useLazyQuer-----------------------------> ",fetchChildren)



 useEffect(()=>{
   console.log("stokage de donne :",loadedData)
 },[loadedData])
          
  const handleToggle = async (cat: Category) => {

  //  console.log("hhhhedlennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  //   if (openCategoryId === cat.id) {
  //     console.log("openCategoryId :",openCategoryId)
  //     setOpenCategoryId(null);
  //     return;
  //   } 
   
      setOpenCategoryId(cat.id);
       console.log("openCategoryId :",openCategoryId)
      // console.log("loadedData[cat.id]",loadedData[cat.id])
      // console.log("cat.id",cat.id)

    //  if (!loadedData[cat.id]) {
       


        const { data } = await fetchChildren({ variables: { id: cat.id } });
        console.log("+++++++++++++++++++++++++",data?.collection)
        
        if (data?.collection) {

          setLoadedData((prev) => ({
            ...prev,
            [cat.id]: data.collection,
           
          }));

          return loadedData;
        }
       
   //   }
    
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        {rootCategory.map((cat) => (
          <div key={cat.id} className="relative">
            <ul
             onClick={() => handleToggle(cat)}
              //onMouseEnter={() => handleToggle(cat)}
              //onMouseLeave={()=>handleToggle(null)}
              className="text-gray-700 p-2 text-gl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300"
            >
              {cat.name}
            </ul>

            {/* Dropdown sous-catégories */}
            {openCategoryId === cat.id && loadedData[cat.id]?.children?.length > 0 && (
              <div onClick={()=> { setOpenCategoryId(null)}}  className="absolute top-full left-0 mt-5 w-48 bg-gray-200 border-0 rounded-md shadow-md z-50">
                <ul className="flex flex-col py-2">
                  {loadedData[cat.id].children.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/productBySubcategory/${sub.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
