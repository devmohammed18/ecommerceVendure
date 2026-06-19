import { gql } from "@apollo/client"
export const LOGOUT=gql`mutation logout{
  logout{
    success
  }
}`

export const CREATE_CUSTOMER=gql`mutation
CreateCustomerForOrder($input1:CreateCustomerInput!)
   { 
    setCustomerForOrder(input:$input1){
      
      ...on Order{
        id
        code
        customer{
          id
          firstName
          lastName
          emailAddress 
          phoneNumber
        }
      }
      ...on ErrorResult{
        errorCode
        message
      }
    
  }
  
  
  }
  `
  export const  ATTACHER_ADRESS=gql`mutation  attacheAdressForOrder($input:CreateAddressInput!) {
  setOrderShippingAddress(input:$input){
    
    ...on Order{
      id
      code
      customer{
        id
        firstName
        lastName
        emailAddress
        
      }
      shippingAddress{
        streetLine1  
        city
        postalCode
        countryCode
      }
      
    }
    ...on ErrorResult{
      errorCode
      message
    }
    
    
  }
  
  
}`

export const ADD_ITEM_ORDER=gql`mutation  
 addItemOrder($productVariantId:ID!,$quantity:Int!)
{
     addItemToOrder(productVariantId:$productVariantId,quantity:$quantity)
      
      {
        ...on Order{
          id 
          code
          total
          lines{
            
            quantity
            productVariant{
              id
              name
              price
              taxRateApplied{
                value
              }
            }
            
          }
          
          
        }
        ...on ErrorResult{
          errorCode
          message
        }
      }
}`




export const SET_SHIPPING_METHOD =gql`mutation SetShippingMethod($id:ID!) {
  setOrderShippingMethod(shippingMethodId: [$id]) {
    ... on Order {
      id
      code
      shipping
      shippingWithTax
      shippingLines {
        shippingMethod {
          id
          name
          description
        }
        price
        priceWithTax
      }
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}`




export const SET_BILLING_ADDRESS =gql `
  mutation SetBillingAddress($input: CreateAddressInput!) {
    setOrderBillingAddress(input: $input) {
      id
      billingAddress {
        streetLine1
        city
        postalCode
        countryCode
      }
    }
  }
`;

export const TRANSITION_ORDER = gql`
  mutation TransitionOrder($state: String!) {
    transitionOrderToState(state: $state) {
      ... on Order {
        id
        code
        state
        totalWithTax
      }
      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
      }
    }
  }`


export const ADD_PAYMENT_TO_ORDER = gql`
  mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ... on Order {
        id
        code
        state
        totalWithTax
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`


export const TRANSITION_TO_STATE =gql `
  mutation TransitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      id
      state
    }
  }
`;

