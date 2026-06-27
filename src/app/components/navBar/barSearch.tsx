import React from 'react'

function BarSearch() {
  return (
     <input
        type="text"
        placeholder="Rechercher..."
        className="w-44 sm:w-64 lg:w-96 rounded-lg border border-gray-300 
        px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
  )
}

export default BarSearch