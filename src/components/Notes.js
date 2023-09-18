import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate(); // Move useNavigate here

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login'); // Use navigate directly
    }
  }, [navigate]);


    const updateNote = (currentNote) =>{
ref.current.click();
setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag});
 
}


    const ref = useRef(null)

    const closeRef = useRef(null)

    const [note, setNote] = useState({id: "",etitle:"",edescription:"",etag:""})

    const handleClick = (e) => {
      editNote(note.id,note.etitle,note.edescription,note.etag);
      closeRef.current.click();
      props.showAlert("Updated successfully", "success")  
}


    
    const onChange = (e) => {
setNote({...note, [e.target.name]: e.target.value})
    }


  return (
    <>
    <AddNote showAlert={props.showAlert}/>
   
<button type="button" className="btn btn-primary d-none" ref={ref} data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModalCenter"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className='ml-5'>
  <div className="mb-3 my-3 ">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
  </div>
  

</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={closeRef} className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button"  disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='container'>
    <h1>Your Notes</h1>
    <div className='row my-3'>
      <div className='container mx-2'>
{notes.length===0 && 'No notes to display'}
</div>
{notes.map((note) => {
  return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>;
})}
</div>
</div>
</>
  )
}

export default Notes