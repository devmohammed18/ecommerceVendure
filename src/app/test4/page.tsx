import React from 'react'

class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}

export default function Test4() {

   const node2=new ListNode(30)
   const node1=new ListNode(20,node2)

   const node=new ListNode(10,node1)

//    let currant:ListNode|null=node

//    while(currant!=null){
//     console.log('currant==>',currant?.val)
//     currant=currant?.next;
//    }

   const affiche=(Node:ListNode)=>{

    let current:ListNode|null=Node
   while(current!=null){
    console.log('rrrr',current.val)
    current=current?.next
   }
  
   }
const result=affiche(node)


console.log("result====node",result)


  return (
    <div>
      mohammed....................
    </div>
  )
}
