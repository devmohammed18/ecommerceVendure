// app/components/ShowProduct.tsx




export default async function Loading() {

  return (
    <section className=" bg-gray-50">


      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl  font-bold text-gray-900 mb-6"></h2>

       
          <div className="grid grid-cols-1 animate-pulse sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({length:8}).map((_,i) => (
              <div   key={i}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-4 flex flex-col items-center text-center"
              >

                {/*cart  product   */}
                 
                  <div className=" w-full  p-4 flex flex-col item-center   gap-2.5 "
                            >
                            {/* sekeleton card  */}
                           <div className="w-full">  
                            {/* sekelekon image the product */}
                           <div className="animate-pulse w-full h-52 bg-gray-200 rounded-lg " />
                           </div>    
                              {/* sekeleton name the product */}
                            <div className=" w-2/3 h-4 animate-pulse rounded-md bg-gray-200 " />
                               
                            
                                {/*sekeleton price The product */}
                            <div className="w-1/2 h-4 animate-pulse rounded-md bg-gray-200 text-left" />
                                      
                            
                            

                            </div>

      
              </div> 
            ))}
          </div>
    
      </div>
    </section>
  );
}

