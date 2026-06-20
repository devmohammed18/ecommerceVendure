import React, { Suspense } from 'react'
import BodyOrderConfirmation from './body'

function OrderConfirmation() {
  return (
    <Suspense fallback={<>chargement.....</>}>
           
         <BodyOrderConfirmation />
    </Suspense>
  )
}

export const dynamic='force-dynamic'
export default OrderConfirmation
