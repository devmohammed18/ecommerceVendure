'use client'

import { link } from 'fs';
import { title } from 'process';
import React, { useEffect, useState } from 'react'

 const Test = () => {
    const tableau = [12, 15, 20, 8];
    const supAdix=tableau.every(num=>num >10)
    const index=tableau.findIndex(el=>el > 13)
    const value=tableau.find(el=>el>13)
    //console.log('index//////////////////',index,'value.....>',value)
    // console.log('a ce que >10',supAdix)


    const [users, setUsers] = useState([
     { id: 1, name: "Alice", age: 25 },
     { id: 2, name: "Bob", age: 30 } ]);

 const [user1, setUser1] = useState({
  id: 1,
  name: "Alice",

  address: {
    city: "Montreal",
    zip: "H2X"
  },
  posts: [
    { id: 1, title: "Post 1", likes: 0 },
    { id: 2, title: "Post 2", likes: 5 }
  ]
});


useEffect(()=>{ users.map((user,index)=>(
 console.log("user["+index+"]",user)
  ))
console.log("user1",user1)


},[users,user1])


 const handelDelete=()=>{
    //setUsers(users.filter(user=>user.id!==2))
    // setUser1({...user1,posts:user1.posts.filter(post=>post.id!==2)})
    setUser1({...user1,name:"333333",posts:user1.posts.filter(el=>el.id==2) })

}
 
 const handelUpdate=()=>{ 
       //setUsers(users.map(prev=> prev.id===1? {...prev,name:"ffffff"} :prev) ) 
      // setUser1(per=>({...per,name:"kkkk"}))
      // setUser1(prev=>({...prev,address:{...prev.address,city:"eee"}}))
      //setUser1(prev=>({...prev,posts:prev.posts.map((post)=>post.id===1?{...post,title:"kkkkk"}:post)}))
     // setUser1({...user1,address:{...user1.address,city:'Quebec'}})
     //setUser1({...user1,posts:user1.posts.map((post)=>(post.id===1?{...post,title:'llll'}:post))})
     //setUser1({...user1,address:{...user1.address,city:'ppppp'}})
     //setUser1({...user1,posts:user1.posts.map(post=>(post.id===2?{...post,likes:post.likes+1}:post))})
     //setUser1({...user1,address:{...user1.address,city:"Quebc"},posts:user1.posts.map(el=>el.id===2?{...el,title:'pppppppp'}:el)})
     setUser1(prev=>({...prev,address:{...prev.address,city:"Quebc"},posts:prev.posts.map(el=>el.id===2?{...el,title:"lllll"}:el)}))
           const newEl= { id: 3, title: "Post 3", likes: 3 }
           const togglePost = { id: 2, title: "Post 2", likes: 5 };

         setUser1(prev=>{
             const exist=prev.posts.some(el=>el.id===togglePost.id)
             return exist
             ?{...prev,posts:prev.posts.filter(el=>el.id!=togglePost.id)}
             :{...prev,posts:[...prev.posts,togglePost]}
         })

    //  setUser1(prev=>{
    //     const exist=prev.posts.some(el=>el.id===newEl.id)

    //         return exist
    //           ?prev
    //           : {...prev,posts:[...prev.posts,newEl]}
             

    //  })

}

  const handelAdd=()=>{
 
//   const userNew={id:Date.now(),name:"moh",age:40}
//    setUsers(prev=>[...prev,userNew ])
  //     setUser1(prev=>({...prev,posts:[...prev.posts,{id:4,title:"poste 4",likes:4}]})) 

  }


  return (
    <div className='' > 
        add :<button className=' border bg-green-700 text-2xl' onClick={()=>handelAdd()}>add</button>
       Delete:<button className='text-2xl bg-red-700'   onClick={()=>handelDelete()}>delete</button> 
        Echange:<button className='text-2xl bg-amber-300 '  onClick={()=>handelUpdate()}>Echange</button> 
     </div>
  )
}

export default Test