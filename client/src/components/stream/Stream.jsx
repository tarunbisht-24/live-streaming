import React, { useEffect, useRef, useState } from 'react'
import {Media,Video} from '@vidstack/player-react'
import {io} from 'socket.io-client'

const Stream = () => {

  const [status,setStatus]=useState('Connecting to the server...')
  const [messages,setMessages]=useState([])
  const [message,setMessage]=useState('')
  const socketRef=useRef(null)

  const apiUrl=import.meta.env.VITE_API_URL
  const hlsUrl=import.meta.env.VITE_HLS_URL


  useEffect(()=>{
    
    const socket=io(`http://localhost:4000`)
    socketRef.current=socket

    socket.on('connect',()=>{
      setStatus('Streaming from the server')	
    })

    socket.on('message',(data)=>{
      setMessages((prevMessages)=>[...prevMessages,data])
    })

    socket.on('disconnect',()=>{
      setStatus('Disconnected from the server')
    })

    return ()=>{
      socket.disconnect()
    }
    
  },[])

  const sendMessage=()=>{
    if(message.trim()){
      socketRef.current.emit('message',message)
      setMessage('')
      console.log('message:',message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-0 left-0 right-0 p-4 bg-blue-500 text-white text-center">
        {status && <p>{status}</p>}
      </div>
      <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Live Stream</h1>
        <div className="relative pb-9/16">
          <Media>
          <Video loading="visible"  controls preload="true">
          <video loading="visible"  src={hlsUrl} preload="none" data-video="0" controls />
          </Video>
          </Media>
        </div>
      </div>
      <div className="w-full max-w-96 mx-auto p-4 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="overflow-y-auto h-32 w-80 border border-gray-300 p-2 mb-4">
        {
          messages.map((msg,index)=>(
            <div key={index} className="p-2 bg-gray-100 rounded mb-2">
              {msg}
            </div>
          ))
        }
        </div>
        <div className="flex w-80">
          <input
          type='text'
          className="flex-1 p-2 border border-gray-300 rounded-l"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          />
          <button onClick={sendMessage} className='bg-blue-500 text-white p-2 rounded-r' >Send</button>
        </div>
      </div>
      </div>
    
  )
}

export default Stream
