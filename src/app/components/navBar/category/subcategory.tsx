'use client';

import React, { useState,useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Category, CollectionResponse } from '@/app/lib/type/vendure';
import { GET_CATEGORIE_CHILDREN } from '@/app/lib/graphql/query/collections';

import CategoryDropDown from './categoryDropDown';



interface Props {
  rootCategory: Category[];
}

export default function SubCategory({ rootCategory }: Props) {

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

 // stocker les donne de subCategory (name categorie et children)
 const [subCategories, setSubCategories] = useState<Record<string,Category>>(
    {}
  );
  //excute la reque Gql (requepere les children(subCategory) de categorie selctionner )
  const [fetchChildren] = useLazyQuery<CollectionResponse>(GET_CATEGORIE_CHILDREN);
  //clic d hors  le category dropDown(menu de subCategory) :ferme le category dropDown 
const menuRef=useRef<HTMLDivElement>(null)

useEffect(()=>{

  const handleClikOutSide=(e:MouseEvent)=>{
    if(menuRef.current && !menuRef.current.contains(e.target  as Node)){

    setOpenCategoryId(null)
  }
  
  }
  
document.addEventListener('mousedown',handleClikOutSide)
//garantit que le détecteur de clic extérieur est supprimé lorsque le composant disparaît
return ()=>{
  document.addEventListener('mousedown',handleClikOutSide)
}
},[])




 useEffect(()=>{
   console.log("stokage de donne :",subCategories)
 },[subCategories])
  
 
//fonctun Gql

const loadChildren=async(cotegoryId:string)=>{

//la requte pour recupere la categorie selectionne avec ses childrens
const {data}=await fetchChildren({variables:{id:cotegoryId}})

 if(!data?.collection){ return }
 // mise a jour de gategoies cahargers (stocker le subcategorie )
 setSubCategories(prev=>({...prev,[cotegoryId]:data?.collection}))
 }

 


  const handleToggle = async (cat: Category) => {
   
    //fermer dropDown si deja open
    if(openCategoryId===cat.id){
      setOpenCategoryId(null)
      return
    }
  
   //ouvre et fermer le categoryDropDown
    setOpenCategoryId(cat.id);
    console.log("openCategoryId :",openCategoryId)
       
    //si cette subcategorie n a pas socket en vas execute la foction Gql
    if(!subCategories[cat.id]){
      await loadChildren(cat.id)
    }
  
    
  };

  return (
    <div className=" relative" ref={menuRef}>
      <div className="lg:hidden  flex flex-col items-center space-x-4">
        {rootCategory.map((cat) => (
          <div key={cat.id} className="relative">
            <ul
             onClick={() => handleToggle(cat)}
             
              className="text-gray-700 p-2 text-gl font-bold hover:bg-gray-300 hover:cursor-pointer hover:transition-all hover:duration-300"
            >
              {cat.name}
            </ul>

            {/* Dropdown sous-catégories */}

            {
              openCategoryId===cat.id && subCategories[cat.id]?.children?.length>0 && 
              ( 
                <CategoryDropDown setOpenCategoryId={setOpenCategoryId} cat={cat} subCategories={subCategories} />
              ) 
            }
           
          </div>
        ))}
      </div>
    </div>
  );
}
