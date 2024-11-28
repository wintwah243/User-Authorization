import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [values,setValues] = useState({
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
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
            event.preventDefault();
            axios.post('http://localhost:8081/login',values)
            .then(res => {
                if(res.data.Login){
                    navigate('/');
                }else{
                    alert("Data Not Match! Try Again.")
                }
                console.log(res);
            }).catch(err => console.log(err));
            
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundColor:'pink'}}>
        <div className=' p-3 rounded w-25' style={{backgroundColor:'white'}}>
            <h2 style={{textAlign:'center'}}>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter email' name='email' 
                    onChange={handleInput} className='form-control rounded-0' style={{borderWidth:2,borderColor:'black'}} />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter password' name='password' 
                    onChange={handleInput} className='form-control rounded-0' style={{borderWidth:2,borderColor:'black'}} />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0' style={{backgroundColor:'palegreen',color:'black',fontWeight:'bold'}}>Log in</button>
                <p>You agress to our terms and conditions.</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none' style={{borderWidth:3,borderColor:'black',fontWeight:'bold'}} >Signup</Link>
            </form>
        </div>
    </div>
  )
}

export default Login