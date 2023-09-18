import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) => {
        e.preventDefault();
        props.showAlert("Added successfully", "success")  
addNote(note.title,note.description,note.tag);
setNote({title:"",description:"",tag:""})
    }
    const onChange = (e) => {
setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
    <h1>Add a note</h1>
    <form className='ml-5'>
  <div className="mb-3 my-3 ">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} value={note.title} required/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
  </div>
  
  <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" value={note.tag} onClick={handleClick}>Add Note</button>
</form>
</>
  )
}

export default AddNote