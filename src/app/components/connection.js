import React, { useState, useEffect } from "react";
import  io  from 'socket.io-client';
const socket = io.connect('https://localhost:4545', { transports: ['websocket'] });


const Connection = (props) => {
  const [Internet , setStatus] = useState(false)
  useEffect(()=>{
    socket.on('Internet', (status)=>{
      setStatus(status)
    })
  })

  if(Internet){
    return <h6 style={{ fontSize: '10px', color: 'black' , margin: 0}}>"Internet-Connected"</h6>
  }else{
    return <h6 style={{ fontSize: '10px', color: 'black' , margin: 0}}>"No connection"</h6>
  }
  
};

export default  Connection