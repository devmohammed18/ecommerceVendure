import { gql } from "@apollo/client";

export const GET_SHIPPING_METHODS=gql`query EligibleShippingMethods {
  eligibleShippingMethods {
    id
    name
    description
    price
    priceWithTax
    code
  }
}`