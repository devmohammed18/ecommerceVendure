import { PropsCategryDropDown } from '@/app/lib/type/vendure'
import React from 'react'
import Link from 'next/link'



function CategoryDropDown(
  {setOpenCategoryId,cat,subCategories,isMobile,setMobileOpen}:PropsCategryDropDown) {
  return (
    // ferme le dropDown==setOpenCategoryId(null)  ;fermerle Menu ===setMobileOpen?.(prev=>!prev)
    <div  className={ `${isMobile?"bg-white border-l-4 border-gray-300 ml-4 "
                                   :"absolute top-full left-0 mt-5 w-48 bg-gray-300 border-0 rounded-md shadow-md z-50  "} 
            `}>
                <ul className="flex flex-col px-4 py-2 ">
                  {subCategories[cat.id]?.children.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        onClick={()=>{setOpenCategoryId(null); setMobileOpen?.(prev=>!prev);
                           
                        }}
                        href={`/productBySubcategory/${sub.id}`}
                       
                        className={`${isMobile?" flex items-center justify-start gap-2  py-3 text-sm":"px-4 py-2 text-sm"} block  text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors`}
                      >
                            <span  className={`${isMobile?"w-2 h-2 bg-gray-700 rounded-full":""}`}  />
                             {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
  )
}

export default CategoryDropDown
