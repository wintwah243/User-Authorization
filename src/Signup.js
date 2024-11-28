import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]:[event.target.value]
        }))
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
            event.preventDefault();
            axios.post('http://localhost:8081/signup',values)
            .then(res => {
                console.log(res);
                navigate('/login')
            })
            .catch(err => console.log(err));
    }
  return (
    <div className='d-flex justify-content-center align-items-center  vh-100' style={{backgroundColor:'pink'}}>
         <div className='bg-white p-3 rounded w-25'>
        <h2 style={{textAlign:'center'}}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='name'><strong>Username</strong></label>
                <input type="text" placeholder='Enter Username' name="name" 
                onChange={handleInput} className='form-control rounded-0' style={{borderWidth:2,borderColor:'black'}}  />
            </div>
            <div className='mb-3'>
                <label htmlFor='name'><strong>Email</strong></label>
                <input type="email" placeholder='Enter email' name="email" 
                onChange={handleInput} className='form-control rounded-0' style={{borderWidth:2,borderColor:'black'}}  />
            </div>
            <div className='mb-3'>
                <label htmlFor='name'><strong>Password</strong></label>
                <input type="password" placeholder='Enter password' name="password" 
                onChange={handleInput} className='form-control rounded-0' style={{borderWidth:2,borderColor:'black'}}  />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0 text-decoration-none' style={{backgroundColor:'paleturquoise', color:'black'}}>Signup</button>
            <p>You agree to our terms and conditions.</p>
            <Link to="/login" className='btn btn-default border w-100 rounded-0 text-decoration-none' style={{fontWeight:'bold',borderColor:'black'}}>Log in</Link>
        </form>
        </div>
    </div>
  )
}

export default Signup