

interface StatusStockProps{
isAvailableStock:boolean;
isLowStock:boolean;
isOutOfStock:boolean
stateStock:string|undefined;

}

function StatusStock({isAvailableStock,isLowStock,isOutOfStock,stateStock}:StatusStockProps) {
  return (
     <div className='w-full flex items-center justify-start gap-2' >
            <h1 className='text-md mt-4 font-bold'>status stock:</h1>
             {<p className= {`text-md font-bold mt-4 
                             ${isAvailableStock?'text-green-500'
                             :isLowStock?"text-yellow-500"
                             :isOutOfStock?'text-red-500':'text-gray-400' }    `}>
               
                
                {stateStock ?? "UNKNOWN"}

               </p> }
          </div>
  )
}

export default StatusStock
