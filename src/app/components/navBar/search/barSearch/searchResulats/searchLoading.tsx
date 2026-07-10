import React from 'react'

function SearchLoading() {
  return (
    <div className='flex items-center justify-center mt-20 gap-4'>
        <span className='w-10 h-10 border-4 text-gray-200 
                            border-l-blue-600 animate-spin rounded-full
                            transition-all duration-300' ></span>
        <p className='text-lg text-gray-300 capitalize'> Loading...  </p>
     </div>
  )
}

export default SearchLoading
