
import React from 'react'

function Loading() {
  return (
    <div className='w-full h-dvh flex items-center text-white text-2xl justify-center bg-gray-800 opacity-85'>
      
      <div className='w-10 h-10 rounded-full border-4 border-gray-300
                       border-t-blue-600 animate-spin'></div>
      <h1 className='animate-bounce'>Loading...........</h1>
    
    </div>
  )
}

export default Loading
