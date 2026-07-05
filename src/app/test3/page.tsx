import React from 'react'
interface Personnes {
    nom:string;
    age:number
}
function Test3() {
    const noms = ["Zoe", "Alice", "David", "Bob"];
    const personnes:Personnes[] = [
  { nom: "Alice", age: 25 },
  { nom: "Bob", age: 18 },
  { nom: "Charlie", age: 30 }
];
const mots = ["ordinateur", "chat", "soleil", "a", "maison"]
const etudiants = [
  { nom: "Paul", note: 15 },
  { nom: "Alice", note: 18 },
  { nom: "Bob", note: 15 },
  { nom: "David", note: 20 }
];


const tab = [9, 2, 15, 7, 1, 20];
    const nombres = [8, 3, 12, 1, 5];
    console.log("table Personne",personnes)
    const tri_desc=nombres.sort((a,b)=>{
       if(a>b) return -1
        if(b>1) return 1
        return  0}
        
    )

    const tri_alph=noms.sort((a,b)=>a.localeCompare(b))
   const tri_age=personnes.sort((a,b)=>b.age - a.age)
   const tri_nom=personnes.sort((a,b)=>a.nom.localeCompare(b.nom)) 
   const tri_length=mots.sort((a,b)=>a.length-b.length)
   //const tri_asc=nombres.sort((b,a)=>b-a)

    const tri_etudiant =etudiants.sort((a,b)=>{
     
        if(a.note>b.note) return -1
        if (a.note<b.note) return 1
        if (a.note==b.note) etudiants.sort((a,b)=>a.nom.localeCompare(b.nom))
        return 1
    })
    const numbers = [2, 4, 6, 8];
    // const EPasse=etudiants.every(elem=>elem.note>10)
     const passe=etudiants.some((el,index)=>{
      
        console.log('etudiant[',index,']:',el)

        return el.note>16

     })
     console.log('tout ls etudiants passer:',passe)

     const paire=numbers.every((el,index)=>{
       console.log('tab[',index,']:',el)

       return el%2===0

     })
     console.log("elemet tableau sont paire",paire)
    //console.log('etats Etudiants',EPasse)
    console.log("tri desc====> ",tri_desc)
    console.log("tri le nom ====> ",tri_alph)
    console.log("tri_age",tri_age)
    console.log("tri_nom",tri_nom)
    console.log("tri_lenght",tri_length)
    console.log("tri Etudiant",tri_etudiant)
    return (
    <div>
        <>{tri_desc}</>
    </div>
  )
}

export default Test3

