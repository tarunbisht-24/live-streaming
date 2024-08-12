import React from "react"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from "./components/home/Home.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Stream from "./components/stream/Stream.jsx";
import {ProtectedRoute} from 'protected-route-react'
import { useSelector } from "react-redux";


function App() {
  
const {isAuthenticated}=useSelector(state=>state.user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/login' ><Register/></ProtectedRoute>}/>
        <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/stream' ><Login/></ProtectedRoute>}/>
        <Route path='/stream' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Stream/></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
