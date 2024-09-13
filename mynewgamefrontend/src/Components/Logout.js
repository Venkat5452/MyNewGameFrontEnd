import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Logout() {
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem('logintoken');
        navigate('/');
        window.location.reload();
    })
  return (
    <></>
  )
}

export default Logout