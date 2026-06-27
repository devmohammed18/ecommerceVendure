import { Category } from '@/app/lib/type/vendure'
import React from 'react'
import Link from 'next/link'


function CategoryDropDown({setOpenCategoryId,cat,subCategories}:{setOpenCategoryId:React.Dispatch<React.SetStateAction<string|null>>,cat:Category,subCategories:Record<string, Category>}) {
  return (
    <div onClick={()=> { setOpenCategoryId(null)}}  className="absolute top-full left-0 mt-5 w-48 bg-gray-200 border-0 rounded-md shadow-md z-50">
                <ul className="flex flex-col py-2">
                  {subCategories[cat.id]?.children.map((sub) => (
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
  )
}

export default CategoryDropDown
