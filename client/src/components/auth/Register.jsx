import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { register } from '../../redux/actions/userAction.js'


const Register = () => {

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const dispatch=useDispatch()
  const navigate = useNavigate()
      
  const submitHandler=(e)=>{
    e.preventDefault()    
    console.log('registered')
    dispatch(register(name,email,password))
    navigate('/login')
  }

  return (

<div className="flex items-center justify-center h-screen">
  <div className="text-center  w-96 p-4">
    <h1 className="text-4xl font-bold mb-4">Register</h1>
    
    <div className="m-4">
      <form onSubmit={submitHandler} className="flex flex-col">

        <label className='text-start' htmlFor="name">Name:</label>
        <input type="text" 
               id="name" 
               value={name} 
               onChange={e=>setName(e.target.value)} 
               placeholder="Enter your name" 
               autoComplete="on" 
               className="mt-2 p-2 border rounded" />

        <label className='mt-4 text-start' htmlFor="email">Email:</label>
        <input type="email" 
               required 
               id="email" 
               value={email} 
               onChange={e=>setEmail(e.target.value)} 
               placeholder="Enter your email" 
               autoComplete="on" 
               className="mt-2 p-2 border rounded" />

        <label htmlFor="password" className="mt-4 text-start ">Password:</label>
        <input type="password" 
               required 
               id="password" 
               value={password} 
               onChange={e=>setPassword(e.target.value)} 
               placeholder="Enter your password"  
               className="mt-2 p-2 mb-2 border rounded" />

        <button className="mt-4 bg-blue-500 hover:bg-black text-white font-bold py-2 px-2 rounded" type="submit">Submit</button>

        <span className='mt-4 text-start ' >
        Already Registered? <Link to='/login'>
            <button className='bg-slate-500  text-white font-medium  py-1 px-1 rounded ' >Sign In</button>
          </Link>
        </span>
        </form>      
    </div>
  </div>
</div>

  )
}

export default Register
