'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { text } from 'stream/consumers';
 const Test2 = () => {

const a=5
let b=a
b=20

console.log("b===>",b)
console.log("a==>",a)

const personne1 = {
    nom: "Ali"
};

const personne2 = personne1;

personne2.nom = "Sara";

console.log("1",personne1.nom)
console.log("2",personne2.nom)



//    const [user, setUser] = useState({
//   id: 1,
//   name: "Alice",
//   address: {
//     city: "Montreal",
//     zip: "H2X"
//   },
//   posts: [
//     {
//       id: 1,
//       title: "Post 1",
//       likes: 0,
//       comments: [
//         { id: 1, text: "Nice post!" }
//       ]
//     },
//     {
//       id: 2,
//       title: "Post 2",
//       likes: 5,
//       comments: []
//     }
//   ]
// });
// const update=()=>{
// //Like + ajouter commentaire (deep update)
//     setUser(prev=>({...prev,posts:prev.posts.map(el=>
//         (el.likes<=0 )?{...el,likes:el.likes+1}
//                       :(el.comments.length===0?{...el,comments:[{ id: 1, text: "Nice post!" }]}:el))
   
//  } ))
   
// //Modifier un commentaire spécifique
//    setUser(prev=>({...prev,posts:prev.posts.map(post=>post.id===1?
//     {...post,comments:post.comments.map(comment=>(comment.id===1?{...comment,text:"Bad post!"}:comment))}:post)}))   


// }
// //Supprimer un commentaire
// const suprime=()=>{
//  setUser(prev=>({...prev,posts:prev.posts.map(
//                             post=>post.id===1?{...post,comments:post.comments.filter(comment=>(comment.id!=1))}:post)}))


// }

// useEffect(()=>{
// console.log("user",user)

// },[user])



  return (
    <div className='flex justify-between border-2 border-solid'>
      
       {/* <button onClick={()=>update()} className=' p-10  border-2 border-solid border-amber-700 bg-amber-400'> Update </button>
       <button onClick={()=>suprime()} className=' p-10  border-2 border-solid border-amber-950 bg-red-700'> Delete </button>
       <button className=' p-10  border-2 border-solid border-green-950 bg-green-600'> Ajout </button> */}

    </div>
  )
}
export default Test2