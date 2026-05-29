import { gql } from "@apollo/client";

export const GET_SHOPPING_METHODS=gql`query EligibleShippingMethods {
  eligibleShippingMethods {
    id
    name
    description
    price
    priceWithTax
    code
  }
}`