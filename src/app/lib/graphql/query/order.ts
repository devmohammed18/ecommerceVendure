import { gql } from "@apollo/client";

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      id
      code
      state
      totalQuantity
      subTotal
      total
      shippingLines {
        shippingMethod {
          id
          name
        }
        priceWithTax
      }
      lines {
        id
        quantity
        productVariant {
          id
          name
          priceWithTax
        }
      }
    }
  }
`