import React, { Suspense } from 'react'
import BodyOrderConfirmation from './body'

function OrderConfirmation() {
  return (
    <Suspense fallback={<>chargement.....</>}>
           
         <BodyOrderConfirmation />
    </Suspense>
  )
}

export default OrderConfirmation
