import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [name,setName] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
      axios.get('http://localhost:8081/')
      .then(res => {
        if(res.data.valid){
            setName(res.data.name)
        }else{
            navigate('/login');
        }
      }).catch(err => console.log(err));
  },[])
  return (
    <div className='d-flex justify-content-center align-items-center  vh-100' style={{backgroundColor:'pink'}}>
     <div  className=' p-3 rounded w-25' style={{backgroundColor:'palegreen',textAlign:'center',fontWeight:'bold'}}>
      Hello {name} <br></br>
      Welcome to Our Project!!!
     </div>
      </div>
  )
}

export default Home