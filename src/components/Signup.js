import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password:"", cpassword: ""})
  let navigate = useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser",{
     
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    } );
    const json = await response.json();
    console.log(json);
    if (json.success){
        //Save auth token and redirect
        localStorage.setItem('token', json.authtoken)
        navigate("/");
        props.showAlert(`Welcome ${name}`, "success")
    }
    else{
      props.showAlert("Invalid Credentials", "danger")
    }
}
const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
}
  return (
    <div className='container'>
      <div className='mt-3'>
      <h1 className='ml-5'>Creat an Account to continue to iNotebookK</h1>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="name" class="form-control" id="exampleInputEmail1" name='name' aria-describedby="emailHelp" onChange={onChange}/>

  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email"  name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name='password' id="password" onChange={onChange} minLength={5} required/>
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={5} required/>
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup