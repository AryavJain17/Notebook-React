import { json } from "react-router-dom";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const  notesinitial = []

     //Get All Note
const getNotes = async()=>{

   //API CALL
 
   const  response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method:'GET',
    headers: {
      'Content-Type': 'application.json',
      "auth-token": localStorage.getItem('token')
    },
   
  });
  const json = await response.json();
console.log(json)
setNotes(json);
}

//     const s = {
//         "name": "Harry",
//         "class": "5b"
//     }
//     const [state, setState] = useState(s);
//  const update = () =>{
//     setTimeout(() => {
//         setState({
//             "name": "Aryav",
//             "class": "S1"
//         }, 3000);
//     })
// }
   const [notes, setNotes] = useState(notesinitial)

   //Add Note
const addNote = async (title,description,tag)=>{

  //TODO API CALL
   //API CALL
 
   const response = await fetch(`${host}/api/notes/addnote`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
  });
const note = await response.json();
setNotes(notes.concat(note))
}
   //Delete Note
    
const deleteNote = async(id) => {
   //TODO API CALL
   const  response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
  });
  const json = response.json();
  console.log(json);

 console.log("Deleting the node with id " + id)
 const newNotes = notes.filter((note)=>{return note._id!==id });
 setNotes(newNotes)
}
   //Update a Note
   const editNote = async (id,title,description,tag) => {
    //API CALL
 
    const  response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
  
let newNotes = JSON.parse(JSON.stringify(notes))
    //LOGIC TO EDIT IN CLIENT
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
break;
    }
    
}
setNotes(newNotes);
   }

    return (
        // <noteContext.Provider value={{state,update}}>
             <noteContext.Provider value={{notes, addNote, deleteNote, editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
    }
export default NoteState;