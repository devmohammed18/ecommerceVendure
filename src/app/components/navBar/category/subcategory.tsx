'use client';

import React, { useState,useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Category, CollectionResponse, PropsSubCategory } from '@/app/lib/type/vendure';
import { GET_CATEGORIE_CHILDREN } from '@/app/lib/graphql/query/collections';

import CategoryDropDown from './categoryDropDown';
import { ChevronDown } from 'lucide-react';





export default function SubCategory({ rootCategory ,isMobile ,setMobileOpen}:PropsSubCategory) {

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
  document.removeEventListener('mousedown',handleClikOutSide)
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
            {/* isMobile===true : mode Mobile 
            isMobile===false: mode descktop*/}
      <div className={ 
        `${isMobile?'flex flex-col justify-center' :'flex flex-row items-center space-x-4'}  `}
       >
        {rootCategory.map((cat) => (
          <div key={cat.id} className="relative  ">
             
              <button
                  onClick={() => handleToggle(cat)}
                  
                        className={`
                        h-full  border-solid  border-gray-100   
                        flex items-end justify-between   
                        text-gray-700  font-bold
                        hover:bg-gray-300 transition-all duration-150 cursor-pointer
                          ${isMobile?"border-b-2 w-full mt-1.5 px-4 py-3 text-base ":"border-2 rounded-md px-3 py-2 text-md  "}`}>
                         {cat.name}
                    {/* <ChevronUp /> */}
                     <ChevronDown 
                   size={16}
                  className={` hover:font-black  transition-transform duration-200 ${openCategoryId===cat.id?"rotate-180":""}`} />
              </button>
               
               
                   
              {/* Dropdown sous-catégories */}

              {
                openCategoryId===cat.id && subCategories[cat.id]?.children?.length>0 && 
                ( 
                  <CategoryDropDown setOpenCategoryId={setOpenCategoryId} 
                             cat={cat} subCategories={subCategories} isMobile={isMobile} setMobileOpen={setMobileOpen}  /> ) 
              }
           
          </div>
        ))}
      </div>
    </div>
  );
}
